import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import UserLayout from './layouts/UserLayout';
import Register from './pages/auth/Register';
const Profile = lazy(()=> import('./pages/user/Profile'));
const  Login = lazy(()=>import('./pages/auth/Login'))  ;
const About = lazy(() => import('./pages/user/About'));
// 2. Kỹ thuật Lazy Load: Chỉ tải code khi người dùng thực sự bấm vào trang đó
const Home = lazy(() => import('./pages/user/Home'));
const ProductList = lazy(() => import('./pages/user/ProductList'));

function App() {
  return (
      /* Suspense: Hiệu ứng chờ trong 1-2 giây lúc tải code của trang */
      <Suspense fallback={<div className="text-center p-10">Đang tải...</div>}>
        <Routes>
          {/* Nhóm giao diện Khách Hàng */}
          <Route path="/" element={<UserLayout />}>
            {/* Nếu đường dẫn là '/' -> Hiện Home */}
            <Route index element={<Home />} />
            {/* Nếu đường dẫn là '/shop' -> Hiện ProductList */}
            <Route path="shop" element={<ProductList />} />
            <Route path="/about" element={<About />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
          <Route path = "/login" element={<Login />}/>
          <Route path = "/Register" element={<Register />}/>
        </Routes>
      </Suspense>
  );
}

export default App;