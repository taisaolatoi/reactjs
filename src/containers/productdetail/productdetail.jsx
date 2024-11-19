import React, { useState } from "react";
import './productdetail.scss'

const ProductDetail = () => {
    const [quantity, setQuantity] = useState(1);

    const handleCheck = (event) => {
        const input = event.target.previousElementSibling; // Lấy input radio
        input.checked = true; // Check input

        // Bỏ check các radio khác
        const otherRadios = document.querySelectorAll('input[name="size"]:not(:checked)');
        otherRadios.forEach(radio => {
            radio.checked = false;
            radio.nextElementSibling.style.backgroundColor = ''; // Reset màu nền
        });

        // Đổi màu nền span
        event.target.style.backgroundColor = 'black';
        event.target.style.color = 'white';
    };

    const handleIncreaseQuantity = () => {
        setQuantity(quantity + 1)
    }

    const handleDecreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1)

        }
    }
    return (
        <>
            <div className="title_page">
                <ul className="title_page_list">
                    <li className='title_page_fitem'>Trang chủ</li>
                    <li className='title_page_litem'>Áo Thun</li>
                </ul>
            </div>
            <div className="container_productdetail">
                <div className="productdetail_img">
                    <img src="https://media3.coolmate.me/cdn-cgi/image/width=672,height=990,quality=85/uploads/October2024/2484.ULSMV.TSZ708_VENOMSIGNATURE_0063_-7_DEN_70.jpg" alt="" />
                </div>
                <div className="productdetail_in4">
                    <div className="productdetail_title">
                        <p className="product_name">
                            Áo thun Relaxed Fit 84RISING Venom Signature</p>
                        <p className="product_price">399.000đ</p>
                    </div>
                    <div className="product_option">
                        <p className="option_headding">Kích thước:</p>
                        <div className="option_select">


                            <label htmlFor="" className="option_select_item">
                                <div className="option_select_inner">
                                    <input type="radio" name="size" value='S' />
                                    <span className="checkmark" onClick={handleCheck}>S</span>
                                </div>
                            </label>

                            <label htmlFor="" className="option_select_item">
                                <div className="option_select_inner">
                                    <input type="radio" name="size" value='S' />
                                    <span className="checkmark" onClick={handleCheck}>S</span>

                                </div>
                            </label>

                            <label htmlFor="" className="option_select_item">
                                <div className="option_select_inner">
                                    <input type="radio" name="size" value='S' />
                                    <span className="checkmark" onClick={handleCheck}>S</span>
                                </div>
                            </label>
                        </div>

                        <div className="quantity_cart_option">
                            <div className="quantity_box">
                                <button type='button' className="decrease" onClick={handleDecreaseQuantity}>-</button>
                                <input type="text" value={quantity}
                                    onChange={(e) => setQuantity(e.target.value)}
                                />
                                <button className="increase" onclick={handleIncreaseQuantity}>+</button>
                            </div>

                            <div className="product-single_button">
                                <a className="btn" href="">Thêm vào giỏ hàng</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default ProductDetail;