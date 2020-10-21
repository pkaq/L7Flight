import React from 'react';
import close from '@/assets/close.svg';
import css from './flight.less';
import Iconfont from '@/components/Iconfont';
import Chart from './chart.jsx';

export default props => {
  const { handleClose } = props;
  return (
    <>
      <div className={css.flight_info}>
        {/* 航班轨迹条 */}
        <div className={css.process}></div>
        {/* 航班信息窗体 */}
        <div className={css.info_wrapper}>
          {/* 标题 */}
          <div className={css.title}>
            <label>航班动态</label>
            <img
              src={close}
              className={css.close}
              onClick={() => handleClose()}
            />
          </div>

          {/* 主体内容 */}
          <div className={css.body}>
            {/* COL 1 */}
            <div style={{ width: 210 }} className={css.col}>
              <img
                className={css.flight_img}
                src="https://file.veryzhun.com/buckets/wxapp/keys/20180820-164020-4065b7a7e74a6f2b.jpg"
              />
            </div>
            {/* COL 2 */}
            <div style={{ width: 290 }} className={css.col}>
              <div>
                {/* 航司 */}
                <div className={css.title}>
                  <div className={css.left}>
                    <img src="https://static.variflight.com/assets/image/aircorp/zh.png" />
                  </div>
                  {/* 航班号 */}
                  <div className={css.right}>
                    <span className={css.company}>深证航空有限公司</span>
                    <div className={css.flight_no}>
                      ZH9047
                      <span className={css.divider}>/</span>
                      CSZ9047
                    </div>
                  </div>
                </div>
                {/* 航班动态 */}
                <div className={css.detail_wrapper}>
                  <div>
                    <div className={css.code3}>CAN</div>
                    <div className={css.portname}>广州白云</div>
                    <div>计划： 07：35</div>
                    <div>实际： 07：35</div>
                  </div>
                  <div className={css.detail_arrow}>
                    <Iconfont type="icon-Arrowright" />
                  </div>
                  <div>
                    <div className={css.code3}>KWE</div>
                    <div className={css.portname}>贵阳龙洞堡</div>
                    <div>计划： 09：35</div>
                    <div>实际： --</div>
                  </div>
                </div>
              </div>
            </div>
            {/* COL 3 */}
            <div style={{ width: 300 }} className={css.col}>
              <Chart />
            </div>
            {/* COL 4 */}
            <div style={{ width: 400 }} className={css.col}>
              <div style={{ width: '100%' }}>
                <div className={css.row}>
                  <div>
                    <label>飞机注册号</label>
                    <span>B6623</span>
                  </div>

                  <div>
                    <label>所属国家</label>
                    <span>CN</span>
                  </div>

                  <div>
                    <label>机龄</label>
                    <span>10.23年</span>
                  </div>

                  <div>
                    <label>机型</label>
                    <span>AirbusA320-214</span>
                  </div>
                </div>

                <div className={css.row}>
                  <div>
                    <label>经度</label>
                    <span>105.58</span>
                  </div>

                  <div>
                    <label>纬度</label>
                    <span>21.22</span>
                  </div>

                  <div>
                    <label>高度</label>
                    <span>8448.48m</span>
                  </div>

                  <div>
                    <label>油量</label>
                    <span>2.5t</span>
                  </div>
                </div>

                <div className={css.row}>
                  <div>
                    <label>水平速度</label>
                    <span>789.45 km/h</span>
                  </div>

                  <div>
                    <label>垂直速度</label>
                    <span>0 m/s</span>
                  </div>

                  <div>
                    <label>方位角</label>
                    <span>347.255</span>
                  </div>

                  <div>
                    <label>应答机编码</label>
                    <span>0.0</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
