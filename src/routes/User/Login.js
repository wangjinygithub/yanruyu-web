import React, {Component} from 'react';
import {connect} from 'dva';
import {routerRedux, Link} from 'dva/router';
import {Form, Input, Tabs, Button, Icon, Checkbox, Row, Col, Alert, Modal, Table, Tooltip } from 'antd';
import styles from './Login.less';

const FormItem = Form.Item;

@connect(state => ({
  login: state.login,
}))
@Form.create()
export default class Login extends Component {


  state = {
    count: 0,
    type: 'account',
    visible: false,
    changeLogsAbn: [],
    versionNameAbn: '',
    urlAbn: '',
    changeLogsTes: [],
    versionNameTes: '',
    urlTes: '',
  };

  componentWillMount() {
    //console.log('aa');
    this.selectAppJsonAbn();
    this.selectAppJsonTes();
    
   

  }

  componentDidMount() {
    if (this.props.login.status === 'ok'){
      this.props.dispatch(routerRedux.push('/'));
    }
    //document.addEventListener('click', this.outDivClickHandler);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.login.status === 'ok') {
      this.props.dispatch(routerRedux.push('/'));
    }
    
  }

  componentWillUnmount() {
    clearInterval(this.interval);
    //document.removeEventListener('click', this.outDivClickHandler);
   

  }


  outDivClickHandler(e) {
    const target = e.target;
    // 组件已挂载且事件触发对象不在div内
    if( this.divElement  && target !== this.menu && !this.divElement.contains(target)) {
    }  
  }
  
  //查询app正式版信息
  selectAppJsonAbn = () => { 
    this.props.dispatch({
      type: 'login/selectAppJsonAbn',
      payload: {},
      callback: (res) => {
        this.setState({
          changeLogsAbn: res.changeLogs,
          versionNameAbn: res.versionName,
          urlAbn: res.url,
        });
      },
    });


  }

    //查询app测试版信息
    selectAppJsonTes = () => { 
      this.props.dispatch({
        type: 'login/selectAppJsonTes',
        payload: {},
        callback: (res) => {
          this.setState({
          changeLogsTes: res.changeLogs,
          versionNameTes: res.versionName,
          urlTes: res.url,
          });
        },
      });
  
  
    }

  onSwitch = (key) => {
    this.setState({
      type: key,
    });
  }



  onGetCaptcha = () => {
    let count = 59;
    this.setState({count});
    this.interval = setInterval(() => {
      count -= 1;
      this.setState({count});
      if (count === 0) {
        clearInterval(this.interval);
      }
    }, 1000);
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const {type} = this.state;
    this.props.form.validateFields({force: true},
      (err, values) => {
        if (!err) {
          this.props.dispatch({
            type: `login/${type}Submit`,
            payload: {
              ...values,
              sys: 'web',
              client: ''
            },
          });
        }
      }
    );
  }

  renderMessage = (message) => {
    return (
      <Alert
        style={{marginBottom: 24}}
        message={message}
        type="error"
        showIcon
      />
    );
  };

  //展示版本信息

  showDetails = () => {
      this.setState({
        visible:  this.state.visible ? false : true,
      });
  };
  closeDetails = () => {
    this.setState({
      visible: false,
    });
};


  downloadAbn = () => {
    const { urlAbn = '' } = this.state;
    const urlIndexAbn = urlAbn.lastIndexOf('/');
    const urlStrAbn =urlAbn.substring(0,urlIndexAbn)
  window.location.href = `${urlStrAbn}/sop.apk`;
  };
  
  downloadTes = () => {
    const { urlTes = '' } = this.state;
    const urlIndexTes = urlTes.lastIndexOf('/');
    const urlStrTes =urlTes.substring(0,urlIndexTes)
  window.location.href = `${urlStrTes}/sop.apk`;
};

  getData = (list) => { 
    
    const data = [];
    for (let i = 0; i < list.length; i++) {
      let cont = '';
      if (list[i].length > 8) {
        cont = list[i].substring(0, 8) + '...';
      } else { 
        cont = list[i];
      }
      data.push({
        index: i,
        tooltip: list[i],
        content: cont,
      });
    }
    return (
      data
      )

  }

  
  
  render() {


    const { changeLogsAbn=[], versionNameAbn='', urlAbn = ''} = this.state;
    
    const versionIndexAbn = versionNameAbn.indexOf('.');
    const versionStrAbn = versionNameAbn.substring(versionIndexAbn+1, versionNameAbn.length)
    
    const { changeLogsTes = [], versionNameTes = '', urlTes = '' } = this.state;
    
    const versionIndexTes = versionNameTes.indexOf('.');
    const versionStrTes = versionNameTes.substring(versionIndexTes+1, versionNameTes.length)
   // console.log(Array.isArray(changeLogs));
    const columns = [
      {
        title: '更新类容:',
        dataIndex: 'content',
        render: (text, record) => { 
          return (
            <Tooltip title={record.tooltip} >
            <span style={{ marginLeft: '10px' }}>{text}</span>
          </Tooltip>
          )

        },
      },
    ];
    
    const dataAbn = this.getData(changeLogsAbn);

    const dataTes = this.getData(changeLogsTes);


   

    const {form, login} = this.props;
    const {getFieldDecorator} = form;
    const {type} = this.state;


    return (
      
      <div className={styles.main} >
        <div className={styles.text}>系统登录</div>
        <Form onSubmit={this.handleSubmit}>
          {
            login.status === 'error' &&
            login.type === 'account' &&
            login.submitting === false &&
            this.renderMessage('账户或密码错误')
          }
          <FormItem>
            {getFieldDecorator('username', {
              rules: [{
                required: type === 'account', message: '请输入账户名！',
              }],
            })(
              <Input
                size="large"
                suffix={<Icon type="user" className={styles.prefixIcon}/>}
                placeholder="用户名"
              />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('password', {
              rules: [{
                required: type === 'account', message: '请输入密码！',
              }],
            })(
              <Input
                size="large"
                suffix={<Icon type="lock" className={styles.prefixIcon}/>}
                type="password"
                placeholder="密码"
              />
            )}
          </FormItem>
          <FormItem className={styles.additional}>
            <Button size="large" loading={login.submitting} className={styles.submit} type="primary" htmlType="submit">
              登录
            </Button>
          </FormItem>
        </Form>
        
        <div className={styles.foot}>
          <span className={styles.version}>V1.0</span>
          {/*<a download className={styles.device}
             href={appUrl}
          >
            <Icon type="tablet" className={styles.pad}/>
            <span>APP版</span>
          </a>  */}

            
         <a download  href={'javascript://'} className={styles.device} onClick={this.showDetails} >
           {this.state.visible?<span style={{ color: '#2b9aff' }}>返回</span> : <div><Icon type="tablet" className={styles.pad}/>
            <span style={{ color: '#2b9aff' }}>APP版</span></div>}
          </a>
        </div>

      
        <div  className={styles.details} style={{ display: this.state.visible ? 'block' : 'none' }}>
          <div id="main">
          <div id="left" style={{ float: 'left', width: '50%', height: '100%', textAlign: 'center' }}>
              <div ><h2 style={{ color: '#2b9aff' }} > 正式版本 {versionStrAbn} </h2> </div>
            <Table style={{ width: 205 }} columns={columns} dataSource={dataAbn} pagination={false} scroll={{ y: 100 }} />
            <Button style={{textAlign: 'center'}} onClick={this.downloadAbn}    type="primary">
              下载应用
            </Button>
            <div >
            <img src={urlAbn} alt="download" style={{width: 100, height: 100}}/>
         </div>
         </div>
          <div id="right" style={{ float: 'right', width: '50%', height: '100%', textAlign: 'center' }}>
              <div><h2 style={{ color: '#2b9aff' }}> 试用版本 {versionStrTes} </h2> </div>
            <Table style={{ width: 205 }} columns={columns} dataSource={dataTes} pagination={false} scroll={{ y: 100 }} />
            <Button  type="primary" onClick={this.downloadTes}  >
            下载应用
            </Button>
            <div >
                <img src={urlTes} alt="download" style={{width: 100, height: 100}}/>
           </div>
          </div>
          </div>
          <div style={{textAlign: 'center'}}>
          <span  style={{ color: '#2b9aff' }} >注意: 请使用手机浏览器扫描,或其他应用扫描后用浏览器打开</span>
          </div>
          </div>
       

        
       {/* <div style={{position: 'fixed', bottom: 170, right: 35}}>
            <img src="./images/downloadApp.jpg" alt="download" style={{width: 100, height: 100}}/>
        </div> */} 
      </div>
      
    );
  }
}
