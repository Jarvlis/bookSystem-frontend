export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        path: '/user',
        routes: [
          { name: '登录', path: '/user/login', component: './user/Login' },
          { name: '注册', path: '/user/register', component: './user/Register' },
          { name: '重置密码', path: '/user/reset', component: './user/Reset' },
        ],
      },
      { component: './404' },
    ],
  },
  { path: '/welcome', name: '首页', icon: 'smile', component: './Welcome' },
  {
    path: '/admin',
    name: '用户管理',
    icon: 'crown',
    access: 'canAdmin',
    component: './Admin',
    routes: [
      {
        path: '/admin/user-manage',
        name: '用户列表',
        icon: 'smile',
        component: './Admin/UserManage',
      },
      {
        path: '/admin/user-add',
        name: '添加用户',
        icon: 'smile',
        component: './Admin/UserAdd',
      },
      { component: './404' },
    ],
  },
  {
    path: '/book',
    name: '图书管理',
    icon: 'crown',
    component: './Admin',
    routes: [
      {
        path: '/book/book-manage',
        name: '图书列表',
        icon: 'smile',
        component: './Admin/BookManage',
      },
      { component: './404' },
    ],
  },
  {
    path: '/department',
    name: '单位管理',
    icon: 'crown',
    access: 'canAdmin',
    component: './Admin',
    routes: [
      {
        path: '/department/department-manage',
        name: '单位列表',
        icon: 'smile',
        component: './Admin/DepartmentManage',
      },
      { component: './404' },
    ],
  },
  {
    path: '/flow',
    name: '图书流通管理',
    icon: 'crown',
    access: 'canStaff',
    component: './Staff',
    routes: [
      {
        path: '/flow/book-manage',
        name: '图书流入',
        icon: 'smile',
        component: './Staff/BookIn',
      },
      {
        path: '/flow/book-add',
        name: '图书流出',
        icon: 'smile',
        component: './Staff/BookOut',
      },
      { component: './404' },
    ],
  },
  {
    path: '/borrow',
    name: '图书借阅管理',
    icon: 'crown',
    access: 'canStaff',
    component: './Staff',
    routes: [
      {
        path: '/borrow/book-borrow',
        name: '图书借出',
        icon: 'smile',
        component: './Staff/BookBorrow',
      },
      {
        path: '/borrow/book-return',
        name: '图书归还',
        icon: 'smile',
        component: './Staff/BookReturn',
      },
      { component: './404' },
    ],
  },
  {
    name: '统计分析管理',
    icon: 'table',
    path: '/list',
    component: './Staff/BookAnalysis',
    access: 'canStaff',
  },
  {
    path: '/r-borrow',
    name: '借阅管理',
    icon: 'crown',
    access: 'canReader',
    component: './Reader',
    routes: [
      {
        path: '/r-borrow/reader-in',
        name: '借阅图书',
        icon: 'smile',
        component: './Reader/BookIn',
      },
      {
        path: '/r-borrow/reader-return',
        name: '归还图书',
        icon: 'smile',
        component: './Reader/BookOut',
      },
      { component: './404' },
    ],
  },
  {
    path: '/reader',
    name: '个人中心',
    icon: 'crown',
    component: './Reader',
    access: 'cannotVisitor',
    routes: [
      {
        path: '/reader/reader-info',
        name: '个人信息详情',
        icon: 'smile',
        component: './Reader/ReaderInfo',
      },
      { component: './404' },
    ],
  },
  { path: '/', redirect: '/welcome' },
  { component: './404' },
];
