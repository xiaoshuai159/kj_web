import request from '@/utils/request'
export const reqNetCardList = ()=>request({method:'get',url:'get_network/',params:{user: 'net_card'}})
export const reqfileList = (param)=>request({method:'get',url:'pcap_replay/',headers:{ "Content-Type": "multipart/form-data" },params:param})