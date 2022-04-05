# 邀请有礼首页组件

## 事件属性

| 属性   | 类型   | 示例                          | 说明               |
| ------ | ------ | ----------------------------- | ------------------ |
| custom | string | bind:custom = "taskSucCustom" | 领取成功后触发事件 |

## 组件属性

| 属性       | 类型   | 示例                                                    | 说明             |
| ---------- | ------ | ------------------------------------------------------- | ---------------- |
| ownJumpUrl | string | ownJumpUrl = "/scene-module/invite/example/index/index" | 邀请有礼首页路径 |
| userCode   | string | userCode = "{{userCode}}"                               | 邀请码           |

## 代码示例

```js
// index.wxml
<inviteAccept 
  userCode = "{{userCode}}"
  ownJumpUrl = "/page_module/invite/example/index/index" 
  bind:custom = "taskSucCustom"
>
</inviteAccept>
// index.js

Page({
  /**
   * 页面的初始数据
   */
  data: {
    userCode: '',
  },
  /**
   * 获取邀请码
   */
  onLoad: function (options) {
    this.setData({
      userCode: options.code,
    })
  },
  /**
   * 被邀请人领取完成后自定义事件
   */
  taskSucCustom(e){
  }
})
```

## 注意事项

1. 需要手动配置邀请有礼首页路径(example/inviteAccept/index.js中onUserCode)
2. 需要手动配置完成领取后事件方法(example/inviteAccept/index.js中taskSucCustom)
3. 需要手动配置获取邀请码属性(example/index/inviteAccept中data内shareJumpUrl)
