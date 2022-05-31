// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({env: 'cloud1-1g5irf3dd95e8df3'})

// 云函数入口函数
exports.main = async (event, context) => {
    var issuccess = false
    var msg = ""
    const wxContext = cloud.getWXContext()
    await cloud.database().collection('records').doc(event._id).update({
        data: {
            state: "已取消"
        }
    })
    await cloud.database().collection('records').orderBy('starttime', 'desc').where(
        {
            state: "预约中",
            room: event.room
        }).get().then(
        async(res) => {
            if(res.data.length == 0){
                await cloud.database().collection('rooms').where({name: event.room}).get().then(
                async(roomres) => {
                    let roomid = roomres.data[0]._id
                    await cloud.database().collection('rooms').doc(roomid).update({
                        data: {
                            state: "空闲"
                        }
                    })
                })
            }
        }
    )
    msg = "操作成功"
    issuccess = true

    return {
        msg: msg,
        issuccess: issuccess,
    }
}