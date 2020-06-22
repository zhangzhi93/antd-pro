import { ApiError } from '@/utils/utils';
import { getMenu, applayToUpload, uploadFile } from '@/services/base';

const Model = {
  namespace: 'base',
  state: {
    projectListData: [],
    projectTypesData: [],
    menuData: [],
    breadcrumbData: [],
    OSSData: {}
  },
  effects: {
    *getMenu({ payload, success, fail }, { call, put }) {
      try {
        const { data } = yield call(getMenu, payload);
        if (data.code === 0) {
          yield put({ type: 'save', payload: { menuData: data.data } });
          success && success(data.data);
        } else {
          throw new ApiError(data);
        }
      } catch (err) {
        fail && fail(err);
      }
    },
    *applayToUpload({ payload, success, fail }, { call, put }) {
      const { data } = yield call(applayToUpload, payload);
      if (data && data.code === 0) {
        yield put({ type: 'save', payload: { OSSData: data.data } });
      }
    },
    *uploadPhoto({ payload, file, success, fail }, { call }) {
      try {
        const fileName = file.name.split('.');
        fileName.splice(fileName.length - 1, 1);
        const { data } = yield call(applayToUpload, Object.assign(payload, { busiType: 'photo', fileName: file.name }));
        const res = data.data;
        res.key = res.dir + res.key;
        if (data.code !== 0) throw new ApiError(data);
        const result = yield call(uploadFile, res.uploadUrl, Object.assign(res, { file }));
        if (success) success(result.data);
      } catch (err) {
        if (fail) fail(err);
      }
    },
  },
  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
    resetMenu(state) {
      return { ...state, menuData: [] }
    }
  },
};
export default Model;
