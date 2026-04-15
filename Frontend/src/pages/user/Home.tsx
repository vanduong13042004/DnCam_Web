import { useState, useEffect } from 'react';
import { Play } from 'lucide-react';
import image1 from '../../assets/image.png';
import productService, { type ProductDto } from '../../services/productService';
function Home() {
  // 1. Tạo "cái rổ" để đựng máy ảnh lấy từ C# về
  const [products, setProducts] = useState<ProductDto[]>([]);
  const [isLoading, setIsLoading] = useState(true); // Biến báo hiệu đang tải

  // 2. Gọi API ngay khi trang vừa load xong
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await productService.getAll();
        
        // LƯU Ý QUAN TRỌNG: ABP Framework thường bọc dữ liệu trong response.result.items
        // Nếu sếp console.log(response) ra thấy cấu trúc khác thì sửa lại chỗ này nhé!
        const data = response;
        setProducts(data);
      } catch (error) {
        console.error("Lỗi khi tải sản phẩm:", error);
      } finally {
        setIsLoading(false); // Tải xong rồi thì tắt cái xoay xoay đi
      }
    };

    fetchProducts();
  }, []); // Cặp ngoặc vuông [] rỗng nghĩa là chỉ gọi API 1 lần duy nhất lúc mới vào web

  return (
    <div className="space-y-12 animate-fade-in">
        
      <div className="bg-indigo-900 text-white py-16 lg:py-24 relative overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8 flex flex-col lg:flex-row items-center gap-12">
        
        <div className="w-full lg:w-1/2 z-10">
          <h1 className="text-4xl lg:text-6xl font-extrabold leading-tight mb-6">
            Bắt Trọn Từng <br />
            <span className="text-teal-400">Khoảnh Khắc Của Bạn</span>
          </h1>
          <p className="text-gray-300 text-lg mb-8 max-w-lg leading-relaxed">
            Khám phá bộ sưu tập máy ảnh hiện đại với công nghệ ống kính tiên tiến, 
            đảm bảo mang lại những bức ảnh sắc nét và chân thực nhất cho đam mê của bạn.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <button className="bg-teal-500 hover:bg-teal-600 text-white px-8 py-4 rounded-lg font-bold transition-all shadow-lg shadow-teal-500/30">
              Khám Phá Sản Phẩm
            </button>
            <button className="border border-white/30 hover:bg-white hover:text-indigo-900 px-8 py-4 rounded-lg font-bold transition-all">
              Tư Vấn Miễn Phí
            </button>
          </div>
        </div>

        <div className="w-full lg:w-1/2 relative z-10 mt-10 lg:mt-0">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white/10">
            <img 
              src={image1}
              alt="Người cầm máy ảnh" 
              className="w-full h-auto object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <button className="bg-white/20 backdrop-blur-md p-4 rounded-full hover:bg-white/40 transition-all">
                <Play className="w-12 h-12 text-white fill-white" />
              </button>
            </div>
          </div>
        </div>

      </div>
      </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-6">🔥 Sản phẩm mới nhất</h2>
        
        {isLoading ? (
          <div className="text-center text-gray-500 font-bold">Đang lấy dữ liệu từ C# sang... ⏳</div>
        ) : products.length === 0 ? (
          <div className="text-center text-red-500">Chưa có máy ảnh nào trong Database cả sếp ơi!</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* VÒNG LẶP: Duyệt qua mảng products và đẻ ra từng cái Card */}
            {products.map((item) => (
              <div key={item.id} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:shadow-xl transition-shadow flex flex-col h-full">
                <div className="h-48 bg-gray-100 rounded-xl mb-4 flex items-center justify-center overflow-hidden">
                  {/* Nếu C# có trả về link ảnh thật thì nhét vào đây, tạm thời để Icon */}
                  <span className="text-5xl">📷</span>
                </div>
                <div className="">
                  <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Máy ảnh</p>
                  <h3 className="font-semibold text-lg text-gray-800 leading-tight mb-2">
                    {item.name} {/* <--- HIỂN THỊ TÊN MÁY ẢNH TỪ C# */}
                  </h3>
                </div>
                <div className="mt-4">
                  <p className="text-blue-600 font-extrabold text-xl mb-3">
                    {item.price?.toLocaleString()} đ {/* <--- HIỂN THỊ GIÁ TỪ C# */}
                  </p>
                  <button className="w-full bg-gray-900 text-white font-medium py-2.5 rounded-xl hover:bg-blue-600 transition-colors">
                    Thêm vào giỏ
                  </button>
                </div>
              </div>
            ))}

          </div>
        )}
      </div>
    
  );
}

export default Home;