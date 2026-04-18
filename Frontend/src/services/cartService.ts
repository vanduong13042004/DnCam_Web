import axiosClient from "./axiosClient";
export interface CartDetailDto{
    id: number;
    cartId: number;
    productId: number;
    quantity: number;
    productName: string;
    productPrice: number;
    mainImage: string;
    stockQuantity: number;
    selected?: boolean;
}

// Nested DTO từ backend
export interface CartResponseDto {
    id: number;
    itemsTotal: number;
    shippingFee: number;
    totalAmount: number;
    items: CartDetailDto[];
}

const cartService = {
    getMyCartItems: async  (): Promise<CartResponseDto> => {
        try {
            const response : any = await axiosClient.get('/api/services/app/Cart/GetMyCart');
            console.log('Giỏ hàng của tôi getmycart:', response);
            return response.result;
        } catch (error: unknown) {
            console.error('Lỗi khi lấy giỏ hàng:', error);
            return {
                id: 0,
                itemsTotal: 0,
                shippingFee: 0,
                totalAmount: 0,
                items: []
            };
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