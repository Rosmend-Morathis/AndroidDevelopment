// pages/rooms/index.js
const db = wx.cloud.database()
const app = getApp()

Page({

    /**
     * 页面的初始数据
     */
    data: {
        userid: "",
        rooms:[],
        subNavShowMode:["none", "none", "none"],
        shade: "none"
    },
    gotoAppoint: function(e){
        var obj = e.currentTarget.dataset.info
        var room = obj.name
        var type = obj.type
        // console.log(info)
        wx.navigateTo({
          url: '/pages/appoint/index?type='+type+'&room='+room,
        })
    },
    touchShade: function(){
        this.setData({ 
            subNavShowMode:["none", "none", "none"],
            shade: "none" 
        })
    },
    selectRooms: function(e){
        var idx = e.currentTarget.dataset.whichone * 1
        var sublist = this.data.subNavShowMode[idx]
        if(sublist == "none"){
            this.setData({
                subNavShowMode:["none", "none", "none"],
                [`subNavShowMode[${idx}]`]: "flex",
                shade: "flex"
            })
        } else{
            this.setData({
                [`subNavShowMode[${idx}]`]:"none",
                shade: "none"
            })
        }
    },
    selectByType: function(e){
        var type = e.currentTarget.dataset.roomtype
        db.collection('rooms').where({
            type: type
        }).get().then(res => {
            this.setData({ 
                rooms: res.data,
                subNavShowMode:["none", "none", "none"],
                shade: "none"
            })
        })
    },
    selectByFloor: function(e){
        var floor = e.currentTarget.dataset.roomfloor * 1
        db.collection('rooms').where({
            floor: floor
        }).get().then(res => {
            this.setData({
                rooms: res.data,
                subNavShowMode:["none", "none", "none"],
                shade: "none"
            })
        })
    },
    selectByState: function(e){
        var state = e.currentTarget.dataset.roomstate
        db.collection('rooms').where({
            state: state
        }).get().then(res => {
            this.setData({
                rooms: res.data,
                subNavShowMode:["none", "none", "none"],
                shade: "none"
            })
        })
    },
    selectAll: function(){
        db.collection('rooms').get().then(res => {
            this.setData({
                rooms: res.data,
                subNavShowMode:["none", "none", "none"],
                shade: "none"
            })
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        this.setData({
            userid: app.globalData.userid
        })
        this.selectAll()
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
        this.selectAll()
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
        this.selectAll()
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