//将四个模块请求的接口函数统一暴露
import * as trademark from './product/tradeMark'

export default{
    trademark,

}
// export const reqAddOrUpdateTradeMark = (tradeMark)=>{
//         return request({url:'/two/admin/product/baseTrademark/update',method:'put',data:tradeMark})
// }