import { point, lineString } from '@turf/turf';

// 根据经纬度生成坐标点
export function getPointData(data) {
  const geoData = {
    "type": "FeatureCollection",
    "features": []
  }
  data.forEach(item => {
    const geo = point(item.lngLat, {"name": item.name})
    geoData.features.push(geo);
  });

  return geoData;
}

// 生成飞线数据
export function getFlightLine(data){
  const geoData = {
    "type": "FeatureCollection",
    "features": []
  }

  data.forEach((item, index, array) => {
    if(0 == index) return;

    const orign = array[0].lngLat;

    const geo = lineString([orign, item.lngLat],
                           {"name": item.name, "flight": item.flight, "code" : item.code})
    geoData.features.push(geo);
  });
  return geoData;
}
