import { Outlet, Link, useNavigate } from 'react-router-dom';

function AdminLayout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    navigate('/login');
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="w-64 bg-gray-900 text-white flex flex-col">
        <div className="h-16 flex items-center justify-center border-b border-gray-800">
          <h1 className="text-xl font-bold">⚙️ Admin Panel</h1>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <Link to="/admin" className="block px-4 py-2 rounded hover:bg-gray-800">Dashboard</Link>
          <Link to="/admin/products" className="block px-4 py-2 rounded hover:bg-gray-800">📦 Quản lý Sản phẩm</Link>
          <Link to="/admin/categories" className="block px-4 py-2 rounded hover:bg-gray-800">📁 Danh mục</Link>
        </nav>
        <div className="p-4 border-t border-gray-800">
          <button onClick={handleLogout} className="w-full bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
            Đăng xuất
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 bg-white shadow-sm flex items-center px-6 justify-between">
          <h2 className="text-lg font-semibold text-gray-800">Hệ thống Quản trị</h2>
          <span className="text-sm text-gray-500">Xin chào, Admin</span>
        </header>
        
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;