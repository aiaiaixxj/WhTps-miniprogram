// pages/login/login.js
const app = getApp();
Page({
  data: {
    username: '',
    password: '',
    userId:''
  },
  // 获取输入账号 
  phoneInput: function (e) {
    this.setData({
      username: e.detail.value
    })
  },
  // 获取输入密码 
  passwordInput: function (e) {
    this.setData({
      password: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //页面加载时，从微信缓存读取账号密码
    var _this = this;
      _this.setData({
        username: wx.getStorageSync("username"),
        password: wx.getStorageSync("password"),

      })
  },
  login: function (e) {
    var that = this;
    wx.setStorageSync("username",that.data.username);
    wx.setStorageSync("password",that.data.password);
    console.log(app.globalData.URL);
    if (that.data.username.length == 0 || that.data.password.length == 0) {
      wx.showToast({
        title: '用户名和密码不能为空',
        icon: 'none',
        duration: 2000
      })
    }
    console.log("this.data.username:", that.data.username)
    wx.request({
      url: app.globalData.URL + '/app/login.jspx', //自己的服务接口地址
      method: 'post',
      data: {
        username: that.data.username,
        password: that.data.password
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log("this.data.username:", that.data.username);
        console.log(res.data);
        var e = JSON.parse(res.data.json);
        console.log(e);
        //4.解密成功后 获取自己服务器返回的结果
        if (res.data.code == 1) {
          wx.setStorageSync("userId",e.userId);
          wx.navigateTo({
            url: '../index/index'
          });
        } else {
          console.log('账号或密码错误')
        }
      },
      fail: function () {
        console.log('系统错误')
      }
    })
  },
  copyCode: function () {
    wx.setClipboardData({
      data: code,
      success: function () {
        wx.showToast({
          title: '复制成功',
        })
      }
    })
  },
})