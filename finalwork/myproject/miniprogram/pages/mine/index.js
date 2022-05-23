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
        db.collection('records').where({
            userid: e
        }).get().then(res => {
            this.setData({
                records: res.data
            })
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