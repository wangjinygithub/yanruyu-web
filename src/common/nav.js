import dynamic from 'dva/dynamic';

// wrapper of dynamic
const dynamicWrapper = (app, models, component) => dynamic({
  app,
  models: () => models.map(m => import(`../models/${m}.js`)),
  component,
});

// nav data
export const getNavData = app => [
  {
    component: dynamicWrapper(app, ['messageInfo', 'seeMedia'], () => import('../layouts/BasicLayout')),
    layout: 'BasicLayout',
    name: '首页', // for breadcrumb
    path: '/',
    children: [
      {
        name: '首页',
        icon: 'dashboard',
        path: 'home',
        isHide: true,
        children: [
          {
            name: '系统首页',
            path: 'pipe-net',
            isHide: true,
            component: dynamicWrapper(app, ['homePage', 'eventList'], () => import('../routes/HomePage/homePage')),
          },
        ],
      },

      {
        name: '客户信息',
        icon: 'area-chart',
        path: 'customer',
        children: [
          {
            name: '客户账户',
            path: 'customerAccount',
            isHide: false,
            component: dynamicWrapper(app, [], () => import('../routes/CustomerBusiness')),
          },
          {
            name: 'ReactDemo',
            path: 'reactDemo',
            isHide: false,
            component: dynamicWrapper(app, [], () => import('../routes/ReactHooksDemo')),
          }
        ]
      }
    ],
  },
  {
    component: dynamicWrapper(app, [], () => import('../layouts/UserLayout')),
    path: '/user',
    layout: 'UserLayout',
    children: [
      {
        name: '帐户',
        icon: 'user',
        path: 'user',
        isHide: true,
        children: [
          {
            name: '登录',
            path: 'login',
            isHide: true,
            component: dynamicWrapper(app, [], () => import('../routes/User/Login')),
          },
        ],
      },
    ],
  },
 
];




