import {
	request
} from '@/utils/api/request.js';

let baseAPI = "/article"


// 获得全部文章信息
export const getArticleCover = (options) => {
	return request({
		url: baseAPI + '/getArticleCover',
		method: 'GET',
		data: options
	})
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
export const getArticle = (options) => {
	// console.log(data, 'vcdevsdvsdv')
	return request({
		url: baseAPI + '/getArticle',
		method: 'GET',
		data: options
	})
}


// 获得文章的图片列表
// export const getImages = (options) => {
// 	return request({
// 		url: '/user/getImages',
// 		method: 'GET',
// 		data: options
// 	})
// }

// 获得评论信息
export const getComment = (options) => {
	return request({
		url: baseAPI + '/getComment',
		method: 'GET',
		data: options
	})
}

// 获得子评论信息
export const getChilComment = (options) => {
	return request({
		url: baseAPI + '/getChilComment',
		method: 'GET',
		data: options
	})
}



// 提交评论
export const submitComment = (options) => {
	return request({
		url: baseAPI + '/submitComment',
		method: 'POST',
		data: options
	})
}



// 获得文章收藏评论信息
export const getCollectComment = (options) => {
	return request({
		url: baseAPI + '/getCollectComment',
		method: 'GET',
		data: options
	})
}


// 修改文章的喜欢
/**
 * @param(id,flag)
 */
export const putLike = (id, flag) => {
	return request({
		url: baseAPI + '/putLike',
		method: 'PUT',
		data: {
			article_id: id,
			flag: flag
		}
	})
}


// 修改文章的喜欢
/**
 * @param(id,flag)
 */
export const putCollect = (id, flag) => {
	return request({
		url: baseAPI + '/putCollect',
		method: 'PUT',
		data: {
			article_id: id,
			flag: flag
		}
	})
}
