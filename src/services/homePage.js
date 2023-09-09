import {stringify} from 'qs';
import request from '../utils/request';

// 管网首页服务
// 待办事项
export async function getHomeTodoParams(params) {
  return request(`/proxy/home/getHomeTodo?${stringify(params)}`);
}
// 运营洞察
export async function getHomeYYDC(params) {
  return request(`/proxy/home/getHomeYYDC?${stringify(params)}`);
}
// 趋势洞察
export async function getHomePatrolLen(params) {
  return request(`/proxy/home/getHomePatrolLen?${stringify(params)}`);
}
// 绩效自驱
export async function getHomeScoreRanking(params) {
  return request(`/proxy/home/getHomeScoreRanking?${stringify(params)}`);
}
// 设备首页服务
// 设备台账统计
export async function getDHomeAccount(params) {
  return request(`/proxy/device/home/getDHomeAccount?${stringify(params)}`);
}
// 设备大修次数统
export async function getDHomeBigRepair(params) {
  return request(`/proxy/device/home/getDHomeBigRepair?${stringify(params)}`);
}
// 单个提交指标
export async function getDHomeItem(params) {
  return request(`/proxy/device/home/getDHomeItem?${stringify(params)}`);
}
// 设备大修完成情况统
export async function getDHomeRepair(params) {
  return request(`/proxy/device/home/getDHomeRepair?${stringify(params)}`);
}
// 隐患类别统
export async function getDHomeYhClass(params) {
  return request(`/proxy/device/home/getDHomeYhClass?${stringify(params)}`);
}
// 运营安全等级
export async function getSafetyLevel(params) {
  return request(`/proxy/iCome/level?${stringify(params)}`);
}
// 日巡线任务完成率
export async function getDayPatrolRate(params) {
  return request(`/proxy/iCome/dayPatrolTaskCompleteRate?${stringify(params)}`);
}
// 月设备维保完成率
export async function getMonthMaintenanceRate(params) {
  return request(`/proxy/iCome/monthEqMaintenanceCompleteRate?${stringify(params)}`);
}
// 应急抢险次数
export async function getEmergency(params) {
  return request(`/proxy/iCome/emergencyRepairSum?${stringify(params)}`);
}
// 第三方交底信息示险
export async function getThirdPartyComplete(params) {
  return request(`/proxy/iCome/dsfDisCloseInfo?${stringify(params)}`);
}
// 第三方危险施工
export async function getThirdPartyDanger(params) {
  return request(`/proxy/iCome/dsfDangerConstruction?${stringify(params)}`);
}
// 排名
export async function getRank(params) {
  return request(`/proxy/iCome/rank?${stringify(params)}`);
}
// 自驱组织数量
export async function getSelfDriveOrgNum(params) {
  return request(`/proxy/iCome/selfDriveOrgNum?${stringify(params)}`);
}
export function getKips(date) {
  return request(`/proxy/score/getPieceScoreUCList?${stringify(date)}`);
}

// 运营安全指标显示控制
export function iComeIndicatorPermissionQuery(params) {
  return request(`/proxy/iCome/selectIcomePreDetails?${stringify(params)}`);
}

// 隐患超期示险(三个月)
export function hiddenDangerOverdue(params) {
  return request(`/proxy/iCome/hiddenDangerOverdue?${stringify(params)}`);
}

export function getUserCode(params) {
  return request(`/proxy/iCome/queryCpmoCopByUserId?${stringify(params)}`);
}
