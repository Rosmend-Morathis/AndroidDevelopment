// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({env: 'cloud1-1g5irf3dd95e8df3'})

// 云函数入口函数
exports.main = async (event, context) => {
    const wxContext = cloud.getWXContext()
    const now = new Date()
    var start
    var end
    await cloud.database().collection('records').orderBy('submittime', 'asc').where({state: "预约中"}).get().then(
        res => {
            res.data.forEach(element => {
                start = new Date(element.starttime)
                end = new Date(element.endtime)
                if (now < start){
                    cloud.database().collection('rooms').where({name: element.room}).get().then(
                        r =>{
                            var target = r.data[0]
                            cloud.database().collection('rooms').doc(target._id).update({
                                data: {
                                    state: "预约中"
                                }
                            })
                        }
                    )
                }
                if (start <= now) {
                    cloud.database().collection('records').doc(element._id).update({
                        data: {
                            state: "已完成"
                        }
                    })
                }
                if (now < end) {
                    cloud.database().collection('rooms').where({name: element.room}).get().then(
                        r =>{
                            var target = r.data[0]
                            cloud.database().collection('rooms').doc(target._id).update({
                                data: {
                                    state: "使用中"
                                }
                            })
                        }
                    )
                }
                if (now >= end) {
                    cloud.database().collection('rooms').where({name: element.room}).get().then(
                        r =>{
                            var target = r.data[0]
                            cloud.database().collection('rooms').doc(target._id).update({
                                data: {
                                    state: "空闲"
                                }
                            })
                        }
                    )
                }
            });
        }
    )

    return {
        event,
        openid: wxContext.OPENID,
        appid: wxContext.APPID,
        unionid: wxContext.UNIONID,
    }
}