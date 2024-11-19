import React, { useState, useEffect } from 'react';
import { callAPI, callApiDistrict, callApiWard, host } from '../province/province';
import './cart.scss'

const Cart = () => {
    const [province, setProvince] = useState('');
    const [district, setDistrict] = useState('');
    const [ward, setWard] = useState('');
    const [selectedPayment, setSelectedPayment] = useState(null);
    const [result, setResult] = useState('');
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        callAPI('https://provinces.open-api.vn/api/?depth=1');
    }, []);

    const handleProvinceChange = (event) => {
        setProvince(event.target.value);
        callApiDistrict(host + 'p/' + event.target.value + '?depth=2');
    };

    const handleDistrictChange = (event) => {
        setDistrict(event.target.value);
        callApiWard(host + 'd/' + event.target.value + '?depth=2');
    };

    const handleWardChange = (event) => {
        setWard(event.target.value);
        setResult(province + ' | ' + district + ' | ' + ward);
    };

    const handlePaymentClick = (payment) => {
        setSelectedPayment(payment); // Cập nhật state khi click vào payment
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
            <div className="cart_page_container">
                <div className="checkout_container">
                    <div className="cart_section">
                        <div className="title_width_actions">
                            <div className="title">Thông tin đặt hàng</div>
                        </div>
                        <form action="" className="cus_in4">
                            <div className="form_group_in4">
                                <div className="form_group a">
                                    <label htmlFor="">Họ và tên</label>
                                    <input type="text" />
                                </div>
                                <div className="form_group b">
                                    <label htmlFor="">Số điện thoại</label>
                                    <input type="text" maxLength={10} />
                                </div>
                            </div>
                            <div className="form_group">
                                <label htmlFor="">Email</label>
                                <input type="email" />
                            </div>
                            <div className="form_group">
                                <label htmlFor="">Địa chỉ</label>
                                <input type="text" />
                            </div>

                            <div className='form_group select'>
                                <select id="province" value={province} onChange={handleProvinceChange}>
                                    <option value="">Tỉnh/TP</option> {/* Option mặc định */}
                                    {/* Render danh sách tỉnh */}
                                </select>
                                <select id="district" value={district} onChange={handleDistrictChange}>
                                    <option value="">Quận/Huyện</option> {/* Option mặc định */}
                                    {/* Render danh sách quận/huyện */}
                                </select>
                                <select id="ward" value={ward} onChange={handleWardChange}>
                                    <option value="">Phường/Xã</option> {/* Option mặc định */}
                                    {/* Render danh sách phường/xã */}
                                </select>
                                {/* <div id="result">{result}</div> */}
                            </div>
                        </form>

                        <div className="option_payment">
                            <div className="title">Hình thức thanh toán</div>
                            <div
                                className={`payment_COD ${selectedPayment === 'COD' ? 'selected' : ''}`}
                                onClick={() => handlePaymentClick('COD')}
                            >
                                <span className='payment_method'>
                                    <input
                                        type="radio"
                                        name="payment_method"
                                        checked={selectedPayment === 'COD'}
                                        onChange={() => handlePaymentClick('COD')}
                                    />
                                    <span className='checkmark'></span>
                                </span>

                                <span className="payment_method icon">
                                    <img src="https://mcdn.coolmate.me/image/October2024/mceclip2_42.png" alt="" />
                                </span>

                                <span className="payment_method name">
                                    <strong>Thanh toán khi nhận hàng</strong>
                                </span>
                            </div>
                        </div>
                    </div>

                </div>
                <div className="cart_container">
                    <div className="title">Giỏ hàng</div>
                    <div className="cart_group">
                        <div className="cart_img">
                            <img src="https://media3.coolmate.me/cdn-cgi/image/width=320,height=362,quality=80/uploads/November2024/24CMCW.DT002__8875_NAVY_14.jpg" alt="" />
                        </div>
                        <div className="cart_product">
                            <p className="product_name">Áo giữ nhiệt Essential Brush Poly cổ trung</p>
                            <p className="product_size">Size: L</p>

                            <div className="cart_desc">
                                <div className="quantity_box">
                                    <button type='button' className="decrease" onClick={handleDecreaseQuantity}>-</button>
                                    <input type="text" value={quantity}
                                        onChange={(e) => setQuantity(e.target.value)}
                                    />
                                    <button className="increase" onclick={handleIncreaseQuantity}>+</button>
                                </div>
                                <div className="price">
                                    <span>149.000đ</span>
                                </div>
                            </div>

                            <button className="remove_item">
                                <span>Xóa</span>
                            </button>

                        </div>
                    </div>
                    <div className="pricing_in4">
                        <div className="pricing_in4_item">
                            <p>Tạm tính</p>
                            <span>0đ</span>
                        </div>

                        <div className="pricing_in4_item">
                            <p>Phí giao hàng</p>
                            <span>Miễn phí</span>
                        </div>
                        <div className="line"></div>
                        <div className="pricing_in4_item">
                            <p>Tổng</p>
                            <span style={{ fontWeight: 'bold' }}>0đ</span>
                        </div>

                        <div className="checkout_btn_box">
                            <button className="checkout_btn">
                                ĐẶT HÀNG
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}
export default Cart;