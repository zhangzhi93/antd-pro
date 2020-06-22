import { getQueryTableHead, getQueryTable } from './service';

const Model = {
  namespace: 'scene',
  state: {
    getQueryTableData: {
      totalCount: 0,
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
        if (callback) {
          callback(data)
          // const arr = [];
          // for (let i = 0; i < data.data.recordList.length; i++) {
          //   const element = data.data.recordList[i];
          //   const node = {
          //     key: payload.projectId + String(payload.pageIndex * payload.pageNum + i),
          //     ...element
          //   }
          //   arr.push(node)
          // }
          // callback({
          //   code: 0,
          //   data: {
          //     recordList: arr
          //   }
          // })
        }
      }
    },
  },
  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
    saveHead(state, { payload }) {
      const getQueryTableHeadData = payload.HeadData.filter(item => item.isDisplay === 1);
      return { ...state, getQueryTableHeadData };
    },
  },
};
export default Model;
