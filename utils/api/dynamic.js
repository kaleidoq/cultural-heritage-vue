import {
	request
} from '@/utils/api/request.js';

let baseAPI = "/dynamic"

// 登录
export const getFollowDynamic = (length) => {
	return request({
		url: baseAPI + '/getFollowDynamic',
		method: 'GET',
		data: {
			length: length
		}
	})
}
