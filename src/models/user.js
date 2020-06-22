import { ApiError } from '@/utils/utils';
import { login, isScanQrcode, getInfo, getWechatQrcode } from '@/services/user';

const UserModel = {
  namespace: 'user',
  state: {
    currentUser: {},
    status: undefined,
  },
  effects: {
    *getInfo({ payload, success, fail }, { call, put }) {
      try {
        const { data } = yield call(getInfo, payload);
        if (data.code === 0) {
          success && success(data.data);
          yield put({ type: 'saveCurrentUser', payload: data.data });
        } else {
          throw new ApiError(data);
        }
      } catch (err) {
        fail && fail(err);
      }
    },
    *login({ payload, success, fail }, { call }) {
      try {
        const { data } = yield call(login, payload);
        if (data.code === 0) {
          success && success(data.data);
        } else {
          throw new ApiError(data);
        }
      } catch (err) {
        fail && fail(err);
      }
    },
    *wechatQrcode({ payload, success, fail }, { call }) {
      try {
        const { data } = yield call(getWechatQrcode, payload);
        if (data.code === 0) {
          success && success(data.data);
        } else {
          throw new ApiError(data);
        }
      } catch (err) {
        fail && fail(err);
      }
    },
    *isScanQrcode({ payload, success, fail }, { call }) {
      try {
        const { data } = yield call(isScanQrcode, payload);
        if (data.code === 0) {
          success && success(data.data);
        } else {
          throw new ApiError(data);
        }
      } catch (err) {
        fail && fail(err);
      }
    },
  },
  reducers: {
    changeLoginStatus(state, { payload }) {
      return { ...state, status: payload.status, type: payload.type };
    },
    saveCurrentUser(state, action) {
      return { ...state, currentUser: action.payload || {} };
    },
    changeNotifyCount(
      state = {
        currentUser: {},
      },
      action,
    ) {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          notifyCount: action.payload.totalCount,
          unreadCount: action.payload.unreadCount,
        },
      };
    },
  },
};
export default UserModel;
