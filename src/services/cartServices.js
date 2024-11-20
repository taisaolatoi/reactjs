import axios from "axios";

let addCart = async (name, price, imageUrl, quantity, size, id_product) => {
    try {
        const response = await axios.post('http://localhost:8080/api/add-cart', {
            name,
            price,
            imageUrl,
            quantity,
            size,
            id_product
        });
        console.log('Kết quả API:', response.data);
        return response;
    } catch (error) {
        console.error('Lỗi khi thêm vào giỏ hàng11:', error);
        throw new Error('Lỗi khi thêm vào giỏ hàng'); // Throw error để controller xử lý
    }
};
export default { addCart }