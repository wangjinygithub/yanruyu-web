import {stringify} from 'qs';
import request from '../utils/request';

// 查询
export async function selectScoreByQinDao(param) {
  return request(`/proxy/score/selectScoreByQinDao?${stringify(param)}`);
}

// 修改
export async function updateScoreByQinDao(param) {
  return request(`/proxy/score/updateScoreByQinDao?${stringify(param)}`);
}
