import moment from 'moment';
import {parse} from 'qs';

export function fixedZero(val) {
  return val * 1 < 10 ? `0${val}` : val;
}

export function getTimeDistance(type) {
  const now = new Date();
  const oneDay = 1000 * 60 * 60 * 24;

  if (type === 'today') {
    now.setHours(0);
    now.setMinutes(0);
    now.setSeconds(0);
    return [moment(now), moment(now.getTime() + (oneDay - 1000))];
  }

  if (type === 'week') {
    let day = now.getDay();
    now.setHours(0);
    now.setMinutes(0);
    now.setSeconds(0);

    if (day === 0) {
      day = 6;
    } else {
      day -= 1;
    }

    const beginTime = now.getTime() - (day * oneDay);

    return [moment(beginTime), moment(beginTime + ((7 * oneDay) - 1000))];
  }

  if (type === 'month') {
    const year = now.getFullYear();
    const month = now.getMonth();
    const nextDate = moment(now).add(1, 'months');
    const nextYear = nextDate.year();
    const nextMonth = nextDate.month();

    return [moment(`${year}-${fixedZero(month + 1)}-01 00:00:00`), moment(moment(`${nextYear}-${fixedZero(nextMonth + 1)}-01 00:00:00`).valueOf() - 1000)];
  }

  if (type === 'year') {
    const year = now.getFullYear();

    return [moment(`${year}-01-01 00:00:00`), moment(`${year}-12-31 23:59:59`)];
  }
}

export function getPlainNode(nodeList, parentPath = '') {
  const arr = [];
  nodeList.forEach((node) => {
    const item = node;
    item.path = `${parentPath}/${item.path || ''}`.replace(/\/+/g, '/');
    item.exact = true;
    if (item.children && !item.component) {
      arr.push(...getPlainNode(item.children, item.path));
    } else {
      if (item.children && item.component) {
        item.exact = false;
      }
      arr.push(item);
    }
  });
  return arr;
}

export function digitUppercase(n) {
  const fraction = ['角', '分'];
  const digit = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];
  const unit = [
    ['元', '万', '亿'],
    ['', '拾', '佰', '仟'],
  ];
  let num = Math.abs(n);
  let s = '';
  fraction.forEach((item, index) => {
    s += (digit[Math.floor(num * 10 * (10 ** index)) % 10] + item).replace(/零./, '');
  });
  s = s || '整';
  num = Math.floor(num);
  for (let i = 0; i < unit[0].length && num > 0; i += 1) {
    let p = '';
    for (let j = 0; j < unit[1].length && num > 0; j += 1) {
      p = digit[num % 10] + unit[1][j] + p;
      num = Math.floor(num / 10);
    }
    s = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][i] + s;
  }

  return s.replace(/(零.)*零元/, '元').replace(/(零.)+/g, '零').replace(/^整$/, '零元整');
}

/**
 * ?a=1&b=2
 * 解析url参数为object对象
 * @param path
 * @returns {a:1,b:2}
 */
export default function parseValues(path = '') {
  let i = path.indexOf('?');
  let str = i > 0 ? path.substr(i) : path;
  return parse(str, {
    ignoreQueryPrefix: true,
  })
}

export function getCurrTk() {
  const uStr = localStorage.getItem('user');
  const user = JSON.parse(uStr) || {};
  return user.token || '';
}

export function getUserInfo() {
  const uStr = localStorage.getItem('user');
  return JSON.parse(uStr) || {};
}

export function filterObjEmptyValue(params = {}) {
  let obj = {};
  Object.keys.forEach(key=>{
    const val = params[key];
    if(val || key===0){
      obj[key] = val;
    }
  });
  return obj;
}

/**
 * 将树结构的一维数组转换成树元数据
 * @param {一维数组} data 
 * @param {根节点的标识} root 
 * @param {唯一标识} key 
 * @param {父节点标识} parentkey 
 * @param {排序标识} orderby 
 */
export function array2tree(array, rootid, key, parentkey,orderby) {
  const  getJsonTree = function (data, root) {
    var itemArr = [];
    for (var i = 0; i < data.length; i++) {
      var node = data[i];
      if (node[parentkey] == root) {
        var newNode = { ...node };
        const children =  getJsonTree(data, node[key]);
        if (children.length > 0) {
          newNode.children = children;
        }
        itemArr.push(newNode);
      }
    }
    return orderby?itemArr.sort((a,b)=>a[orderby]-b[orderby]):itemArr;
  };
  return getJsonTree(array, rootid);
}

/**
 * 过滤对象中值为空属性
 * @param {对象} obj 
 */
export function filterObj(obj = {}) {
  const newObj = {};
    Object.keys(obj).map(key => {
      if (obj[key] || obj[key] === 0 || obj[key] === false) {
        newObj[key] = obj[key]; 
      }
    })
    return newObj;
}

/**
 * @description 获取默认字体样式
 * @author wjy
 * @param {原始数组} arr 
 * @param {唯一字段} field 
 */
export const getDefaultStyleFontSize = ()=>{
  return Number((document.body.currentStyle || document.defaultView.getComputedStyle(document.body, '') || {fontSize:'14px'}).fontSize.replace('px',''));
 }

 export const getTotalWidth = (arr = []) => {
  let width = 0;
  const getWidth = (arr1 = []) => {
    arr1.map(item => {
      if (item.children) {
        getWidth(item.children)
      } else {
        width += item.width;
      }
    })
  }
  getWidth(arr);
  //console.log('wid', width);
  return width;
}
