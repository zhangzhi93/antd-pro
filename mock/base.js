// 代码中会兼容本地 service mock 以及部署站点的静态数据
const menu = {
  "code": 0,
  "data": [
    { "name": "项目《长安少年行demo》", "path": "/project/:id/dashboard" },
    {
      "children": [
        { "exact": true, "name": "剧本", "path": "/project/:id/overall/script" },
        { "exact": true, "name": "顺场表", "path": "/project/:id/overall/scene" },
        // { "exact": true, "name": "大计划", "path": "/project/:id/overall/plan" },
        // { "exact": true, "name": "场景", "path": "/project/:id/overall/location" },
        // { "exact": true, "name": "角色", "path": "/project/:id/overall/characters" }
      ],
      "id": 4,
      "name": "统筹",
      "path": "/project/:id/overall"
    },
    {
      "children": [
        { "exact": true, "name": "通告", "path": "/project/:id/dit/notify" },
        { "exact": true, "name": "镜次", "path": "/project/:id/dit/shot" },
        { "exact": true, "name": "XML匹配", "path": "/project/:id/dit/xml" }
      ],
      "id": 3,
      "name": "DIT",
      "path": "/project/:id/dit"
    },
  ],
  "msg": "succeed"
}
export default {
  'POST /api/web/easyaction/user/queryMenu': (req, res) => {
    res.send(menu);
  },
  // GET POST 可省略
  'GET /api/users': [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
    },
  ],
  'POST /api/web/easyaction/user/userLogin': (req, res) => {
    const { password, loginName, appId } = req.body;
    console.log(req.body);

    if (password === '123456' && loginName === 'zhangsan') {
      res.send({
        msg: 'succeed',
        data: { "isComplete": "YES", "token": "16d349a7a205476ca264b396387083dc" },
        code: 0,
      });
      return;
    }

    res.send({
      msg: '用户或密码错误',
      data: null,
      code: 7,
    });
  },
  'POST /api/register': (req, res) => {
    res.send({
      status: 'ok',
      currentAuthority: 'user',
    });
  },
  'GET /api/500': (req, res) => {
    res.status(500).send({
      timestamp: 1513932555104,
      status: 500,
      error: 'error',
      message: 'error',
      path: '/base/category/list',
    });
  },
  'GET /api/404': (req, res) => {
    res.status(404).send({
      timestamp: 1513932643431,
      status: 404,
      error: 'Not Found',
      message: 'No message available',
      path: '/base/category/list/2121212',
    });
  },
  'GET /api/403': (req, res) => {
    res.status(403).send({
      timestamp: 1513932555104,
      status: 403,
      error: 'Unauthorized',
      message: 'Unauthorized',
      path: '/base/category/list',
    });
  },
  'GET /api/401': (req, res) => {
    res.status(401).send({
      timestamp: 1513932555104,
      status: 401,
      error: 'Unauthorized',
      message: 'Unauthorized',
      path: '/base/category/list',
    });
  },
};
