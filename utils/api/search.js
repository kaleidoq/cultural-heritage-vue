import {
	request
} from '@/utils/api/request.js';

let baseAPI = "/search"


// 历史搜索信息
export const getSearchHistory = (options) => {
	return request({
		url: baseAPI + '/getSearchHistory',
		method: 'GET',
		data: options
	})
}

// 热门搜索
export const getHotSearch = (options) => {
	return request({
		url: baseAPI + '/getHotSearch',
		method: 'GET',
		data: options
	})
}


// 搜索文章信息
export const searchArticle = (options) => {
	return request({
		url: baseAPI + '/searchArticle',
		method: 'POST',
		data: options
	})
}




// 搜索用户数据
export const searchUser = (options) => {
	return request({
		url: baseAPI + '/searchUser',
		method: 'GET',
		data: options
	})
}
