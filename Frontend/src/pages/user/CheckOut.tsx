import { useState } from "react";
import CartStore, { useCartActions, useCarts, useSelectedItems, } from "../../stores/cartStore1"
import orderService from "../../services/orderService";

const CheckOut = () => {
	const cartActions = useCartActions()
	const selectedItemIds = useSelectedItems()
	const listItemCart = useCarts();
	const selectedItems = listItemCart.filter(item => selectedItemIds.includes(item.id))
	//nhập liệu từ bàn phím
	const [receiverName, setReceiverName] = useState('')
	const [phoneNumber, setPhoneNumber] = useState('')
	const [shippingAddress, setShippingAddress] = useState('')
	// const [paymentMethod, setpaymentMethod] = useState('')
	const [note, setNote] = useState('')
	const handlePlaceOrder = async () => {
		try {
			const orderitems = selectedItems.map(item => ({
				productId: item.productId,
				quantity: item.quantity
			}));
			const payload = {
				receiverName,
				phoneNumber,
				shippingAddress,
				note,
				paymentMethod: 0,
				status: 0,
				items: orderitems
			}
			await orderService.CreateOrder(payload)
			alert("dat hang thanh cong");
			await cartActions.fetchCart()
			cartActions.toggleSelectAll;
			alert("ddat hang thanh cong")
		} catch (error) {
			console.error("Lỗi khi đặt hàng:", error);
			alert("Có lỗi xảy ra, vui lòng thử lại!");
		}
	}
	const itemsTotal = selectedItems.reduce((sum, item) => sum + (item.productPrice * item.quantity), 0);
	const shippingFee = selectedItems.length > 0 ? 30000 : 0;
	const finalTotalAmount = itemsTotal + shippingFee;
	return (
		<div className="max-w-6xl mx-auto p-4 md:p-6 bg-gray-50 min-h-screen">
			{/* Thanh tiêu đề */}
			<div className="mb-8">
				<h2 className="text-3xl font-extrabold text-gray-800">Thanh Toán Đơn Hàng</h2>
				<p className="text-gray-500 mt-2">Vui lòng điền đầy đủ thông tin giao hàng của bạn.</p>
			</div>

			<div className="flex flex-col lg:flex-row gap-8">
				{/* CỘT TRÁI: FORM ĐIỀN THÔNG TIN */}
				<div className="flex-1 space-y-6">
					<div className="bg-white p-6 md:p-8 rounded-xl shadow-sm border border-gray-100">
						<h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
							<span>📍</span> Thông Tin Nhận Hàng
						</h3>

						<div className="space-y-5">
							{/* Họ và tên */}
							<div>
								<label className="block text-sm font-semibold text-gray-700 mb-1">Họ và tên người nhận <span className="text-red-500">*</span></label>
								<input
									type="text"
									placeholder="Ví dụ: Nguyễn Văn Dương"
									value={receiverName}
									onChange={(e) => setReceiverName(e.target.value)}
									className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-colors"
									required
								/>
							</div>

							{/* Số điện thoại */}
							<div>
								<label className="block text-sm font-semibold text-gray-700 mb-1">Số điện thoại <span className="text-red-500">*</span></label>
								<input
									type="tel"
									placeholder="Ví dụ: 0987654321"
									value={phoneNumber}
									onChange={(e) => setPhoneNumber(e.target.value)}
									className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-colors"
									required
								/>
							</div>

							{/* Địa chỉ */}
							<div>
								<label className="block text-sm font-semibold text-gray-700 mb-1">Địa chỉ giao hàng chi tiết <span className="text-red-500">*</span></label>
								<textarea
									rows={3}
									placeholder="Số nhà, Tên đường, Phường/Xã, Quận/Huyện, Tỉnh/Thành phố"
									value={shippingAddress}
									onChange={(e) => setShippingAddress(e.target.value)}
									className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-colors resize-none"
									required
								></textarea>
							</div>

							{/* Ghi chú */}
							<div>
								<label className="block text-sm font-semibold text-gray-700 mb-1">Ghi chú cho đơn hàng (Tùy chọn)</label>
								<input
									type="text"
									placeholder="Ví dụ: Giao hàng vào giờ hành chính..."
									value={note}
									onChange={(e) => setNote(e.target.value)}
									className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-colors"
								/>
							</div>
						</div>
					</div>

					{/* Lựa chọn thanh toán (Tĩnh) */}
					<div className="bg-white p-6 md:p-8 rounded-xl shadow-sm border border-gray-100">
						<h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
							<span>💳</span> Phương Thức Thanh Toán
						</h3>
						<label className="flex items-center gap-3 p-4 border-2 border-purple-500 rounded-lg bg-purple-50 cursor-pointer">
							<input type="radio" checked readOnly className="w-5 h-5 accent-purple-600" />
							<span className="font-semibold text-purple-800">Thanh toán khi nhận hàng (COD)</span>
						</label>
					</div>
				</div>

				{/* CỘT PHẢI: TÓM TẮT ĐƠN HÀNG */}
				<div className="w-full lg:w-[400px]">
					<div className="bg-white p-6 md:p-8 rounded-xl shadow-sm border border-gray-100 sticky top-6">
						<h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
							<span>🛒</span> Đơn Hàng Của Bạn
						</h3>

						{/* Danh sách sản phẩm mini */}
						<div className="space-y-4 mb-6 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
							{selectedItems.map((item) => (
								<div key={item.id} className="flex gap-4 items-center pb-4 border-b border-gray-100 last:border-0 last:pb-0">
									<div className="relative">
										<img src={item.mainImage} alt={item.productName} className="w-16 h-16 object-cover rounded-md border" />
										<span className="absolute -top-2 -right-2 bg-gray-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
											{item.quantity}
										</span>
									</div>
									<div className="flex-1">
										<p className="text-sm font-medium text-gray-800 line-clamp-2">{item.productName}</p>
										<p className="text-sm font-bold text-purple-600 mt-1">
											{(item.productPrice * item.quantity).toLocaleString('vi-VN')} đ
										</p>
									</div>
								</div>
							))}
						</div>

						{/* Tính tiền */}

						<div className="space-y-3 border-t border-gray-200 pt-6 mb-6">
							<div className="flex justify-between text-gray-600">
								<span>Tạm tính ({selectedItems.length} sản phẩm)</span>
								<span className="font-medium">{itemsTotal.toLocaleString('vi-VN')} đ</span>
							</div>
							<div className="flex justify-between text-gray-600">
								<span>Phí giao hàng</span>
								<span className="font-medium">{shippingFee.toLocaleString('vi-VN')} đ</span>
							</div>
						</div>

						<div className="flex justify-between items-center mb-8">
							<span className="font-bold text-lg text-gray-800">Tổng thanh toán:</span>
							<span className="text-3xl font-extrabold text-purple-700">
								{finalTotalAmount.toLocaleString('vi-VN')} đ
							</span>
						</div>

						{/* Nút Đặt Hàng */}
						<button
							onClick={handlePlaceOrder}
							disabled={selectedItems.length === 0 || !receiverName || !phoneNumber || !shippingAddress}
							className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 text-white font-bold py-4 rounded-xl text-lg transition-all transform active:scale-[0.98] shadow-md"
						>
							ĐẶT HÀNG NGAY
						</button>
						<p className="text-center text-xs text-gray-400 mt-3">
							Nhấn "Đặt hàng ngay" đồng nghĩa với việc bạn đồng ý tuân theo Điều khoản của Dn_Cam
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
export default CheckOut