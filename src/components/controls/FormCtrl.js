import React from 'react';
import moment from 'moment';
import { Spin, Form, Button, Row, Col, Input, DatePicker, TimePicker, Select, TreeSelect, InputNumber, Cascader, Switch, Radio, Checkbox } from 'antd';
import groupBy from 'lodash/groupBy';
import orderBy from 'lodash/orderBy';

const FormItem = Form.Item;
const {MonthPicker} = DatePicker;
const {RangePicker} = DatePicker;
const {Option} = Select;
const {TreeNode} = TreeSelect;
const { TextArea, Search } = Input;
const {Group: RadioGroup} = Radio;
const {Group: CheckboxGroup} = Checkbox;

const getNode = (node, kv) => {
  const {children} = node;
  return (
    <TreeNode title={node[kv.title]} key={node[kv.key]} value={node[kv.value]}>
      {children && children.map(child => getNode(child, kv))}
    </TreeNode>
  );
};

const filterOption = (inputValue, {props: {children}}) => children.indexOf(inputValue) >= 0;

const filterTreeNode = (inputValue, {props: {title}}) => title.indexOf(inputValue) >= 0;

/*
1：字符串
2：数字
3：日期（年月日）
31：日期（年月日时分秒）
32: 日期（年月）
33：开始日期（年月日）
34：开始日期（年月日时分秒）
35：选择时间
5：下拉
51：树选
6：邮箱
7：网址
8: 密码
*/

const getStringFrom = (fld, required, edite, props) => { // 1：字符串
  return {
    rules: [{required, message: edite && `${fld.alias}必须输入!`}],
    component: <Input placeholder={(edite && `请输入${fld.alias}`) || '<空>'} disabled={!edite} {...props} />,
  };
};

const getInputSearchForm = (fld, required, edite, props) => { // 11:输入框带按钮
  return {
    rules: [{ required, message: edite && `${fld.alias}必须输入!` }],
    component: <Search placeholder={(edite && `请输入${fld.alias}`) || '<空>'} readOnly={!edite} {...props} />,
  };
};

const getAreaFrom = (fld, required, edite, props, rows = 4) => { // 1：字符串
  return {
    rules: [{required, message: `${fld.alias}必须输入!`}],
    component: <TextArea rows={rows} placeholder={(edite && `请输入${fld.alias}`) || '<空>'} disabled={!edite} {...props} />,
  };
};

const getNumberFrom = (fld, required, edite, props) => { // 2：数字
  return {
    rules: [{required, message: `${fld.alias}必须输入!`}],
    component: <InputNumber placeholder={(edite && `请输入${fld.alias}`) || '<空>'} disabled={!edite} style={{width: '100%'}} {...props} />,
  };
};

const getDate1From = (fld, required, edite, props) => { // 3：日期
  return {
    rules: [{required, message: `${fld.alias}必须输入!`}],
    component: <DatePicker disabled={!edite} style={{width: '100%'}} {...props} />,
  };
};

const getDate2From = (fld, required, edite, props) => { // 31 日期（年月日时分秒）
  return {
    rules: [{required, message: `${fld.alias}必须输入!`}],
    component: <DatePicker disabled={!edite} style={{width: '100%'}} showTime format="YYYY-MM-DD HH:mm:ss" {...props} />,
  };
};

const getDate3From = (fld, required, edite, props) => { // 32: 日期（年月）
  return {
    rules: [{required, message: `${fld.alias}必须输入!`}],
    component: <MonthPicker disabled={!edite} style={{width: '100%'}} {...props} />,
  };
};

const getDate4From = (fld, required, edite, props) => { // 33：开始日期（年月日）
  return {
    rules: [{required, message: `${fld.alias}必须输入!`}],
    component: <RangePicker disabled={!edite} style={{width: '100%'}} {...props} />,
  };
};

const getDate5From = (fld, required, edite, props) => { // 34：开始日期（年月日时分秒）
  return {
    rules: [{required, message: `${fld.alias}必须输入!`}],
    component: <RangePicker disabled={!edite} style={{width: '100%'}} showTime format="YYYY-MM-DD HH:mm:ss" {...props} />,
  };
};

const getDate6From = (fld, required, edite, props) => { // 35：选择时间
  return {
    rules: [{required, message: `${fld.alias}必须输入!`}],
    component: <TimePicker disabled={!edite} {...props} />,
  };
};

const getDropDownFrom = (fld, required, edite, props) => { // 5：下拉
  return {
    rules: [{required, message: `${fld.alias}必须选择!`}],
    component: (
      <Select showSearch placeholder={(edite && `请选择${fld.alias}`) || '<空>'} dropdownStyle={{ maxHeight: 400, overflow: 'auto' }} filterOption={filterOption} disabled={!edite} {...props} >{(fld.values || []).map((obj, i) => <Option key={`${i}`} value={obj.dbval}>{obj.dispval}</Option>)}</Select>
    ),
  };
};

const getDropDownTreeFrom = (fld, required, edite, props) => { // 51：下拉
  const kv = fld.kv || {title: 'title', key: 'key', value: 'value'};
  return {
    rules: [{required, message: `${fld.alias}必须选择!`}],
    component: (
      <TreeSelect showSearch treeDefaultExpandAll placeholder={(edite && `请选择${fld.alias}`) || '<空>'} dropdownStyle={{ maxHeight: 400, overflow: 'auto' }} filterTreeNode={filterTreeNode} disabled={!edite} {...props}>
        {(fld.values || []).map(node => getNode(node, kv))}
      </TreeSelect>
    ),
  };
};

const getEmialFrom = (fld, required, edite, props) => { // 6：邮箱
  return {
    rules: [{required, message: `${fld.alias}必须输入!`}, { type: 'email', message: '邮件格式错误'}],
    component: <Input placeholder={(edite && `请输入${fld.alias}`) || '<空>'} disabled={!edite} {...props} />,
  };
};

const getCheckFrom = (fld, required, edite, props) => { // 多选
  const {title, key, value} = fld.kv || {title: 'title', key: 'key', value: 'value'};
  return {
    rules: [{required, message: `${fld.alias}必须输入!`}],
    component: (
      <CheckboxGroup disabled={!edite} {...props}>
        {(fld.values || []).map(node => <div key={`d_${node[key]}`} style={{ display: 'inline-block', width: 200 }}><Checkbox key={node[key]} value={node[value]}>{node[title]}</Checkbox ></div>)}
      </CheckboxGroup >
    ),
  };
};

const getRadioFrom = (fld, required, edite, props) => { // 71：单选
  const {title, key, value} = fld.kv || {title: 'title', key: 'key', value: 'value'};
  return {
    rules: [{required, message: `${fld.alias}必须输入!`}],
    component: (
      <RadioGroup disabled={!edite} {...props}>
        {(fld.values || []).map(node => <Radio key={node[key]} value={node[value]}>{node[title]}</Radio>)}
      </RadioGroup>
    ),
  };
};

const getRadioButtonFrom = (fld, required, edite, props) => { // 73：单选
  const {title, key, value} = fld.kv || {title: 'title', key: 'key', value: 'value'};
  return {
    rules: [{required, message: `${fld.alias}必须输入!`}],
    component: (
      <RadioGroup disabled={!edite} {...props}>
        {(fld.values || []).map(node => <Radio.Button key={node[key]} value={node[value]}>{node[title]}</Radio.Button>)}
      </RadioGroup>
    ),
  };
};

const getSwitchFrom = (fld, required, edite, props) => { // 72：开关
  return {
    rules: [{required, message: `${fld.alias}必须输入!`}],
    component: <Switch disabled={!edite} {...props} />,
  };
};

const getPasswordFrom = (fld, required, edite, props) => { // 8: 密码
  return {
    rules: [{required, message: `${fld.alias}必须输入!`}],
    component: <Input placeholder={(edite && `请输入${fld.alias}`) || '<空>'} type="password" disabled={!edite} {...props} />,
  };
};

const getFormCascader = (fld, required, edite, props) => {
  return {
    rules: [{required, message: `${fld.alias}必须选择!`}],
    component: <Cascader placeholder={(edite && `请输入${fld.alias}`) || '<空>'} changeOnSelect style={{width: '100%'}} allowClear={false} disabled={!edite} {...props} />,
  };
};

const getUserDefFrom = (fld, required, edite, props) => {
  return {
    rules: typeof fld.getRules === 'function' ? fld.getRules({required, message: `${fld.alias}必须输入!`}) : [{required, message: `${fld.alias}必须输入!`}],
    component: typeof fld.getComponent === 'function' ? fld.getComponent(edite, props) : fld.getComponent,
  };
};

const getValue = (lx, val) => {
  switch (lx) {
    case 3:
      return val && moment(val.replace(/-/g, '/'), 'YYYY/MM/DD');
    case 31:
      return val && moment(val.replace(/-/g, '/'), 'YYYY/MM/DD hh:mm:ss');
    case 32:
      return val && moment(val.replace(/-/g, '/'), 'YYYY/MM');
    case 35:
      return val && moment(val.replace(/-/g, '/'), 'hh:mm:ss');
    default: return val;
  }
};

const getFormItem = (fld, required, edite, props) => {
  switch (Number(fld.disptype)) {
    case 0:
      return getUserDefFrom(fld, required, edite, props);
    case 1:
      return getStringFrom(fld, required, edite, props);
    case 11:
      return getInputSearchForm(fld, required, edite, props);
    case 12:
      return getAreaFrom(fld, required, edite, props, 2);
    case 13:
      return getAreaFrom(fld, required, edite, props, 3);
    case 14:
      return getAreaFrom(fld, required, edite, props, 4);
    case 15:
      return getAreaFrom(fld, required, edite, props, 5);
    case 16:
      return getAreaFrom(fld, required, edite, props, 6);
    case 17:
      return getAreaFrom(fld, required, edite, props, 7);
    case 18:
      return getAreaFrom(fld, required, edite, props, 8);
    case 19:
      return getAreaFrom(fld, required, edite, props, 9);
    case 2:
      return getNumberFrom(fld, required, edite, props);
    case 3:
      return getDate1From(fld, required, edite, props);
    case 31:
      return getDate2From(fld, required, edite, props);
    case 32:
      return getDate3From(fld, required, edite, props);
    case 33:
      return getDate4From(fld, required, edite, props);
    case 34:
      return getDate5From(fld, required, edite, props);
    case 35:
      return getDate6From(fld, required, edite, props);
    case 4:
      return getFormCascader(fld, required, edite, props);
    case 5:
      return getDropDownFrom(fld, required, edite, props);
    case 51:
      return getDropDownTreeFrom(fld, required, edite, props);
    case 6:
      return getEmialFrom(fld, required, edite, props);
    case 7:
      return getCheckFrom(fld, required, edite, props);
    case 71:
      return getRadioFrom(fld, required, edite, props);
    case 72:
      return getSwitchFrom(fld, required, edite, props);
    case 73:
      return getRadioButtonFrom(fld, required, edite, props);
    case 8:
      return getPasswordFrom(fld, required, edite, props);
    default:
      return getStringFrom(fld, required, edite, props);
  }
};

const getLocal = (data, col, idx) => {
  if (data) {
    const vals = data.split('-');
    return {col: Number(vals[0]), row: Number(vals[1]), idx: Number(vals[2]), span: Number(vals[3]) || 1};
  }
  return {col, row: Math.ceil((idx + 1) / col), idx: (idx + 1) % col || col, span: 1};
};

const submit = (
  <Row>
    <Col span={24} style={{ textAlign: 'right' }}>
      <Button type="primary" htmlType="submit" style={{ margin: '4px'}}>确认</Button>
    </Col>
  </Row>
);

@Form.create()
export default class Control extends React.Component {
  render() {
    const {form: {getFieldDecorator}, btns, cols = 2, gutter = 12, flds = [], data = {}, edite = false, loading = false, onSubmit = () => {}} = this.props;
    const items = flds.map((x, i) => {
      const local = getLocal(x.insertrule, cols, i);
      const span = isNaN(x.updaterule) ? 8 : Number(x.updaterule);
      return {
        local,
        fld: x.name,
        value: getValue(Number(x.disptype), data.hasOwnProperty(x.name) ? data[x.name] : data[x.name.toLowerCase()]),
        valuePropName: Number(x.disptype) === 72 ? 'checked' : 'value',
        formProps: {label: x.required ? <span className="ant-form-item-required">{x.alias}</span> : x.alias, style: {margin: '4px 0'}, labelCol: { span }, wrapperCol: { span: 24 - span }},
        formItem: getFormItem(x, Number(x.nullable) === 1, edite && !(Number(x.editable) === 1), x.props || {}),
      };
    });
    const group = groupBy(items, 'local.row');
    const rows = orderBy(Object.keys(group).reduce((a, b) => { return a.concat({ idx: Number(b), data: group[b] }) }, []), 'idx').map(o => o.data);
    return (
      <Spin spinning={loading}>
        <Form onSubmit={(e) => {
          this.props.form.validateFields((err, values) => {
            e.preventDefault();
            if (!err) onSubmit(values);
          });
        }}
        >
          {
            rows.map((row, i) => {
              return (
                <Row gutter={gutter} key={`${Number(i)}`}>
                  {
                    orderBy(row, 'local.idx').map((obj, j) => {
                      const { local: { col }, fld, value, valuePropName, formProps = {}, formItem: { rules, component } } = obj;
                      return (
                        <Col span={Math.ceil(24 / col)} key={`${i * 2 + j + 1}`}>
                          <FormItem {...formProps}>
                            {getFieldDecorator(fld, { initialValue: value, valuePropName, rules: rules || [] })(component)}
                          </FormItem>
                        </Col>
                      );
                    })
                  }
                </Row>
              );
            })
          }
          {edite ? (btns || submit) : null}
        </Form>
      </Spin>
    );
  }
}
