Page({

  /**
   * 页面的初始数据
   */
  data: {
    userCode: '', // 邀请码
    shareWords: '', // 邀请介绍
    footerBtn: false,   // 底部按钮显示/隐藏
    shareJumpUrl: '/page_module/invite-new-user/example/inviteAccept/index' // 分享跳转链接
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },
  onPageScroll: function(e) {
    if(e.scrollTop > 400 && !this.data.footerBtn){
      this.setData({
        footerBtn: !this.data.footerBtn,
      })
    }
    if(e.scrollTop < 400 && this.data.footerBtn){
      this.setData({
        footerBtn: !this.data.footerBtn,
      })
    }
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
  onShare: function (e) {
    this.setData(
      { shareWords: e.detail || {}}
    )
  },
  onUser: function(e){
    this.setData(
      { userCode: e.detail.inviteCode || ''}
    )
  }
})