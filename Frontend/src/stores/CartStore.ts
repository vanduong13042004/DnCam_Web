import { create } from 'zustand';
import type { CartItemDto } from '../services/cartService';
import cartService from '../services/cartService';
interface CartState {
    items: CartItemDto[];
    totalItem: number;
    actions:{
        addToCart: (productId: number) => Promise<void>;
        removeFromCart: (productId: number) => Promise<void>;
        clearCart: () => Promise<void>;
        // setCartItems: (items: CartItemDto[]) => Promise<void>;
        fetchCart: () => Promise<void>;//có asynic await
    },


}
export const CartStore = create<CartState>((set,get) => ({//tạo kho chứa có kiểu là CartState
    items: [],// ban đầu giỏ hàng rỗng
    totalItem: 0,
   
    actions:{
        fetchCart: async () => {
            
            const result: any = await cartService.getMyCartItems();
            console.log('aaaaaaaaaaaaa', result)
            if (result) {
                set({ 
                    items: result || [],
                    totalItem: result.length
                });
            }
           
        },
        addToCart: async (productId) => {
            await cartService.addToCart(productId);
            await get().actions.fetchCart();
            console.log("Cập nhật giỏ hàng thành công!");
        },
        removeFromCart: async (id: number) => { 
            await cartService.deleteItem(id);
            await get().actions.fetchCart();
        },
        updateCart: async (id: number,quantity: number) =>{
            // await cartService.updateCarts(id)
        },
        clearCart: async () => set({ totalItem: 0}),// xóa hết giỏ hàng cho đăng xuất
        // setCartItems: (newItems) => set({ items: newItems }),// gán lại toàn bộ giỏ hàng
    }

}))


export const useCartActions = () => CartStore((state)=>state.actions);
export const useTotalItemCarts = () => CartStore((state)=>state.totalItem);
export const useCarts = () => CartStore((state)=>state.items);
// export const useFetchCart = () => CartStore((state)=>state.fetchCart)
export default CartStore