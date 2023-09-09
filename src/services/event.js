import {stringify, parse} from 'qs';
import request from '../utils/request';

// const BaseURL = 'http://10.39.21.38:1112';
// const BaseURL='http://localhost:8088/ServiceEngine/rest/services/CSProjectServer';

export async function queryEventData(params) {
  return request(`/proxy/event/getEventAllTypeList?${stringify(params)}`);
}

export async function queryRepairEventData(params) {
  return request(`/proxy/event/getRepairEventList?${stringify(params)}`);
}
export async function getEventEditInfo(params) {
  return request(`/proxy/event/getEventEditInfo?${stringify(params)}`);
}

export async function queryEventTypeData(params) {
  return request(`/proxy/event/getEventList?${stringify(params)}`);
}
export async function queryEventDetailData(params) {
  return request(`/proxy/event/getEventInfo?${stringify(params)}`);
}
export async function queryEventDetailDataWithExtra(params) {
  return request(`/proxy/event/getEventInfoFeedBack?${stringify(params)}`);
}
export async function startProcess(params) {
  return request(`/proxy/event/startProcess?${stringify(params)}`);
}
export async function getRepairFormData(params) {
  return request(`/proxy/event/getRectifyFormData?${stringify(params)}`);
}
export async function getZhiDingFormData(params) {
  return request(`/proxy/event/getDangerFormData?${stringify(params)}`);
}

export async function submitRepairFormData(params) {
  return request('/proxy/event/submitRectifyData', {
    method: 'POST',
    body: {
      ...params,
    },
  });
}
export async function submitZhiDingFormData(params) {
  return request('/proxy/event/submitDangerData', {
    method: 'POST',
    body: {
      ...params,
    },
  });
}
export async function submitEditFormData(params) {
  return request('/proxy/event/submitEventFormData', {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

export async function startCZProcess(params) {
  return request('/proxy/event/startProcessForCZHandle', {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

export async function endEvent(params) {
  return request(`/proxy/event/endEvent?${stringify(params)}`);
}

export async function getStartFormData(params) {
  return request(`/proxy/fieldwork/process/getStartFormData?${stringify(params)}`);
}

export async function getCZStartFormData(params) {
  return request(`/proxy/event/getCZStartFormData?${stringify(params)}`);
}

export async function getDictByKeys(key) {
  return request(`/proxy/fieldwork/dict/getdictbykeys?${stringify(key)}`);
}

export async function getFormFields(params) {
  return request(`/proxy/event/getWxBackFormFields?${stringify(params)}`);
}

export async function getEventFormFields(params) {
  return request(`/proxy/event/getEventFormFields?${stringify(params)}`);
}

export async function changeEventInfo(params) {
  return request('/proxy/event/changeEventInfo', {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

export async function updateGisInfo(params) {
  return request('/proxy/event/updateGisInfo', {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

export async function updateEvent(params) {
  return request('/proxy/event/updateEvent', {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

export async function exchangeCustomerDemand(params) {
  return request(`/proxy/event/exchangeCustomerDemand?${stringify(params)}`);
}

export async function getEventCsList(params) {
  return request(`/proxy/event/getThirdEventCsList?${stringify(params)}`);
}

export async function getSiteStationList(params) {
  return request(`/proxy/station/getStationAndGridList?${stringify(params)}`);
}

export async function getInvalidFormData(params) {
  return request(`/proxy/event/getInvalidFormData?${stringify(params)}`);
}

export async function recoveryEventState(params) {
  return request(`/proxy/event/recoveryEventState?${stringify(params)}`);
}

export async function recoveryReprieveEventState(params) {
  return request(`/proxy/event/recoveryReprieveEventState?${stringify(params)}`);
}

export async function submitInvalidData(params) {
  return request('/proxy/event/submitInvalidEventData', {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

export async function submitReprieveData(params) {
  return request('/proxy/event/submitReprieveEventData', {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

// 内部隐患的隐患确认和事件分派获取表单接口
export async function getEventFormByGroupid(params) {
  return request(`/proxy/event/getEventFormByGroupid?${stringify(params)}`);
}

// 内部隐患的隐患确认表单提交接口
export async function submitNbyhConfirm(params) {
  return request(`/proxy/event/submitNbyhConfirm?${stringify(params.base)}`, {
    method: 'POST',
    body: {
      ...params.data,
    },
  });
}
// 内部隐患的事件分派表单提交接口
export async function submitNbyhAssign(params) {
  return request(`/proxy/event/submitNbyhAssign?${stringify(params.base)}`, {
    method: 'POST',
    body: {
      ...params.data,
    },
  });
}

// 隐患管理导入接口
export async function uploadFlies(params) {
  return request(' /proxy/event/reportFormEvent/excel', {
    method: 'POST',
    body: params,
  }, true);
}

/**
 * 供气工单关联停气工单的接口
 * @param {queryStr,pageNum,pageSize,ecode} params
 * @param {查询条件} queryStr
 * @param {当前页数} pageNum
 * @param {每页条数} pageSize
 * @param {企业编码} ecode
 */
export async function associatedTQ(params) {
  return request(`/proxy/stopgas/getStopGasWoList?${stringify(params)}`);
}

/**
 * 线下处理
 * @param params
 * @returns {Promise<Object>}
 */
export async function exchangeCustomerDemandDownLineDeal(params) {
  return request(`/proxy/event/exchangeCustomerDemandDownLineDeal?${stringify(params)}`);
}

export function getEventClassList() {
  return request(`/proxy/event/getEventTypeItemList`)
}
