import { Outlet } from 'react-router-dom';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';

const UserLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      
      <Header />

      <main className="flex-grow max-w-7xl mx-auto w-full p-4">
        <Outlet />
      </main>

      <Footer />
      
    </div>
  );
};

export default UserLayout;