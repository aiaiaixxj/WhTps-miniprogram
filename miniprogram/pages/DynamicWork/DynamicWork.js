const app = getApp()

Page({
  data: {

  },
  gotoOtherPages: function (e){
   
    let index =e.currentTarget.dataset.index;
    // console.log(index);
  },
  
onLoad: function (options) {
  var that = this;
  
  wx.request({
    url: app.globalData.URL +'/app/content-list.jspx',
    data:{
      channelId:2
    },
    method: 'GET',//方法分GET和POST，根据需要写
    header: {//定死的格式，不用改，照敲就好
      'Content-Type': 'application/json'
    },
    success: function (res) {//这里写调用接口成功之后所运行的函数
      console.log(res.data);//调出来的数据在控制台显示，方便查看
      var e = JSON.parse(res.data.json);
      console.log(e.contents);
      that.setData({
        resdata: e.contents,//res.data就是你调出来的所有数据（当然也可以在这里面自定义想要调用的数据），然后把值赋给resdata，之后对resdata进行处理即可，具体见wxml
      })
    },
    fail: function (res) {//这里写调用接口失败之后所运行的函数
      console.log('.........fail..........');
    }
  })
},


})
