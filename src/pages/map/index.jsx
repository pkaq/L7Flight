import React from 'react';
import {
  Scene,
  Popup,
  PointLayer,
  Zoom,
  Scale,
  LineLayer,
  Marker,
  MarkerLayer,
} from '@antv/l7';
import { GaodeMap } from '@antv/l7-maps';
import { getPointData, getFlightLine } from './geoUtil';

import Airport from '../drawer/airport';
import Flight from '../drawer/flight';

import plane from '@/assets/plane.svg';

import './index.css';

let scene = null;
const cities = [
  {
    code: 'GZ',
    name: '广州',
    flight: 'AQ1086',
    lngLat: [113.30097198486328, 23.398668808995247],
  },
  {
    code: 'GY',
    name: '贵阳',
    flight: 'AQ1102',
    lngLat: [106.79852485656738, 26.544846039717957],
  },
  {
    code: 'WZ',
    name: '温州',
    flight: 'AQ1033',
    lngLat: [120.809685, 27.916168],
  },
  {
    code: 'WX',
    name: '无锡',
    flight: 'AQ1045',
    lngLat: [120.434631, 31.496624],
  },
  {
    code: 'XA',
    name: '西安',
    flight: 'AQ1056',
    lngLat: [108.762383, 34.437202],
  },
  {
    code: 'ZZ',
    name: '郑州',
    flight: 'AQ1078',
    lngLat: [113.779335, 34.758976],
  },
  {
    code: 'NJ',
    name: '南京',
    flight: 'AQ1081',
    lngLat: [118.87114, 31.731449],
  },
];

// geojson 坐标
const json = getPointData(cities);

// 飞线坐标
const lineData = getFlightLine(cities);

// 实线路径坐标
const path = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'LineString',
        coordinates: [
          [113.30097198486328, 23.398668808995247],
          [112.65380859375, 24.43714786161562],
          [111.28051757812499, 24.78673454198888],
          [109.40185546874999, 24.327076540018634],
        ],
      },
    },
  ],
};

// 虚线路径
const path2 = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'LineString',
        coordinates: [
          [109.40185546874999, 24.327076540018634],
          [106.79852485656738, 26.544846039717957],
        ],
      },
    },
  ],
};

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      airport: false,
      flight: false,
      airport_code: '',
      flight_num: '',
    };
  }

  // 初始化地图场景
  componentDidMount() {
    scene = new Scene({
      id: 'map',
      map: new GaodeMap({
        pitch: 0,
        style: 'dark',
        // 设置地图中心
        center: [113.30294609, 23.38614342],
        zoom: 5,
      }),
    });
    scene.on('loaded', () => {
      this.init();
      this.renderMarker();
      this.renderFly();
      this.linePath();
    });
  }
  // 地图初始化配置
  init() {
    // 地图控制
    const zoomControl = new Zoom();
    zoomControl.setPosition('topright');

    const scaleControl = new Scale();
    scaleControl.setPosition('bottomright');

    scene.addControl(zoomControl);
    scene.addControl(scaleControl);
  }
  // 渲染标注点
  renderMarker() {
    const markerLayer = new MarkerLayer();
    cities.forEach(item => {
      const marker = new Marker().setLnglat(item.lngLat);

      marker.on('click', e => {
        this.setState({
          airport: true,
          airport_code: item.code,
        });
      });
      markerLayer.addMarker(marker);
    });

    // 圆形涟漪
    const circle_layer = new PointLayer()
      .color('#F0B100')
      .source(json)
      .size(30.0)
      .shape('circle')
      .animate(true);

    // 文本描述
    const txt_layer = new PointLayer()
      .color('#F0B100')
      .source(json)
      .size(12)
      .shape('name', 'text')
      .style({
        textAnchor: 'bottom',
        spacing: 2,
        textOffset: [0, -40],
      });

    scene.addLayer(circle_layer);
    scene.addLayer(txt_layer);
    scene.addMarkerLayer(markerLayer);
  }

  // 渲染飞线
  renderFly() {
    const layer = new LineLayer({
      blend: 'normal',
      pickingBuffer: 10,
    })
      .source(lineData)
      .size(2)
      .shape('arc')
      .animate({
        enable: true,
        interval: 0.05,
        trailLength: 1,
        duration: 1,
      })
      .color('#8C1EB2')
      .style({
        opacity: 1,
      });

    // 线路悬停提示
    const popup = new Popup({
      offsets: [0, 0],
      closeButton: false,
    });

    scene.addPopup(popup);

    layer.on('click', e => {
      const flight_num = e.feature.properties.flight;
      this.setState({
        flight: true,
        flight_num,
      });
    });

    layer.on('mousemove', e => {
      const flight_num = e.feature.properties.flight;
      popup.setLnglat(e.lngLat).setHTML(`<span>航班号: ${flight_num}</span>`);

      popup.open();
    });
    layer.on('mouseout', e => {
      popup.close();
    });

    scene.addLayer(layer);
  }

  linePath() {
    // 已飞路径
    const layer = new LineLayer({
      blend: 'normal',
    })
      .source(path)
      .size(1)
      .shape('line')
      .color('#2492D9')
      .style({
        lineType: 'solid',
        opacity: 0.8,
      });

    // 线路悬停提示
    layer.on('mousemove', e => {
      const popup = new Popup({
        offsets: [0, 0],
        className: 'pop',
        closeButton: false,
      })
        .setLnglat(e.lngLat)
        .setHTML(`<span>航班号: DZ1680</span>`);
      scene.addPopup(popup);
    });
    scene.addLayer(layer);

    // 飞机
    var el = document.createElement('div');
    el.innerHTML =
      "<img src='" +
      plane +
      "' class='plane' style='transform: rotate(220deg)'/>";

    const marker = new Marker({
      element: el,
      anchor: 'center',
    }).setLnglat([109.40185546874999, 24.327076540018634]);

    scene.addMarker(marker);

    const layer2 = new LineLayer({
      blend: 'normal',
    })
      .source(path2)
      .size(1)
      .shape('line')
      .color('#8C1EB2')
      .style({
        lineType: 'dash',
        opacity: 0.8,
      });
    scene.addLayer(layer2);
  }

  // 关闭机场面板
  handleCloseAirport() {
    this.setState({
      airport: false,
      airport_code: '',
    });
  }

  // 关闭航班面板
  handleCloseFlight() {
    this.setState({
      flight: false,
      flight_num: '',
    });
  }

  render() {
    const { airport, flight, airport_code, flight_num } = this.state;

    const airport_porps = {
      airport,
      airport_code,
      handleClose: () => this.handleCloseAirport(),
    };

    const flight_porps = {
      flight,
      flight_num,
      handleClose: () => this.handleCloseFlight(),
    };
    return (
      <>
        <div id="map" className="map"></div>
        {airport && <Airport {...airport_porps} />}
        {flight && <Flight {...flight_porps} />}
      </>
    );
  }
}
