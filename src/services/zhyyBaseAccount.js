import qs from 'qs';
import fetch from '../utils/request';


export async function getEcodes(param) {
  return fetch(`/proxy/assers/getEcodes?${qs.stringify(param)}`,
    {}, false, false, false, true, false);
}

export async function getAssetsInfoByCondition(param) {
  return fetch(`/proxy/assers/getAssetsInfoByCondition?${qs.stringify(param)}`,
  {}, false, false, false, true, false);
}

export async function getAssetsInfo(param) {
  return fetch(`/proxy/assers/getAssetsInfo?${qs.stringify(param)}`,
  {}, false, false, false, true, false);
}

export async function getAssetsLogsByCondition(param) {
  return fetch(`/proxy/assers/getAssetsLogsByCondition?${qs.stringify(param)}`,{}, false, false, false, true, false);
}
export async function alterAssers(params) {
  return fetch('/proxy/assers/alterAssers', {
    method: 'POST',
    body: params,
  },
   false, false, false, true, false);
}


