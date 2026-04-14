import axiosClient from "./axiosClient";
export interface CartItemDto{
    id: number;
    cartId: number;
    productId: number;
    quantity: number;
    productName: string;
    productPrice: number;
    productMainImage: string;
    productStockQuantity: number;
    selected: boolean;
}
const cartService = {
    getMyCartItems: async (): Promise<CartItemDto[]> => {
        try {
            const response: any = await axiosClient.get('/api/services/app/CartItem/GetMyCartItems');
            return response.result;
        } catch (error) {
            return [];
        }
    },
    addToCart: async(productId: number): Promise<void> =>{
        await axiosClient.post('/api/services/app/Cart/AddToCart', {
        productId: productId,
        quantity: 1,
      });
    },
    deleteItem: async (productId: number): Promise<void>  =>{
       await axiosClient.delete('/api/services/app/CartItem/Delete',
            {params:{
                id: productId
            }}
        )
    }
    
}
export default cartService;