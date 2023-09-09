import React from 'react';
import {Spin} from 'antd';
import './style.less';

export default class Control extends React.Component {
  // render() {
  //   const {direction = 'row', header, footer, children, size = [100], style = {}, className, loading = false, loadmsg = '正在加载...'} = this.props;
  //   const isFixed = header != null || footer != null;
  //   const content = Array.isArray(children) ? children : (children && [children]) || [];
  //  const getStyle = isFixed ? (i) => ({ flexGrow: (size[i] || 1) }) : (i) => (direction === 'row' ? { height: `${size[i]}%` } : { width: `${size[i]}%` });
  //  return (
  //     <div style={style} className={`panel ${direction === 'row' ? 'panel-row' : 'panel-column'} ${className || ''}`}>
  //       {header}
  //       {content.map((item, i) => <div className="panel-item" key={`${i}`} style={getStyle(i)}><div>{item}</div></div>)}
  //       {footer}
  //       {loading && <div className="spin"><div><Spin size="large" spinning tip={loadmsg} /></div></div>}
  //     </div>
  //   );
  // }
}
