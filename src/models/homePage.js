import {
  getHomeTodoParams,
  getHomePatrolLen,
  getHomeScoreRanking,
  getHomeYYDC,
  getDHomeAccount,
  getDHomeBigRepair,
  getDHomeItem,
  getDHomeRepair,
  getDHomeYhClass,
  getSafetyLevel,
  getDayPatrolRate,
  getMonthMaintenanceRate,
  getEmergency,
  getThirdPartyComplete,
  getThirdPartyDanger,
  getRank,
  getSelfDriveOrgNum,
  iComeIndicatorPermissionQuery,
  hiddenDangerOverdue,
  getUserCode,
} from '../services/homePage';

export default {
  namespace: 'homePage',
  state: {
    todoData: [], // 待办事项
    patrolData: [], // 趋势洞察
    scoreData: [], //  绩效自驱
    operateData: [], //  运营洞察
    eqLedgerData: [], // 设备台账 - 管网设备
    stationEquipData: [], // 设备台账 - 场站设备
    usersData: [], // 设备台账 - 工商户
    eqRepairData: [], // 设备大修次数
    eqRepairPlanData: [], // 设备大修完成情况
    yhClassData: [], // 隐患类别
    eqItemData: [], // 单个提交指
    indicators: {
      level: { label: '--', value: 0 },
      dayPatrolRate: '0%',
      monthMaintenanceRate: '0%',
      emergency: '0',
      thirdPartyComplete: '0',
      thirdPartyDanger: '0',
      rank: '0',
      selfDrive: '0',
      hiddenDanger: '0',
    },
    iComeIndicatorPermission: false,
  },
  effects: {
    * getDatas({payload, callback}, {call, put}) {
      const res1 = yield call(getDHomeItem, payload);
      yield put({
        type: 'eqItemDataSave',
        payload: res1.data,
      });
      const res2 = yield call(getDHomeAccount, {type: 1});
      const res6 = yield call(getDHomeAccount, {type: 2});
      const res7 = yield call(getDHomeAccount, {type: 3});
      yield put({
        type: 'changeStatus',
        payload: {
          eqLedgerData: res2.data,
          stationEquipData: res6.data,
          usersData: res7.data,
        },
      });
      const res3 = yield call(getDHomeBigRepair, payload);
      yield put({
        type: 'eqRepairDataSave',
        payload: res3.data,
      });
      const res4 = yield call(getDHomeRepair, payload);
      yield put({
        type: 'eqRepairPlanDataSave',
        payload: res4.data,
      });
      const res5 = yield call(getDHomeYhClass, payload);
      yield put({
        type: 'yhClassDataSave',
        payload: res5.data,
      });
      console.log(res1,res2,res3,res4,res5,res6,res7);
      callback && callback(res5, res3);
    },
    // 待办事项
    * getHomeTodoParams({payload, callback}, {call, put}) {
      const res = yield call(getHomeTodoParams, payload);
      yield put({
        type: 'todoDataSave',
        payload: res.data,
      });
    },
    // 趋势洞察
    * getHomePatrolLen({payload, callback}, {call, put}) {
      const res = yield call(getHomePatrolLen, payload);
      yield put({
        type: 'patrolDataSave',
        payload: res.data,
      });
      if (callback) {
        callback(res.data);
      }
    },
    // 绩效自驱
    * getHomeScoreRanking({payload, callback}, {call, put}) {
      const res = yield call(getHomeScoreRanking, payload);
      yield put({
        type: 'scoreDataSave',
        payload: res.data,
      });
    },
    //  运营洞察
    * getHomeYYDC({payload,callback}, {call, put}) {
      const res = yield call(getHomeYYDC, payload);
      yield put({
        type: 'operateDataSave',
        payload: res.data,
      });
      callback && callback(res)
    },
    //  设备台账统计
    * getDHomeAccount({payload}, {call, put}) {
      const res = yield call(getDHomeAccount, payload);
      yield put({
        type: 'eqLedgerDataSave',
        payload: res.data,
      });
    },
    //  设备大修次数统计
    * getDHomeBigRepair({payload, callback}, {call, put}) {
      const res = yield call(getDHomeBigRepair, payload);
      yield put({
        type: 'eqRepairDataSave',
        payload: res.data,
      });
      callback && callback(res)
    },
    //  单个提交指
    * getDHomeItem({payload}, {call, put}) {
      const res = yield call(getDHomeItem, payload);
      yield put({
        type: 'eqItemDataSave',
        payload: res.data,
      });
    },
    //  设备大修完成情况统
    * getDHomeRepair({payload}, {call, put}) {
      const res = yield call(getDHomeRepair, payload);
      yield put({
        type: 'eqRepairPlanDataSave',
        payload: res.data,
      });
    },
    //  隐患类别统
    * getDHomeYhClass({payload, callback}, {call, put}) {
      const res = yield call(getDHomeYhClass, payload);
      yield put({
        type: 'yhClassDataSave',
        payload: res.data,
      });
      callback && callback(res)
    },
    *getIComeIndicators({ payload }, { call, put }) {
      const level = yield call(getSafetyLevel, payload);
      const dayPatrolRate = yield call(getDayPatrolRate, payload);
      const monthMaintenanceRate = yield call(getMonthMaintenanceRate, payload);
      const emergency = yield call(getEmergency, payload);
      const thirdPartyComplete = yield call(getThirdPartyComplete, payload);
      const thirdPartyDanger = yield call(getThirdPartyDanger, payload);
      const rank = yield call(getRank, payload);
      const selfDrive = yield call(getSelfDriveOrgNum, payload);
      const hiddenDanger = yield call(hiddenDangerOverdue, payload);
      yield put({
        type: 'setIComeIndicators',
        payload: {
          level: level.level ? level.level : {},
          dayPatrolRate: dayPatrolRate.rxjRate ? dayPatrolRate.rxjRate : '0.00%',
          monthMaintenanceRate: monthMaintenanceRate.ysbRate ? monthMaintenanceRate.ysbRate : '0.00%',
          emergency: emergency.emergencySum ? emergency.emergencySum : '0',
          thirdPartyComplete: thirdPartyComplete.incompleteNum ? thirdPartyComplete.incompleteNum : '0',
          thirdPartyDanger: thirdPartyDanger.dangerNum ? thirdPartyDanger.dangerNum : '0',
          rank: rank.rank ? rank.rank : '0',
          selfDrive: selfDrive.zqNum ? selfDrive.zqNum : '0',
          hiddenDanger: hiddenDanger.yhcqNum ? hiddenDanger.yhcqNum : '0',
        }});
    },
    *iComeIndicatorPermission({ payload }, { call, put }) {
      const res = yield call(iComeIndicatorPermissionQuery, payload);
      if (res.success === 'success' && res.data && res.data.viewStatus === '1') {
        yield put({ type: 'setIComeIndicatorPermission', payload: true });
        yield put({ type: 'getIComeIndicators', payload: { cpmoCop: payload.param } });
      } else {
        yield put({ type: 'setIComeIndicatorPermission', payload: false });
      }
    },
    *getUserCode({ payload }, { call, put }) {
      const res = yield call(getUserCode, payload);
      yield put({ type: 'iComeIndicatorPermission', payload: { param: res.cpmo_cop } });
    },
  },

  reducers: {
    setIComeIndicatorPermission(state, action) {
      return {
        ...state,
        iComeIndicatorPermission: action.payload,
      };
    },
    setIComeIndicators(state, action) {
      return {
        ...state,
        indicators: action.payload,
      };
    },
    changeStatus(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },

    todoDataSave(state, action) {
      return {
        ...state,
        todoData: action.payload,
      };
    },

    patrolDataSave(state, action) {
      return {
        ...state,
        patrolData: action.payload,
      };
    },
    scoreDataSave(state, action) {
      return {
        ...state,
        scoreData: action.payload,
      };
    },
    operateDataSave(state, action) {
      return {
        ...state,
        operateData: action.payload,
      };
    },
    eqLedgerDataSave(state, action) {
      return {
        ...state,
        eqLedgerData: action.payload,
      };
    },
    eqRepairDataSave(state, action) {
      return {
        ...state,
        eqRepairData: action.payload,
      };
    },
    eqItemDataSave(state, action) {
      return {
        ...state,
        eqItemData: action.payload,
      };
    },
    eqRepairPlanDataSave(state, action) {
      return {
        ...state,
        eqRepairPlanData: action.payload,
      };
    },
    yhClassDataSave(state, action) {
      return {
        ...state,
        yhClassData: action.payload,
      };
    },
  },
};

