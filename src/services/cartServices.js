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

let getCart = async () => {
    const response = await axios.get('http://localhost:8080/api/get-cart')
    return response.data.data;
}

let deleteCart = async (id_product, size) => {
    const response = await axios.delete('http://localhost:8080/api/remove-cart', {
        data: { id_product, size } // Gửi dữ liệu ở đây
    });
    return response.data;
}

let updateCart = async (id_product, size, quantity) => {
    const response = await axios.put('http://localhost:8080/api/update-cart',
        {
            id_product, size, quantity
        }
    )
    return response.data;
}
export default { addCart, getCart, deleteCart, updateCart }