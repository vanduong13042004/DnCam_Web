import { useState } from "react";
import cloudinaryService from "../../services/cloudinaryService";

function App1() {
  const [testImage, setTestImage] = useState<string>("");

  // Hàm này sẽ chạy khi bạn chọn 1 bức ảnh từ máy tính
  const handleTestRealUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      console.log("Đang mang ảnh thật lên mây...");
      // Gọi shipper mang hàng đi
      const url = await cloudinaryService.uploadImage(file);
      
      console.log("Upload thành công! Link đây:", url);
      // Lưu lại link để hiển thị thử ra màn hình
      setTestImage(url);
    } catch (error) {
      console.error("Vẫn lỗi thì check lại tab Network nha:", error);
    }
  };

  return (
    <div style={{ padding: '50px' }}>
      <h2>Test Upload Ảnh Thật Cho Web Máy Ảnh</h2>
      
      {/* Nút để bạn bấm chọn file từ máy */}
      <input type="file" accept="image/*" onChange={handleTestRealUpload} />

      {/* Nếu có link thì hiển thị ảnh ra luôn cho nóng */}
      {testImage && (
        <div style={{ marginTop: '20px' }}>
          <p>Link ảnh của bạn: {testImage}</p>
          <img src={testImage} alt="Test" style={{ width: '200px', borderRadius: '8px' }} />
        </div>
      )}
    </div>
  );
}

export default App1;