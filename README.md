# antd-mobile-demo
antd-mobile项目搭建demo

# 开发环境
Node: 6.10.x  
npm: 4.x

# 目录结构
```
│  package.json  
│  README.md  
│  webpack.config.dev.js  
│  webpack.config.js  
│  
├─public  
│  ├─dist  
│  ├─images  
│  └─js  
└─source  
    ├─react  
    │  ├─common  通用组件
    │  └─home  首页
    │      ├─components  组件（当前页面使用）
    │      └─pages  子页面
    └─sass  

```

# tips
安装node-sass的时候，经常会由于网络问题下载不下来（尽管npm源设置成淘宝了），新建一个`.npmrc`文件，内容如下，参考地址：[http://www.cnblogs.com/savokiss/p/6474673.html](http://www.cnblogs.com/savokiss/p/6474673.html)：
```
sass_binary_site=https://npm.taobao.org/mirrors/node-sass/
registry=https://registry.npm.taobao.org
```