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
        console.log(e)
        var starttime = e.detail.value
        let now = Date.parse(new Date(this.data.time.replace(/-/g, '/')))
        let st = Date.parse(new Date(utils.concatDate(this.data.date, starttime).replace(/-/g, '/')))
        if (st <= now) {
            wx.showModal({
              showCancel: false,
              content: '请选择有效的开始时间'
            })
        } else{
            this.setData({
                starttime: starttime
            })
        }
    },
    bindEndTimeChange: function(e){
        // console.log(e)
        var endtime = e.detail.value
        let st = Date.parse(new Date(utils.concatDate(this.data.date, this.data.starttime).replace(/-/g, '/')))
        let now = Date.parse(new Date(this.data.time.replace(/-/g, '/')))
        let et = Date.parse(new Date(utils.concatDate(this.data.date, endtime).replace(/-/g, '/')))
        if (et <= st || et <= now) {
            wx.showModal({
              showCancel: false,
              content: '请选择有效的结束时间'
            })
        } else{
            this.setData({
                endtime: endtime
            })
        }
    },
    appoint: function(date){
        
        var submittime = utils.formatTime(new Date())
        var starttime = utils.concatDate(this.data.date.replace(/-/g, '/'), this.data.starttime)
        var endtime = utils.concatDate(this.data.date.replace(/-/g, '/'), this.data.endtime)
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
        // console.log(options)
        var time = new Date()
        var now = utils.formatTime(time)
        var today = utils.formatDateForAndroid10(time)
        time.setTime(time.getTime() + 3*24*60*60*1000)
        var endday = utils.formatDateForAndroid10(time)
        // console.log(now)
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