import { Marker, LineLayer, PolygonLayer } from '@antv/l7';

const laolzData = {
  type: 'FeatureCollection',
  features: [
    {
      geometry: {
        coordinates: [
          [
            [117.132731, 36.194565],
            [117.13286, 36.192735],
            [117.134384, 36.192811],
            [117.134124, 36.194575],
            [117.132731, 36.194565],
          ],
        ],
        type: 'Polygon',
      },
      type: 'Feature',
      properties: {
        学校名: '老六中',
        类型: '初中',
      },
    },
  ],
};

const laolzAreaData = {
  type: 'FeatureCollection',
  features: [
    {
      geometry: {
        coordinates: [
          [
            [117.132658, 36.191562],
            [117.119555, 36.190271],
            [117.119211, 36.192739],
            [117.120993, 36.192951],
            [117.124699, 36.196073],
            [117.125955, 36.197086],
            [117.12636, 36.19604],
            [117.128122, 36.196154],
            [117.127717, 36.198116],
            [117.128911, 36.198965],
            [117.13041, 36.199129],
            [117.130552, 36.199292],
            [117.13037, 36.202283],
            [117.128486, 36.206908],
            [117.128567, 36.20918],
            [117.131159, 36.20851],
            [117.131099, 36.207039],
            [117.131585, 36.204686],
            [117.133083, 36.202382],
            [117.133164, 36.202104],
            [117.134501, 36.201646],
            [117.135473, 36.198606],
            [117.135959, 36.19841],
            [117.137276, 36.191938],
            [117.137883, 36.188244],
            [117.132942, 36.187983],
            [117.132719, 36.189519],
            [117.132658, 36.191562],
          ],
        ],
        type: 'Polygon',
      },
      type: 'Feature',
      properties: {
        学校名: '老六中',
        类型: '学区',
      },
    },
  ],
};

const laolz = new PolygonLayer({
  autoFit: true,
})
  .source(laolzData)
  .color('#006d75')
  .style({
    opacity: 0.6,
  });

const el = document.createElement('label');
el.className = 'school_name';
el.textContent = '老六中';
el.style.padding = '5px';
el.style.background = '#fadb14';

const laolzName = new Marker({
  element: el,
}).setLnglat(117.133649, 36.193892);

const laolzArea = new PolygonLayer({
  autoFit: true,
})
  .source(laolzAreaData)
  .color('#87e8de')
  .style({
    opacity: 0.2,
  });

const laolzBorder = new LineLayer().source(laolzAreaData).color('#006d75');

export { laolz, laolzArea, laolzBorder, laolzName };
