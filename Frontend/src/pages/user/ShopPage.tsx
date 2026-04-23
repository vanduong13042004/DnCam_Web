import { useEffect, useState } from "react";
import type { CategoryDto } from "../../services/categoryService";
import categoryService from "../../services/categoryService";
import ProductList from "./ProductList";

const ShopPage = () => {
    const [categories, setCategories] = useState<CategoryDto[]>([]);
    const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
    const [expandedMenuId, setExpandedMenuId] = useState<number | null>(null);
    useEffect(() => {
        categoryService.getAllCategories().then(data => {
            console.log('aaaaaaaaaaaaaa', data)
            
            setCategories(data)});
    }, [])
    const mainCategories = categories.filter(c => c.parentId === null);

    return (
        <div className="max-w-7xl mx-auto p-4 md:p-6 bg-gray-50 min-h-screen">
            <div className="flex flex-col md:flex-row gap-8">

                {/* --- CỘT TRÁI: DANH MỤC SẢN PHẨM --- */}
                <div className="w-full md:w-1/4 space-y-3 md:pr-4 md:border-r border-gray-200">
                    <h3 className="text-xl font-bold text-gray-800 uppercase mb-4 tracking-wider flex items-center gap-2">
                        <span>☰</span> DANH MỤC
                    </h3>

                    <ul className="space-y-1">
                        {/* Nút "Tất cả sản phẩm" */}
                        <li
                            onClick={() => setSelectedCategoryId(null)}
                            className={`py-2 px-3 rounded-lg cursor-pointer font-medium transition-colors ${selectedCategoryId === null ? "bg-blue-50 text-blue-700 font-bold" : "text-gray-600 hover:bg-gray-100"
                                }`}
                        >
                            Tất cả sản phẩm
                        </li>

                        {/* Vòng lặp in danh mục */}
                        {mainCategories.map((mainCat) => {
                            const subCategories = categories.filter(c => c.parentId === mainCat.id);
                            const hasChildren = subCategories.length > 0;
                            const isExpanded = expandedMenuId === mainCat.id;

                            return (
                                <li key={mainCat.id} className="mb-1">
                                    <div
                                        className="flex justify-between items-center py-2 px-3 rounded-lg cursor-pointer text-gray-600 hover:bg-gray-100 font-medium transition-colors"
                                        onClick={() => {
                                            if (hasChildren) {
                                                setExpandedMenuId(isExpanded ? null : mainCat.id);
                                            } else {
                                                setSelectedCategoryId(mainCat.id);
                                            }
                                        }}
                                    >
                                        <span className={selectedCategoryId === mainCat.id ? "text-blue-600 font-bold" : ""}>
                                            {mainCat.name}
                                        </span>
                                        {hasChildren && <span className="text-xs text-gray-400">{isExpanded ? '▲' : '▼'}</span>}
                                    </div>

                                    {/* Danh mục con xổ xuống */}
                                    {hasChildren && isExpanded && (
                                        <ul className="pl-4 mt-1 mb-2 space-y-1 border-l-2 border-blue-100 ml-4">
                                            {subCategories.map(subCat => (
                                                <li
                                                    key={subCat.id}
                                                    onClick={() => setSelectedCategoryId(subCat.id)}
                                                    className={`cursor-pointer text-sm py-1.5 px-3 rounded-md transition-colors ${selectedCategoryId === subCat.id
                                                            ? "bg-blue-50 text-blue-700 font-medium"
                                                            : "text-gray-500 hover:text-blue-600 hover:bg-gray-50"
                                                        }`}
                                                >
                                                    {subCat.name}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </li>
                            );
                        })}
                    </ul>
                </div>

                {/* --- CỘT PHẢI: NHÚNG PRODUCT LIST VÀO ĐÂY --- */}
                <div className="flex-1">
                    {/* Bắn cái ID khách vừa chọn qua cho ProductList */}
                    <ProductList categoryId={selectedCategoryId} />
                </div>

            </div>
        </div>
    );
};

export default ShopPage;
