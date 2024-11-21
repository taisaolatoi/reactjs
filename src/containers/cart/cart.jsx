import React, { useState, useEffect, useContext } from "react";
import {
    callAPI,
    callApiDistrict,
    callApiWard,
    host,
} from "../province/province";
import "./cart.scss";
import { AuthContext } from "../../contexts/AuthContext";
import cartServices from "../../services/cartServices";
// import orderServices from "../../services/"
import axios from "axios";
import orderServices from "../../services/orderServices";

const Cart = () => {
    const [province, setProvince] = useState("");
    const [district, setDistrict] = useState("");
    const [ward, setWard] = useState("");
    const [address, setAddress] = useState("");
    const [selectedPayment, setSelectedPayment] = useState(null);
    const [result, setResult] = useState("");
    const [quantity, setQuantity] = useState(1);
    const { isAuthenticated, user, role, logout } = useContext(AuthContext);
    const [products, setProduct] = useState([])
    const [userData, setUserData] = useState([]); // Lưu trữ dữ liệu người dùng
    const [totalPrice, setTotalPrice] = useState(0); // State để lưu trữ tổng tiền

    let total = 0;
    const productsData = products.map((product, index) => {
        const formattedPrice = parseFloat(product.price);
        // const totalPrice = total += formattedPrice * product.quanity;

        return {
            product_id: product.id_product,
            product_name: product.name,
            product_gia: product.price,
            product_img: product.imageUrl,
            product_size: product.size,
            product_quantity: product.quantity,
            product_Price: totalPrice,
        };
    });


    useEffect(() => {
        let total = 0;
        products.forEach((product) => {
            total += product.price * product.quantity; // Tính tổng tiền cho mỗi sản phẩm
        });
        const formattedtotal = parseInt(total);
        setTotalPrice(formattedtotal);
    }, [products]);


    useEffect(() => {
        callAPI("https://provinces.open-api.vn/api/?depth=1");
    }, []);

    const handleProvinceChange = (event) => {
        setProvince(event.target.value);
        callApiDistrict(host + "p/" + event.target.value + "?depth=2");
    };

    const handleDistrictChange = (event) => {
        setDistrict(event.target.value);
        callApiWard(host + "d/" + event.target.value + "?depth=2");
    };

    const handleWardChange = (event) => {
        setWard(event.target.value);
        setResult(province + " | " + district + " | " + ward);
    };

    const handlePaymentClick = (payment) => {
        setSelectedPayment(payment); // Cập nhật state khi click vào payment
    };

    const handleDecreaseQuantity = (productId, size) => {
        setProduct(prevProducts => prevProducts.map(product => {
            if (product.id_product === productId && product.size === size) {
                const newQuantity = product.quantity > 1 ? product.quantity - 1 : 1;
                handleQuantityChange(productId, size, newQuantity);
                return { ...product, quantity: newQuantity };
            }
            return product;
        }));
    };

    const handleIncreaseQuantity = (productId, size) => {
        setProduct(prevProducts => prevProducts.map(product => {
            if (product.id_product === productId && product.size === size) {
                const newQuantity = product.quantity + 1;
                // Gọi handleQuantityChange với giá trị newQuantity mới
                handleQuantityChange(productId, size, newQuantity);
                return { ...product, quantity: newQuantity };
            }
            return product;
        }));
    };

    useEffect(() => {
        const fetchUserData = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const response = await axios.get('http://localhost:8080/api/fetchGetUserInfo', {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    setUserData(response.data);
                } catch (error) {
                    console.error('Lỗi khi lấy thông tin người dùng:', error);
                }
            }
        };

        fetchUserData();
    }, []);



    const fetchProduct = async () => {
        try {
            const data = await cartServices.getCart();
            setProduct(data);
        } catch (error) {
            console.error('Lỗi lấy giỏ hàng:', error);
        }
    };


    useEffect(() => {
        fetchProduct();
    }, []);

    const handleSubmitDel = async (event) => {
        event.preventDefault();
        const id_product = event.target.product_id.value;
        const size = event.target.size.value;

        try {
            await cartServices.deleteCart({ id_product, size });
            fetchProduct();
        } catch (error) {
            console.log('Lỗi xóa', error);
        }
    };

    const handleQuantityChange = async (productId, size, newQuantity) => {
        try {

            const response = await cartServices.updateCart({
                id_product: productId,
                size: size,
                quantity: newQuantity
            });

            // Cập nhật lại state của sản phẩm trong mảng products
            setProduct(prevProducts => prevProducts.map(product => {
                if (product.id_product === productId && product.size === size) {
                    return { ...product, quantity: newQuantity };
                }
                return product;
            }));

            console.log(response);
        } catch (error) {
            console.error(error);
        }
    };


    const handleSubmit = async (event) => {
        event.preventDefault(); // Ngăn chặn form submit theo mặc định
        if (!address || !province || !district || !ward || !selectedPayment || !products) {
            alert("Vui lòng điền đầy đủ thông tin!");
            return;
        }

        const address1 = `${address} ${ward} ${district} ${province}`;
        const status = 'Chờ xác nhận';
        const paymentStatus = 'Đã hoàn thành';
        const id_user = userData.user && userData.user.id;
        const phone = userData && userData.user.phone;
        const paymentMethod = selectedPayment;
        const totalPayment = totalPrice;

        try {
            let response = await orderServices.addOrder({
                address1,
                phone,
                status,
                products,
                id_user,
                paymentMethod,
                paymentStatus,
                totalPayment,
            });
            console.log("Đơn hàng đã được thêm thành công:", response);
            fetchProduct();
        } catch (error) {
            console.log("Lỗi khi thêm đơn hàng:", error);
            alert("Đã xảy ra lỗi. Vui lòng thử lại sau.");
        }
    };
    return (
        <>
            <div className="cart_page_container">
                <form action="" className="cus_in4">
                    <div className="checkout_container">
                        <div className="cart_section">
                            <div className="title_width_actions">
                                <div className="title">Thông tin đặt hàng</div>
                            </div>
                            <div className="form_group_in4">
                                <div className="form_group a">
                                    <label htmlFor="">Họ và tên</label>
                                    <input type="text" value={userData.user && userData.user.fullname} readOnly />
                                </div>
                                <div className="form_group b">
                                    <label htmlFor="">Số điện thoại</label>
                                    <input type="text" maxLength={10} value={userData.user && userData.user.phone} readOnly />
                                </div>
                            </div>
                            <div className="form_group">
                                <label htmlFor="">Địa chỉ</label>
                                <input type="text" value={userData.user && userData.user.address} onChange={(e) => setAddress(e.target.value)} required />
                            </div>

                            <div className="form_group select">
                                <select
                                    id="province"
                                    value={province}
                                    onChange={handleProvinceChange}
                                >
                                    <option value="">Tỉnh/TP</option>{" "}
                                    {/* Option mặc định */}
                                    {/* Render danh sách tỉnh */}
                                </select>
                                <select
                                    id="district"
                                    value={district}
                                    onChange={handleDistrictChange}
                                >
                                    <option value="">Quận/Huyện</option>{" "}
                                    {/* Option mặc định */}
                                    {/* Render danh sách quận/huyện */}
                                </select>
                                <select
                                    id="ward"
                                    value={ward}
                                    onChange={handleWardChange}
                                >
                                    <option value="">Phường/Xã</option>{" "}
                                    {/* Option mặc định */}
                                    {/* Render danh sách phường/xã */}
                                </select>
                                {/* <div id="result">{result}</div> */}
                            </div>

                            <div className="option_payment">
                                <div className="title">Hình thức thanh toán</div>
                                <div
                                    className={`payment_COD ${selectedPayment === "COD" ? "selected" : ""
                                        }`}
                                    onClick={() => handlePaymentClick("COD")}
                                >
                                    <span className="payment_method">
                                        <input
                                            type="radio"
                                            name="payment_method"
                                            checked={selectedPayment === "COD"}
                                            onChange={() =>
                                                handlePaymentClick("COD")
                                            }
                                            required
                                        />
                                        <span className="checkmark"></span>
                                    </span>

                                    <span className="payment_method icon">
                                        <img
                                            src="https://mcdn.coolmate.me/image/October2024/mceclip2_42.png"
                                            alt=""
                                        />
                                    </span>

                                    <span className="payment_method name">
                                        <strong>Thanh toán khi nhận hàng</strong>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>

                <div className="cart_container">
                    <div className="title">Giỏ hàng</div>
                    {products && products.map(product => {
                        const formattedPrice = parseFloat(product.price); // Declare outside the map function

                        return ( // Add a return statement
                            <div className="cart_group">
                                <div className="cart_img">
                                    <img src={product.imageUrl} alt="" />
                                </div>
                                <div className="cart_product">
                                    <p className="product_name">{product.name}</p>
                                    <p className="product_size">Size: {product.size}</p>

                                    <div className="cart_desc">
                                        <div className="quantity_box">
                                            <button
                                                type="button"
                                                className="decrease"
                                                onClick={() => handleDecreaseQuantity(product.id_product, product.size)}
                                            >
                                                -
                                            </button>
                                            <input
                                                type="number"
                                                min="1"
                                                value={product.quantity}
                                                onChange={(e) => handleQuantityChange(product.id_product, product.size, parseInt(e.target.value, 10))}
                                            />
                                            <button
                                                className="increase"
                                                onClick={() => handleIncreaseQuantity(product.id_product, product.size)}
                                            >
                                                +
                                            </button>
                                        </div>
                                        <div className="price">
                                            <span>{formattedPrice.toLocaleString()}đ</span> {/* Use the formattedPrice variable */}
                                        </div>
                                    </div>

                                    <form action="" onSubmit={handleSubmitDel}>
                                        <input type="hidden" name="product_id" value={product.id_product} />
                                        <input type="hidden" name="size" value={product.size} />
                                        <button className="remove_item">
                                            <span>Xóa</span>
                                        </button>
                                    </form>
                                </div>
                            </div>
                        );
                    })}
                    <div className="pricing_in4">
                        <div className="line"></div>
                        <div className="pricing_in4_item">
                            <p>Tổng</p>
                            <span style={{ fontWeight: "bold" }}>{totalPrice.toLocaleString()}đ</span>
                        </div>
                        {isAuthenticated ? (
                            <form onSubmit={handleSubmit}>
                                <div className="checkout_btn_box">
                                    <button type="submit" onClick={handleSubmit} className="checkout_btn">
                                        ĐẶT HÀNG
                                    </button>
                                </div>
                            </form>
                        ) : (
                            <div className="login_prompt">
                                <p>Vui lòng đăng nhập để thanh toán giỏ hàng</p>
                            </div>
                        )}
                    </div>
                </div>
            </div >
        </>
    );
};

export default Cart;
