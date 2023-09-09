import { message } from 'antd';
import { sortBy } from 'lodash';
import {
  queryEventData,
  queryEventDetailData,
  queryEventDetailDataWithExtra,
  queryEventTypeData,
  startProcess,
  endEvent,
  getStartFormData,
  getDictByKeys,
  getFormFields,
  updateGisInfo,
  exchangeCustomerDemand,
  submitRepairFormData,
  submitZhiDingFormData,
  getCZStartFormData,
  getRepairFormData,
  getZhiDingFormData,
  getEventEditInfo,
  submitEditFormData,
  changeEventInfo,
  getEventFormFields,
  getSiteStationList,
  getInvalidFormData,
  recoveryEventState,
  recoveryReprieveEventState,
  submitInvalidData,
  submitReprieveData,
  getEventFormByGroupid,
  submitNbyhConfirm,
  submitNbyhAssign,
  associatedTQ,
  exchangeCustomerDemandDownLineDeal,
} from '../services/event';


export default {
  namespace: 'event',
  state: {
    eventData: [],
    eventTotal: '0',
    eventDatailData: {
      params: [],
    },
    eventDetailDataExtra: [],
    eventTypeData: [],
    checkNum: [],
    startFormData: {
      params: [],
    },
    stations: [],
    stationData: [],
    tqData: {},
  },
  effects: {
    *getStations({ payload }, { call, put }) {
      const res = yield call(getDictByKeys, payload);
      if (res.success) {
        message.info(res.msg);
        return;
      }
      const data = res[payload.key];
      yield put({
        type: 'saveStations',
        payload: res[payload.key],
      });
    },
    
    

    *getSiteStationList({ payload, callback }, { call, put }) {
      const res = yield call(getSiteStationList, payload);
      if (!res.success) {
        message.error(res.msg);
        return;
      }
      const getTreeData = (data = [], treeData) => {
        for (let i = 0; i < data.length; i++) {
          const tmpNode = {
            alias: data[i].name,
            name: data[i].stationCode,
          };
          treeData.push(tmpNode);
          if (data[i].children && data[i].children.length > 0) {
            tmpNode.selectValues = [];
            getTreeData(data[i].children, tmpNode.selectValues);
          }
        }
      };
      const stationList = [];
      getTreeData(res.data, stationList);

      const result = [{ alias: '全部', name: '-1', selectValues: stationList }];

      yield put({
        type: 'changeStationData',
        payload: result,
      });
      callback && callback('-1');
    },
    *getEventEditInfo({ payload, callback }, { call, put }) {
      const res = yield call(getEventEditInfo, payload);
      try {
        for (const elem of res.params[0].items.values()) {
          elem.value = res.rtjson[elem.name] || '';
        }
        yield put({
          type: 'changeStartFormData',
          payload: { params: res.params[0].items },
        });
        callback && callback(res.params[0].items);
      } catch (e) {
        console.log(e);
      }
    },
    *submitEditFormData({ payload, callback }, { call, put }) {
      const res = yield call(submitEditFormData, payload);
      if (!res.success) {
        message.error(res.msg);
        return;
      }
      callback && callback(res);
    },
    *getEventData({ payload }, { call, put }) {
      const res = yield call(queryEventData, payload);
      // if(!res.isSuccess){
      //   message.error(res.msg);
      //   return;
      // }
      // wxj
      yield put({
        type: 'changeEventData',
        payload: res,
      });
    },
   
    
 
    
    *getEventFormFields({ payload, callback }, { call, put }) {
      const res = yield call(getEventFormFields, payload);
      if (!res.success) {
        message.error(res.msg);
        return;
      }
      res.params = res.params.items;
      yield put({
        type: 'changeStartFormData',
        payload: { params: res.params },
      });
      callback && callback(res);
    },
    *getInvalidFormData({ payload, callback }, { call, put }) {
      const res = yield call(getInvalidFormData, payload);
      if (!res.success) {
        message.error(res.msg);
        return;
      }
      res.params = res.params[0].items;
      yield put({
        type: 'changeStartFormData',
        payload: { params: res.params },
      });
      callback && callback(res);
    },
    *submitInvalidData({ payload, callback }, { call, put }) {
      const res = yield call(submitInvalidData, payload);
      if (!res.success) {
        message.error(res.msg);
        return;
      }
      callback(res);
    },
    *submitReprieveData({ payload, callback }, { call, put }) {
      const res = yield call(submitReprieveData, payload);
      if (!res.success) {
        message.error(res.msg);
        return;
      }
      callback(res);
    },
    *recoveryEventState({ payload, callback }, { call, put }) {
      const res = yield call(recoveryEventState, payload);
      if (!res.success) {
        message.error(res.msg);
        return;
      }
      callback && callback(res);
    },
    *recoveryReprieveEventState({ payload, callback }, { call, put }) {
      const res = yield call(recoveryReprieveEventState, payload);
      if (!res.success) {
        message.error(res.msg);
        return;
      }
      callback && callback(res);
    },
    *getEventTypeData({ payload }, { call, put }) {
      const res = yield call(queryEventTypeData, payload);
      // if(!res.success){
      //   message.error(res.msg);
      //   return;
      // }
      yield put({
        type: 'changeEventTypeData',
        payload: res.eventmenu,
      });
    },
    *startProcess({ payload, callback }, { call, put }) {
      const res = yield call(startProcess, payload);
      if (!res.success) {
        message.error(res.msg);
        return;
      }
      callback && callback(res);
    },
    *closeEvent({ payload, callback }, { call, put }) {
      let res = null;
      const { eventid, status } = payload;
      if (Array.isArray(eventid)) {
        const suc = [];
        for (const o of eventid) {
          /**
           * 长沙事件箱，可以选择多个事件，并且点击关闭的时候，需要多次请求
           */
          const ors = yield call(endEvent, { eventid: o.eventid, status });
          if (!ors.success) {
            message.error(ors.msg);
            return;
          }
          suc.push(ors.success);
        }
        res = suc.every(x => x);
      } else {
        const ors = yield call(endEvent, payload);
        if (!ors.success) {
          message.error(ors.msg);
          return;
        }
        res = ors.success;
      }
      callback && callback(res);
    },
    *getStartFormData({ payload, callback }, { call, put }) {
      const res = yield call(getStartFormData, payload);
      if (!res.success) {
        message.error(res.msg);
        return;
      }
      yield put({
        type: 'changeStartFormData',
        payload: res,
      });
      callback && callback(res);
    },
    *getFormFields({ payload, callback }, { call, put }) {
      const res = yield call(getFormFields, payload);
      if (!res.success) {
        message.error(res.msg);
        return;
      }
      yield put({
        type: 'changeStartFormData',
        payload: { params: res.params[0].items },
      });
      callback && callback(res);
    },
    *updateGisInfo({ payload, callback }, { call, put }) {
      const res = yield call(updateGisInfo, payload);
      if (!res.success) {
        message.error(res.msg);
        return;
      }
      callback && callback(res);
    },
    *submitmaintainBackData({ payload, callback }, { call, put }) {
      const res = yield call(exchangeCustomerDemand, payload);
      if (!res.success) {
        message.error(res.msg);
        return;
      }
      callback && callback(res);
    },
    *exchangeCustomerDemandDownLineDeal({ payload, callback }, { call }) {
      const res = yield call(exchangeCustomerDemandDownLineDeal, payload);
      if (!res.success) {
        message.error(res.msg);
        return;
      }
      callback && callback(res);
    },
    *reportChangeEvent({ payload, callback }, { call, put }) {
      const res = yield call(changeEventInfo, payload);
      if (!res.success) {
        message.error(res.msg);
        return;
      }
      callback(res);
    },
    *getRepairFormData({ payload, callback }, { call, put }) {
      const res = yield call(getRepairFormData, payload);
      if (!res.success) {
        message.error(res.msg);
        return;
      }
      if (res.params.length === 0) {
        return;
      }
      res.params = res.params[0].items;
      res.tableName = '整改反馈';
      yield put({
        type: 'changeStartFormData',
        payload: res,
      });
      callback && callback(res);
    },
    *getZhiDingFormData({ payload, callback }, { call, put }) {
      const res = yield call(getZhiDingFormData, payload);
      if (!res.success) {
        message.error(res.msg);
        return;
      }
      if (res.params.length === 0) {
        return;
      }
      res.params = res.params[0].items;
      res.tableName = '隐患方案制定';
      yield put({
        type: 'changeStartFormData',
        payload: res,
      });
      callback && callback(res);
    },
    *getCZStartFormData({ payload, callback }, { call, put }) {
      const res = yield call(getCZStartFormData, payload);
      if (!res.success) {
        message.error(res.msg);
        return;
      }
      const params = res.params;
      if (!payload.flag) {
        for (let i = 0; i < params.length; i++) {
          const name = 'repair_type';
          if (name.indexOf(params[i].name) > -1) {
            params[i].edit = 0;
            break;
          }
        }
        res.params = params;
      }
      yield put({
        type: 'changeStartFormData',
        payload: res,
      });
      callback && callback(res);
    },
    *submitRepairFormData({ payload, callback }, { call, put }) {
      const res = yield call(submitRepairFormData, payload);
      if (!res.success) {
        message.error(res.msg);
        return;
      }
      callback && callback(res);
    },
    *submitZhiDingFormData({ payload, callback }, { call, put }) {
      const res = [];
      const { userid, eventid, params } = payload;
      if (Array.isArray(eventid)) {
        for (const o of eventid) {
          try {
            const da = {
              userid,
              eventid: o.eventid,
              params,
            };
            const ors = yield call(submitZhiDingFormData, da);
            if (!ors.success) {
              message.warning(`事件编码号${o.eventid}：${ors.msg}`);
            }
            res.push(ors);
          } catch (error) {
            // 捕获上报失败事件
            message.warning(`方案未能正常制定,事件编码号：${o.eventid}`);
          }
        }
      } else {
        const ors = yield call(submitZhiDingFormData, payload);
        res.push(ors);
      }
      // const res = yield call(submitZhiDingFormData, payload);
      // if (!res.success) {
      //   message.error(res.msg);
      //   return;
      // }
      callback && callback(res);
    },
  
    

    
    *getEventFormByGroupid({ payload, callback }, { call, put }) {
      const res = yield call(getEventFormByGroupid, payload);
      if (!res.success) {
        message.error(res.msg);
        return;
      }
      if (res.params.length === 0) {
        return;
      }
      yield put({
        type: 'changeStartFormData',
        payload: { params: res.params[0].items, tableName: '隐患确认' },
      });
      callback && callback(res);
    },
    *submitNbyhConfirm({ payload, callback }, { call, put }) {
      const res = yield call(submitNbyhConfirm, payload);
      if (!res.success) {
        return message.error(res.msg);
      }
      callback && callback(res);
    },
    *submitNbyhAssign({ payload, callback }, { call, put }) {
      const res = yield call(submitNbyhAssign, payload);
      if (!res.success) {
        return message.error(res.msg);
      }
      callback && callback(res);
    },
    *getEventFormByGroupid({ payload, callback }, { call, put }) {
      const res = yield call(getEventFormByGroupid, payload);
      if (!res.success) {
        message.error(res.msg);
        return;
      }
      if (res.params.length === 0) {
        return;
      }
      yield put({
        type: 'changeStartFormData',
        payload: {params:res.params[0].items, tableName:'隐患确认'},
      });
      callback && callback(res);
    },
    *submitNbyhConfirm({ payload, callback }, { call, put }) {
      const res = yield call(submitNbyhConfirm, payload);
      if (!res.success) {
        return message.error(res.msg);
      }
      callback && callback(res);
    },
    *submitNbyhAssign({ payload, callback }, { call, put }) {
      const res = yield call(submitNbyhAssign, payload);
      if (!res.success) {
        return message.error(res.msg);
      }
      callback && callback(res);
    },
    *associatedTQ({ payload }, { call, put }) {
      const res = yield call(associatedTQ, payload);
      if (!res.success) {
        return message.error(res.msg);
      }
      yield put({
        type: 'saveTqData',
        payload: res,
      })
    }
  },
  reducers: {
    saveStations(state, action) {
      return {
        ...state,
        stations: action.payload,
      };
    },
    changeStationData(state, action) {
      return {
        ...state,
        stationData: action.payload,
      };
    },
    changeEventData(state, action) {
      return {
        ...state,
        eventData: action.payload.eventlist,
        eventTotal: action.payload.total,
        checkNum: action.payload.num,
      };
    },
    changeEventDetailData(state, action) {
      return {
        ...state,
        eventDatailData: action.payload,
      };
    },
    changeEventDetailDataExtra(state, action) {
      return {
        ...state,
        eventDetailDataExtra: action.payload,
      };
    },
    changeEventTypeData(state, action) {
      return {
        ...state,
        eventTypeData: action.payload,
      };
    },
    changeStartFormData(state, action) {
      return {
        ...state,
        startFormData: action.payload,
      };
    },
    saveTqData(state, action) {
      return {
        ...state,
        tqData: action.payload,
      }
    }
  },
};

