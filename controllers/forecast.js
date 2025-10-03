const axios=require('axios');
const cron=require('node-cron');
const {PrismaClient}=require('@prisma/client');
const prisma=new PrismaClient();
const AIRNOW_KEY=process.env.AIRNOW_KEY
// async function getForecast(url,lat,lon,time){

// }

const low=`Air quality is good. It’s safe to enjoy outdoor activities.`   
const moderate=`Air quality is acceptable.Please limit prolonged outdoor exertion.`
const high=`Unhealthy for you. Limit outdoor activities and use a mask if possible.`
const very_high=`Air quality is unhealthy. Everyone should avoid prolonged outdoor activities and stay indoors when possible.`   
const critical=`Hazardous air quality detected! Stay indoors with filtered air and avoid any outdoor exertion. Follow local health advisories.`   
const checkForecasts=cron.schedule('0 */6 * * *',async()=>{
    const locations=await prisma.locations.findMany({
    })
    for(const l of locations){
        const min_lat=l.min_lat,min_lon=l.min_lon;
        const max_lat=l.max_lat,max_lon=l.max_lon

        const oneHourAgo=new Date(Date.now()).toISOString();
        const date=oneHourAgo.split('T')[0];
        
        const newForecast=await axios.get(`https://www.airnowapi.org/aq/forecast/latLong/?format=application/json&latitude=${min_lat}&longitude=${min_lon}&date=${date}&distance=25&API_KEY=${AIRNOW_KEY}`);
        const data=newForecast.data;

        for(const object of data){
            const sameDayForecast=await prisma.forecast.findFirst({
                orderBy:{
                forecastTime:"desc"
                },
                where:{stateCode:object.StateCode}
            })
            if(!sameDayForecast)continue;
            if(sameDayForecast.aqi>object.AQI)continue;
    
            const state=await prisma.locations.findFirst({
                where:{
                    stateCode:object.StateCode
                }
            })

            if(!state)continue;
            const users=await prisma.users.findMany({
                where:{stateCode:object.StateCode}
            })
            for(const user of users){
                const AQI=object.AQI;
                if(user.sensitive==true)
                {
                    const newAlert=await prisma.alerts.create({
                        data:{
                            user_id:user.id,
                            severity:object.Category.name,
                            stateCode:user.stateCode,
                            triggered_at:new Date(Date.now()),
                            message:AQI <= 50 ? low : (AQI <= 100 ? moderate : (AQI <= 150 ? high : (AQI <= 200 ? very_high : critical ) )),
                        }
                    })
                }
                else {
                     const newAlert=await prisma.alerts.create({
                        data:{
                            user_id:user.id,
                            severity:object.Category.name,
                            stateCode:user.stateCode,
                            triggered_at:new Date(Date.now()),
                            message:AQI <= 150 ? high : (AQI <= 200 ? very_high : critical ),
                        }
                    })
                }
            }
        }
    }
    console.log("Everything done successfully");
})
module.exports={checkForecasts};