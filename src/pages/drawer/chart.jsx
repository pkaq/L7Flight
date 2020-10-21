import React from 'react';
import {
  G2,
  Chart,
  Geom,
  Axis,
  Tooltip,
  Coord,
  Label,
  Legend,
  View,
  Guide,
  Shape,
  Facet,
  Util,
  LineAdvance,
} from 'bizcharts';

const { Line } = Guide;

const data = [
  { dates: '00:39', first: 8647 },
  { dates: '01:53', first: 8647 },
  { dates: '13:57', first: 8156 },
  { dates: '19:40', first: 8166 },
  { dates: '20:59', first: 8956 },
  { dates: '16:28', first: 8571 },
  { dates: '18:06', first: 8771 },
];

/**
1. 这里使用的是原始数据, 所以是 dates * first, 而格式化后的应该是 dates * value 把所有的 first 换成 value
2. colors: 自己可定义, 看是否可以使用对象(以方便日后指定关键词的颜色对应)
3. 上边数据中注释掉的是超出了 keywordTrend最小值和最大值范围之外的数据, 导致线太长出去了
*/

const colors = ['#1890ff', '#2fc25b'];

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
    const cols = {
      dates: {
        range: [0, 1],
        type: 'timeCat',
      },
      first: {
        min: 0, // 这里要设置一个最小值, 否则可能图表中按照了 keywordTrend 中的最小值设置Y轴最小值
      },
    };

    return (
      <Chart data={data} scale={cols} autoFit>
        {/* 图例 */}
        <Legend />
        {/* 座标轴 */}
        <Axis name="dates" {...axisConfig} />

        <LineAdvance
          point={{ size: 3 }}
          area
          shape="smooth"
          position="dates*first"
          size={1}
          label="dates"
        />

        <Guide>
          <Line
            top
            start={0}
            end={10000}
            lineStyle={{
              lineWidth: 2,
              stroke: '#1890ff',
            }}
          />
        </Guide>
      </Chart>
    );
  }
}
