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
    styleIsolation: 'shared'
  },
  properties: {
    userCode: { // 用户邀请码
      type: String,
      value: '',
    },
    ownJumpUrl:{
      type: String,
      value: ''
    }
  },
  /**
   * 页面的初始数据
   */
  data: {
    dialogShow: false,
    getPhoneDialog: false,
    activityData: {},
    userInfo: {},
    phoneNum: '',
  },

  methods: {
    // 自定义事件
    taskSucCustom(e){
      this.triggerEvent('custom',{navUrl: this.data.activityData.acceptInviteSetting});
    },
    // 获取邀请人信息
    async getInviteInfo(){
      wx.showLoading({
        mask: true
      });
      const {result,code} = await requestApi('getInviteInfo',{userCode: this.properties.userCode});
      if(code !== 0){
        wx.hideLoading()

       return wx.showToast({
          title: '获取邀请人信息失败',
          icon: 'none'
        })
      }
      wx.hideLoading()

      this.setData({
        userInfo: result,
      })
    },
    // 判断是否为本人
    async checkUser(){
      // const {result} = await requestApi('checkUser');
      // if(result){
      //   wx.navigateTo({
      //     url: this.properties.ownJumpUrl,
      //   })
      // }
    },
    openGetPhoneDailog(){
      this.setData({
        getPhoneDialog: true
      })
    },
    closeGetPhoneDailog(){
      this.setData({
        getPhoneDialog: false
      })
    },
    // 打开立即领取弹框
    openDialog() {
      if(this.data.activityData.getPhoneNumPageSetting?.isOpen === 1 && this.data.phoneNum === ''){
        return this.setData({
          getPhoneDialog: true
        })
      }
      this.setData({
        dialogShow: true
      })

    },
    // 关闭立即领取弹框
    doCloseDialog() {
      this.setData({
        dialogShow: false
      })
    },
    // 获取手机号
   async  getPhoneNumber(e) {
     wx.showLoading({
       mask: true
     });
      const {result,code} = await requestApi('getUserPhoneNum',{code:e.detail.cloudID});
      if(code !== 0){
        wx.hideLoading()
        this.closeGetPhoneDailog();
        return wx.showToast({
          title: '获取手机号失败',
          icon: 'none'
        })
      }
      wx.hideLoading()

      this.setData({
        phoneNum: result.phoneNum || '',
      })
      this.closeGetPhoneDailog();
      this.openDialog();
    }
  },
  lifetimes: {
    async attached() {
      await this.checkUser();
      await this.getInviteInfo();
      const res = await requestApi('getActivity');
      this.setData({
        activityData: res.result
      })
    }
  }


})