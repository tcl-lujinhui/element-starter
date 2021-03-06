# element-starter

> A starter kit for Element UI generated by vue-cli

*If you are familiar with [cooking](https://github.com/elemefe/cooking), [here](https://github.com/ElementUI/element-cooking-starter) is a starter generated with it*

## Start

 - Clone or download this repository
 - Enter your local directory, and install dependencies:

``` bash
npm install
```

## Develop

``` bash
# serve with hot reload at localhost:8080
npm run dev
```

## Build

``` bash
# build for production with minification
npm run build
```


### build_v2.js

#### 编译调试命令


`node build_v2 编译类型 项目名 定制名 svn版本号`

* 编译类型:   
  - `b` 本地调试
  - `p` 版本编译

* 项目名:   
  - `HH70` 
  - `HH40` 
  - `其他`

* 定制名:   
  - `Generic` 通用版
  - `OrangeEE` 
  - `其他`

* svn版本号
  - 

* 本地编译调试实例（本地编译调试svn版本号无效）: 
  * 编译调试HH70通用版:`node build_v2 b HH70 Generic` 
  * 编译调试HH70 OrangeEE版:`node build_v2 b HH70 OrangeEE` 

* 本地编译调试的编译流程如下：
  1. 拷贝`src`到`webrc`目录
  2. 拷贝`Custom/项目名/Generic`到`webrc`目录
  3. 如果定制名不为`Generic`,则拷贝`Custom/项目名/定制名`目录下的所有文件到`webrc`目录
  4. 编译字符串
  5. webpack build `npm run build`
  6. 拷贝相关文件到www目录


#### 版本发布编译


`node build_v2 编译类型 项目名 定制名 svn版本号`

* 编译类型:   
  - `b` 本地调试
  - `p` 版本编译

* 项目名:   
  - `HH70` 
  - `HH40` 
  - `其他`

* 定制名:   
  - `Generic` 通用版
  - `OrangeEE` 
  - `其他`

* svn版本号
  - 如果为可空，则编译最新版本

* 发布编译实例: 
  * 发布编译HH70通用版:`node build_v2 p HH70 Generic` 
  * 发布编译HH70 OrangeEE版:`node build_v2 p HH70 OrangeEE` 

* 发布编译的代码流程如下：
  1. 拷贝`src`到`webrc`目录
  2. 拷贝`Custom/项目名/Generic`到`webrc`目录
  3. 如果定制名不为`Generic`,则拷贝`Custom/项目名/定制名`目录下的所有文件到`webrc`目录
  4. 编译字符串
  5. webpack build `npm run build`
  6. 拷贝相关文件到www目录
  7. 拷贝www目录到外层目录`../SmartSwReleaseUI\ElementUI`下
    - 如果定制名为`Generic`,则拷贝到`../SmartSwReleaseUI\ElementUI/项目名_rc`
    - 如果定制名不为`Generic`,则拷贝到`../SmartSwReleaseUI\ElementUI/定制名/项目名_rc`

**提交svn**
> 到SmartSwReleaseUI\ElementUI目录下找到刚刚编译好的版本，提交svn