import {
	request,
	upload
} from '@/utils/api/request.js';

// 上传图片
export const uploadPic = (options) => {
	// return axios.post('/api/user/uploadPic', qs.stringify(data))
	return request({
		url: '/picture/uploadPic',
		method: 'POST',
		data: options
	})
}

// 下载图片
export const dowmloadPic = (options) => {
	// console.log(data)
	// console.log(qs.stringify(data))
	return request({
		url: '/picture/dowmloadPic',
		method: 'POST',
		data: options
	})
}


// 获得文章封面图片
export const getCoverPic = (options) => {
	return request({
		url: '/picture/getCoverPic',
		method: 'POST',
		data: options
	})
}

// 获得文章封面图片
export const getAllPic = (options) => {
	return request({
		url: '/picture/getAllPic',
		method: 'POST',
		data: options
	})
}

// 上传图片
export const uploadPP = (options) => {
	console.log(options)
	// return axios.post('/api/user/uploadPic', qs.stringify(data))
	return upload({
		url: '/picture/uploadPP',
		method: 'POST',
		data: {
			pic: options
		},
	})
}
