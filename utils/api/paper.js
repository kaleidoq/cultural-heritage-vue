import {
	request
} from '@/utils/api/request.js';

let baseAPI = "/paper"


// 获得消息列表
export const getChatList = (options) => {
	return request({
		url: baseAPI + '/getChatList',
		method: 'GET',
		data: options
	})
}

//提交聊天信息
export const submitChat = (options) => {
	return request({
		url: baseAPI + '/submitChat',
		method: 'POST',
		data: options
	})
}


//获得聊天列表信息
export const getPaperList = (options) => {
	return request({
		url: baseAPI + '/getPaperList',
		method: 'GET',
		data: options
	})
}
