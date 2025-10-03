const axios = require('axios');

// هنخلى الـ token ده ييجى من الـ env
const HARMONY_TOKEN = process.env.EDL_TOKEN;

// دى دالة عامة تجيب readings لمنطقة معينة
async function fetchReadingsForLocation(stateCode, bbox) {
  try {
    // 1. URL بتاع الـ Harmony
    // هنا لازم تستخدم اسم الـ collection اللى عايز تجيب منه البيانات (مثلاً AQI data)
    // وبعدين بتبعت الـ bounding box أو المعايير المطلوبة
    const url = `https://harmony.earthdata.nasa.gov/C2930763263-LARC_CLOUD/ogc-api-coverages/1.0.0/collections/V3004804008-LARC_CLOUD/ranges`;

    const response = await axios.get(url, {
      params: {
        bbox: bbox.join(','), // [minLon,minLat,maxLon,maxLat]
        // ممكن تضيف متغيرات تانية زى time أو format لو محتاج
      },
      headers: {
        Authorization: `Bearer ${HARMONY_TOKEN}`,
        Accept: 'application/json'
      }
    });

    // 2. Parse data
    console.log(`✅ Data received for ${stateCode}`);
    return response.data;

  } catch (error) {
    console.error(`❌ Error fetching data for ${stateCode}:`, error.response?.data || error.message);
    return null;
  }
}
fetchReadingsForLocation('CA',[32.534200,-124.409600,42.009500,-114.130800]);

// module.exports = { fetchReadingsForLocation };
