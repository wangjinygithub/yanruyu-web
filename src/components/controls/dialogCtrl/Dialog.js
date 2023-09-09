import React from 'react';
import ReactDOM from 'react-dom';
import { Modal, Spin, Icon } from 'antd';
import Drag from './Drag';

import '../style.less';

const extendObj = (obj1, obj2) => Object.assign(Object.assign({}, obj1), obj2);

const getClass = (className = '') => className.split(' ').filter(x => x);

const addClass = (source, target) => getClass(source).concat(getClass(target)).join(' ');

const delClass = (source, target) => { const dels = getClass(target); return getClass(source).filter(x => !dels.some(y => x === y)).join(' ') };

const appClass = (source, target) => addClass(delClass(source, target), target);

const getWrapClassName = (mask, wrapClassName) => (mask === true ? addClass(wrapClassName, "dialog dialog_mask") : addClass(wrapClassName, "dialog"));

const getLocalStyle = (wrapClassName) => delClass(wrapClassName, "vertical_center_modal");

const getCenterStyle = (wrapClassName) => appClass(wrapClassName, "vertical_center_modal");

const getProps = (left, top, modle, props) => {
  const { mask, wrapClassName, style } = props;
  const wrapClass = getWrapClassName(mask, wrapClassName);
  const resilt = { visible: true, mask: false, maskClosable: false, maskStyle: { background: '#00000020' }, ...props, children: '', centered: false, style: extendObj(style, { margin: 0 }) };
  if (!(isNaN(left) || isNaN(top))) Object.assign(resilt, { style: extendObj(resilt.style, { left, top }), wrapClassName: getLocalStyle(wrapClass) });
  else if (props.center === true || props.centered) resilt.wrapClassName = getCenterStyle(wrapClass);
  if (modle) resilt.className = appClass(resilt.className, "dialog_min");
  return resilt;
};

const getModalProps = (target) => {
  const { left, top, modle, minModel } = target.state;
  return Object.assign(getProps(left, top, modle, target.props), getTitle(target, modle, minModel));
};

const getNormalTitle = (target) => <div className="dialog_title" onMouseDown={() => { target.setState({ drag: true }, () => target.drag.startDrag()) }}>{target.props.title}</div>;

const getMinTitle = (target, modle) => {
  const { closable = true } = target.props;
  const style = closable ? { marginRight: '42px' } : { borderRadius: '0 4px 0 0' };
  return (
    <div className="dialog_title_min">
      <div onMouseDown={() => { target.setState({ drag: true }, () => target.drag.startDrag()) }}>
        <div ref={r => { Object.assign(target, { tbody: r }) }}>{target.props.title}</div>
      </div>
      <Icon type={modle === 0 ? 'shrink' : 'arrows-alt'} style={style} onClick={() => target.setState({ modle: (modle + 1) % 2 })} />
    </div>
  );
};

const getMinSize = (target) => {
  const { tbody, props: { width, closable = true }, state: { modle } } = target;
  if (tbody && modle) {
    const func = 'findDOMNode';
    const { scrollWidth: wd } = ReactDOM[func](tbody);
    return { width: wd + 52 * (closable ? 2 : 1), height: 52 };
  } return { width };
};

const getTitle = (target, modle, minModel) => {
  if (minModel) {
    return { title: getMinTitle(target, modle), ...getMinSize(target) };
  } else {
    return { title: getNormalTitle(target) };
  }
};

export default class Dialog extends React.Component {
  state = { drag: false, modle: 0, minModel: false }
  UNSAFE_componentWillMount() {
    const { left, top, minModel = false, mask, min = false } = this.props; // 在模态下 最小化无效
    Object.assign(this.state, { left: Number(left), top: Number(top), modle: min?1:0, minModel: mask ? false : minModel });
  }
  componentWillReceiveProps(nextProps){
    this.setState({ modle: nextProps.min?1:0 });
  }
  render() {
    const { drag } = this.state;
    const { children, loading, loadmsg = '正在加载...' } = this.props;
    return (
      <div>
        <Modal ref={r => { this.dialog = r }} {...getModalProps(this)}>
          <div className="dialog_body">{children}</div> 
          {loading && <div className="dialog_loading"><div><Spin size="large" spinning tip={loadmsg} /></div></div>}
          {drag && <Drag ref={r => { this.drag = r }} target={this.dialog} onDraged={(e) => { this.setState({ ...e, drag: false }) }} />}
        </Modal>
      </div>
    );
  }
}

