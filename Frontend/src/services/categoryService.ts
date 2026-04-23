import axiosClient from "./axiosClient"

export interface CategoryDto {
    id: number,
    name: string,
    description: string,
    parentId: number
}
const categoryService = {
    getAllCategories: async (): Promise<CategoryDto[]> => {
        // const params = categoryId ? {categoryId: categoryId} : {}
        const response: any = await axiosClient('/api/services/app/Category/GetAll' );
        console.log('aaaaaaaaaaaaaaaaaaaaaaa', response)
        return response.result?.items || response.result || response;
    
    }
}
export default categoryService
