import {
	request
} from '@/utils/api/request.js';

let baseAPI = "/goods"


/**
 * 获得全部商品列表信息
 * @param (length, status)
 */
export const getGoodsList = async (length, status) => {
	const res = await request({
		url: baseAPI + '/getGoodsList',
		method: 'GET',
		data: {
			length: length,
			status: status
		}
	})
	// uni.showToast({
	// 	title: res.msg,
	// 	icon: 'none'
	// })
	return res.data
}


/**
 * 获得用户自己商品列表信息
 * @param (userID)
 */
export const getUserGoodsList = () => {
	return request({
		url: baseAPI + '/getUserGoodsList',
		method: 'GET'
	})
}


/**
 * 获得商品信息
 * @param (goods_id)
 */
export const getGoods = (id) => {
	return request({
		url: baseAPI + '/getGoods',
		method: 'GET',
		data: {
			goods_id: id
		}
	})
}


/**
 * 商品查看次数+1
 * @param (goods_id)
 * @method put
 */
export const putGoodLook = (id) => {
	return request({
		url: baseAPI + '/putGoodLook',
		method: 'PUT',
		data: {
			goods_id: id
		}
	})
}


/**
 * 添加商品
 * @param(form)
 * @returns(mes)
 */
export const addGoods = (form) => {
	return request({
		url: baseAPI + '/addGoods',
		method: 'POST',
		data: form
	})
}


/**
 * 删除商品
 * @param(goods_id)
 * @returns(mes)
 */
export const deleteGoods = (id) => {
	return request({
		url: baseAPI + '/deleteGoods',
		method: 'DELETE',
		data: {
			goods_id: id
		}
	})
}

/**
 * 修改商品
 * @param(goods_id)
 * @returns(mes)
 */
export const updateGoods = (id) => {
	return request({
		url: baseAPI + '/updateGoods',
		method: 'POST',
		data: {
			goods_id: id
		}
	})
}


/**
 * 获得商品的收藏数量
 * @param(goods_id)
 * @returns(collect_count)
 */
export const getGoodCollectCount = (id) => {
	return request({
		url: baseAPI + '/getGoodCollectCount',
		method: 'GET',
		data: {
			goods_id: id
		}
	})
}


/**
 * 修改收藏商品的
 * @param(goods_id，flag)
 * @returns(mes)
 */
export const putCollect = (id, flag) => {
	return request({
		url: baseAPI + '/putCollect',
		method: 'PUT',
		data: {
			goods_id: id,
			flag: flag
		}
	})
}
