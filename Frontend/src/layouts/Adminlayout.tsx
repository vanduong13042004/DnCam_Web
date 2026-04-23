import { Link, Outlet, useLocation } from "react-router-dom";

const AdminLayout = () => {
    // Dùng useLocation để biết user đang ở đường dẫn nào -> tô màu menu tương ứng
    const location = useLocation();

    // Hàm nhỏ để check xem menu nào đang active
    const isActive = (path: string) => {
        return location.pathname.includes(path) 
            ? "bg-purple-700 text-white border-l-4 border-purple-300 font-bold" 
            : "text-gray-300 hover:bg-gray-800 hover:text-white";
    };

    return (
        <div className="flex h-screen bg-gray-100 font-sans">
            
            {/* 1. SIDEBAR (CỘT BÊN TRÁI - MENU ĐIỀU HƯỚNG) */}
            <div className="w-64 bg-gray-900 text-white flex flex-col shadow-xl z-10 hidden md:flex">
                <div className="h-16 flex items-center justify-center border-b border-gray-800">
                    <h1 className="text-2xl font-extrabold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
                        DN_CAM ADMIN
                    </h1>
                </div>

                <div className="flex-1 overflow-y-auto py-4">
                    <nav className="space-y-1">
                        <Link to="/admin" className={`flex items-center px-6 py-3 transition-colors ${location.pathname === '/admin' ? "bg-purple-700 text-white border-l-4 border-purple-300 font-bold" : "text-gray-300 hover:bg-gray-800 hover:text-white"}`}>
                            <span className="mr-3">📊</span> Tổng quan (Dashboard)
                        </Link>
                        
                        <div className="px-6 py-2 mt-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                            Quản lý Cửa hàng
                        </div>
                        
                        <Link to="/admin/categories" className={`flex items-center px-6 py-3 transition-colors ${isActive('/admin/categories')}`}>
                            <span className="mr-3">📁</span> Quản lý Danh mục
                        </Link>
                        
                        <Link to="/admin/products" className={`flex items-center px-6 py-3 transition-colors ${isActive('/admin/products')}`}>
                            <span className="mr-3">📸</span> Quản lý Sản phẩm
                        </Link>

                        <Link to="/admin/orders" className={`flex items-center px-6 py-3 transition-colors ${isActive('/admin/orders')}`}>
                            <span className="mr-3">🛒</span> Quản lý Đơn hàng
                        </Link>
                    </nav>
                </div>

                <div className="p-4 border-t border-gray-800">
                    <Link to="/" className="block w-full py-2 text-center text-sm text-gray-400 hover:text-white bg-gray-800 rounded-lg transition-colors">
                        ← Quay lại Web bán hàng
                    </Link>
                </div>
            </div>

            {/* 2. MAIN CONTENT (PHẦN NỘI DUNG CHÍNH BÊN PHẢI) */}
            <div className="flex-1 flex flex-col overflow-hidden">
                
                {/* 2.1 HEADER CỦA ADMIN */}
                <header className="h-16 bg-white shadow-sm flex items-center justify-between px-6 z-0 border-b border-gray-200">
                    <div className="flex items-center">
                        <span className="text-gray-800 font-semibold text-lg">Hệ thống quản trị</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-700 font-bold border border-purple-200">
                            A
                        </div>
                        <span className="text-sm font-medium text-gray-700">Admin</span>
                    </div>
                </header>

                {/* 2.2 KHU VỰC HIỂN THỊ NỘI DUNG ĐỘNG */}
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-6">
                    {/* Component <Outlet /> này giống như một cái lỗ hổng. */}
                    {/* Khi em vào /admin/categories, React sẽ nhét cái bảng Category vào cái lỗ này! */}
                    <Outlet />
                </main>
                
            </div>
        </div>
    );
};

export default AdminLayout;