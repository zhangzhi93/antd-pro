import { getDitNotifyQueryAll, getDitNotifyOptions } from './service';

const Model = {
  namespace: 'notice',
  state: {
    getDitNotifyQueryAllData: {
      recordCount: 0,
      recordList: []
    },
    timeOptionsData: [],
  },
  effects: {
    *getDitNotifyQueryAll({ payload, callback }, { call, put }) {
      const { data } = yield call(getDitNotifyQueryAll, payload);
      if (data && data.code === 0) {
        if (callback) callback(data);
        yield put({ type: 'save', payload: { getDitNotifyQueryAllData: data.data } });
      }
    },
    *getDitNotifyOptions({ payload, callback }, { call, put }) {
      const { data } = yield call(getDitNotifyOptions, payload);
      if (data && data.code === 0) {
        yield put({ type: 'saveOptions', payload: { columnName: payload.columnName } });
      }
    },
  },
  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
    saveOptions(state, { payload }) {
      return { ...state, ...payload };
    },
  },
};
export default Model;
