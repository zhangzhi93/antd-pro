import { getDitShotQueryAll } from './service';

const Model = {
  namespace: 'shot',
  state: {
    getDitShotQueryAllData: {
      recordCount: 0,
      recordList: []
    },
  },
  effects: {
    *getDitShotQueryAll({ payload, callback }, { call, put }) {
      const { data } = yield call(getDitShotQueryAll, payload);
      if (data && data.code === 0) {
        if (callback) callback(data);
        yield put({ type: 'save', payload: { getDitShotQueryAllData: data.data } });
      }
    },
  },
  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
  },
};
export default Model;
