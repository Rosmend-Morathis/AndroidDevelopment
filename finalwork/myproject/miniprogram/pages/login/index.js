// pages/login/index.js
const app = getApp()

Page({

    /**
     * 页面的初始数据
     */
    data: {

    },

    login: function(data){
        // console.log(data)
        var userid = data.detail.value.uid
        var userpwd = data.detail.value.upwd
        wx.cloud.callFunction({
            name: 'login',
            data: {
                userid: userid,
                userpwd: userpwd
            },
            complete: res => {
              console.log('callFunction test result: ', res)
              var access = res.result.access
              var msg = res.result.msg
              wx.showToast({
                title: msg,
                icon: access ? 'success' : 'error',
                // image: access ? '/images/toast-t.png' : '/images/toast-f.png',
                duration: 2000,
              })
              setTimeout(()=>{
                if (access) {
                    // 跳转到首页
                    app.globalData.userid = userid
                    wx.switchTab({
                      url: '/pages/index/index',
                    })
                  }
              }, 2000)
              
            }
          })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        app.globalData.userid = ""
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})