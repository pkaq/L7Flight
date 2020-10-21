import React from 'react';
import {
  Chart,
  Axis,
  Tooltip,
  Legend,
  Guide,
  Geom,
  LineAdvance,
} from 'bizcharts';

const { Line } = Guide;

const data = [
  { dates: '00:39', height: 8647 },
  { dates: '01:53', height: 8647 },
  { dates: '13:57', height: 8156 },
  { dates: '19:40', height: 8166 },
  { dates: '20:59', height: 8956 },
  { dates: '16:28', height: 8571 },
  { dates: '18:06', height: 8771 },
];

const axisConfig = {
  label: {
    style: {
      textAlign: 'center',
    }, // 设置坐标轴文本样式
  },
  line: {
    style: {
      stroke: '#ccc',
      lineDash: [3, 3],
    }, // 设置坐标轴线样式
  },
  grid: {
    line: {
      style: {
        stroke: '#ccc',
        lineDash: [3, 3],
      },
    }, // 设置坐标系栅格样式
  },
};

export default class Series extends React.Component {
  render() {
    const scale = {
      height: {
        tickCount: 10,
        min: 0,
        max: 12000,
      },
    };

    return (
      <Chart data={data} autoFit padding={[20, 10, 50, 50]} scale={scale}>
        {/* 图例 */}
        <Legend />
        {/* 座标轴 */}
        <Axis name="dates" {...axisConfig} />

        <Tooltip title="垂直高度" name="高度" />

        <LineAdvance
          point={{ size: 3 }}
          area
          shape="smooth"
          position="dates*height"
          size={1}
        />
      </Chart>
    );
  }
}
