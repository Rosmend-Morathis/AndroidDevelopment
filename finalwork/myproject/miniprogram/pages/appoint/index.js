// pages/appoint/index.js
const app = getApp()
const utils = require("../../utils/utils.js")

Page({

    /**
     * 页面的初始数据
     */
    data: {
        // 界面用数据
        time: "",
        today: "",
        enddate: "",
        // 预约用数据
        room: "",
        type: "",
        date: "",
        starttime: "08:00",
        endtime: "20:00"
    },
    bindDateChange: function(e){
        console.log(e)
        var aptdate = e.detail.value
        this.setData({
            date: aptdate
        })
    },
    bindStartTimeChange: function(e){
        // console.log(e)
        var starttime = e.detail.value
        let st = utils.concatDate(this.data.date, starttime)
        
            this.setData({
                starttime: starttime
            })
        
    },
    bindEndTimeChange: function(e){
        // console.log(e)
        var endtime = e.detail.value
        let et = utils.concatDate(this.data.date, endtime)
        let st = utils.concatDate(this.data.date, this.data.starttime)
        // console.log(et)
        // console.log(st)
        
            this.setData({
                endtime: endtime
            })
        
        this.setData({
            endtime: endtime
        })
    },
    appoint: function(date){
        
        var submittime = utils.formatTime(new Date())
        var starttime = utils.concatDate(this.data.date, this.data.starttime)
        var endtime = utils.concatDate(this.data.date, this.data.endtime)
        wx.cloud.callFunction({
            name: 'appoint',
            data: {
                room: this.data.room,
                type: this.data.type,
                date: this.data.date,
                starttime: starttime,
                endtime: endtime,
                submittime: submittime,
                userid: this.data.userid
            },
            complete: res => {
                console.log('callFunction test result: ', res)
                var issuccess = res.result.issuccess
                var msg = res.result.msg
                wx.showToast({
                  title: msg,
                  icon: issuccess ? 'success' : 'error',
                //   image: issuccess ? '/miniprogram/images/toast-t.png' : '/miniprogram/images/toast-f.png',
                  duration: 2000,
                })
                setTimeout(()=>{
                    wx.navigateBack({
                        delta: 1,
                    })
                }, 2000)
                
            }
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        console.log(options)
        var time = new Date()
        var now = utils.formatTime(time)
        var today = utils.formatDate(time)
        time.setTime(time.getTime() + 3*24*60*60*1000)
        var endday = utils.formatDate(time)
        console.log(now)
        this.setData({
            time: now,
            date: today,
            today: today,
            enddate: endday,
            type: options.type,
            room: options.room,
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