# Ham &nbsp; [![Join the chat at https://gitter.im/whu-ham/community](https://img.shields.io/badge/chat-on%20gitter-28BC99.svg)](https://gitter.im/whu-ham/community?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

**武汉大学生活助手——查询课表、跑步、预约武汉大学图书馆**


### 下载和安装

Android版：[点击查看最新版本](https://github.com/orangeboyChen/whu-ham/releases/)

iOS版：[点击此处进入App Store下载](https://apps.apple.com/cn/app/ham/id1577896044)，或[点击加入TestFlight内测](https://testflight.apple.com/join/waKNnCG3)



### 它能做什么

- 导入武汉大学课程表（研究生课表仅限Android版，当然iOS版也快了）

- 添加/修改课程、自定义课程表的样式

- 课程提醒

- 制定跑步计划

- 按照条件预约图书馆

- 自动预约图书馆（iOS版可使用捷径+自动化进行自动预约，Android版需要开启自启动）

- 更改图书馆预约时间

- 课程表、图书馆预约小组件支持（Android、iOS均可）

其中预约图书馆功能已加入识别验证码。使用前你需要输入你的腾讯云账户信息，务必开通腾讯云OCR服务。每月有一千次的免费额度，我觉得这大概够用了吧。



### 它安全吗

放心，Ham并不会像某些已经停止服务的小程序（特指zswd）一样，将你的学号密码发送到他们的服务器，再进行验证。你的账户信息仅保存在本地，你的手机将直接从学校服务器获取数据，而不会通过第三方转发。Ham虽然有后台服务器，但仅仅用于存放新版本的应用信息。如果是iOS版，甚至不会访问Ham的后台服务器。

当然了，后续可能会有查给分等功能，需要用到后台服务器。但请放心，Ham在传输你的信息时，务必通过你的同意。而且Ham不会直接传输关键信息（学号、密码等）。你的关键信息（学号等）在进行哈希运算后再传输至服务器，这样我也不知道是谁的成绩。（当然，这个还没做就是了，嘻嘻）



### 为啥暂不开源

项目里有很多我的账号信息，包括推送服务、苹果的开发者账号等，所以暂时不打算开源。虽然闭源，但它是完全免费的。
如果你有好的建议，欢迎在gitter一起交流，也欢迎大家在gitter进行技术讨论！

