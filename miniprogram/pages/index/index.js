//index.js
const app = getApp()

Page({
  onShareAppMessage() {
    return {
      title: 'swiper',
      path: '../../miniprogram_npm/vant-weapp/swiper'
    }
  },
  data: {
    isVal: "xxj",
    avatarUrl: './user-unlogin.png',
    userInfo: {},
    logged: false,
    takeSession: false,
    requestResult: '',
    country: '',
    indicatorDots: true,
    vertical: false,
    autoplay: false,
    interval: 2000,
    duration: 500,
    active: 0,
    bg: [
      // require('../../images/bg_top.png')
      // {url:'../../images/bg_bottom.png'},
      // {url:'../../images/info_area.png'}
    ],
    icon: {
      normal: 'https://img.yzcdn.cn/vant/user-inactive.png',
      active: 'https://img.yzcdn.cn/vant/user-active.png',
    },
    MyCourses: [{
        url: '../../images/block1.png',
        title: "课程列表",
        des: "All courses",
        id: 1
      },
      {
        url: '../../images/block2.png',
        title: "培训班列表",
        des: "All training courses",
        id: 2
      },
      {
        url: '../../images/block3.png',
        title: "课程记录",
        des: "Training Course record",
        id: 3
      },
      {
        url: '../../images/block4.png',
        title: "培训班记录",
        des: "Course record",
        id: 4
      },
      {
        url: '../../images/block5.png',
        title: "工作动态",
        des: "Dynamic work",
        id: 5
      },
    ]
   
  },
  onChange(event) {
    this.setData({
      active: event.detail
    });
  },
  gotoOtherPages: function (e) {
    let aimtext = e.currentTarget.dataset.text; //获取点击目标文本title
    let index =e.currentTarget.dataset.index;
    console.log(index);
    console.log(aimtext);
    if ("课程列表" == aimtext) {
      wx.navigateTo({
        url: '../Allcourses/Allcourses'
      });
    }
    if ("培训班列表" == aimtext) {
      wx.navigateTo({
        url: '../AllTrainingCourses/AllTrainingCourses'
      });
    }
    if ("课程记录" == aimtext) {
      wx.navigateTo({
        url: '../CourseRecord/CourseRecord'
      });
    }
    if ("培训班记录" == aimtext) {
      wx.navigateTo({
       
        url: '../TrainingCoursesRecord/TrainingCoursesRecord'
      });
    }
    if ("工作动态" == aimtext) {
      wx.navigateTo({
        url: '../DynamicWork/DynamicWork'
      });
    }
    if ("联系我们" == aimtext) {
      wx.navigateTo({
        url: '../openapi/openapi'
      });
    }
    if ("关于我们" == aimtext) {
      wx.navigateTo({
        url: '../storageConsole/storageConsole'
      });
    }
    if ("更多" == aimtext) {
      wx.navigateTo({
        url: '../userConsole/userConsole'
      });
    }

  },
  changeIndicatorDots() {
    this.setData({
      indicatorDots: !this.data.indicatorDots
    })
  },

  changeAutoplay() {
    this.setData({
      autoplay: !this.data.autoplay
    })
  },

  intervalChange(e) {
    this.setData({
      interval: e.detail.value
    })
  },

  durationChange(e) {
    this.setData({
      duration: e.detail.value
    })
  },

  onLoad: function () {
   

    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              this.setData({
                avatarUrl: res.userInfo.avatarUrl,
                userInfo: res.userInfo,
                country: res.userInfo.country

              })
              console.log(res.userInfo)
              console.log(res.userInfo.country)
            }
          })
        }
      }
    })
  },

  onGetUserInfo: function (e) {
    if (!this.data.logged && e.detail.userInfo) {
      this.setData({
        logged: true,
        avatarUrl: e.detail.userInfo.avatarUrl,
        userInfo: e.detail.userInfo
      })
    }
  },

  onGetOpenid: function () {
    // 调用云函数
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        console.log('[云函数] [login] user openid: ', res.result.openid)
        app.globalData.openid = res.result.openid
        wx.navigateTo({
          url: '../userConsole/userConsole',
        })
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
        wx.navigateTo({
          url: '../deployFunctions/deployFunctions',
        })
      }
    })
  },

  // 上传图片
  doUpload: function () {
    // 选择图片
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {

        wx.showLoading({
          title: '上传中',
        })

        const filePath = res.tempFilePaths[0]

        // 上传图片
        const cloudPath = 'my-image' + filePath.match(/\.[^.]+?$/)[0]
        wx.cloud.uploadFile({
          cloudPath,
          filePath,
          success: res => {
            console.log('[上传文件] 成功：', res)

            app.globalData.fileID = res.fileID
            app.globalData.cloudPath = cloudPath
            app.globalData.imagePath = filePath

            wx.navigateTo({
              url: '../storageConsole/storageConsole'
            })
          },
          fail: e => {
            console.error('[上传文件] 失败：', e)
            wx.showToast({
              icon: 'none',
              title: '上传失败',
            })
          },
          complete: () => {
            wx.hideLoading()
          }
        })

      },
      fail: e => {
        console.error(e)
      }
    })
  },

})