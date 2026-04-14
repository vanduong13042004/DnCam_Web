import axiosClient from "./axiosClient";

const accountService = {
    registerUser: async (name: string, surname: string, emailaddress: string, userName: string, password: string): Promise<void> => {
        try {
            const response = await axiosClient.post('/api/services/app/Account/Register', {
                name: name,
                surname: surname,
                emailAddress: emailaddress,
                userName: userName,
                password: password,
                // roleNames: ['user'],
            });
            return response.data;
        } catch (error: any) {
            const errorMessage = error.response?.data?.error?.message || 'Lỗi đăng ký tài khoản';
            console.error('Lỗi đăng ký:', error);
            throw new Error(errorMessage);
        }
    },
    loginUser: async (userNameOrEmailAddress: string, password: string): Promise<void> => {
        try {
            const response: any = await axiosClient.post('/api/TokenAuth/Authenticate', {
                userNameOrEmailAddress: userNameOrEmailAddress,
                password: password,
            });
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