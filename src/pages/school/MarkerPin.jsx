const MarkerPinImg = {
  green:
    'https://gw.alipayobjects.com/mdn/rms_855bab/afts/img/A*JhBbT4LvHpQAAAAAAAAAAAAAARQnAQ',
  blue:
    'https://gw.alipayobjects.com/mdn/rms_855bab/afts/img/A*n6cXTb8R7iUAAAAAAAAAAAAAARQnAQ',
};

const MarkerInfo = ({ title }) => {
  return (
    <div className="markerContent">
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          height: '32px',
          padding: '0.05rem',
          background: '#1677ff',
          borderRadius: '44px',
        }}
      >
        <div
          style={{
            color: '#fff',
            fontSize: '12px',
          }}
        >
          {title}
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <img
          style={{
            width: '20px',
            height: '30px',
          }}
          alt="marker"
          src={MarkerPinImg.blue}
        />
      </div>
    </div>
  );
};
export default MarkerInfo;
