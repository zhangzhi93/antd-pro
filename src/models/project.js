import { ApiError } from '@/utils/utils';
import {
  getCurrentProjects,
  getProjectsAllTypes,
  getProjectsAllDepartments,
  addProject,
  editProject,
  deleteProject,
  getProjectDetail,
  removeDepartment,
  addDepartment,
  createProductionUnit,
  removeProductionUnit,
  modifyProductionUnit,
  inviteWechatQrcode,
  departmentQuit,
  departmentChangeMemberRole,
  departmentChangeRole
} from '@/services/project';

const Model = {
  namespace: 'project',
  state: {
    projectListData: [],
    projectTypesData: [],
    projectDepartmentsData: [],
    projectDetail: {
      projectId: '',
      productionUnits: [],
      memberList: [],
      departments: []
    },
    tabActiveKey: 'statistics',
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        let initKey = pathname.split('/').pop();
        initKey = initKey === 'dashboard' ? 'statistics' : initKey;
        dispatch({
          type: 'save',
          payload: {
            tabActiveKey: initKey
          },
        });
      });
    },
  },
  effects: {
    *getCurrentProjects({ payload, success, fail }, { call, put }) {
      try {
        const { data } = yield call(getCurrentProjects, payload);
        if (data.code === 0) {
          yield put({ type: 'save', payload: { projectListData: data.data } });
          success && success(data.data);
        } else {
          throw new ApiError(data);
        }
      } catch (err) {
        fail && fail(err);
      }
    },
    *getProjectsAllTypes({ useMemo = false, payload, success, fail }, { call, put, select }) {
      const projectTypesData = yield select(state => state.project.projectTypesData);
      // 是否使用缓存
      if (projectTypesData.length !== 0 && useMemo) {
        yield put({ type: 'save', payload: { projectTypesData } });
        success && success(projectTypesData);
      } else {
        try {
          const { data } = yield call(getProjectsAllTypes, payload);
          if (data.code === 0) {
            yield put({ type: 'save', payload: { projectTypesData: data.data } });
            success && success(data.data);
          } else {
            throw new ApiError(data);
          }
        } catch (err) {
          fail && fail(err);
        }
      }
    },
    *getProjectsAllDepartments({ payload, success }, { call, put }) {
      const { data } = yield call(getProjectsAllDepartments, payload);
      if (data && data.code === 0) {
        yield put({ type: 'save', payload: { projectDepartmentsData: data.data } });
        if (success) success(data.data);
      }
    },
    *addProject({ payload, success, fail }, { call }) {
      try {
        const { data } = yield call(addProject, payload);
        if (data.code === 0) {
          success && success(data.data);
        } else {
          throw new ApiError(data);
        }
      } catch (err) {
        fail && fail(err);
      }
    },
    *editProject({ payload, success, fail }, { call, put }) {
      try {
        const { data } = yield call(editProject, payload);
        if (data.code === 0) {
          success && success(data.data);
          yield put({ type: 'getProjectDetail', payload });
        } else {
          throw new ApiError(data);
        }
      } catch (err) {
        fail && fail(err);
      }
    },
    *getProjectDetail({ useMemo = false, payload, success, fail }, { call, put, select }) {
      const projectDetail = yield select(state => state.project.projectDetail);
      // 是否使用缓存
      if (projectDetail.projectId && useMemo) {
        yield put({ type: 'save', payload: { projectDetail } });
        success && success(projectDetail);
      } else {
        try {
          const { data } = yield call(getProjectDetail, payload);
          if (data.code === 0) {
            yield put({ type: 'save', payload: { projectDetail: data.data } });
            success && success(data.data);
          } else {
            throw new ApiError(data);
          }
        } catch (err) {
          fail && fail(err);
        }
      }
    },
    *removeDepartment({ payload, success, fail }, { call }) {
      try {
        const { data } = yield call(removeDepartment, payload);
        if (data.code === 0) {
          success && success(data.data);
        } else {
          throw new ApiError(data);
        }
      } catch (err) {
        fail && fail(err);
      }
    },
    *addDepartment({ payload, success, fail }, { call }) {
      try {
        const { data } = yield call(addDepartment, payload);
        if (data.code === 0) {
          success && success(data.data);
        } else {
          throw new ApiError(data);
        }
      } catch (err) {
        fail && fail(err);
      }
    },
    *createProductionUnit({ payload, success, fail }, { call }) {
      try {
        const { data } = yield call(createProductionUnit, payload);
        if (data.code === 0) {
          success && success(data.data);
        } else {
          throw new ApiError(data);
        }
      } catch (err) {
        fail && fail(err);
      }
    },
    *removeProductionUnit({ payload, success, fail }, { call }) {
      try {
        const { data } = yield call(removeProductionUnit, payload);
        if (data.code === 0) {
          success && success(data.data);
        } else {
          throw new ApiError(data);
        }
      } catch (err) {
        fail && fail(err);
      }
    },
    *removeProject({ payload, success, fail }, { call }) {
      try {
        const { data } = yield call(deleteProject, payload);
        if (data.code === 0) {
          success && success(data.data);
        } else {
          throw new ApiError(data);
        }
      } catch (err) {
        fail && fail(err);
      }
    },
    *modifyProductionUnit({ payload, success, fail }, { call }) {
      try {
        const { data } = yield call(modifyProductionUnit, payload);
        if (data.code === 0) {
          success && success(data.data);
        } else {
          throw new ApiError(data);
        }
      } catch (err) {
        fail && fail(err);
      }
    },
    *inviteWechatQrcode({ payload, success, fail }, { call }) {
      try {
        const { data } = yield call(inviteWechatQrcode, payload);
        if (data.code === 0) {
          success && success(data.data);
        } else {
          throw new ApiError(data);
        }
      } catch (err) {
        fail && fail(err);
      }
    },
    *departmentQuit({ payload, success, fail }, { call }) {
      try {
        const { data } = yield call(departmentQuit, payload);
        if (data.code === 0) {
          success && success(data.data);
        } else {
          throw new ApiError(data);
        }
      } catch (err) {
        fail && fail(err);
      }
    },
    *departmentChangeMemberRole({ payload, success, fail }, { call }) {
      try {
        const { data } = yield call(departmentChangeMemberRole, payload);
        if (data.code === 0) {
          success && success(data.data);
        } else {
          throw new ApiError(data);
        }
      } catch (err) {
        fail && fail(err);
      }
    },
    *departmentChangeRole({ payload, success, fail }, { call }) {
      try {
        const { data } = yield call(departmentChangeRole, payload);
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
    save(state, { payload }) {
      return { ...state, ...payload };
    },
  },
};
export default Model;
