import axiosClient from './axiosClient'
export interface ProductDto {
    id: number;
    categoryId: number
    brandId: number
    name: string
    price: number
    stockQuantity: number
    mainImage: string
    description: string
    isActive: boolean
    creationTime: Date
}
const productService = {
    getAll: async (): Promise<ProductDto[]> => {
        let response: any = await axiosClient.get('/api/services/app/Product/GetAll');
        return response.result?.items || response.result || response;
    }
};
export default productService;