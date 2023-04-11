import {
	request
} from '@/utils/api/request.js';
let baseAPI = "/order"


/**
 * 获得收货人地址信息
 * @returns(收货人信息列表)
 * @method(get)
 */
export const getConsignee = () => {
	return request({
		url: baseAPI + '/getConsignee',
		method: 'GET'
	})
}

/**
 * 添加收货人信息
 * @param(form)
 * @returns()
 */
export const editConsignee = (form) => {
	return request({
		url: baseAPI + '/editConsignee',
		method: 'POST',
		data: form
	})
}

/**
 * 删除用户的收货地址
 * @param(cgn_id)
 * @returns(msg)
 * @method(delete)
 */
export const delConsignee = (id) => {
	return request({
		url: baseAPI + '/delConsignee',
		method: 'DELETE',
		data: {
			cgn_id: id
		}
	})
}


/**
 * 获得用户的默认收货地址
 * @param()
 * @returns(地址)
 * @method(get)
 */
export const getDefCgn = () => {
	return request({
		url: baseAPI + '/getDefCgn',
		method: 'GET'
	})
}

/**
 * 发起订单
 * @param(goods_id,cgn_id,seller_user_id,actual_price)
 * @returns(订单状态)
 * @method(post)
 */
export const initOrder = (goods, cgn, user, price) => {
	return request({
		url: baseAPI + '/initOrder',
		method: 'POST',
		data: {
			goods_id: goods,
			cgn_id: cgn,
			seller_user_id: user,
			price: price
		}
	})
}

/**
 * 查看订单详情
 * @param(order_id)
 * @returns(订单信息，商品信息)
 * @method(get)
 */
export const getOrderDesc = (id) => {
	return request({
		url: baseAPI + '/getOrderDesc',
		method: 'GET',
		data: {
			order_id: id
		}
	})
}


/**
 * 获取该用户的全部订单信息
 * @param()
 * @returns(订单信息)
 * @method(get)
 */
export const queryOrder = () => {
	return request({
		url: baseAPI + '/queryOrder',
		method: 'GET'
	})
}


/**
 * 卖家发货
 * @param(order_id)
 * @returns(mes)
 * @method(post)
 */
export const setDeliver = (id) => {
	return request({
		url: baseAPI + '/setDeliver',
		method: 'POST',
		data: {
			order_id: id
		}
	})
}

/**
 * 用户确认收货
 * @param(order_id)
 * @returns(mes)
 * @method(post)
 */
export const setReceive = (id) => {
	return request({
		url: baseAPI + '/setReceive',
		method: 'POST',
		data: {
			order_id: id
		}
	})
}
