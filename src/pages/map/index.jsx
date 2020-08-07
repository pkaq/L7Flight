import React from 'react';
import { Scene, Popup,  PointLayer, Zoom, Scale, LineLayer, Marker } from '@antv/l7';
import { GaodeMap } from '@antv/l7-maps';
import { getPointData, getFlightLine } from './geoUtil';

import Airport from '../drawer/airport';
import Flight from '../drawer/flight';

import plane from '@/assets/plane.svg';

import './index.css';

let scene = null;
const cities = [
  {name: '广州', lngLat:[ 113.30097198486328, 23.398668808995247 ]},
  {name: '贵阳', lngLat:[ 106.79852485656738, 26.544846039717957 ]},
  {name: '温州', lngLat:[ 120.809685,27.916168 ]},
  {name: '无锡', lngLat:[ 120.434631,31.496624 ]},
  {name: '西安', lngLat:[ 108.762383,34.437202 ]},
  {name: '郑州', lngLat:[ 113.779335,34.758976 ]},
  {name: '南京', lngLat:[ 118.87114,31.731449 ]}
]


 // geojson 坐标
 const json = getPointData(cities);

// 飞线坐标
const lineData = getFlightLine(cities);

// 实线路径坐标
const path = {
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            113.30097198486328,
            23.398668808995247
          ],
          [
            112.65380859375,
            24.43714786161562
          ],[
            111.28051757812499,
            24.78673454198888
          ], [
            109.40185546874999,
            24.327076540018634
          ]
        ]
      }
    }
  ]
}

// 虚线路径
const path2 = {
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            109.40185546874999,
            24.327076540018634
          ],[
            106.79852485656738,
            26.544846039717957
          ]
        ]
      }
    }
  ]
}

export default class App extends React.Component {

  // 初始化地图场景
  componentDidMount() {
    scene = new Scene({
      id: 'map',
      map: new GaodeMap({
        pitch: 0,
        style: 'dark',
        // 设置地图中心
        center: [ 113.30294609, 23.38614342 ],
        zoom: 6
      })
    });
    scene.on('loaded', () => {
      this.init();
      this.renderMarker();
      this.renderFly();
      //this.linePath();
    });
  }
  // 地图初始化配置
  init() {
    // 地图控制
    const zoomControl = new Zoom();
          zoomControl.setPosition("topright");

    const scaleControl = new Scale();
          scaleControl.setPosition("bottomright");

    scene.addControl(zoomControl);
    scene.addControl(scaleControl);
  }
  // 渲染标注点
  renderMarker() {

    // 自定义标记点
    var el = document.createElement('img');
        el.src = 'https://gw.alipayobjects.com/zos/rmsportal/xZXhTxbglnuTmZEwqQrE.png';
        el.style.width =  '30px';

    const marker = new Marker({
      element: el,
    }).setLnglat([ 113.30097198486328, 23.398668808995247]);

    const html = ""+
                  "<label class='title'>白云机场</label> " +
                  "<img class='img' src='http://suo.im/66kMEP'> " +
                  "<ul> " +
                    "<li>机场IATA代码:PKX</li> " +
                    "<li>机场ICAO代码:ZBAD</li> " +
                  "</ul> " +
                +"";

    const popup = new Popup({
      offsets: [ 0, 0 ],
      closeButton: false,
      closeOnClick: true,
      className: 'pop'
    })
    .setLnglat([113.30294609, 23.38614342  ])
    .setHTML(html);
    marker.setPopup(popup);

    marker.on('click', e => {
      marker.openPopup();
    });


    // 圆形涟漪
    const circle_layer = new PointLayer()
          .color("#F0B100")
          .source(json)
          .size(30.0)
          .shape('circle')
          .animate(true);

    // 文本描述
    const txt_layer = new PointLayer()
          .color("#F0B100")
          .source(json)
          .size(12)
          .shape('name', 'text')
          .style({
            textAnchor: 'bottom',
            spacing: 2,
            textOffset : [0 , -40]
          });

    scene.addLayer(circle_layer);
    scene.addLayer(txt_layer)
    scene.addMarker(marker);

  }

  // 渲染飞线
  renderFly() {
    const layer = new LineLayer({
      blend: 'normal',
      pickingBuffer: 10
    })
      .source(lineData)
      .size(1)
      .shape('arc')
      .animate({
        enable: true,
        interval: 0.05,
        trailLength: 0.5,
        duration: 2
      })
      .color('#8C1EB2')
      .style({
        opacity: 0.8
      });

    console.info(layer)
    // 线路悬停提示
    layer.on('mousemove', e => {
      const popup = new Popup({
        offsets: [ 0, 0 ],
        closeButton: false
      })
        .setLnglat(e.lngLat)
        .setHTML(`<span>航班号: DZ1680</span>`);
      scene.addPopup(popup);
    });
    scene.addLayer(layer);
  }

  linePath() {

    // 已飞路径
    const layer = new LineLayer({
      blend: 'normal'
    })
      .source(path)
      .size(1)
      .shape('line')
      .color('#8C1EB2')
      .style({
        lineType: 'solid',
        opacity: 0.8
      });

    // 线路悬停提示
    layer.on('mousemove', e => {
      const popup = new Popup({
        offsets: [ 0, 0 ],
        closeButton: false
      })
        .setLnglat(e.lngLat)
        .setHTML(`<span>航班号: DZ1680</span>`);
      scene.addPopup(popup);
    });
    scene.addLayer(layer);


    // 飞机
    var el = document.createElement('div');
        el.innerHTML = "<img src='" + plane + "' class='plane' style='transform: rotate(220deg)'/>"

    const marker = new Marker({
      element: el,
      anchor: 'center'
    }).setLnglat([109.40185546874999, 24.327076540018634]);

    scene.addMarker(marker);

    const layer2 = new LineLayer({
      blend: 'normal'
    })
      .source(path2)
      .size(1)
      .shape('line')
      .color('#8C1EB2')
      .style({
        lineType: 'dash',
        opacity: 0.8
      });
    scene.addLayer(layer2);
  }

  render() {
    return (
      <>
        <div id="map"></div>
        <Airport/>
        <Flight/>
      </>
    );
  }
}
