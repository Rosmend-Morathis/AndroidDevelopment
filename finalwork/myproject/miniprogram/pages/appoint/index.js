// pages/appoint/index.js
const app = getApp()

Page({

    /**
     * 页面的初始数据
     */
    data: {
        room:"",
        date: "2022-05-22",
        today: "2022-05-22",
        enddate: "2022-05-25",
        starttime:"06:00",
        endtime:"22:00"
    },
    bindDateChange: function(e){
        console.log(e)
        var aptdate = e.detail.value
        this.setData({
            date: aptdate
        })
    },
    bindStartTimeChange: function(e){
        console.log(e)
        var starttime = e.detail.value
        this.setData({
            starttime: starttime
        })
    },
    bindEndTimeChange: function(e){
        console.log(e)
        var endtime = e.detail.value
        this.setData({
            endtime: endtime
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        console.log(options)
        this.setData({
            room: options.info,
            userid: app.globalData.userid
        })
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