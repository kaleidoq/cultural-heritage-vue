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


/**
 * 修改关注信息 关注的取关 未关注的关注
 * @param(id,flag)
 */
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

/**
 * 获得用户头像昵称和简介
 * @param(user_id)
 * @returns(nickname,head,introduce)
 */
export const getUserIntro = (id) => {
	return request({
		url: baseAPI + '/getUserIntro',
		method: 'GET',
		data: {
			user_id: id
		}
	})
}


/**
 *  获得个人界面的信息
 *  包括头像昵称 关注人数 粉丝人数 帖子人数
 *  @param(user_id)
 *  @returns(nickname,head,introduce,followNum,fanNum,articleNum,collectNum)
 */
export const getUserCount = (id) => {
	return request({
		url: baseAPI + '/getUserCount',
		method: 'GET',
		data: {
			user_id: id
		}
	})
}


/**
 *  获得用户数据
 * @param (user_id)
 * @returns (全部用户信息邮箱电话等)
 */
export const getUserInfo = (id) => {
	return request({
		url: baseAPI + '/getUserInfo',
		method: 'GET',
		data: {
			user_id: id
		}
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
