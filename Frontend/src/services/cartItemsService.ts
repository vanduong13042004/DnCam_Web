import axiosClient from "./axiosClient";
import type { CartDetailDto } from "./cartService";

// export interface CartItemDto {
// 	id: number;
// 	cartId: number;
// 	productId: number;
// 	quantity: number;
// }
const cartItemsService = {
	deleteItem: async (id: number): Promise<void> => {
		await axiosClient.delete('/api/services/app/CartItem/Delete',
			{
				params: {
					id: id
				}
			}
		)
	},
	updateItemQuantity: async (item: CartDetailDto, newquantity: number): Promise<void> => {

		const payload = {
			id: item.id,
			cartId: item.cartId,
			productId: item.productId,
			quantity: newquantity
		}
		await axiosClient.put('/api/services/app/CartItem/Update', payload)
	}

}
export default cartItemsService