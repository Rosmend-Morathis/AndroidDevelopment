// pages/mine/index.js
const db = wx.cloud.database()
const app = getApp()

Page({

    /**
     * 页面的初始数据
     */
    data: {
        
    },
    getRecords: function(e){
        db.collection('records').orderBy('submittime','desc').where({
            userid: e
        }).get().then(res => {
            this.setData({
                records: res.data
            })
        })
    },
    logout: function(){
        wx.reLaunch({
          url: '/pages/login/index',
        })
    },
    cancel: function(e){
        console.log(e)
        var info = e.currentTarget.dataset.info
        var modalContent = `即将取消${info.type} - ${info.room}的预约，\n请点击确定以继续操作`
        wx.showModal({
            title: '取消预约',
            content: modalContent,
            cancelColor: 'cancelColor',
            cancelText: '再想想',
            success: res =>{
                if(res.confirm){
                    wx.cloud.callFunction({
                        name: 'appointmentCancel',
                        data: {
                            _id: info._id,
                            room: info.room,
                            starttime: info.starttime
                        },
                        complete: funcres => {
                            console.log('callFunction test result: ', funcres)
                            var issuccess = funcres.result.issuccess
                            var msg = funcres.result.msg
                            wx.showToast({
                                title: msg,
                                icon: issuccess ? 'success' : 'error',
                              //   image: issuccess ? '/miniprogram/images/toast-t.png' : '/miniprogram/images/toast-f.png',
                                duration: 2000,
                              })
                            this.getRecords(this.data.userid)
                        }
                    })
                }
            }
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        var id = app.globalData.userid
        db.collection('users').where({
            id: id
        }).get().then(res => {
            this.setData({
                username: res.data[0].name,
                userid: id
            })
        })
        this.getRecords(id)
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
        this.getRecords(app.globalData.userid)
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
        this.getRecords(app.globalData.userid)
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