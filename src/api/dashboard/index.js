import request from '@/utils/request'
export const reqProductStatus = ()=>request({method:'get',url:'operator/',params:{user: 'all_start'}})
export const reqCloseAll = ()=>request({method:'get',url:'close_service/'})