import axiosClient from "./axiosClient";
export interface RegisterUserDto {
    name: string;
    surname: string;
    emailAddress: string;
    userName: string;
    password: string;
    roleNames: 'Users' // Thêm trường này nếu muốn gửi thông tin về vai trò
}
export interface LoginUserDto {
    userNameOrEmailAddress: string;
    password: string;
}
const accountService = {
    registerUser: async (data: RegisterUserDto) => {
        try {
            const response = await axiosClient.post('/api/services/app/Account/Register',data);
            console.log('Đăng ký thành công:', response);
        } catch (error: any) {
            const errorMessage = error.response?.data?.error?.message || 'Lỗi đăng ký tài khoản';
            console.error('Lỗi đăng ký:', error);
            throw new Error(errorMessage);
        }
    },
    loginUser: async (data: LoginUserDto) => {
        try {
            const response: any = await axiosClient.post('/api/TokenAuth/Authenticate', data);
            console.log('Đăng nhập thành công:', response);
            localStorage.setItem('access_token', response.result.accessToken);
            return response;
        } catch (error: any) {
            const errorMessage = error.response?.data?.error?.message || 'không thể kết nối máy chủ';
            console.error('Lỗi đăng nhập:', error);
            throw new Error(errorMessage);
        }
    }
}
export default accountService;