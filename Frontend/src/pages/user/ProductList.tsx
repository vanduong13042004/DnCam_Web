import { useEffect, useState } from "react";
import axiosClient from "../../services/axiosClient";
import type { ProductDto } from "../../services/productService";
import CartStore, { useCartActions } from "../../stores/cartStore";
import productService from "../../services/productService";
import image from '../../assets/image.png';
function ProductList() {
  const [products, setProducts] = useState<ProductDto[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const cartActions = useCartActions();
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await productService.getAll();
        const data = response;
        console.log(data)
        setProducts(data);
      } catch (error) {
        console.error("Lỗi khi tải sản phẩm:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);
  const handleAddToCart = async (productId: number) => {
    try {
      // Gửi request POST xuống Backend 
      cartActions.addToCart(productId);

      // await cartActions.fetchCart();

      alert("Đã thêm máy ảnh vào giỏ hàng thành công!");
    } catch (error) {
      console.error("Lỗi khi thêm vào giỏ:", error);
      alert("Bạn cần đăng nhập để mua hàng nhé!");
    }
  };
  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-900 mb-6"> Sản phẩm mới nhất</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((items) => (
          <div key={items.id} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:shadow-xl transition-shadow flex flex-col h-full">
            <div className="h-48 bg-gray-100 rounded-xl mb-4 flex items-center justify-center overflow-hidden"><img
              src="https://res.cloudinary.com/dv11569cs/image/upload/q_auto/f_auto/v1775550637/hwilqxddmtjb0zlcywhn.jpg"
              alt="product"
              className="w-full h-full object-cover"
            /></div>
            <div className="flex-grow">
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Máy ảnh</p>
              <h3 className="font-semibold text-lg text-gray-800 leading-tight mb-2">
                {items.name}
              </h3>
            </div>
            <div className="mt-4">
              <p className="text-blue-600 font-extrabold text-xl mb-3">
                {items.price?.toLocaleString()} đ
              </p>
              <button
                onClick={()=>{handleAddToCart(items.id)}}
              className="w-full bg-gray-900 text-white font-medium py-2.5 rounded-xl hover:bg-blue-600 transition-colors ">
                Thêm vào giỏ
              </button>
            </div>
          </div>

        ))}
      </div>
    </div>

  );
};

export default ProductList;