import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axiosClient from '../../services/axiosClient'; 

const Login = () => {
  // useState dùng để lưu trữ dữ liệu người dùng gõ vào ô input
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const navigate = useNavigate();

  const handleLogin = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    try {
      
      const response: any = await axiosClient.post('/api/TokenAuth/Authenticate', {
        userNameOrEmailAddress: email,
        password: password,
        rememberClient: true
      });
      console.log("📦 Dữ liệu API trả về:", response);
      // if(response.result.accessToken = )
      localStorage.setItem('access_token', response.result.accessToken);
      navigate('/');
      
    } catch (error) {
      console.error('Lỗi đăng nhập:', error);
      alert('Tài khoản hoặc mật khẩu ko chính xác, vui lòng thử lại');
    }
  };

  return (
    // min-h-screen để background xám phủ kín toàn màn hình
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-8">
          Đăng nhập DNCam
        </h2>
        
        {/* Thẻ form gọi hàm handleLogin khi người dùng bấm Enter hoặc nút Submit */}
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-gray-700 font-medium mb-2">Email</label>
            <input
              // type="email"
              // value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="admin@dncam.com"
              required
            />
          </div>
          
          <div>
            <label className="block text-gray-700 font-medium mb-2">Mật khẩu</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="••••••"
              required
            />
          </div>
          
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
          >
            Đăng Nhập
          </button>
        </form>
        

        {/* THÊM ĐOẠN NÀY */}
        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Chưa có tài khoản?{' '}
            <Link to="/register" className="text-blue-600 hover:underline font-medium">
              Đăng ký ngay
            </Link>
          </p>
        </div>
        
      </div>
    </div>
  );
};
 
export default Login;