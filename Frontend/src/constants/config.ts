export const CLOUDINARY_CONFIG = {
    URL: import.meta.env.VITE_CLOUDINARY_URL,
    PRESET: import.meta.env.VITE_CLOUDINARY_PRESET
};
export const CONFIG = {
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL , 
};
export const SHIPPING_FEE = 30000;

export const OrderStatusEnum = {
    Pending: 1,
    Processing: 2,
    Shipping: 3,
    Completed: 4,
    Canceled: 5
} as const;

export const PaymentMethodEnum = {
    COD: 1,
    BankTransfer: 2,
    VNPay: 3
} as const;