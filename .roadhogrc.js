export default {
  entry: "src/index.js",
  hash: true,
  extraBabelPlugins: [
    "transform-runtime",
    "transform-decorators-legacy",
    "transform-class-properties",
    ["import", { libraryName: "antd", libraryDirectory: "es", style: true }],
    [
      "module-resolver",
      {
        alias: {
          YD: "./src/components/yd",
          UTIL: "./src/utils",
        },
      },
    ],
  ],
  dllPlugin: {
    exclude: ["babel-runtime", "yc"],
    include: [
      "classnames",
      "core-js",
      "echarts",
      "echarts-for-react",
      "echarts-liquidfill",
      "esri-loader",
      "eventemitter2",
      "immutability-helper",
      "jquery",
      "lodash",
      "md5",
      "moment",
      "numeral",
      "prop-types",
      "qs",
      "react",
      "react-dom",
      "react-container-query",
      "react-custom-scrollbars",
      "react-document-title",
      "react-draggable",
      "dva/dynamic",
    ],
  },
  env: {
    development: {
      extraBabelPlugins: ["dva-hmr"],
    },
  },
  externals: {},
  ignoreMomentLocale: true,
  theme: "./src/theme.js",
  proxy: {
    "/proxy": {
      // "target": "http://service-zhyypro.oennso.enn.cn/api/v1/sop/", // 生产服务
      // "target": "http://10.2.153.42:8081/api/v1/sop/", // 生产服务
      // "target": "http://promotion-service-pre-zhyytest.oennso.enn.cn/api/v1/sop/", // 预生产服务
      // "target": "http://promotion-service13-pre-zhyytest.oennso.enn.cn/api/v1/sop/", // 新预生产服务
      // "target": "http://promotion-service-zhyytest.oennso.enn.cn/api/v1/sop/", // 推广服务
      // "target": "http://promotion-service-dev-zhyytest.oennso.enn.cn/api/v1/sop/", // 开发服务
      //target: "http://10.39.0.36:8081/api/v1/sop/", // 后台连调节口
      //target: "http://10.39.0.109:8181/api/v1/sop/", // 后台连调节口
      //"target": 'http://prod.ennso.enn.cn/proxy/', // 后台连调节口
      //"target": 'http://localhost:8081/api/v1/sop/', // 后台连调节口
      "target": 'http://localhost:8089/api/v1/yanruyu/', // 后台连调节口
      // "target": 'http://2509e021.nat123.cc:16265/api/v1/sop/', // 后台连调节口
      // "target": 'http://service-test-task-rule-zhyytest.oennso.enn.cn/api/v1/sop/', // 维保升级的
      // "target": "http://emer-service-zhyytest.oennso.enn.cn/api/v1/sop/",
      changeOrigin: true,
      pathRewrite: { "^/proxy": "" },
    },
    "/bigData": {
      target: "http://10.37.148.36:8080/",
      changeOrigin: true,
      pathRewrite: { "^/bigData": "" },
    },
    "/localToBaidu": {
      target: "http://10.39.13.38:8022/",
      changeOrigin: true,
      pathRewrite: { "^/localToBaidu": "" },
    },
    "/pipeClick": {
      target: "http://10.39.12.26:6080/",
      changeOrigin: true,
      pathRewrite: { "^/pipeClick": "" },
    },
    "/dgPipeClick": {
      target: "http://10.39.1.106:6080/",
      changeOrigin: true,
      pathRewrite: { "^/dgPipeClick": "" },
    },
    "/baiduMap": {
      target: "http://api.map.baidu.com/",
      changeOrigin: true,
      pathRewrite: { "^/baiduMap": "" },
    },
    "/mapBaidu": {
      target: "http://map.baidu.com/",
      changeOrigin: true,
      pathRewrite: { "^/mapBaidu": "" },
    },
    "/baiduVista": {
      target: "http://mapsv0.bdimg.com/",
      changeOrigin: true,
      pathRewrite: { "^/baiduVista": "" },
    },
    "/sendSms": {
      target: "http://sms-prod.ipaas.enncloud.cn/",
      changeOrigin: true,
      pathRewrite: { "^/sendSms": "" },
    },
    "/transData": {
      target: "http://10.39.1.254:8022/ServiceEngine/rest/services/",
      changeOrigin: true,
      pathRewrite: { "^/transData": "" },
    },
    "/weatherData": {
      target: "http://10.37.148.36:8889/",
      changeOrigin: true,
      pathRewrite: { "^/weatherData": "" },
    },
    "/mapServer": {
      target: "http://10.39.12.26:6080/",
      changeOrigin: true,
      pathRewrite: { "^/mapServer": "" },
    },
    "/qdPipeClick": {
      target: "http://10.39.13.31:8080/",
      changeOrigin: true,
      pathRewrite: { "^/qdPipeClick": "" },
    },
    "/linshiguanwangServer": {
      target: "http://10.39.13.39:6080/",
      changeOrigin: true,
      pathRewrite: { "^/linshiguanwangServer": "" },
    },
    "/linshimokatuoServer": {
      target: "http://10.39.13.31:8080/",
      changeOrigin: true,
      pathRewrite: { "^/linshimokatuoServer": "" },
    },
    "/shiliangmokatuoServer": {
      target: "http://10.39.13.44:6080/",
      changeOrigin: true,
      pathRewrite: { "^/shiliangmokatuoServer": "" },
    },
    "/rongchengMapServer": {
      target: "http://10.39.1.15:6080/",
      changeOrigin: true,
      pathRewrite: { "^/rongchengMapServer": "" },
    },
    "/changshaMapServer": {
      target: "http://10.39.13.23:6080/",
      changeOrigin: true,
      pathRewrite: { "^/changshaMapServer": "" },
    },
    "/xiangtanMapServer": {
      target: "http://10.39.13.27:6080/",
      changeOrigin: true,
      pathRewrite: { "^/xiangtanMapServer": "" },
    },
    "/commonMapServer": {
      target: "http://10.39.13.31:8080/",
      changeOrigin: true,
      pathRewrite: { "^/commonMapServer": "" },
    },
    "/gaodeMap": {
      target: "http://restapi.amap.com/",
      changeOrigin: true,
      pathRewrite: { "^/gaodeMap": "" },
    },
    "/prodService": {
      target: "http://service13-zhyypro.oennso.enn.cn/api/v1/sop/",
      changeOrigin: true,
      pathRewrite: { "^/prodService": "" },
    },
    // "/mapDownload": {
    //   "target": 'http://10.39.13.38:8022',
    //     "changeOrigin": true,
    //   "pathRewrite": { "^/mapDownload": "" }
    // },
    "/mapDownload": {
      "target": 'http://10.39.1.90:8022',
        "changeOrigin": true,
      "pathRewrite": { "^/mapDownload": "" }
    },
    "/appStore": {
      target: "https://apps.enn.cn",
      changeOrigin: true,
      pathRewrite: { "^/appStore": "" },
    },
  },
};
