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
    styleIsolation: 'shared',
  },

  properties:{
    footerShow: {
      type: Boolean,
      value: false,
    },

  },
  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    userStatus: false,
    useCode: '',
    userRecord: [],
    awardData: [
      {
        title: '奖品标题示意',
        img: 'https://imgcache.qq.com/open_proj/proj_qcloud_v2/scene-module/Invite-prize/miniprogram/images/award1.svg',
        current: true,
      },
      {
        title: '奖品标题示意',
        img: 'https://imgcache.qq.com/open_proj/proj_qcloud_v2/scene-module/Invite-prize/miniprogram/images/award2.svg',
        current: false,
      },
      {
        title: '奖品标题示意',
        img: 'https://imgcache.qq.com/open_proj/proj_qcloud_v2/scene-module/Invite-prize/miniprogram/images/award3.svg',
        current: false,
      }
    ],
    activityData: {},
  },

  methods: {
    async setInviteRecord(){
     const {result} =  await requestApi('setInviteRecord')
    },
    getUserProfile(e) {
      if (!this.data.userStatus) {
        wx.getUserProfile({
          desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
          success: async (res) => {
            const registerRes = await requestApi('register', {
              avatar: res.userInfo.avatarUrl,
              nickName: res.userInfo.nickName,
            })
            if (registerRes.code !== 0) {
              return wx.showToast({
                title: '注册失败',
                icon: 'none'
              })
            }
            const userCheck = await requestApi('getUserInfo');
            this.setData({
              userInfo: userCheck.result ? userCheck.result : {},
              userStatus: userCheck.result.inviteCode ? true : false,
            })
            this.triggerEvent('code', userCheck.result || {});
            wx.showToast({
              title: '可再次点击邀请好友',
              icon: 'none'
            })
          }
        })
      }

    },

  },
  lifetimes: {
    async attached() {
      try {
        wx.showLoading({
          mask: true
        });
        const res = await requestApi('getActivity');
        const record = await requestApi('getInviteRecord');
        const userCheck = await requestApi('getUserInfo');
        this.triggerEvent('share', res.result.shareWords || {});
        this.triggerEvent('code', userCheck.result || {});
        this.setData({
          activityData: res.result,
          userStatus: userCheck.result.inviteCode ? true : false,
          userInfo: userCheck.result ? userCheck.result : {},
          userRecord: record.result || [],
        })
        wx.hideLoading()
      } catch (error) {
        wx.hideLoading()
        wx.showToast({
          icon:'none',
          title: '加载失败！',
        })
      }
    },
  }
})