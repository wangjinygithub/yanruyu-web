import React from 'react';
import moment from 'moment';
import { Spin, Form, Button, Row, Col, Input, DatePicker, TimePicker, Select, TreeSelect, InputNumber, Cascader, Switch, Radio, Checkbox } from 'antd';

const FormItem = Form.Item;
const { MonthPicker } = DatePicker;
const { RangePicker } = DatePicker;
const { Option } = Select;
const { TreeNode } = TreeSelect;
const { TextArea, Search } = Input;
const { Group: RadioGroup } = Radio;
const { Group: CheckboxGroup } = Checkbox;


const getFormItem = (fld, required, edite, props) => {
  switch (fld.type) {
    case 'UserDef':
      return getUserDefFrom(fld, required, edite, props);
    case 'Input':
      return getStringFrom(fld, required, edite, props);
    case 'InputSearch':
      return getInputSearchForm(fld, required, edite, props);
    case 'TextArea2':
      return getAreaFrom(fld, required, edite, props, 2);
    case 'TextArea3':
      return getAreaFrom(fld, required, edite, props, 3);
    case 'TextArea4':
      return getAreaFrom(fld, required, edite, props, 4);
    case 'TextArea5':
      return getAreaFrom(fld, required, edite, props, 5);
    case 'TextArea6':
      return getAreaFrom(fld, required, edite, props, 6);
    case 'TextArea7':
      return getAreaFrom(fld, required, edite, props, 7);
    case 'TextArea8':
      return getAreaFrom(fld, required, edite, props, 8);
    case 'TextArea9':
      return getAreaFrom(fld, required, edite, props, 9);
    case 'InputNumber':
      return getNumberFrom(fld, required, edite, props);
    case 'DATE1':
      return getDate1From(fld, required, edite, props);
    case 'DATETIME':
      return getDate2From(fld, required, edite, props);
    case 'DATE3':
      return getDate3From(fld, required, edite, props);
    case 'DATE4':
      return getDate4From(fld, required, edite, props);
    case 'DATE5':
      return getDate5From(fld, required, edite, props);
    case 'DATE6':
      return getDate6From(fld, required, edite, props);
    case 'Cascader':
      return getFormCascader(fld, required, edite, props);
    case 'DDL':
      return getDropDownFrom(fld, required, edite, props);
    case 'TreeSelect':
      return getDropDownTreeFrom(fld, required, edite, props);
    case 'Email':
      return getEmialFrom(fld, required, edite, props);
    case 'CheckboxGroup':
      return getCheckFrom(fld, required, edite, props);
    case 'RDO':
      return getRadioFrom(fld, required, edite, props);
    case 'Switch':
      return getSwitchFrom(fld, required, edite, props);
    case 'RadioButton':
      return getRadioButtonFrom(fld, required, edite, props);
    case 'Password':
      return getPasswordFrom(fld, required, edite, props);
    default:
      return getStringFrom(fld, required, edite, props);
  }
};




const getNode = (node, kv) => {
  const { children } = node;
  return (
    <TreeNode title={node[kv.title]} key={node[kv.key]} value={node[kv.value]}>
      {children && children.map(child => getNode(child, kv))}
    </TreeNode>
  );
};

const filterOption = (inputValue, { props: { children } }) => children.indexOf(inputValue) >= 0;

const filterTreeNode = (inputValue, { props: { title } }) => title.indexOf(inputValue) >= 0;

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

const getStringFrom = (fld, required, edit, props) => { // 1：字符串
  return {
    rules: [{ required, message: edit && `${fld.alias}必须输入!` }],
    component: <Input placeholder={edit && `请输入${fld.alias}` || '<空>'} disabled={!edit} {...props} />,
  };
};

const getInputSearchForm = (fld, required, edit, props) => { // 11:输入框带按钮
  return {
    rules: [{ required, message: edit && `${fld.alias}必须输入!` }],
    component: <Search placeholder={edit && `请输入${fld.alias}` || '<空>'} readOnly={!edit} {...props} />,
  };
};

const getAreaFrom = (fld, required, edit, props, rows = 4) => { // 1：字符串
  return {
    rules: [{ required, message: `${fld.alias}必须输入!` }],
    component: <TextArea rows={rows} placeholder={edit && `请输入${fld.alias}` || '<空>'} disabled={!edit} {...props} />,
  };
};

const getNumberFrom = (fld, required, edit, props) => { // 2：数字
  return {
    rules: [{ required, message: `${fld.alias}必须输入!` }],
    component: <InputNumber placeholder={edit && `请输入${fld.alias}` || '<空>'} disabled={!edit} style={{ width: '100%' }} {...props} />,
  };
};

const getDate1From = (fld, required, edit, props) => { // 3：日期
  return {
    rules: [{ required, message: `${fld.alias}必须输入!` }],
    component: <DatePicker disabled={!edit} style={{ width: '100%' }} {...props} />,
  };
};

const getDate2From = (fld, required, edit, props) => { // 31 日期（年月日时分秒）
  return {
    rules: [{ required, message: `${fld.alias}必须输入!` }],
    component: <DatePicker disabled={!edit} style={{ width: '100%' }} showTime format="YYYY-MM-DD HH:mm:ss" {...props} />,
  };
};

const getDate3From = (fld, required, edit, props) => { // 32: 日期（年月）
  return {
    rules: [{ required, message: `${fld.alias}必须输入!` }],
    component: <MonthPicker disabled={!edit} style={{ width: '100%' }} {...props} />,
  };
};

const getDate4From = (fld, required, edit, props) => { // 33：开始日期（年月日）
  return {
    rules: [{ required, message: `${fld.alias}必须输入!` }],
    component: <RangePicker disabled={!edit} style={{ width: '100%' }} {...props} />,
  };
};

const getDate5From = (fld, required, edit, props) => { // 34：开始日期（年月日时分秒）
  return {
    rules: [{ required, message: `${fld.alias}必须输入!` }],
    component: <RangePicker disabled={!edit} style={{ width: '100%' }} showTime format="YYYY-MM-DD HH:mm:ss" {...props} />,
  };
};

const getDate6From = (fld, required, edit, props) => { // 35：选择时间
  return {
    rules: [{ required, message: `${fld.alias}必须输入!` }],
    component: <TimePicker disabled={!edit} {...props} />,
  };
};

const getDropDownFrom = (fld, required, edit, props) => { // 5：下拉
  return {
    rules: [{ required, message: `${fld.alias}必须选择!` }],
    component: (
      <Select showSearch placeholder={edit && `请选择${fld.alias}` || '<空>'} dropdownStyle={{ maxHeight: 400, overflow: 'auto' }} filterOption={filterOption} disabled={!edit} {...props} >{(fld.selectValues || []).map((obj, i) => <Option key={`${i}`} value={obj.name}>{obj.alias}</Option>)}</Select>
    ),
  };
};

const getDropDownTreeFrom = (fld, required, edit, props) => { // 51：下拉
  const kv = fld.kv || { title: 'title', key: 'key', value: 'value' };
  return {
    rules: [{ required, message: `${fld.alias}必须选择!` }],
    component: (
      <TreeSelect showSearch treeDefaultExpandAll placeholder={edit && `请选择${fld.alias}` || '<空>'} dropdownStyle={{ maxHeight: 400, overflow: 'auto' }} filterTreeNode={filterTreeNode} disabled={!edit} {...props}>
        {(fld.values || []).map(node => getNode(node, kv))}
      </TreeSelect>
    ),
  };
};

const getEmialFrom = (fld, required, edit, props) => { // 6：邮箱
  return {
    rules: [{ required, message: `${fld.alias}必须输入!` }, { type: 'email', message: '邮件格式错误' }],
    component: <Input placeholder={edit && `请输入${fld.alias}` || '<空>'} disabled={!edit} {...props} />,
  };
};

const getCheckFrom = (fld, required, edit, props) => { // 多选
  const { title, key, value } = fld.kv || { title: 'title', key: 'key', value: 'value' };
  return {
    rules: [{ required, message: `${fld.alias}必须输入!` }],
    component: (
      <CheckboxGroup disabled={!edit} {...props}>
        {(fld.values || []).map(node => <div key={`d_${node[key]}`} style={{ display: 'inline-block', width: 200 }}><Checkbox key={node[key]} value={node[value]}>{node[title]}</Checkbox ></div>)}
      </CheckboxGroup >
    ),
  };
};

const getRadioFrom = (fld, required, edit, props) => { // 71：单选
  const { title, key, value } = fld.kv || { title: 'title', key: 'key', value: 'value' };
  return {
    rules: [{ required, message: `${fld.alias}必须输入!` }],
    component: (
      <RadioGroup disabled={!edit} {...props}>
        {(fld.selectValues || []).map(node => <Radio key={node.name} value={node.name}>{node.alias}</Radio>)}
      </RadioGroup>
    ),
  };
};

const getRadioButtonFrom = (fld, required, edit, props) => { // 73：单选
  const { title, key, value } = fld.kv || { title: 'title', key: 'key', value: 'value' };
  return {
    rules: [{ required, message: `${fld.alias}必须输入!` }],
    component: (
      <RadioGroup disabled={!edit} {...props}>
        {(fld.values || []).map(node => <Radio.Button key={node[key]} value={node[value]}>{node[title]}</Radio.Button>)}
      </RadioGroup>
    ),
  };
};

const getSwitchFrom = (fld, required, edit, props) => { // 72：开关
  return {
    rules: [{ required, message: `${fld.alias}必须输入!` }],
    component: <Switch disabled={!edit} {...props} />,
  };
};

const getPasswordFrom = (fld, required, edit, props) => { // 8: 密码
  return {
    rules: [{ required, message: `${fld.alias}必须输入!` }],
    component: <Input placeholder={edit && `请输入${fld.alias}` || '<空>'} type="password" disabled={!edit} {...props} />,
  };
};

const getFormCascader = (fld, required, edit, props) => {
  return {
    rules: [{ required, message: `${fld.alias}必须选择!` }],
    component: <Cascader placeholder={edit && `请输入${fld.alias}` || '<空>'} changeOnSelect style={{ width: '100%' }} allowClear={false} disabled={!edit} {...props} />,
  };
};

const getUserDefFrom = (fld, required, edit, props) => {
  return {
    rules: typeof fld.getRules === 'function' ? fld.getRules({ required, message: `${fld.alias}必须输入!` }) : [{ required, message: `${fld.alias}必须输入!` }],
    component: typeof fld.getComponent === 'function' ? fld.getComponent(edit, props) : fld.getComponent,
  };
};

const submit = (
  <Row>
    <Col span={24} style={{ textAlign: 'right' }}>
      <Button type="primary" htmlType="submit" style={{ margin: '4px' }}>确认</Button>
    </Col>
  </Row>
);

const getValue = (type, val) => {
  switch (type) {
    case 'DATE1':
      return val && moment(val.replace(/-/g, '/'), 'YYYY/MM/DD');
    case 'DATE2':
      return val && moment(val.replace(/-/g, '/'), 'YYYY/MM/DD hh:mm:ss');
    case 'DATE3':
      return val && moment(val.replace(/-/g, '/'), 'YYYY/MM');
    case 'DATE6':
      return val && moment(val.replace(/-/g, '/'), 'hh:mm:ss');
    default: return val;
  }
};

/**
 * @param formBodyStyle 自定义表单主体样式
 */
@Form.create()
export default class Control extends React.Component {
  render() {
    const { form: { getFieldDecorator }, btns, formData = {}, loading = false, onSubmit = () => { }, formBodyStyle } = this.props;
    const { formfields = [] } = formData;
    const items = formfields.map((x, i) => {
      const span = Number(x.info);
      return {
        name: x.name,
        occupy: x.accuracy || 2,
        value: getValue(x.type, x.value),
        valuePropName: Number(x.type) === 'Checkbox' ? 'checked' : 'value',
        formProps: { label: x.alias, labelCol: { span }, wrapperCol: { span: 24 - span } },
        formItem: getFormItem(x, Number(x.required) === 1, Number(x.edit) === 1, x.props || {}),
        visible: x.visible,
      };
    });
    return (
      <Spin spinning={loading}>
        <Form onSubmit={(e) => {
          this.props.form.validateFields((err, values) => {
            e.preventDefault();
            if (!err) onSubmit(values);
          });
        }}
        >
          <div style={formBodyStyle || {}}>
            <Row gutter={24} key="row-form">
              {
                items.map((item, i) => {
                  const { name, value, occupy, valuePropName, formProps = {}, formItem: { rules, component }, visible } = item;
                  return (
                    <Col span={Math.ceil(24 / occupy)} key={`col-${i}`} style={{ height: '40px', display: visible ? 'block' : 'none' }}>
                      <FormItem {...formProps}>
                        {getFieldDecorator(name, { initialValue: value, valuePropName, rules: rules || [] })(component)}
                      </FormItem>
                    </Col>
                  );
                })
              }
            </Row>
          </div>
          {btns || submit}
        </Form>
      </Spin>
    );
  }
}
