import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import accountService, { type LoginUserDto } from '../../services/accountService';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setLoading(true)
    try {
      let item : LoginUserDto = {
        userNameOrEmailAddress: email,
        password: password
      }
      await accountService.loginUser(item);
      navigate('/');
    }
    catch (error: any) {
      setError(error.message) 
    }finally{
      setLoading(false)
    }

  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-8">
          Đăng nhập DNCam
        </h2>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            {error && (
              <div className="bg-red-100 text-red-600 px-4 py-2 rounded-md">
                {error}
              </div>
            )}
            <label className="block text-gray-700 font-medium mb-2">Email</label>
            <input
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
           {loading? 'Đăng Nhập... ': 'Đăng Nhập'} 
          </button>
        </form>

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