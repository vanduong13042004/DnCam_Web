import { create } from 'zustand';

export interface Cartitem {
    id: number;
    name: string;
    price: number;
    quantity: number;
    imageUrl?: string;
}
interface CartState {
    items: Cartitem[];
    addToCart: (product: Cartitem) => void;
    removeFromCart: (productId: number) => void;
    clearCart: () => void;
    setCartItems: (items: Cartitem[]) => void;
}
export const CartStore = create<CartState>((set) => ({
    items: [],
    addToCart: (product) => set((state) => {
        const existingItem = state.items.find(item => item.id === product.id);
        if(existingItem){
            return {
                items: state.items.map(item => 
                    item.id === product.id ? {...item, quntity: item.quantity + 1}: item
                )
            }
        }
        return { items: [...state.items, { ...product, quantity: 1}]};
    }),
    removeFromCart: (productId) => set((state) => ({
        items: state.items.filter(item => item.id !==productId)
    })),
    clearCart: () => set({items: []}),
    setCartItems: (newItems) => set({ items: newItems }),

}))
export default CartStore