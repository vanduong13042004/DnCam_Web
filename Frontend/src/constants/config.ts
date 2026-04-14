export const CLOUDINARY_CONFIG = {
    URL: import.meta.env.VITE_CLOUDINARY_URL,
    PRESET: import.meta.env.VITE_CLOUDINARY_PRESET
};
export const CONFIG = {
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL , 
};
export const SHIPPING_FEE = 30000;

export const ORDER_STATUS: Record<number, string> = {
    0: 'Chờ xác nhận',
    1: 'Đang xử lý',
    2: 'Đang giao',
    3: 'Hoàn thành',
    4: 'Đã hủy'
};

export const PAYMENT_METHOD: Record<number, string> = {
    0: 'Thanh toán khi nhận hàng (COD)',
    1: 'Chuyển khoản ngân hàng'
};