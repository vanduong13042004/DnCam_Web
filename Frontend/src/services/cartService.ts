import axiosClient from "./axiosClient";
export interface CartItemDto{
    id: number;
    cartId: number;
    productId: number;
    quantity: number;
    productName: string;
    productPrice: number;
    mainImage: string;
    stockQuantity: number;
    selected: boolean;
}

interface GetCartItemsResponse {
    result: CartItemDto[];
}

const cartService = {
    getMyCartItems: async (): Promise<CartItemDto[]> => {
        try {
            const response : GetCartItemsResponse = await axiosClient.get('/api/services/app/CartItem/GetMyCart') ;
            console.log('Giỏ hàng của tôi getmycartItems:', response.result);
            return response.result;
        } catch (error: unknown) {
            console.error('Lỗi khi lấy giỏ hàng:', error);
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