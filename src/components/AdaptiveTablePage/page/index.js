import React, { PureComponent } from 'react';
import { Table } from 'antd';
import debounce from 'lodash/debounce';
import './index.css'

export default class index extends PureComponent {

  constructor(props) {
    super(props)

    this.state = {
      bodyHeight: 0,
      scrollY: true,
    }
  }

  componentDidMount() {
    this.resizeWind();
  }

  componentDidUpdate() {
    if (this.needResize && this.needResize()) { this.resize(); }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize);
  }

  resizeWind = () => {
    const { scrollY = true, showHeader = true, } = this.props;
    if (!scrollY) {
      return this.setState({ scrollY: false, bodyHeight: 'auto' });
    }
    this.needResize = () => { const { scrollHeight, clientHeight } = this.pageBody; return scrollHeight > clientHeight || clientHeight <= 0; };
    const resize = () => {
      const bodyHeight = this.parentCcontr.offsetHeight - this.pageHead.offsetHeight - this.pageFoot.offsetHeight;
      if (this.needResize()) this.setState({ bodyHeight, scrollY: showHeader ? bodyHeight - this.pageBody.querySelector('.ant-table-thead').offsetHeight - 5 : this.pageBody.offsetHeight });
      else this.setState({ scrollY: false });
    };
    this.resize = debounce(resize, 100);
    window.addEventListener('resize', this.resize);
    if (this.needResize()) { this.resize(); }
  }

  render() {
    const { head, table, foot, isTable=true, style={} } = this.props;
    const {headStyle={}, tableStyle={}, footStyle={}, style: outStyle={} } = style;
    const { bodyHeight, scrollY } = this.state;
    return (
      <div ref={c => { this.parentCcontr = c; }} style={{ display:'flex', flexDirection:'column', background: 'white', height: '100%', width: '100%', padding: '0 10px', overflow: scrollY ? 'hidden' : 'auto', ...outStyle }}>
        <div ref={c => { this.pageHead = c; }} style={{ width: '100%', height: 'auto', padding: head?'10px 0':'0', ...headStyle }}>
          {Array.isArray(head) ? <div style={{ display: 'flex', flexWrap: 'wrap', width: '100%', height: 'auto'}}>
            {head.map(({ style, field }) => (<div style={{ ...style, margin: '5px 10px', display: 'flex', alignItems: 'center' }}>{field}</div>))}
          </div> : head}
        </div>
        <div  ref={c => { this.pageBody = c; }} style={{ width: '100%', overflow: scrollY ? 'hidden' : 'auto', flexGrow:1, ...tableStyle }}>
          {isTable?<Table {...table} scroll={{...(table.scroll||{}), y: scrollY }} />:table}
        </div>
        <div ref={c => { this.pageFoot = c; }} style={{display:'flex', justifyContent:'flex-end', width: '100%', height: 'auto', padding: foot?'10px 0':'0' , ...footStyle}}>
          {foot}
        </div>
      </div>
    );
  }
}
