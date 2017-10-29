# TimRChen 博客重构

## 技术栈
>   Vue + Express + MongoDB


### 1.0.2

-   增加网站favicon小图标

### 1.0.1

-   增加额外功能组件
    -   增加短链接生成服务`使用jsonp跨域请求获取数据`
    -   修复长连接有 `#` 情况下无法生成短链问题

### 1.0.0

-   修改后台管理接口
-   优化后台管理PC端显示效果
-   增加页面底部备案号
-   修改top颜色
-   增加Star按钮
-   `上线前最后的部署准备`

### 0.0.9

-   加入首页文章列表分页组件
    -   数字 + 前后导航

### 0.0.8

-   首页文章列表大图点击进入文章
-   优化文章列表动画加载方式
-   改进文章列表动画效果
-   将文章详情页标题与日期显示位置更改为px值定位
-   登录界面输入账号密码后可直接回车登录验证

### 0.0.7v

-   移动端兼容处理 - 使用媒体查询增强竖屏下显示效果
    - 优化字体显示
    - 优化标题显示
    - 调整阴影显示策略

### 0.0.6v

-   文章管理页 `closed`
    - 渲染文章列表
    - 删除文章功能
    - 更新/编辑文章功能


### 0.0.5v patch

-   组件间切换过渡动画`fade-in`
-   管理界面加入小而美Hero标题框
-   美化TOP按钮
-   优化整体美感
-   增加 About Me 介绍组件


### 0.0.5v

-   文章编辑页美化 `closed`
-   文章内容展示美化 `closed`
-   首页文章动画渲染优化 `closed`

### 0.0.4v

-   加入首页文章列表动画 `高斯渐变` & `方块浮显动画` & **`scroll事件特别优化`**
    -   优化 scroll 事件，列表渲染组件销毁后 scroll 事件销毁
-   加入top返回页面最上动态逻辑
-   进入文章详情组件自动滚动置页面顶部

### 0.0.3v

-   新建文章组件
-   首页文章展示列表
-   文章详情页


### 0.0.2v

-   完善前后端JWT验证机制
    -   注销登录 `closed`


### 0.0.1v

-   开发前端界面
    -   首页组件`closed`
        - Header Footer Body
    -   文章页组件`closed`
        - Essay
    -   后台管理页面`countinue`
        - user`countinue`
        - essaylist
        - edit essay

-   完善路由跳转机制`closed`



