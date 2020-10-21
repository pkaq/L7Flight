import React from 'react';
import close from '@/assets/close.svg';
import drawerstyle from './airport.less';
import Iconfont from '@/components/Iconfont/index.jsx';

export default props => {
  const { handleClose } = props;

  return (
    <div className={drawerstyle.drawer}>
      {/* 标题 */}
      <div className={drawerstyle.title}>
        <label>机场名称</label>
        <img
          src={close}
          className={drawerstyle.close}
          onClick={() => handleClose()}
        />
      </div>
      {/* 三字码 */}
      <div>
        <label className={drawerstyle.airport_code}>
          FOC
          <label className={drawerstyle.divider}>/</label>
          ZSFZ
        </label>
        <label className={drawerstyle.airport_status}>正常</label>
      </div>
      {/* 天气 */}
      <div className={drawerstyle.weather_wrapper}>
        <div
          className={drawerstyle.desc}
          title="温度: 28℃ , 天气: 少云 , 能见度: 9999m , 云高: 780米 , 风向: 西南风 , 风力: 4级 , 风速: 7m/s"
        >
          温度: 28℃ , 天气: 少云 , 能见度: 9999m , 云高: 780米 , 风向: 西南风 ,
          风力: 4级 , 风速: 7m/s
        </div>
        <div className={drawerstyle.icon}>
          <div className={drawerstyle.weather}>
            <label>现在</label>
            <div>
              <Iconfont type="icon-leidian" />
            </div>
            <label>13℃</label>
          </div>

          <div className={drawerstyle.weather}>
            <label>14:00</label>
            <div>
              <Iconfont type="icon-leidian" />
            </div>
            <label>13℃</label>
          </div>

          <div className={drawerstyle.weather}>
            <label>13:00</label>
            <div>
              <Iconfont type="icon-leidian" />
            </div>
            <label>13.5℃</label>
          </div>

          <div className={drawerstyle.weather}>
            <label>12:00</label>
            <div>
              <Iconfont type="icon-ziyuan" />
            </div>
            <label>15℃</label>
          </div>

          <div className={drawerstyle.weather}>
            <label>11:00</label>
            <div>
              <Iconfont type="icon-ziyuan" />
            </div>
            <label>15℃</label>
          </div>
        </div>
      </div>
      {/* 机场动态 */}
      <div className={drawerstyle.airport_info}>
        <div className={drawerstyle.head}>
          <div className={drawerstyle.title}>机场动态</div>
          <div className={drawerstyle.switch}>
            <div className={drawerstyle.active}>进港</div>
            <div>出港</div>
          </div>
        </div>
      </div>
      {/* 状态切换 */}
      <div className={drawerstyle.tab}>
        <div className={drawerstyle.active}>全部</div>
        <div>延误</div>
        <div>取消</div>
        <div>返航</div>
        <div>已起飞</div>
      </div>

      {/* 表格 */}
      <table
        className={drawerstyle.table}
        cellSpacing="0"
        cellPadding="0"
        border="0"
      >
        <thead>
          <tr>
            <th>航班号</th>
            <th>到达地</th>
            <th>计划起飞</th>
            <th>计划到达</th>
            <th>状态</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>MU5866</td>
            <td>昆明</td>
            <td>23:50</td>
            <td>
              1:50
              <label>+1</label>
            </td>
            <td>计划</td>
          </tr>
          <tr>
            <td>CZ9501</td>
            <td>昆明</td>
            <td>22:50</td>
            <td>
              00:50
              <label>+1</label>
            </td>
            <td>计划</td>
          </tr>
          <tr>
            <td>MU9718</td>
            <td>昆明</td>
            <td>21:10</td>
            <td>22:50</td>
            <td>计划</td>
          </tr>
          <tr>
            <td>DZ9216</td>
            <td>北京</td>
            <td>20:50</td>
            <td>22:35</td>
            <td>计划</td>
          </tr>

          <tr>
            <td>CZ8810</td>
            <td>上海</td>
            <td>18:20</td>
            <td>19:50</td>
            <td>计划</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
