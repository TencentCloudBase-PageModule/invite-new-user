# 邀请有礼

## 概述

## 目录说明

```
   ├─ components 
   │  ├─ _bas e# 基础组件，外部请勿依赖
   │  │  ├─ halfScreenDialog
   │  │  ├─ inviteCard
   │  │  ├─ inviteDialog
   │  │  │  └─ index.wxss
   │  │  ├─ readme.md
   │  │  └─ styles
   │  │     └─ common.wxss
   │  ├─ inviteAccept # 对外暴露的组件，请在页面中引用该组件
   │  ├─ invitePrize # 对外暴露的组件，请在页面中引用该组件
   │  └─ readme.md 组件说明
   ├─ example # 示例页面，简单对组件的引用拼装
   │  ├─ index # 邀请有礼主界面
   │  ├─ inviteAccept # 邀请有礼发起邀请界面
   └─ README.md # 概述该模块，对外暴露组件简介
```

## 组件介绍

1. 邀请有礼组件 [invitePrize](./components/invitePrize/README.md)
2. 接受邀请组件 [inviteAccept](./components/inviteAccept/README.md)

## 注意事项

1. 需要在详情中本地设置开启将JS编译成ES5。
2. 需要在app.json导入接受邀请页面地址。

## 上手介绍

1. 【必选】[邀请有礼主界面配置](./components/invitePrize)
2. 【必选】[接受邀请界面配置](./components/inviteAccept)
3. 【必选】管理端配置活动
4. 【必选】[业务系统联动打通](https://github.com/TencentCloudBase-PageModule/invite-new-user/blob/dev/docs/diy.md)
   1. 配置自定义接口 发放积分send_face_value接口、发放奖品send_prize接口 到云函数
   2. 设置定时云函数，调用邀请有礼的服务器端接口 `timedTask` 进行数据统计
   3. 自定义任务：系统支持接受邀请即完成，业务也可以自定义完成任务条件。在任务完成时调用 `setInviteStatus`  设置用户任务状态

