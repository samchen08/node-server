# 使用说明

## 安装

    npm install
    
## 修改配置

### 修改http端口

    package.json httpPort
    
### 修改日志存放位置
    "log4js": {
     "appenders": [
       {
         "type": "console"
       },
       {
         "type": "file",
         "filename": "logs/access.log",
         "maxLogSize": 1024000,
         "backups": 3,
         "category": "normal"
       }
     ]
    }
    
### 目录和文件说明
    server -- 存放后端代码
    static -- 存放静态文件,如:css img js html
    views -- 存放jade模版
    logs -- 存放日志文件,自动生成
    bin -- 服务启动/停止脚本
    
    app.js -- 服务程序启动入口
    server.js -- http服务
    logger.js -- 日志操作对象
    package.json --配置文件
    