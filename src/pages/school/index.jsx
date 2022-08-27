import React from 'react';
import {
  Scene,
  PointLayer,
  Zoom,
  Scale,
  Marker,
  MarkerLayer,
  LineLayer,
  PolygonLayer,
} from '@antv/l7';
import cz from './chuzhong';
import gz from './gaozhong';
import schoolArea from './schoolArea';

import { GaodeMap } from '@antv/l7-maps';

let scene = null;

const xx = [
  {
    name: '二中',
    anchor: 'top-left',
    lngLat: [117.142192, 36.202285],
  },
  {
    name: '东岳中学',
    lngLat: [117.149551, 36.197218],
  },
  {
    name: '博文中学',
    anchor: 'bottom-right',
    lngLat: [117.145743, 36.200474],
  },
  {
    name: '老六中',
    lngLat: [117.133649, 36.193892],
  },
  {
    name: '老一中',
    lngLat: [117.126832, 36.194824],
  },
  {
    name: '新一中',
    lngLat: [117.088971, 36.117712],
  },
  {
    name: '新六中',
    lngLat: [117.158135, 36.186469],
  },
  {
    name: '南关中学',
    lngLat: [117.13711, 36.174221],
  },
  {
    name: '迎春中学',
    lngLat: [117.140497, 36.178059],
  },
  {
    name: '长城中学',
    lngLat: [117.078751, 36.177732],
  },
  {
    name: '实验中学',
    lngLat: [117.07424, 36.146423],
  },
  {
    name: '泰山中学',
    lngLat: [117.109401, 36.196701],
  },
  {
    name: '双语学校',
    lngLat: [117.093737, 36.201033],
  },
  {
    name: '学院附中',
    lngLat: [117.095385, 36.199584],
  },
  {
    name: '迎胜',
    lngLat: [117.106928, 36.201449],
  },
  {
    name: '外国语学校',
    lngLat: [117.10715, 36.195818],
  },
];

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
        style: 'light',
        // 设置地图中心
        center: [117.14272, 36.200619],
        zoom: 5,
      }),
    });
    scene.on('loaded', () => {
      this.init();
      this.renderSchool();
      this.renderMarker();
      this.renderCircle();
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

  renderCircle = () => {
    const pointLayer = new PointLayer({})
      .source(cz, {
        parser: {
          type: 'json',
          x: 'longitude',
          y: 'latitude',
        },
      })
      .shape('name', ['circle'])
      .size('unit_price', [10, 25])
      .active(true)
      .color('name', ['#E86452'])
      .style({
        opacity: 0.3,
        strokeWidth: 2,
      });
  };
  renderSchool() {
    // 初中
    const drawCZ = new PolygonLayer({
      autoFit: true,
    })
      .source(cz)
      .color('#c41d7f')
      .style({
        opacity: 0.6,
      });
    scene.addLayer(drawCZ);
    // 高中
    const drawGZ = new PolygonLayer({
      autoFit: true,
    })
      .source(gz)
      .color('#22075e')
      .style({
        opacity: 0.6,
      });
    scene.addLayer(drawGZ);
    // 学区
    const drawArea = new PolygonLayer({
      autoFit: true,
    })
      .source(schoolArea)
      .color('#f4ffb8')
      .style({
        opacity: 0.2,
      });
    const border = new LineLayer().source(schoolArea).color('#7cb305');

    scene.addLayer(drawArea);
    scene.addLayer(border);
  }
  // 渲染标注点
  renderMarker() {
    const markerLayer = new MarkerLayer();

    xx.forEach(item => {
      const el = document.createElement('label');
      el.className = 'school_name';
      el.textContent = item.name;
      el.style.padding = '5px';
      el.style.background = '#fadb14';

      const marker = new Marker({
        element: el,
      }).setLnglat(item.lngLat);

      markerLayer.addMarker(marker);
    });

    scene.addMarkerLayer(markerLayer);
  }

  render() {
    return (
      <>
        <div id="map" className="map"></div>
      </>
    );
  }
}
