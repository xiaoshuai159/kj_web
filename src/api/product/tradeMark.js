import request from '@/utils/request'
//获取品牌列表接口
///admin/product/baseTrademark/{page}/{limit}
export const reqTradeMarkList = (page,limit)=>request({url:`/two/admin/product/baseTrademark/${page}/${limit}`,method:'get'})
//处理添加/修改品牌
///admin/product/baseTrademark/save /admin/product/baseTrademark/update
export const reqAddOrUpdateTradeMark = (tradeMark)=>{
    if(tradeMark.id){
        return request({url:'/two/admin/product/baseTrademark/update',method:'put',data:tradeMark})
    }else{
        return request({url:'/two/admin/product/baseTrademark/save',method:'post',data:tradeMark})
    }
}
///admin/product/baseTrademark/remove/{id} 删除品牌接口
export const reqDeleteTradeMark = (id)=>request({url:`/two/admin/product/baseTrademark/remove/${id}`,method:'delete'})