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
      // ant-table组件源码里面是需要提供key对应的字段的，如果不提供key对应的字段，则会去取数据中的key，但是如果元数据也没有key这个字段的话，则会有问题，这个是table无线滚动bug的根本原因
      // 这里我拿到数据之后，处理一下在callback中返回
      // 组件内的state放一个list对象，不通过dva的单项数据流去传值，而是直接拿state中的list展示
      const { data } = yield call(getDitNotifyQueryAll, payload);
      if (data && data.code === 0) {
        yield put({ type: 'save', payload: { getDitNotifyQueryAllData: data.data } });
        if (callback) {
          const arr = [];
          for (let i = 0; i < data.data.recordList.length; i++) {
            const element = data.data.recordList[i];
            const node = {
              key: payload.projectId + String(payload.pageIndex * payload.pageNum + i),
              ...element
            }
            arr.push(node)
          }
          callback({
            code: 0,
            data: {
              recordList: arr
            }
          })
        }
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
