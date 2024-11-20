import axios from "axios";

const getTypeProduct = async () => {
    const response = await axios.get('http://localhost:8080/api/list-type')
    return response.data.data;
}

const getProductFromType = async (id) => {
    const response = await axios.get(`http://localhost:8080/api/list-product/${id}`)
    return response.data.data;
}

const getDetailProduct = async (id) => {
    const response = await axios.get(`http://localhost:8080/api/detail-product/${id}`)
    return response.data.data;
}

const getSizeStockProduct = async (id) => {
    const response = await axios.get(`http://localhost:8080/api/size-stock/${id}`)
    return response.data.data;
}

export default { getTypeProduct, getProductFromType, getDetailProduct, getSizeStockProduct }