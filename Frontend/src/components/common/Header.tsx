import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartStore } from '../../stores/CartStore';
import axiosClient from '../../services/axiosClient';

const Header = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('access_token');
  const isLoggedIn = !!token;// !! chuyển về boolean true nếu có
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  console.log(isLoggedIn);
  const handleLogout = () => {
    localStorage.removeItem('access_token');
    setIsDropdownOpen(false);
    navigate('/');
  }
  const cartItems = CartStore((state) => state.items);
  const setCartItems = CartStore((state) => state.setCartItems)
  useEffect(() => {
    // Chỉ gọi API lấy giỏ hàng nếu người dùng ĐÃ đăng nhập
    if (isLoggedIn) {
      const fetchCartData = async () => {
        try {
          const response: any = await axiosClient.get('/api/services/app/CartItem/GetMyCartItems');
          
          const itemsFromDB = response.result;
          
          if (itemsFromDB) {
             setCartItems(itemsFromDB);
          }
        } catch (error) {
          console.error('Lỗi khi lấy giỏ hàng từ Database:', error);
        }
      };

      fetchCartData();
    }
  }, [isLoggedIn]);
  // Dùng hàm reduce để cộng dồn tổng số lượng (Ví dụ: 2 Canon + 1 Sony = 3)
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
  return (
    <header className="bg-white shadow-md p-4 flex justify-between items-center">
      {/* Logo */}
      <Link to="/" className="text-2xl font-bold text-blue-800">
        📷 DNCam Store
      </Link>

      {/* Menu điều hướng */}
      <nav className="space-x-6">
        <Link to="/" className="font-medium hover:text-blue-600 transition-colors">
          Trang chủ
        </Link>
        <Link to="/shop" className="font-medium hover:text-blue-600 transition-colors">
          Sản phẩm
        </Link>
        <Link to="/about" className="font-medium hover:text-blue-600 transition-colors">
          Giới thiệu
        </Link>
      </nav>

      <div className="flex items-center space-x-6">
        {/* Giỏ hàng */}
            <Link to="/cart" className="text-gray-500 hover:text-blue-600 transition relative">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              
              {/* Nếu có đồ trong giỏ thì mới hiện cục màu đỏ */}
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center animate-bounce">
                  {totalItems}
                </span>
              )}
            </Link>

        {!isLoggedIn ? (
          <div className='flex items-center gap-x-4'>
            <Link to="/login" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
              Đăng nhập
            </Link>
            <Link to="/Register" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
              Đăng ký
            </Link>
          </div>
        )
          : (
            <div className='relative'>
              <button onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center space-x-2 focus:outline-none">
                <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center border border-blue-200 cursor-pointer hover:ring-2 hover:ring-blue-500 transition-all">
                  <span className="text-blue-600 font-bold text-sm">👤</span>
                </div>
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 border border-gray-100 ring-1 ring-black ring-opacity-5 animate-fade-in-down">

                  <div className="px-4 py-2 border-b border-gray-100">
                    <p className="text-sm text-gray-500">Xin chào,</p>
                    <p className="text-sm font-bold text-gray-900 truncate">Khách hàng</p>
                  </div>
                  <button className='block w-full text-left px-4 py-2 text-sm text-black-600 hover:bg-green-50 font-medium transition-colors'>
                    <Link to="/profile" onClick = {() => setIsDropdownOpen(false)} className="">
                      Thông tin cá nhân
                    </Link>
                  </button>
                  <button className='block w-full text-left px-4 py-2 text-sm text-black-600 hover:bg-green-50 font-medium transition-colors'>
                    <Link to="/orders" onClick = {() => setIsDropdownOpen(false)} className="">
                      Đơn mua
                    </Link>
                  </button>

                  <button onClick={handleLogout}
                    className='block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 font-medium transition-colors'
                  > Đăng xuất</button>
                </div>
              )}
            </div>
          )}

      </div>
    </header>
  );
};

export default Header;