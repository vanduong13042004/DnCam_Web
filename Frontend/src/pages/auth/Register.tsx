import { useState } from "react"
import { useNavigate } from "react-router-dom";
import axiosClient from "../../services/axiosClient";

const Register = () => {
    const [name, setName] = useState('');
    const [surename, setsureName] = useState('');
    const [emailaddress, setEmailaddress] = useState('');
    const [userName, setUserName] = useState('');
    const [password, setPassWord] = useState('');
    const [confirmPassword, setconfirmPassword] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e: React.SyntheticEvent) => {
        e.preventDefault();

        try {
            const response: any = await axiosClient.post('/api/services/app/Account/Register', {
                name: name,
                surname: surename,
                emailAddress: emailaddress,
                userName: userName,
                password: password,
                // roleNames: ['user'],
            });
            alert('Đăng ký tài khoản thành công hãy đăng nhập')
            navigate('/login');
        } catch (error) {
            console.error('loii dang ky', error);
            alert('looi dang ky')
        }

    }
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
                <h2 className="text-3xl font-bold text-center text-blue-600 mb-8">
                    Đăng nhập DNCam
                </h2>

                {/* Thẻ form gọi hàm handleLogin khi người dùng bấm Enter hoặc nút Submit */}
                <form onSubmit={handleRegister} className="space-y-6">
                    <div>
                        <label className="block text-gray-700 font-medium mb-2">Tên</label>
                        <input
                            type="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="admin@dncam.com"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-2">Họ</label>
                        <input
                            type="setsureName"
                            value={surename}
                            onChange={(e) => setsureName(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium mb-2">Tên đăng nhập</label>
                        <input
                            type="userName"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium mb-2">Email</label>
                        <input
                            type="Emailaddress"
                            value={emailaddress}
                            onChange={(e) => setEmailaddress(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium mb-2">Mật khẩu</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassWord(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="••••••••"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium mb-2">Nhập lại mật khẩu</label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setconfirmPassword(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="••••••••"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                    >
                        Đăng ký
                    </button>
                </form>
            </div>
        </div>
    );
};
export default Register;