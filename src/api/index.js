//将四个模块请求的接口函数统一暴露
import * as trademark from './product/tradeMark'
import * as dashboard from './dashboard/index'
import * as replay from './replay/index'
export default{
    trademark,
    dashboard,
    replay
}
// export const reqAddOrUpdateTradeMark = (tradeMark)=>{
//         return request({url:'/two/admin/product/baseTrademark/update',method:'put',data:tradeMark})
// }