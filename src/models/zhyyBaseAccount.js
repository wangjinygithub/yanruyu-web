import { notification, message } from 'antd';
import {
  getAssetsInfo,
  alterAssers,
  getAssetsInfoByCondition,
  getEcodes,
  getAssetsLogsByCondition,
} from '../services/zhyyBaseAccount';

export default {
  namespace: 'zhyyBaseAcount',
  state: {
    queryWork: {},
    loading: false,
  },
  reducers: {
    setDialogVisible(state, action) {
      return {
        ...state,
        dialogVisible: action.payload,
      };
    },
    setAssetsInfo(state, action) {
      return {
        ...state,
        queryWork: action.payload,
      };
    },
  },
  effects: {
    *getEcodes({payload,callback}, {call, put}) {
      const response = yield call(getEcodes, payload);
      if (response.success) {
      } else {
        notification.error({ message: response.msg, duration: 3 });
      }
      callback && callback(response);
    },
    *getAssetsInfoByCondition({payload,callback}, {call, put}) {
      const response = yield call(getAssetsInfoByCondition, payload);
      if (response.success) {
      } else {
        notification.error({ message: response.msg, duration: 3 });
      }
      callback && callback(response);
    },
    *getAssetsInfo({payload,callback}, {call, put}) {
      const response = yield call(getAssetsInfo, payload);
      if (response.success) {
        yield put({type: 'setAssetsInfo', payload: response});
      } else {
        notification.error({ message: response.msg, duration: 3 });
      }
      callback && callback(response);
    },
    *alterAssers({ payload,callback }, { call, put, select}) {
      const res = yield call(alterAssers, payload);
      callback && callback(res);
    },
    *getAssetsLogsByCondition({ payload,callback }, { call, put, select}) {
      const res = yield call(getAssetsLogsByCondition, payload);
      callback && callback(res);
    },
  },
};
