import axios from "axios";

let addOrder = async (address, phone, status, products, id_user, paymentMethod, paymentStatus, totalPayment) => {
    try {
        const response = await axios.post('http://localhost:8080/api/add-order',
            {
                address, phone, status, products, id_user, paymentMethod, paymentStatus, totalPayment
            }
        )
        return response.data;
    } catch (error) {
        console.log('Lỗi khi thêm vào đơn hàng', error)
    }
}
export default { addOrder }