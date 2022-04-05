Component({
  options: {
    addGlobalClass: true,
  },
  /**
   * 组件的属性列表
   */
  properties: {
    halfShow: {
      type: Boolean,
      value: '',
    },
    title:{
      type:Boolean,
      value:false
    },
    exclass:{
      type:String,
      value:''
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleCloseHalfDialog() {
      this.triggerEvent('close');
    },
  },
});