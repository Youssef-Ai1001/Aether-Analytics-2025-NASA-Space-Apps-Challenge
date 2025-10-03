const pm25Breakpoints = [
  { concentrationLow: 0.0,   concentrationHigh: 12.0,   aqiLow: 0,   aqiHigh: 50 },
  { concentrationLow: 12.1,  concentrationHigh: 35.4,   aqiLow: 51,  aqiHigh: 100 },
  { concentrationLow: 35.5,  concentrationHigh: 55.4,   aqiLow: 101, aqiHigh: 150 },
  { concentrationLow: 55.5,  concentrationHigh: 150.4,  aqiLow: 151, aqiHigh: 200 },
  { concentrationLow: 150.5, concentrationHigh: 250.4,  aqiLow: 201, aqiHigh: 300 },
  { concentrationLow: 250.5, concentrationHigh: 350.4,  aqiLow: 301, aqiHigh: 400 },
  { concentrationLow: 350.5, concentrationHigh: 500.4,  aqiLow: 401, aqiHigh: 500 }
];

// PM10  (µg/m³, 24-hour average)
const pm10Breakpoints = [
  { concentrationLow: 0,     concentrationHigh: 54,     aqiLow: 0,   aqiHigh: 50 },
  { concentrationLow: 55,    concentrationHigh: 154,    aqiLow: 51,  aqiHigh: 100 },
  { concentrationLow: 155,   concentrationHigh: 254,    aqiLow: 101, aqiHigh: 150 },
  { concentrationLow: 255,   concentrationHigh: 354,    aqiLow: 151, aqiHigh: 200 },
  { concentrationLow: 355,   concentrationHigh: 424,    aqiLow: 201, aqiHigh: 300 },
  { concentrationLow: 425,   concentrationHigh: 504,    aqiLow: 301, aqiHigh: 400 },
  { concentrationLow: 505,   concentrationHigh: 604,    aqiLow: 401, aqiHigh: 500 }
];

// O3  (ppm, 8-hour average)
const o3Breakpoints = [
  { concentrationLow: 0.000, concentrationHigh: 0.054,  aqiLow: 0,   aqiHigh: 50 },
  { concentrationLow: 0.055, concentrationHigh: 0.070,  aqiLow: 51,  aqiHigh: 100 },
  { concentrationLow: 0.071, concentrationHigh: 0.085,  aqiLow: 101, aqiHigh: 150 },
  { concentrationLow: 0.086, concentrationHigh: 0.105,  aqiLow: 151, aqiHigh: 200 },
  { concentrationLow: 0.106, concentrationHigh: 0.200,  aqiLow: 201, aqiHigh: 300 },
  { concentrationLow: 0.201, concentrationHigh: 0.300,  aqiLow: 301, aqiHigh: 400 }
  // For very high ozone, additional rows can be added
];

// NO2  (ppm, 1-hour average)
const no2Breakpoints = [
  { concentrationLow: 0.000, concentrationHigh: 0.053,  aqiLow: 0,   aqiHigh: 50 },
  { concentrationLow: 0.054, concentrationHigh: 0.100,  aqiLow: 51,  aqiHigh: 100 },
  { concentrationLow: 0.101, concentrationHigh: 0.360,  aqiLow: 101, aqiHigh: 150 },
  { concentrationLow: 0.361, concentrationHigh: 0.649,  aqiLow: 151, aqiHigh: 200 },
  { concentrationLow: 0.650, concentrationHigh: 1.249,  aqiLow: 201, aqiHigh: 300 },
  { concentrationLow: 1.250, concentrationHigh: 1.649,  aqiLow: 301, aqiHigh: 400 }
];

module.exports={
    pm25Breakpoints,pm10Breakpoints,o3Breakpoints,no2Breakpoints
}