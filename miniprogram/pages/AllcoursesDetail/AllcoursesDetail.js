// pages/AllTrainingCourses/AllTrainingCourses.js
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    courseId: '',
    userId: '',
    detail: [],
    totalpage: '',
    pageNo: 1,
    listLock: 1,
    pageSize: 20,
    hasMoreData: true,
    videoCurrentTime:1,
    times:1,
    videoDuration:1,
    TrainingCourses: [{
      url: '../../images/block1.png',
      title: "全部课程全部课程全部课程全部",
      des: "All courses",
      id: 1
    }, ],
  },
  timeUpdate(e) {
    var that = this;
    that.setData({
      videoCurrentTime:Math.floor(e.detail.currentTime) ,
      videoDuration: Math.floor(e.detail.duration) 
    })
    console.log("times",that.data.videoCurrentTime);
    console.log( "courseId:", that.data.courseId);
    console.log("userId:", that.data.userId);
    console.log("videoDuration:", that.data.videoDuration);
  },
  videoErrorCallback: function (e) {
    console.log('视频错误信息:' + e.detail.errMsg);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var courseId = options.index;
    console.log(courseId);
    var that = this;
    that.setData({
      courseId: courseId
    });
    that.getData();
    setInterval(() => {
      setTimeout(() => {
        wx.request({
          url: app.globalData.URL + '/app/course/join.jspx',
          data: {
            courseId: that.data.courseId,
            userId: that.data.userId,
            times:that.data.videoCurrentTime 
          },
          method: 'GET', //方法分GET和POST，根据需要写
          header: { //定死的格式，不用改，照敲就好
            'Content-Type': 'application/json'
          },
          success: function (res) { //这里写调用接口成功之后所运行的函数
            console.log(res); //调出来的数据在控制台显示，方便查看
            console.log("看视频当前进度接口调用成功！")
            // var e = JSON.parse(res.data.json);
            // console.log(e);
            that.setData({
              // detail: e, //res.data就是你调出来的所有数据（当然也可以在这里面自定义想要调用的数据），然后把值赋给resdata，之后对resdata进行处理即可，具体见wxml

            })
          },
          fail: function (res) { //这里写调用接口失败之后所运行的函数
            console.log('.........fail..........');
          },
          complete: function () {

          }
        })
      }, 0)
    }, 60*1000);

  },
  /*
  获取数据
  */
  getData: function () {

    var that = this;
    that.setData({
      userId: wx.getStorageSync("userId"),
    })
    wx.request({
      url: app.globalData.URL + '/app/course-info.jspx',
      data: {
        userId: that.data.userId,
        courseId: that.data.courseId
      },
      method: 'GET', //方法分GET和POST，根据需要写
      header: { //定死的格式，不用改，照敲就好
        'Content-Type': 'application/json'
      },
      success: function (res) { //这里写调用接口成功之后所运行的函数
        console.log(res.data); //调出来的数据在控制台显示，方便查看
        var e = JSON.parse(res.data.json);
        console.log(e);
        that.setData({
          detail: e, //res.data就是你调出来的所有数据（当然也可以在这里面自定义想要调用的数据），然后把值赋给resdata，之后对resdata进行处理即可，具体见wxml
            
        })
      },
      fail: function (res) { //这里写调用接口失败之后所运行的函数
        console.log('.........fail..........');
      },
      complete: function () {

      }
    })
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
})