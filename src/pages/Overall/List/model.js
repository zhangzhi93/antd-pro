import { getQueryTableHead, getQueryTable } from './service';

const Model = {
  namespace: 'session',
  state: {
    getQueryTableData: {
      recordCount: 0,
      recordList: []
    },
    getQueryTableHeadData: [],
  },
  effects: {
    *getQueryTableHead({ payload, callback }, { call, put }) {
      const { data } = yield call(getQueryTableHead, payload);
      if (data && data.code === 0) {
        yield put({ type: 'saveHead', payload: { HeadData: data.data } });
      }
    },
    *getQueryTable({ payload, callback }, { call, put }) {
      const { data } = yield call(getQueryTable, payload);
      if (data && data.code === 0) {
        yield put({ type: 'save', payload: { getQueryTableData: data.data } });
      }
    },
  },
  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
    saveHead(state, { payload }) {
      const getQueryTableHeadData = payload.HeadData.filter(item => item.isDisplay === 1)
      return { ...state, getQueryTableHeadData };
    },
  },
};
export default Model;
