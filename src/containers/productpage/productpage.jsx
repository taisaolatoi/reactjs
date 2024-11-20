import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import productServices from '../../services/productServices';
import './productpage.scss'

const ProductList = () => {
    const [products, setProduct] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        const fetchgetProduct = async () => {
            try {
                let data = await productServices.getProductFromType(id);
                setProduct([data]); // Chuyển đổi data thành một mảng
            } catch (error) {
                console.log("Lỗi khi lấy sản phẩm", error)
            }
        }
        fetchgetProduct()
    }, []);

    return (
        <>
            <div className="title_page">
                <ul className="title_page_list">
                    <li className='title_page_fitem'>Trang chủ</li>
                    <li className='title_page_litem'>Áo Thun</li>
                </ul>
            </div>
            {/* <h1>{products.TypeProduct.name}</h1> */}
            <div className="product-container">
                {products.length > 0 && products.map((product, index) => ( // Kiểm tra products có rỗng hay không
                    <div className="product-item" key={index}>
                        <img className='product_img' src={product.imageUrl} alt={product.name} />
                        <div className="product_name">
                            <a href={`/product-detail/${product.id}`}>{product.name}</a>
                        </div>
                        <p className='product_price'>Giá: {product.price}</p>
                    </div>
                ))}
            </div>
        </>

    );
};

export default ProductList;