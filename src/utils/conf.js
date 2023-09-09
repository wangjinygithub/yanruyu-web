/**
 * 系统配置信息获取
 */
import request from './request';
import { message } from 'antd';

const initUrl = './config/init.json';

const cache = new Map();

request(initUrl, {
  method: 'get',
  dataType: 'json',
  headers: {
    'Content-Type': 'application/text;charset=UTF-8',
  },
}).then((res) => {
});

// 不做onemap权限验证
// function getInitCfg() {
//   return request(initUrl, {
//     method: 'get',
//     dataType: 'json',
//     headers: {
//       'Content-Type': 'application/text;charset=UTF-8',
//     },
//   });
// }

// 做onemap权限认证
function getInitCfg() {
  return request(`/proxy/gis/onemapToken`).then((res)=>{
    if(!res.success){
      message.error(res.msg);
      return;
    }
    localStorage.setItem('onemapToken', res.data);
    return request(initUrl, {
      method: 'get',
      dataType: 'json',
      headers: {
        'Content-Type': 'application/text;charset=UTF-8',
      },
    });
  });
}

function getMapCfg(mapType = 'base') {
  const mapClassify = mapType === 'base' ? 'zhyy' : (mapType === 'emer' ? 'emer' : '');
  return request(`/proxy/config/mapConf/query?mapClassify=${mapClassify}`);
}

export function getEcodePattern(ecode = '0011') {
  return getInitCfg().then((res) => {
    const {cfgs} = res;
    if (!Array.isArray(cfgs)) {
      throw new Error('res.cfgs 异常');
    }
    for (let i = 0; i < cfgs.length; i += 1) {
      if (cfgs[i].ecode === ecode) {
        return request('./config/emerEcodecfg.json').then((res2) => {
          return res2[cfgs[i].pattern];
        });
      }
    }
  });
}

export function getCfgByKey(key = '') {
  if (cache.has(key)) {
    return new Promise((resolved) => {
      resolved(cache.get(key));
    });
  } else {
    return getInitCfg().then((res) => {
      const { cfgs, mapConfResource } = res;
      if (!Array.isArray(cfgs)) {
        throw new Error('res.cfgs 异常');
      }
      for (let i = 0; i < cfgs.length; i++) {
        if (cfgs[i].key === key) {
            if (mapConfResource[0] === 'loc') { 
              return request(cfgs[i].url).then((res2) => {
                // 地图url添加onemapToken
                addOnemapToken(res2);
                cache.set(key, res2);
                return res2;
              });
            } else { 
            return getMapCfg(cfgs[i].mapType).then(({data}) => {
              // 地图url添加onemapToken
              addOnemapToken(data);
              cache.set(key, data);
              return data;
            });
          }
        }
      }
    });
  }
}

export function getMapCggByTypeAndEcode(mapType, ecode) {
  const key = `${mapType}${ecode}`;
  if (cache.has(key)) {
    return new Promise((resolved) => {
      resolved(cache.get(key));
    });
  } else {
    return getInitCfg().then((res) => {
      const { cfgs, mapConfResource  } = res;
      if (!Array.isArray(cfgs)) {
        throw new Error('res.cfgs 异常');
      }
      for (let i = 0; i < cfgs.length; i++) {
        if (cfgs[i].mapType === mapType && cfgs[i].ecode === ecode) {
          if (mapConfResource[0] === 'loc') {
            return request(cfgs[i].url).then((res2) => {
              // 地图url添加onemapToken
              addOnemapToken(res2);
              cache.set(key, res2);
              return res2;
            });
          } else {
            return getMapCfg(cfgs[i].mapType).then(({ data }) => {
              // 地图url添加onemapToken
              addOnemapToken(data);
              cache.set(key, data);
              return data;
            });
          }
        }
      }
    });
}
}

export function getLocalMapCfgByMapTypeAndEcode(mapType,ecode){
  return getInitCfg().then((res) => {
    const { cfgs } = res;
      if (!Array.isArray(cfgs)) {
        throw new Error('res.cfgs 异常');
      }
      for (let i = 0; i < cfgs.length; i++) {
        if (cfgs[i].mapType === mapType && cfgs[i].ecode===ecode) {
          return request(cfgs[i].url).then((res) => {
            return res;
          });
        }
      }
      return null;
  });
}

function addOnemapToken(mapInfo) {
  if (!mapInfo) {
    return;
  }
  const onemapToken = localStorage.getItem('onemapToken');
  if (!onemapToken) {
    return;
  }
  const { map_base: [bMaps], map_service: [sMaps] } = mapInfo;
  // 地图服务路径中未检测到该特征字符串，则不添加oneMapToken
  const oneMapSpecialPath = '/OneMapServer/';
  if (bMaps && Array.isArray(bMaps.maps) && bMaps.maps.length > 0) {
    for (let i = 0; i < bMaps.maps.length; i++) {
      if (bMaps.maps[i].url.indexOf(oneMapSpecialPath) < 0) {
        continue;
      }
      bMaps.maps[i].url = `${bMaps.maps[i].url}?token=${onemapToken}`;
    }
  }
  if (sMaps && Array.isArray(sMaps.maps) && sMaps.maps.length > 0) {
    for (let i = 0; i < sMaps.maps.length; i++) {
      if (sMaps.maps[i].url.indexOf(oneMapSpecialPath) < 0) {
        continue;
      }
      sMaps.maps[i].url = `${sMaps.maps[i].url}?token=${onemapToken}`;
    }
  }
}