const { PageModule } = require('@cloudbase/page-module');
const pageModule = new PageModule('invite-new-user');
const requestApi = async (methodName, params = {}) => {
  const objInfo = await pageModule.callMethod(methodName, params);
  const { result: { code, data } } = objInfo;
  if (code !== 0) {
    wx.showToast({
      title: '云函数调用出错',
    });
  }
  return data;
};
Component({
  options: {
    addGlobalClass: true,
  },
  /**
   * 组件的属性列表
   */
  properties: {
    phoneNum: {
      type: String,
      value: ''
    },
    show: {
      type: Boolean,
      value: false,
    },
    setting: {
      type: Object,
      value: {},
    },
    prizeInfo: {
      type: Object,
      value: {},
    },
    userCode:{
      type: String,
      value: '',
    },
    activity:{
      type: Object,
      value: {},
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    userInfo: {}
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 请求保存接口
    async saveInvitess(info){
      wx.showLoading({
        mask: true
      });
      const params  =Object.assign({
        code: this.properties.userCode,
        avatar: info.avatarUrl || info.avatar,
        nickName: info.nickName,
        prizeId: this.properties.prizeInfo.prizeId || '',
      },
      this.properties.phoneNum && {
        phoneNumber: Number(this.properties.phoneNum) || ''
      }
      )
      const registerRes = await requestApi('saveInviteInfo', params)
      if (registerRes.code !== 0) {
        wx.hideLoading();
         wx.showToast({
          title: registerRes.msg,
          icon: 'none',
          duration: 2000
        })
        return this.triggerEvent('closeDialog');
      }
      wx.hideLoading();
      wx.showToast({
        title: '领取成功',
        icon: 'none',
        duration: 2000
      })
      this.triggerEvent('closeDialog');
      // 立即完成
      if(this.properties.activity.acceptInviteSetting.prizeEvent === 'done'){
        wx.navigateTo({
          url: this.properties.activity.acceptInviteSetting.navUrl,
        })
      }else{ // 自定义事件
        this.triggerEvent('custom',{navUrl: this.properties.activity.acceptInviteSetting.navUrl});
      }

    },
    // 关闭领取弹框
    handleCloseDialog(){
      this.triggerEvent('closeDialog');
    },
    // 获取用户信息并保存信息
    async getUserProfile(e) {
      if(Object.keys(this.data.userInfo).length !== 0){
        await this.saveInvitess(this.data.userInfo);
      }
      wx.getUserProfile({
        desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
        success: async (res) => {
          this.data.userInfo = {
            code: this.properties.userCode,
            avatar: res.userInfo.avatarUrl,
            nickName: res.userInfo.nickName,
            prizeId: this.properties.prizeInfo.prizeId || '',
          }
          await this.saveInvitess(res.userInfo);
        }
      })
    },
  }
})
