import { http } from '@/utils/http';

// 获取项目列表
export function getCurrentProjects(params) {
  return http.form('/web/easyaction/user/getCurrentProjects', params);
}

// 获取项目类型
export function getProjectsAllTypes(params) {
  return http.form('/web/easyaction/projectType/queryAll', params);
}

// 删除项目
export function deleteProject(params) {
  return http.form('/web/easyaction/project/delete', params);
}

export function getProjectsAllDepartments(params) {
  return http.form('/web/easyaction/department/queryAvailable', params);
}

export function addProject(params) {
  return http.post('/web/easyaction/project/addProject', params);
}

export function editProject(params) {
  return http.form('/web/easyaction/project/modifyBasic', params);
}

// 获取项目详情
export function getProjectDetail(params) {
  return http.form('/web/easyaction/project/queryDetail', params);
}

// 删除部门
export function removeDepartment(params) {
  return http.form('/web/easyaction/project/removeDepartment', params);
}

// 添加部门
export function addDepartment(params) {
  return http.post('/web/easyaction/project/addDepartment', params);
}

// 添加摄制组
export function createProductionUnit(params) {
  return http.post('/web/easyaction/productionUnit/create', params);
}

// 删除摄制组
export function removeProductionUnit(params) {
  return http.form('/web/easyaction/productionUnit/delete', params);
}

// 修改摄制组
export function modifyProductionUnit(params) {
  return http.form('/web/easyaction/productionUnit/modify', params);
}

// 邀请用户微信小程序二维码
export function inviteWechatQrcode(params) {
  return http.form('/web/easyaction/projectMgr/xcx/invite', params);
}

// 踢出/退出部门 踢出/退出部门 踢出其他人时，操作人需主管角色
export function departmentQuit(params) {
  return http.form('/web/easyaction/department/quit', params);
}

// 修改成员角色
export function departmentChangeMemberRole(params) {
  return http.form('/web/easyaction/department/changeMemberRole', params);
}

// 修改自己成部门主管
export function departmentChangeRole(params) {
  return http.form('/web/easyaction/department/changeRole', params);
}
