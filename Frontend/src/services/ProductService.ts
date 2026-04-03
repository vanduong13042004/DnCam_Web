import axiosClient from './axiosClient'
const productService = {
    getAll: () =>{
        axiosClient.get('/api/services/app/Product/GetAll');
    }
};
export default productService;