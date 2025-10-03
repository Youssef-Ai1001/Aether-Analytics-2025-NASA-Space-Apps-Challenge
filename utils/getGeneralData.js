const axios=require('axios')
const OPENAQ_KEY=process.env.OPENAQ_KEY;

async function getAqiData(sensor_ids,date) {
  const results = [];
//   console.log(date);return;
  for (const id of sensor_ids) {
    try {
      const response = await axios.get(
        `https://api.openaq.org/v3/sensors/${id}/measurements/daily`,
        {
          params: {
            datetime_from: date,
            limit: 1,
            page: 1
          },
          headers: {
            'X-API-Key':OPENAQ_KEY // or your key variable
          }
        }
      );

      // inspect the data structure
      const measurement = response.data.results; // adjust if API differs
      
      results.push({name:measurement[0].parameter.name,value:measurement[0].value,
        unit:measurement[0].parameter.units});

    } catch (err) {
      console.error(`Error fetching sensor ${id}:`, err.response?.data || err.message);
    }
  }

  return results;
}

async function getGrid(lat, lon) {
  const url = `https://api.weather.gov/points/${lat},${lon}`;
  const res = await axios.get(url, {
    headers: {
      'User-Agent': 'MyWeatherApp (myemail@example.com)', // required by weather.gov
      'Accept': 'application/geo+json'
    }
  });
  return res.data.properties.forecast; // no need for `await` here
}

async function getWeather(lat,lon) {
  const grid=await getGrid(lat,lon)
  // console.log(grid);return;
  const forecast=await axios.get(grid,{
    headers: {
      'User-Agent': 'MyWeatherApp (myemail@example.com)', // required by weather.gov
      'Accept': 'application/geo+json'
    }
  });

  const periods=forecast.data.properties.periods
  const today=new Date().toISOString();
  const todayWeather=periods.filter((item)=>{
    return item.startTime <= today
  })
  const nowWeather=todayWeather[todayWeather.length-1]
  return{
    temperature:nowWeather.temperature,
    windSpeed:nowWeather.windSpeed
  }
}

function calculateAQI(concentration, breakpoints) {
  for (const bp of breakpoints) {
    if (concentration >= bp.concentrationLow && concentration <= bp.concentrationHigh) {
      const { concentrationLow: Cl, concentrationHigh: Ch, aqiLow: Il, aqiHigh: Ih } = bp;
      return ((Ih - Il) / (Ch - Cl)) * (concentration - Cl) + Il;
    }
  }
  return null; // or throw an error if concentration is outside ranges
}

// async function getAQIData(lat, lon, apiKey) {
//     // console.log(apiKey)
//   const url = `https://www.airnowapi.org/aq/observation/latLong/current?format=application/json&latitude=${lat}&longitude=${lon}&distance=25&API_KEY=${apiKey}`;
//   const res = await axios.get(url);
//   return await res.data;
// }
module.exports={
    getAqiData,
    getWeather,
    calculateAQI
}