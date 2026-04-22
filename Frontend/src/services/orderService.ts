import axiosClient from "./axiosClient"
export interface CreateOrderDto {
	receiverName: string;
	phoneNumber: string;
	shippingAddress: string;
	note: string;
	paymentMethod: number;
	status: number;
	items: { productId: number; quantity: number} [];
}
const orderService = {
	CreateOrder : async (payload: CreateOrderDto) => {
		try{
			const res = await axiosClient.post('/api/services/app/Order/Create',payload)
			console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaa',res)
			return res
		}catch{
			console.log('loi khi tao order')
		}
	}
}
export default orderService