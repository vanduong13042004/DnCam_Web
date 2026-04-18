import { create } from 'zustand';
import type { CartDetailDto, CartResponseDto } from '../services/cartService';
import cartService from '../services/cartService';
import cartItemsService, {  } from '../services/cartItemsService';

interface CartState {
    itemsCount : number;
    items: CartDetailDto[];
        
    cartSummary: {
        itemsTotal: number;// tong tien khi chua co ship
        shippingFee: number;
        totalAmount: number;
        id: number;
    };
    actions:{
        addToCart: (productId: number) => Promise<void>;
        removeCartItem: (id: number) => Promise<void>;
        clearCart: () => Promise<void>;
        // setCartItems: (items: CartItemDto[]) => Promise<void>;
        fetchCart: () => Promise<void>;//có asynic await
        updateItemQuantity: (item: CartDetailDto, newquantity: number) => Promise<void>
    },


}
export const CartStore = create<CartState>((set,get) => ({//tạo kho chứa có kiểu là CartState
    items: [],// ban đầu giỏ hàng rỗng
    cartSummary: {
        itemsTotal: 0,
        shippingFee: 0,
        totalAmount: 0,
        id: 0
    },
    itemsCount : 0,
    actions:{
        fetchCart: async () => {
            
            const result = await cartService.getMyCartItems();
            console.log('aaaaaaaaaaaaa', result)
            if (result) {
                set({ 
                    items: result.items || [],
                    itemsCount : result.items.length,
                    cartSummary: {
                        itemsTotal: result.itemsTotal,
                        shippingFee: result.shippingFee,
                        totalAmount: result.totalAmount,
                        id: result.id
                    }
                });
            }
           
        },
        addToCart: async (productId) => {
            await cartService.addToCart(productId);
            await get().actions.fetchCart();
            console.log("Cập nhật giỏ hàng thành công!");
        },
        removeCartItem: async (id: number) => { 
            await cartItemsService.deleteItem(id);
            await get().actions.fetchCart();
            console.log('xoas thanh cong')
        },
        clearCart: async () => set({ itemsCount : 0}),// xóa hết giỏ hàng cho đăng xuất
        // setCartItems: (newItems) => set({ items: newItems }),// gán lại toàn bộ giỏ hàng
        updateItemQuantity: async (item: CartDetailDto, newquantity: number) => {
            await cartItemsService.updateItemQuantity(item, newquantity)
            await get().actions.fetchCart()
        }
    }


}))


export const useCartActions = () => CartStore((state)=>state.actions);
export const useCartSummary = () => CartStore((state)=>state.cartSummary);
export const useCarts = () => CartStore((state)=>state.items);
export const useTotalItemCarts = () => CartStore((state)=>state.itemsCount );
// export const useFetchCart = () => CartStore((state)=>state.fetchCart)
export default CartStore