import {
	request
} from '@/utils/api/request.js';

let baseAPI = "/news"


// 获得热门分类
export const getHotClassify = () => {
	return request({
		url: baseAPI + '/getHotClassify',
		method: 'GET'
	})

}
