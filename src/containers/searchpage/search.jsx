import React from 'react';
import '../productpage/productpage.scss'

const Search = () => {
    const products = [
        {
            image: 'https://media3.coolmate.me/cdn-cgi/image/width=672,height=990,quality=85/uploads/October2024/2484.ULSMV.TSZ708_VENOMSIGNATURE_0063_-7_DEN_70.jpg',
            name: 'Sản phẩm 1',
            price: '100.000 VNĐ',
        },
        {
            image: 'https://via.placeholder.com/200x150',
            name: 'Sản phẩm 2',
            price: '150.000 VNĐ',
        },
        {
            image: 'https://via.placeholder.com/200x150',
            name: 'Sản phẩm 3',
            price: '200.000 VNĐ',
        },
        {
            image: 'https://via.placeholder.com/200x150',
            name: 'Sản phẩm 4',
            price: '250.000 VNĐ',
        },
        {
            image: 'https://via.placeholder.com/200x150',
            name: 'Sản phẩm 5',
            price: '300.000 VNĐ',
        },
        {
            image: 'https://via.placeholder.com/200x150',
            name: 'Sản phẩm 6',
            price: '350.000 VNĐ',
        },
        {
            image: 'https://via.placeholder.com/200x150',
            name: 'Sản phẩm 7',
            price: '400.000 VNĐ',
        },
        {
            image: 'https://via.placeholder.com/200x150',
            name: 'Sản phẩm 8',
            price: '450.000 VNĐ',
        },
        {
            image: 'https://via.placeholder.com/200x150',
            name: 'Sản phẩm 9',
            price: '500.000 VNĐ',
        },
        {
            image: 'https://via.placeholder.com/200x150',
            name: 'Sản phẩm 10',
            price: '550.000 VNĐ',
        },
    ];

    const filteredProducts = products.filter(product => {
        // Logic lọc sản phẩm dựa trên từ khóa tìm kiếm
        // Ví dụ: Lọc sản phẩm có tên chứa "áo thun"
        return product.name.toLowerCase().includes('áo thun');
    });

    return (
        <>
            <div className="title_page">
                {/* ... (Tiêu đề trang) */}
            </div>
            <h1>Tìm kiếm</h1>
            <div className="product-container">
                {filteredProducts.length > 0 ? (
                    filteredProducts.map((product, index) => (
                        <div className="product-item" key={index}>
                            <img className='product_img' src={product.image} alt={product.name} />
                            <div className="product_name">
                                <a href="/product_detail">{product.name}</a>
                            </div>
                            <p className='product_price'>Giá: {product.price}</p>
                        </div>
                    ))
                ) : (
                    <p className="no-results">Không có từ khóa hợp lệ</p>
                )}
            </div>
        </>
    );
};

export default Search;