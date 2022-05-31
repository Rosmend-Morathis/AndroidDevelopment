// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({env: 'cloud1-1g5irf3dd95e8df3'})

// 云函数入口函数
exports.main = async (event, context) => {
    let issuccess = false
    let msg = ""
    var apt
    var end
    const wxContext = cloud.getWXContext()
    await cloud.database().collection('rooms').where({name: event.room}).get().then(
       async(res) => {
            try {
                if(res.data[0].state == "空闲"){
                    await cloud.database().collection('rooms').doc(res.data[0]._id).update({
                        data: {
                            state: "预约中"
                        }
                    })
                    issuccess = true
                }else{
                    await cloud.database().collection('records').where({room: event.room}).get().then(
                        async(recs) => {
                            let flag = true
                            apt = new Date(event.starttime)
                            recs.data.forEach(element => {
                                end = new Date(element.endtime)
                                if(end > apt){
                                    flag = false
                                }
                            });
                            tag = flag
                            if(flag){
                                issuccess = true
                            }
                        }
                    )      
                }
            }catch{
                msg = "预约失败"
            }
            if(issuccess){
                cloud.database().collection('records').add({
                    data: {
                        room: event.room,
                        type: event.type,
                        userid: event.userid,
                        starttime: event.starttime,
                        endtime: event.endtime,
                        submittime: event.submittime,
                        state: "预约中"
                    },
                })
                msg = "预约成功"
            }else{
                msg = "预约失败"
            }
        }
    )

    return {
        issuccess: issuccess,
        msg : msg
    }
}