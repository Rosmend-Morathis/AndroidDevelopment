// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({env: 'cloud1-1g5irf3dd95e8df3'})

// 云函数入口函数
exports.main = async (event, context) => {
    const wxContext = cloud.getWXContext()
    let msg = "";
    let access = false;
    await cloud.database().collection('users').where({id: event.userid}).get().then(
        res =>{
            try{
                if( res.data[0].pwd == event.userpwd){
                        msg = "登录成功"
                        access = true
                }else{
                        msg = "密码不正确"
                }
            }catch{
                    msg = "账户不存在"
            }  
        })
    return {
        event,
        msg: msg,
        access: access
    }
}