import React, { Component } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import { Spin, Table, DatePicker, Input, Select, Button, Pagination, message, Tooltip } from 'antd';
import debounce from 'lodash/debounce';
import requset from '../../utils/request';
import qs from 'qs';
import { getCurrTk, getDefaultStyleFontSize, getTotalWidth } from '../../utils/utils';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import FormRender from '../../components/Form/FormRender';
import { DialogCtrl } from '../../components/controls';
import Page from '../../components/AdaptiveTablePage/page';
import styles from './index.less';


const { RangePicker } = DatePicker;
const { Option } = Select;
const format = 'YYYY-MM-DD';

@connect(({ statistics, login }) => ({
  user: login.user,
}))

export default class DgStatisticsBusiness extends Component {
  state = {
    y: false,
    startTime: null,
    endTime: null,
    addModal: false,
    balanceIsShow: 1,
    search: '',
    cusType: 'member',
    pageNum: 1,
    pageSize: 20,
    total: 0,
    data: [],
  };

  //获取数据
  componentDidMount() {
    this.queryData();

  }

  componentWillUnmount() {
  }


  queryData = (num) => {

    const { startTime, endTime, search, pageNum, pageSize, cusType } = this.state;
    const params = {
      cusType,
      startTime: startTime ? startTime.format(format) + ' 00:00:00': '',
      endTime: endTime ? endTime.format(format) + ' 23:59:59' : '',
      search, pageNum: num ? num : pageNum, pageSize
    };
    requset(`proxy/customer/queryCustomers?${qs.stringify(params)}`).then(({ data, success, msg, total }) => {

      if (success) {
        this.setState({ data, total, pageNum: num ? num : pageNum, });
      } else {
        message.error(msg);
      }

    });
  }

  exportData = () => {
    if (this.state.total > 0) {
      const { treeSelectValue, startTime, endTime, search, pageNum, pageSize } = this.state;
      const params = {
        locCode: treeSelectValue,
        startTime: startTime ? startTime.format(format) : '',
        endTime: endTime ? endTime.format(format) : '',
        search, pageNum, pageSize,
        f: 'excel',
        token: getCurrTk(),
      };
      const url = `${window.location.origin}/proxy/dg/statistics/getDgStatisticsBusinessData?${qs.stringify(params)}`;
      window.open(url, '_parent');
    } else message.warning('暂无数据下载');
  }

  resSet = () => {
    this.setState({ pageNum: 1, pageSize: 20, treeSelectValue: '', search: '', endTime: moment(), startTime: moment() }, () => {
      this.queryData();
    });
  }

  // 表格分页
  pagination = () => {

    const { pageNum, pageSize, total } = this.state;
    const that = this;
    return ({
      total: total,
      current: pageNum,
      pageSize: pageSize,
      showSizeChanger: true,
      showQuickJumper: true,
      onChange(page, pageSize) {
        that.setState({ pageNum: page, pageSize }, () => that.queryData());
      },
      onShowSizeChange(current, pageSize) {
        that.setState({ pageNum: current, pageSize }, () => that.queryData());
      },
      showTotal() { // 设置显示一共几条数据
        return <div>共 {total} 条数据</div>;
      },
    });
  };




  date = () => {
    const { startTime, endTime } = this.state;
    return ({
      value: [startTime ? startTime : '', endTime ? endTime : ''],
      format,
      onChange: (dates, dateStrs) => { this.setState({ startTime: dates[0], endTime: dates[1] }, () => this.queryData(1)) },
    });
  }

  input = () => {
    return {
      allowClear: true,
      value: this.state.search,
      placeholder: '客户姓名,手机号,身份证号',
      onChange: (e) => {
        this.inputChange = debounce(this.setState({ search: e.target.value }, () => {
          this.queryData(1);
        }), 2000);
        this.inputChange();
      }
    }
  }

  table = () => {
    const columns = [
      {
        title: '序号',
        dataIndex: 'xuhao',
        align: 'center',
        //width: '5%',
        width: '100px',
        render: (text, record, index) => {
          return index + 1;
        }
      },
      {
        title: '客户姓名',
        //width: '10%',
        width: '200px',
        align: 'center',
        dataIndex: 'cusName',
      },
      {
        title: '手机号',
        //width: '10%',
        width: '200px',
        align: 'center',
        dataIndex: 'phone',
      },
      {
        title: '身份证号',
        //width: '15%',
        width: '300px',
        align: 'center',
        dataIndex: 'idNumber',
      },
      {
        title: '性别',
        // width: '10%',
        width: '200px',
        align: 'center',
        dataIndex: 'sex',
      },
      {
        title: '年龄',
        // width: '10%',
        width: '200px',
        align: 'center',
        dataIndex: 'age',
      },
      {
        title: '客户类型',
        // width: '10%',
        width: '200px',
        align: 'center',
        dataIndex: 'cusType',
      },
      {
        title: '账户余额',
        // width: '10%',
        width: '200px',
        align: 'center',
        dataIndex: 'account',
      },
      {
        title: '创建时间',
        // width: '10%',
        width: '200px',
        align: 'center',
        dataIndex: 'creatTime',
        render: (text)=>{
          return text&&<div><div>{text.split(' ')[0]}</div>
          <div>{text.split(' ')[1]}</div></div>
        }
      },
      {
        title: '操作',
        // width: '10%',
        width: '200px',
        align: 'center',
        dataIndex: 'oper',
        render: (text, red)=>{
          return <div style={{fontSize:'12px'}}>{!red.isDelete?
          <span><a>消费</a> | <a>编辑</a> | <a onClick={()=>{this.delete(red.gid)}}>删除</a></span>:
          <a onClick={()=>this.delete(red.gid,0)}>恢复</a>}</div>
          
        }
      },
    ] 

    return ({
      columns,
      dataSource: this.state.data,
      bordered: true,
      className: styles['table-self-def'],
      scroll: { y: this.state.y, x: getTotalWidth(columns) },
      pagination: false,
    });
  }
 
  delete = (dId, isDelete=1) =>{
    requset(`proxy/customer/deleteCustomer?dId=${dId}&isDelete=${isDelete}`).then(({success, msg})=>{
      if(success){
        message.success(msg);
        this.queryData();
      }else{
        message.success(msg);
      }
    });
  }

  searchmodal = () => {

    const getAddForm = () => {

      const limitdecs = (value) => {
        return value + ''.replace(/^(0+)|[^\d]+/g, '');
      }
      return (
        {
          formfields: [
            { "name": "cusName", "alias": "客户姓名", "info": 4, "accuracy": 1, "type": "TXT", "defaultvalue": null, "findex": 1, "visible": 1, "edit": 1, "required": 1, "value": "", },
            { "name": "phone", "alias": "手机号", "info": 4, "accuracy": 1, "type": "TXT", "defaultvalue": null, "findex": 1, "visible": 1, "edit": 1, "required": 1, "value": "", },
            { "name": "idNumber", "alias": "身份证号", "info": 4, "accuracy": 1, "type": "TXT", "defaultvalue": null, "findex": 1, "visible": 1, "edit": 1, "required": 0, "value": "", },//
            { "name": "sex", "alias": "性别", "info": 4, "accuracy": 1, "type": "DDL", "defaultvalue": null, "findex": 1, "visible": 1, "edit": 1, "required": 1, "value": "woman", selectValues: [{ name: 'man', alias: '男' }, { name: 'woman', alias: '女' }] },
            { "name": "age", "alias": "年龄", "info": 4, "accuracy": 1, "type": "InputNumber", "defaultvalue": null, "findex": 1, "visible": 1, "edit": 1, "required": 0, "value": "", props: { min: 1, max: 200, parser: limitdecs, formatter: limitdecs } },
            {
              "name": "cusType", "alias": "客户类型:", "info": 4, "accuracy": 1, "type": "DDL", "defaultvalue": null, "findex": 1, "visible": 1, "edit": 1, "required": 1, "value": "member",
              selectValues: [{ name: 'normal', alias: '普通' }, { name: 'member', alias: '会员' }], props: { onChange: (value) => { this.setState({ balanceIsShow: 'member' === value ? 1 : 0 }) } }
            },
            { "name": "account", "alias": "充值金额:", "info": 4, "accuracy": 1, "type": "InputNumber", "defaultvalue": null, "findex": 1, "visible": this.state.balanceIsShow, "edit": 1, "required": this.state.balanceIsShow, "value": 0, props: { min: 0 } },
          ]
        }

      )
    }

    const addModalOk = (formValues) => {

      requset("/proxy/customer/addCustomer", { method: 'POST', body: formValues }).then((res) => {
        if(res&&res.success){
          message.success(res.msg);
          this.setState({ addModal: !this.state.addModal },this.queryData);
        }else{
          res&&message.error(res.msg);
        }

      });

    }



    const searchFormProps = {
      formData: getAddForm() || [],
      btns: <div style={{ width: '100%', textAlign: 'center', marginTop: '30px' }}>
        <Button type="primary" icon="check" htmlType="submit">保存</Button>
        <Button type="danger" icon="close" style={{ marginLeft: 15 }} onClick={() => { this.setState({ addModal: false, }) }}>取消</Button>
      </div>,
      onSubmit: addModalOk,
      ref: ref => { this.addForm = ref; }
    }


    return {
      destroyOnClose: true,
      title: '新增客户',
      visible: this.state.addModal,
      mask: false,
      width: 600,
      top: 100,
      left: window.innerWidth / 3,
      onCancel: () => { this.setState({ addModal: false, }) },
      children:
        <div style={{ width: 500, margin: '10px 45px', height: 350, overflowX: 'hidden', overflowY: 'auto' }}>
          <FormRender {...searchFormProps} />
        </div>,
      footer: null,
    };
  }

  handleChange = (value) => {
    this.setState({ cusType: value }, () => {
      this.queryData(1);
    });
  }

  getSearchItem = (item) => {
    const { } = this.state;
    if (item.name == 'register') {
      return <RangePicker {...this.date()} />
    }
    if (item.name == 'type') {
      return <Select value={this.state.cusType} style={{ width: '120px' }} onChange={this.handleChange}>
        <Option value="member">会员</Option>
        <Option value="normal">普通</Option>
        <Option value="delete">已删除</Option>
      </Select>
    }
    if (item.name == 'likeSelect') {
      return <Input {...this.input()} />
    }
  }

  head = () => {
    let head = [{
      field: <Button style={{ marginRight: getDefaultStyleFontSize() * 5 }} type='primary'
        onClick={() => { this.setState({ addModal: !this.state.addModal }) }}>新增客户</Button>
    }];
    const head2 = [{ name: 'register', text: '注册日期', width: 200 }, { name: 'type', text: '类型', width: 120 },
    { name: 'likeSelect', text: '模糊查询', width: 200, style: {marginRight: getDefaultStyleFontSize() * 5 } }].map((item) => (
      {
        field: <div style={{ width: `${getDefaultStyleFontSize() * 5 + item.width}px`, display: 'flex', alignItems: 'center', justifyContent: 'flex-end', ...item.style
       }}>
          <span style={{ whiteSpace: 'nowrap', paddingRight: '5px' }}>{item.text}:</span>{this.getSearchItem(item)}</div>
      }
    ));
    head = head.concat(head2);
    head.push({ field: <Button style={{}} type='primary' onClick={() => this.queryData()}>查询</Button> });
    head.push({ field: <Button onClick={() => this.setState({ search: '', startTime: null, endTime: null, pageNum: 1, pageSize: 10 }, this.queryData)}>重置</Button> });
    return head;

  }
  foot = () => {
    return <Pagination {...this.pagination()} />
  }

  render() {
    return (
      <PageHeaderLayout>
        <div style={{ width: '100%', height: 'calc(100vh - 180px)' }}>
          <Page head={this.head()} table={this.table()} foot={this.foot()} />
          <DialogCtrl {...this.searchmodal()} />
        </div>
      </PageHeaderLayout>
    );
  }
}
