// pages/AllTrainingCourses/AllTrainingCourses.js
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    userId:'',
    resdata:[],
    totalpage:'',
    pageNo:1,
    listLock: 1,
    TrainingCourses: [{
      url: '../../images/block1.png',
      title: "全部课程全部课程全部课程全部",
      des: "All courses",
      id: 1
    },
  ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  this.getData();
  },
  /*
  获取数据
  */
getData:function () {
  var that = this;
  that.setData({
    userId: wx.getStorageSync("userId"),
  })
  wx.request({
    url:  app.globalData.URL + '/app/trainingclass-list.jspx',
    data: {
      userId:that.data.userId, 
      pageNo:that.data.pageNo
    },
    method: 'GET',//方法分GET和POST，根据需要写
    header: {//定死的格式，不用改，照敲就好
      'Content-Type': 'application/json'
    },
    success: function (res) {//这里写调用接口成功之后所运行的函数
      console.log(res.data);//调出来的数据在控制台显示，方便查看
      var e = JSON.parse(res.data.json);
      console.log(e.trainingclassusers);
      that.setData({
        resdata: e.trainingclassusers,//res.data就是你调出来的所有数据（当然也可以在这里面自定义想要调用的数据），然后把值赋给resdata，之后对resdata进行处理即可，具体见wxml
        totalPage: e.totalPage,
      })
      that.data.listLock = 1;
      that.data.totalpage = e.totalPage;
      console.log('totalpage', that.data.totalpage);
      if (that.data.totalpage >= that.data.pageNo) {
          console.log('翻页之前数据', that.data.resdata) 

          var listData = that.data.resdata.concat(e.trainingclassusers);

          console.log('翻页之后数据', that.data.resdata.concat(e.trainingclassusers))
          //为下一页的请求参数做准备
          that.setData({
            resdata: listData,
              loading: false,
          });
          // wx.hideLoading();
          that.data.pageNo += 1; //页码增加，保证下次调用时为新的一页。
          console.log('翻页', that.data.pageNo);
          console.log('setData', listData);
      }




    },
    fail: function (res) {//这里写调用接口失败之后所运行的函数
      console.log('.........fail..........');
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
       console.log("ok")
       var self = this;
       console.log('totalpage', self.data.totalpage)
       console.log('page_num', self.data.pageNo)
       if (self.data.totalpage < self.data.pageNo) {
           console.log("没有新数据");
           self.setData({
               
           });
           self.data.listLock = 2;
       }
       if (self.data.listLock == 2) {
           return false;
       }
       wx.showLoading({ title: '加载中', icon: 'loading', duration: 2000 });

       self.getData(self.data.pageNo);

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})