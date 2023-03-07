import {
	request
} from '@/utils/api/request.js';

let baseAPI = "/user"

// 登录
export const userLogin = (options) => {
	// return axios.post('/api/user/login', qs.stringify(data))
	return request({
		url: baseAPI + '/login',
		method: 'POST',
		data: options
	})
}

// 获得用户的详细信息
export const getUserInfoList = (options) => {
	return request({
		url: baseAPI + '/queryUserInfoList',
		method: 'GET',
		data: options
	})
}


// 获得用户的详细信息
export const updateUserInfo = (options) => {
	return request({
		url: baseAPI + '/updateUserInfo',
		method: 'POST',
		data: options
	})
}

// 修改关注信息 关注的取关 未关注的关注
export const setFollow = async (options) => {
	// let flag = await getFollow()
	// console.log(flag)
	// console.log(options)
	return request({
		url: baseAPI + '/setFollow',
		method: 'POST',
		data: options
	})
}


// 获得用户数据
export const getUserInfo = (options) => {
	return request({
		url: baseAPI + '/getUserInfo',
		method: 'GET',
		data: options
	})
}

// 获得某个用户文章
export const getUserArticle = (options) => {
	return request({
		url: baseAPI + '/getUserArticle',
		method: 'GET',
		data: options
	})
}


// 获得用户昵称头像
export const getUserChatInfo = (options) => {
	return request({
		url: baseAPI + '/getUserChatInfo',
		method: 'GET',
		data: options
	})
}

// 主用户是否关注这个用户
export const getFollow = (options) => {
	return request({
		url: baseAPI + '/getFollow',
		method: 'GET',
		data: options
	})
}

// 主用户关注用户列表
export const getFollowers = (options) => {
	return request({
		url: baseAPI + '/getFollowers',
		method: 'GET',
		data: options
	})
}

// 主用户粉丝列表
export const getFollowedUsers = (options) => {
	return request({
		url: baseAPI + '/getFollowedUsers',
		method: 'GET',
		data: options
	})
}


// 个人页面信息
export const getMineInfo = (options) => {
	return request({
		url: baseAPI + '/getMineInfo',
		method: 'GET',
		data: options
	})
}


// 个人收藏帖子信息
export const getCollection = () => {
	return request({
		url: baseAPI + '/getCollection',
		method: 'GET'
	})
}
