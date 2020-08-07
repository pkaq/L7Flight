import React from 'react';
import close from '@/assets/close.svg';
import drawerstyle from './airport.less';

export default (props) => {

  const { handleClose } = props;

  return (
    <div className={drawerstyle.drawer}>

    {/* 标题 */}
    <div className={drawerstyle.title}>
      <label>机场名称</label>
      <img src={close} className={drawerstyle.close} onClick={ () => handleClose() }/>
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
      <div className={drawerstyle.desc} title="温度: 28℃ , 天气: 少云 , 能见度: 9999m , 云高: 780米 , 风向: 西南风 , 风力: 4级 , 风速: 7m/s">
        温度: 28℃ , 天气: 少云 , 能见度: 9999m , 云高: 780米 , 风向: 西南风 , 风力: 4级 , 风速: 7m/s
      </div>
      <div className={drawerstyle.icon}></div>
    </div>
    {/* 机场动态 */}
    <div className={drawerstyle.airport_info}>
      <div className={drawerstyle.head}>
        <div className={drawerstyle.title}>
          机场动态
        </div>
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
    <table className={drawerstyle.table} cellSpacing="0" cellPadding="0" border="0">
      <thead>
        <tr>
          <th>航班号</th>
          <th>到达地</th>
          <th>计划起飞</th>
          <th>实际起飞</th>
          <th>状态</th>
        </tr>
      </thead>

      <tbody>
        <tr>
          <td>DZ6280</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
      </tbody>
    </table>

  </div>
  )
}
