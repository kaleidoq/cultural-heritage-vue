import {
	request
} from '@/utils/api/request.js';

let baseAPI = "/goods"




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
