import axios from './request'
import qs from 'qs'
var async = require('async');

// 获得用户数据
export const getUserList = (lastNum) => {
	return axios.get('/api/user/queryLoginList?' + lastNum)
}

// 登录
export const userLogin = (data) => {
	// return axios.post('/api/user/login', qs.stringify(data))
	return axios.post('/api/user/login', data)
}

// 获得用户的详细信息
export const getUserInfoList = () => {
	return axios.get('/api/user/queryUserInfoList')
}

// 上传图片
export const uploadPic = (data) => {
	// return axios.post('/api/user/uploadPic', qs.stringify(data))
	return axios.post('/api/picture/uploadPic', data)
}

// 下载图片
export const dowmloadPic = (data) => {
	// console.log(data)
	// console.log(qs.stringify(data))
	return axios.post('/api/picture/dowmloadPic', data)
}


// 获得文章封面图片
export const getCoverPic = (data) => {
	return axios.post('/api/picture/getCoverPic', data)
}

// 获得文章封面图片
export const getAllPic = (data) => {
	return axios.post('/api/picture/getAllPic', data)
}

// 获得全部文章信息
export const getArticleCover = () => {
	return axios.get('/api/article/queryArticleCover')
	/*
	    const mes = await axios.get('/api/article/queryArticleList')
	    console.log(mes)
	    async.forEach(mes, async item => {
	            if (item.is_cover == 1) {
	                const data = await getCoverPic({ pic_id: item.cover_pic })
	                    // console.log(data)
	                item.image = data[0].pic_content
	                console.log(item)
	                    // JSON.parse(JSON.stringify(item.cover_pic))
	                    // console.log(item.cover_pic)
	            }
	        })
	        // mes.forEach(async item => {
	        //     if (item.is_cover == 1) {
	        //         const data = await getCoverPic({ pic_id: item.cover_pic })
	        //             // console.log(data)
	        //         item.cover_pic = data[0].pic_content
	        //         console.log(item)
	        //     }
	        // })
	    console.log(mes)
	    return mes

	    console.log(mes) */
}

// 获得文章详情信息
export const getArticle = (data) => {
	// console.log(data, 'vcdevsdvsdv')
	return axios.get('/api/article/getArticle', {
		params: data
	})

	// Promise.all(get()).then(res => {
	//     console.log(res)
	//     return res
	// })
}

// 修改关注信息 关注的取关 未关注的关注
export const setFollow = (data) => {
	return axios.post('/api/user/setFollow', data)

}
