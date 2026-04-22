import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import UserLayout from './layouts/UserLayout';
import Register from './pages/auth/Register';
import AdminLayout from './layouts/Adminlayout';
const Profile = lazy(()=> import('./pages/user/Profile'));
const CheckOut = lazy(()=> import('./pages/user/CheckOut'));
const  Login = lazy(()=>import('./pages/auth/Login'))  ;
const About = lazy(() => import('./pages/user/About'));
// 2. Kỹ thuật Lazy Load: Chỉ tải code khi người dùng thực sự bấm vào trang đó
const Home = lazy(() => import('./pages/user/Home'));
const ProductList = lazy(() => import('./pages/user/ProductList'));
const Cart = lazy(() => import('./pages/user/Cart') );

function App() {
  
  
return (
      <Suspense fallback={<div className="text-center p-10">Đang tải...</div>}>
        <Routes>
          <Route path="/" element={<UserLayout />}>
            <Route index element={<Home />} />
            <Route path="shop" element={<ProductList />} />
            <Route path="about" element={<About />} />
            <Route path="profile" element={<Profile />} />
            <Route path="cart" element={<Cart />} />
            <Route path="checkout" element={<CheckOut />} />
          </Route>
          <Route path = "/login" element={<Login />}/>
          <Route path = "/Register" element={<Register />}/>
          <Route path="/admin" element={<AdminLayout/>}>
          </Route>
        </Routes>
      </Suspense>
  );}

export default App;