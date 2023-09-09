import React from 'react';
import { Input, Select, DatePicker, Button } from 'antd';
import styles from './index.module.less';
import moment from 'moment';
const Option = Select.Option;
const { RangePicker } = DatePicker;
class SearchCtrl extends React.PureComponent {
  state = {
    visible:false,
  }
  
  getComponent = () => {
    const { component = '', ...restProps } = this.props;
    switch (component) {
      case 'input': return getInput(restProps);
      case 'select': return getSelect(restProps);
      case 'period': return getPeriod(restProps, this);
      case 'status': return getStatus(restProps);
      case 'btns': return getBtnGroup(restProps);
      case 'mutiSelect': return getMutiSelect(restProps);
      default: console.warn(`不存的组件类型->${component}！！！`); return '';
    }
  }

  render() {
    return this.getComponent();
  }
}

/**
 * 获取标题
 * @param {标题} title 
 */
const getTitle = (title) => (<span>{title}:</span>);



/**
 * 获取Antd的Input输入框组件
 * @param {标题} title 
 * @param {参数} props 
 */
const getInput = ({ title, ...props }) => {
  const { style={ width:200} } = props;
  return <div className={styles.inputSearch}>
    {getTitle(title)}
    <Input {...props} style={style} />
  </div>
}

/**
 * 
 * @param {标题} title 
 * @param {参数} props 
 */
const getSelect = ({ title, ...props }) => {
  const { option = [],style={width:200}, ...restProps } = props;
  return <div className={styles.selectSearch}>
    {getTitle(title)}
    <Select {...restProps} style={style}>
      {option.map(item => (<Option key={item.value} value={item.value}>{item.name}</Option>))}
    </Select>
  </div>
}

const getMutiSelect = ({ title, ...props }) => {
  const { option = [], style = { width: 200 }, ...restProps } = props;
  return <div className={styles.selectSearch}>
    <Select {...restProps} style={style}>
      {option.map(item => (<Option key={item.value} value={item.value}>{item.name}</Option>))}
    </Select>
  </div>
}

//时间段
const period = {
  all: ['',''],
  yesterday: [`${moment().subtract(1, 'days').format('YYYY-MM-DD')} 00:00:00`, `${moment().subtract(1, 'days').format('YYYY-MM-DD')} 23:59:59`], //昨天
  today: [`${moment().format('YYYY-MM-DD')} 00:00:00`, `${moment().format('YYYY-MM-DD')} 23:59:59`],  //今天
  tomorrow: [`${moment().add(1, 'days').format('YYYY-MM-DD')} 00:00:00`, `${moment().add(1, 'days').format('YYYY-MM-DD')} 23:59:59`], //明天
  lastweek: [`${moment().add(-1, 'week').day(1).format('YYYY-MM-DD')} 00:00:00`, `${moment().add(-1, 'week').day(7).format('YYYY-MM-DD')} 23:59:59`], //上周
  thisweek: [`${moment().day(1).format('YYYY-MM-DD')} 00:00:00`, `${moment().day(7).format('YYYY-MM-DD')} 23:59:59`], //本周
  nextweek: [`${moment().add(1, 'week').day(1).format('YYYY-MM-DD')} 00:00:00`, `${moment().add(1, 'week').day(7).format('YYYY-MM-DD')} 23:59:59`], //下周
  lastmonth: [`${moment().add(-1, 'month').startOf('month').format('YYYY-MM-DD')} 00:00:00`, `${moment().add(-1, 'month').endOf('month').format('YYYY-MM-DD')} 23:59:59`], //上月
  thismonth: [`${moment().startOf('month').format('YYYY-MM-DD')} 00:00:00`, `${moment().endOf('month').format('YYYY-MM-DD')} 23:59:59`], //本月
  nextmonth: [`${moment().add(1, 'month').startOf('month').format('YYYY-MM-DD')} 00:00:00`, `${moment().add(1, 'month').endOf('month').format('YYYY-MM-DD')} 23:59:59`], //下月
  thisyear: [`${moment().startOf('year').format('YYYY-MM-DD')} 00:00:00`, `${moment().endOf('year').format('YYYY-MM-DD')} 23:59:59`], //本年
}
const getPeriod = ({ title = "", ...props }, that) => {
  const { visible } = that.state;
  const { showDot = true, onClick = () => { }, option = [], value, isDIY = false } = props;
  const getDot = (name) => (value===name?<div className={styles.dot} ></div>:<div className={styles.noDot} ></div>);
  
  const div = option.map(item => (<div className={styles.periodItem} key={item.value} onClick={() => { that.setState({ visible: false }); onClick(item.value, period[item.value] ? period[item.value] : period['today'])}}>
    {showDot?getDot(item.value):null}
    <span style={{ color:value===item.value?'#1890FF':'#595959' }} >{item.name}</span>
  </div>))
  div.push(
    <div key='diy' style={{ display: isDIY ? 'inline-block' : 'none' }} >
        {showDot?getDot('diy'):null}
        <span style={{ color: value === 'diy' ? '#1890FF' : '#595959',cursor:'pointer' }}  onClick={() => that.setState({ visible: !visible })} >自定义</span>
        <RangePicker style={{width:250,marginLeft:5, display: visible? 'inline-block':'none'}} onChange={(dates, dateStrings) => onClick('diy', [`${dateStrings[0]} 00:00:00`,`${dateStrings[1]} 23:59:59`])} />
      </div>
  )
  return <div className={styles.period}>{getTitle(title)}{div}</div>;
}

const getStatus = ({ title, ...props }) => {
  const { showDot = true, onClick = () => { }, option = [], value } = props;
  const getDot = (name) => (value===name?<div className={styles.dot} ></div>:<div className={styles.noDot} ></div>);
  const getCount = count => (`(${count})`);
  const div = option.map(item => (<div key={item.value} className={styles.periodItem} onClick={() => onClick(item.value)}>
  {showDot?getDot(item.value):null}
    <span style={{ color: value === item.value ? '#1890FF' : '#595959' }} >{item.name}{item.count ? getCount(item.count) : null}</span>
  </div>))
  return <div className={styles.period}>{getTitle(title)}{div}</div>;
}

const getBtnGroup = ({option=[]}) => {
  return <div className={styles.btns}>{option.map(({ title = '', ...restProps }) => (<Button {...restProps}>{title}</Button>))}</div>
}

SearchCtrl.Period = period;
export default SearchCtrl;