import { useEffect, useState } from "react"
// import cartService, { type CartItemDto } from "../../services/CartService"
import { useNavigate } from "react-router-dom";
import { useCartActions, useCarts,  } from "../../stores/cartStore";

const Cart = () => {
    // const [cartItems, setCartItems] = useState<CartItemDto[]>([])
    // const [IsLoading, setIsLoading] = useState(Boolean)
    const navigate = useNavigate();
    const cartActions = useCartActions();
    const listItiemCart = useCarts();
    // const fetchCart = useFetchCart();
    // const fetchCartData  = async () =>{
    //     await cartActions.fetchCart();
    // //    await fetchCart()
    // }
    useEffect(() => {
        cartActions.fetchCart();
    }, []);
    const handleToggleSelect=(id:number)=>{
        
    }
    
    const handleRemoveItem =(id:number)=>{
        cartActions.removeFromCart(id);
    }
    const handleUpdateQuantity =(id: number,quantity:number)=>{
        
    }
    return (
        <div className="max-w-6xl mx-auto p-4 md:p-6 bg-gray-50 min-h-screen">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Giỏ hàng của bạn</h2>

            {listItiemCart.length === 0 ? (
                <div className="text-center p-10 bg-white rounded-lg shadow-sm">
                    <p className="text-gray-500 mb-4">Giỏ hàng của bạn đang trống.</p>
                    <button onClick={() => navigate('/shop')} className="text-purple-600 font-medium hover:underline">← Tiếp Tục Mua Sắm</button>
                </div>
            ) : (
                <div className="flex flex-col lg:flex-row gap-6">

                    <div className="flex-1 space-y-4">
                        <div className="bg-white p-4 rounded-lg shadow-sm flex justify-between items-center">
                            <label className="flex items-center gap-3 cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="w-5 h-5 accent-purple-600 rounded"
                                //   checked={isAllSelected}
                                //   onChange={handleToggleSelectAll}
                                />
                                <span className="font-medium">Chọn tất cả ({listItiemCart.length} sản phẩm)</span>
                            </label>
                            <button className="text-red-500 hover:text-red-700 font-medium">
                                🗑️ Xóa đã chọn
                            </button>
                        </div>

                        {listItiemCart.map((item) => (
                            <div key={item.id} className="bg-white p-4 rounded-lg shadow-sm flex flex-col sm:flex-row items-start sm:items-center gap-4">

                                <div className="flex items-center gap-4">
                                    <input
                                        type="checkbox"
                                        className="w-5 h-5 accent-purple-600 rounded cursor-pointer"
                                        // checked={item.selected}
                                    onChange={() => handleToggleSelect(item.id)}
                                    />
                                    <img src={item.mainImage} alt={item.productName} className="w-20 h-20 object-cover rounded border" />
                                </div>

                                <div className="flex-1">
                                    <h3 className="font-semibold text-gray-800 line-clamp-2">{item.productName}</h3>
                                    <p className="text-purple-600 font-bold text-lg mt-1">
                                        {/* {item.ProductPrice.toLocaleString('vi-VN')} đ */}
                                    </p>
                                    <p className="text-sm text-gray-500 mt-1">Còn lại: {item.stockQuantity} trong kho</p>
                                </div>

                                <div className="flex flex-col items-end gap-3 mt-4 sm:mt-0">
                                    <p className="text-gray-500 text-sm hidden sm:block">Tổng</p>
                                    <p className="font-bold text-gray-800 hidden sm:block">
                                        {(item.productPrice * item.quantity).toLocaleString('vi-VN')} đ
                                    </p>

                                    <div className="flex items-center gap-4">
                                        <div className="flex items-center border rounded-md">
                                            <button
                                                onClick={() => handleUpdateQuantity(item.id, item.quantity = item.quantity - 1)}
                                                disabled={item.quantity <= 1}
                                                className="px-3 py-1 hover:bg-gray-100 text-gray-600 font-bold disabled:opacity-50"
                                            >-</button>
                                            <span className="px-4 py-1 border-x font-medium">{item.quantity}</span>
                                            <button
                                                // onClick={() => handleUpdateQuantity(item.id, item.Quantity + 1)}
                                                disabled={item.quantity >= item.stockQuantity}
                                                className="px-3 py-1 hover:bg-gray-100 text-gray-600 font-bold disabled:opacity-50"
                                            >+</button>
                                        </div>
                                        <button
                                              onClick={() => handleRemoveItem(item.id)}
                                            className="text-red-500 hover:text-red-700 text-xl"
                                        >
                                            🗑️
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* CỘT PHẢI: TÓM TẮT ĐƠN HÀNG */}
                    <div className="w-full lg:w-[350px]">
                        <div className="bg-white p-6 rounded-lg shadow-sm sticky top-4">
                            <h3 className="text-xl font-bold mb-4 text-gray-800">Tổng Đơn Hàng</h3>

                            <div className="space-y-3 border-b pb-4 mb-4">
                                <div className="flex justify-between text-gray-600">
                                    <span>Sản phẩm đã chọn:</span>
                                    {/* <span className="font-medium">{selectedCount}</span> */}
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>Tạm tính:</span>
                                    {/* <span className="font-medium">{totalAmount.toLocaleString('vi-VN')} đ</span> */}
                                </div>
                            </div>

                            <div className="flex justify-between items-center mb-6">
                                <span className="font-bold text-lg">Tổng cộng:</span>
                                <span className="text-2xl font-bold text-purple-700">
                                    {/* {totalAmount.toLocaleString('vi-VN')} đ */}
                                </span>
                            </div>

                            <button
                                // disabled={selectedCount === 0}
                                className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 text-white font-bold py-3 rounded-lg transition-colors mb-3"
                            >
                                {/* Tiến Hành Thanh Toán ({selectedCount}) */}
                            </button>
                        </div>
                    </div>

                </div>
            )}
        </div>
    );
}
export default Cart