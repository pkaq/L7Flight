import React from 'react';
import mapboxgl  from 'mapbox-gl';
import { lineDistance, along, bezierSpline, greatCircle, lineString, point, bearing } from '@turf/turf';

import css from './index.less';

let map = null;

let counter = 0;

const point_svg = "https://gw.alipayobjects.com/zos/rmsportal/xZXhTxbglnuTmZEwqQrE.png";

const steps = 200;

const json = {
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {
        "name": "广州",
        "icon": "bar"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          113.30097198486328,
          23.398668808995247
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "name": "贵阳",
        "icon": "bar"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          106.79852485656738,
          26.544846039717957
        ]
      }
    }
  ]
}

const flight = {
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {
        "name": "广州",
        "icon": "bar"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          113.30097198486328,
          23.398668808995247
        ]
      }
    }
  ]
}

// 飞线坐标
const lineData = {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "type": "LineString",
        "coordinates": [[ 113.30097198486328, 23.398668808995247],
                        [ 106.79852485656738, 26.544846039717957]]
      }
}

export default class Mapbox extends React.Component {

  componentDidMount() {
    mapboxgl.accessToken = 'pk.eyJ1IjoicGthcSIsImEiOiJja2RoMmpneXgybm9xMnFwbWI1NXVnY2xvIn0.QQgKhTIMZRPGN4kwzVCfUA';

    map = new mapboxgl.Map({
      container: 'map',
      center: [113.30294609, 23.38614342],
      zoom: 6,
      style: "mapbox://styles/pkaq/ckdh4iwkz0d6t1jmuu3gj8531"
    })

    map.addControl(new mapboxgl.NavigationControl());

    map.on('load', () => {
      map.addSource('city', {
        'type': 'geojson',
        'data': json
      });

      map.addSource("route", {
        'type': 'geojson',
        'data': lineData
      })

      // 自定义标记点
      const marker = new mapboxgl.Marker()
            .setLngLat([113.30294609, 23.38614342])
            .addTo(map);

      var scale = new mapboxgl.ScaleControl({
        maxWidth: 80,
        unit: 'imperial'
        });
      map.addControl(scale);

      // 涟漪标记
      let el = document.createElement('div');
          el.className = css.waves;
         new mapboxgl.Marker({
                element: el,
                anchor: "top",
                offset: [-0.2, 1.8]
              })
             .setLngLat([113.30294609, 23.38614342])
             .addTo(map);

      // 贝塞尔
      // const start =[ 113.30097198486328, 23.398668808995247];
      const end = [ 106.79852485656738, 26.544846039717957];

      // const bezier = bezierSpline(lineString([ start, end ]), {
      //   resolution: 3000
      // });
      //bezier.geometry.coordinates.push(end);

      let _lineDistance = lineDistance(lineData, { units: 'kilometers' });

      let arc = [];

      for (var i = 0; i < _lineDistance; i += _lineDistance / steps) {
        let segment = along(lineData, i, { units: 'kilometers' });
        arc.push(segment.geometry.coordinates);
      }
      arc.push(end);

      lineData.geometry.coordinates = arc;

      map.addSource("bezier", {
        'type': 'geojson',
        'data': lineData
      })

      // 画线
      map.addLayer({
        'id': 'bezier',
        'type': 'line',
        'source': 'bezier',
        'layout': {
          'line-join': 'round',
          'line-cap': 'round'
        },
        'paint': {
          'line-color': '#2F60C6',
          'line-dasharray': [5, 3],
          'line-width': 1
        }
      });

      map.addLayer({
        'id': 'bezier-width',
        'type': 'line',
        'source': 'bezier',
        'layout': {
          'line-join': 'round',
          'line-cap': 'round'
        },
        'paint': {
          'line-opacity': 0,
          'line-width': 10
        }
      });

      const popup = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false
      })

      map.on('click', 'bezier-width',(e) =>  {
        popup .setLngLat(e.lngLat)
              .setHTML("description")
              .addTo(map)
      });

      // 出发地飞机
      map.addSource("flight", {
        'type': 'geojson',
        'data': flight
      })

      map.addLayer({
        'id': 'flight',
        'source': 'flight',
        'type': 'symbol',
        'layout': {
          'icon-image': 'airport-15',
          'icon-rotate': ['get', 'bearing'],
          'icon-rotation-alignment': 'map',
          'icon-allow-overlap': true,
          'icon-ignore-placement': true
        }
      });

      this.animate_line('bezier');
      this.animate_flight(flight, lineData)
    })

  }

  // 让飞机飞起来
  animate_flight = (flight, path) => {

    flight.features[0].geometry.coordinates = path.geometry.coordinates[counter];

    flight.features[0].properties.bearing = bearing(
      point( path.geometry.coordinates[ counter >= steps ? counter - 1 : counter ]),
      point( path.geometry.coordinates[ counter >= steps ? counter : counter + 1 ])
    );

    map.getSource('flight').setData(flight);

    if (counter < steps) {
    } else {
      counter = 0 ;
    }

    requestAnimationFrame(() => this.animate_flight(flight, path));

    counter++;
  }

  // 让线动起来
  animate_line = (layerId) => {
      let step = 0;
      let dashArraySeq = [
        [0, 4, 3],
        [1, 4, 2],
        [2, 4, 1],
        [3, 4, 0],
        [0, 1, 3, 3],
        [0, 2, 3, 2],
        [0, 3, 3, 1]
      ];
      setInterval(() => {
        step = (step + 1) % dashArraySeq.length;
        map.setPaintProperty(layerId, 'line-dasharray', dashArraySeq[step]);
      }, 30);
  }

  render() {
    return (
      <div id="map" className={css.wrapper}></div>
    )
  }
}
