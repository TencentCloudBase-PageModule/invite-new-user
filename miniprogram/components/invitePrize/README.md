# 邀请有礼首页组件

## 事件属性

| 属性  | 类型   | 示例                   | 说明               |
| ----- | ------ | ---------------------- | ------------------ |
| share | string | bind:share="onShare"   | 获取透传的分享话术 |
| code  | string | bind:code="onUserCode" | 获取透传的邀请码   |

## 代码示例

```js
// index.wxml
<invitePrize id = "prize" bind:share="onShare" bind:code="onUserCode"  ></invitePrize>

// index.js

Page({
  /**
   * 页面的初始数据
   */
  data: {
    userCode: '', // 邀请码
    shareWords: '', // 邀请介绍
    footerBtn: false,   // 底部按钮显示/隐藏
    shareJumpUrl: '/page_module/invite/example/inviteAccept/index' // 分享跳转链接需自行配置
  },
  /**
   * 控制底部按钮显示/隐藏
   */
  onPageScroll: function(e) {
    // 引用组件时根据id获取组件方法
    this.selectComponent('#prize').onPageScrollEvent(e);
},
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: this.data.shareWords,
      path: `${this.data.shareJumpUrl}?code=${this.data.userCode}`,
    }
  },
  /**
   * 获取分享话术
   */
  onShare: function (e) {
    this.setData(
      { shareWords: e.detail || {}}
    )
  },
  /**
   * 获取用户邀请码
   */
  onUserCode: function(e){
    this.setData(
      { userCode: e.detail.inviteCode || ''}
    )
  }
})
```

## 注意事项

1. 需要手动配置获取邀请码事件方法(example/index/index.js中onUserCode)
2. 需要手动配置获取分享话术事件方法(example/index/index.js中onShare)
3. 需要手动配置分享跳转路径(example/index/index.js中data内shareJumpUrl)
4. 需要绑定组件id后控制底部按钮显隐
