import React from 'react';
import { Table, Pagination } from 'antd';
import debounce from 'lodash/debounce';
import PanelView from './PanelCtrl';
import { getMenu, addEvent, removeEvent, ContentTip } from './common';

import './style.less';

const empty = () => { };

function getPagination(page) {
  const { current = 1, pageSize = 50, total = 0, onChange = empty, setSize = empty, sizeList = ['50', '100', '200'], showQuickJumper = true, showTotal = true, showSizeChanger = true } = page;
  return (
    <Pagination
      showSizeChanger={showSizeChanger}
      showQuickJumper={showQuickJumper}
      size="small"
      style={{ float: 'right' }}
      current={current}
      pageSize={pageSize}
      total={total}
      onChange={onChange}
      onShowSizeChange={setSize}
      pageSizeOptions={sizeList}
      showTotal={() => showTotal ? `显示 ${Math.min((current - 1) * pageSize + 1, total)} 到 ${Math.min(total, current * pageSize)}, 共 ${total} 记录 ` : ''}
    />
  );
}

function getTable(table, y, prop) {
  const { rowKey = 'gid', width = false, widthModel = false, source = [], columns = [], props = {} } = table;
  const data = {
    rowKey,
    size: 'small',
    bordered: true,
    pagination: false,
    scroll: { x: source.length > 0 || widthModel ? width : false, y },
    // className: 'table-self-def',
    ...props,
    columns,
    dataSource: source,
  };
  return columns.length > 0 ? <Table {...data} /> : <ContentTip msg="正在初始化" />;
}

export default class Control extends React.Component {
  state = { y: false, show: false, left: 0, top: 0 }
  componentDidMount() {
    const $target = this.refTable;
    this.needResize = () => {
      const { scrollHeight, clientHeight } = $target;
      return scrollHeight >= clientHeight
    };
    const resize = () => {
      if (this.needResize()) this.setState({ y: $target.offsetHeight - Number(($target.querySelector('.ant-table-thead') || {}).offsetHeight) });
      else this.setState({ y: false });
    };
    this.resize = debounce(resize, 100);
    addEvent(window, 'resize', this.resize);
    const { menus = {} } = this.props;
    const { menuState = false } = menus; // model ? 1 = 自己带有菜单 ：2 = 需要获取
    if (menuState) {
      this.handleClick = () => { if (this.state.show) this.setState({ show: false }); };
      addEvent(document, 'click', this.handleClick);
    }
    document.oncontextmenu = () => false;
    if (this.needResize()) { this.resize() }
  }
  componentDidUpdate() {
    if (this.needResize()) { this.resize() }
  }
  componentWillUnmount() {
    removeEvent(window, 'resize', this.resize);
    if (this.handleClick) removeEvent(document, 'click', this.handleClick);
  }
  render() {
    const { y, show, left, top } = this.state;
    const { loading, loadmsg = '正在加载中', page, table, menus = {} } = this.props;
    const { menuState, action, getMenus } = menus;
    const data = { ...table };
    if (menuState) {
      data.props = {
        ...data.props,
        onRow: (record) => ({
          onContextMenu: (e) => {
            const { clientX, clientY } = e;
            this.target = record;
            this.setState({ show: true, left: clientX, top: clientY + 8 });
            if (typeof (getMenus) === 'function') getMenus(record);
          }
        })
      };
    }

    return (
      <PanelView loading={loading} loadmsg={loadmsg} footer={(page && <div className="table-page" >{getPagination(page)}</div>) || null}>
        <div ref={c => { this.refTable = c }} className="table-content">
          {getTable(data, y,this.props)}
          {show && getMenu(menus.menuItems, this.target, left, top, action)}
        </div>
      </PanelView>
    );
  }
}
