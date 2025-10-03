const express=require('express');
const app=express();
const {PrismaClient}=require('@prisma/client');
const prisma=new PrismaClient();
const AIRNOW_KEY=process.env.AIRNOW_KEY;
const asyncWrapper=require('../middlewares/asyncWrapper');
const axios = require('axios');
const { getWeather, getAqiData ,calculateAQI } = require('../utils/getGeneralData');
const {pm25Breakpoints,pm10Breakpoints,o3Breakpoints,no2Breakpoints}=require('../utils/elementsBreakPoints');


const dashboardData=asyncWrapper(
    async(req,res,next)=>{
    const lat=req.query.lat,lon=req.query.lon,zipcode=req.query.zipcode;
    
    //Get location data
    const locationData=await prisma.locations.findFirst({
      where:{
        min_lat:{lte:lat},
        max_lat:{gte:lat},
        min_lon:{lte:lon},
        max_lon:{gte:lon},
      },
    })

    //make caching here
    const oneHourAgo=new Date(Date.now() - 60 * 60 * 1000).toISOString();
    const date=oneHourAgo.split('T')[0];
    let oldReading=await prisma.readings.findFirst({
      where:{
        stateCode:locationData.stateCode
      }
    })
    if(oldReading)
    {
      oldReading.reading_id=String(oldReading.reading_id);
      
      res.status(200).json(oldReading);
      return;
    }

    //Get sensor in that location
    const [pm25, pm10, o3, no2] = await Promise.all([
      prisma.sensors.findFirst({ where: { name: 'pm25',
        lat:{gte:locationData.min_lat,lte:locationData.max_lat},
        lon:{gte:locationData.min_lon,lte:locationData.max_lon}
    }}),
      prisma.sensors.findFirst({ where: { name: 'pm10',
        lat:{gte:locationData.min_lat,lte:locationData.max_lat},
        lon:{gte:locationData.min_lon,lte:locationData.max_lon}
    }}),
      prisma.sensors.findFirst({ where: { name: 'o3',
        lat:{gte:locationData.min_lat,lte:locationData.max_lat},
        lon:{gte:locationData.min_lon,lte:locationData.max_lon}
    }}),
      prisma.sensors.findFirst({ where: { name: 'no2',
        lat:{gte:locationData.min_lat,lte:locationData.max_lat},
        lon:{gte:locationData.min_lon,lte:locationData.max_lon}
    }}),
    ]);
    const sensor_ids=[pm25.sensor_id,pm10.sensor_id,o3.sensor_id,no2.sensor_id]
    // console.log(sensor_ids);return;
    // console.log(date);return;
    const data=await getAqiData(sensor_ids,date);

    let combined = data.reduce((acc, item) => {
      acc[item.name] = String(item.value)+' '+(item.unit);
      return acc;
    }, {});

    const weather=await getWeather(lat,lon);

    const pm25AQI = calculateAQI(data[0].value, pm25Breakpoints);
    const pm10AQI = calculateAQI(data[0].value, pm10Breakpoints);
    const o3AQI = calculateAQI(data[0].value, o3Breakpoints);
    const no2AQI = calculateAQI(data[0].value, no2Breakpoints);

    const overallAQI = Math.round((Math.max(pm25AQI, pm10AQI, o3AQI, no2AQI)));    
    
    // console.log(aqiData);return;
    const response={
      stateCode:locationData.stateCode,
      aqi:overallAQI,
      ...combined,
      temperature:weather.temperature,
      windSpeed:weather.windSpeed,
    }
    const newReading=await prisma.readings.create({
      data:{
        stateCode:response.stateCode,
        timestamp:oneHourAgo,
        aqi:response.aqi,
        pm25:parseFloat(combined.pm25),
        pm10:parseFloat(combined.pm10),
        no2:parseFloat(combined.no2),
        o3:parseFloat(combined.o3), 
        temperature:response.temperature,
        windSpeed:parseFloat(response.windSpeed)
    }
  })
  res.status(200).json(response);
})
//Get pm10 , pm25 , no2 , o3


module.exports={
    dashboardData
}
