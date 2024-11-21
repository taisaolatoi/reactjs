import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import productServices from "../../services/productServices";
import "./productdetail.scss";
import { toast } from "react-toastify";
import cartServices from "../../services/cartServices";
import { AuthContext } from "../../contexts/AuthContext";

const ProductDetail = () => {
    const { id } = useParams();
    const [quantity, setQuantity] = useState(1);
    const [product, setProduct] = useState([]);
    const [size, setSize] = useState([]);
    const [Product1, setProduct1] = useState([]);
    const [selectedSize, setSelectedSize] = useState("");
    const { isAuthenticated, user, role, logout } = useContext(AuthContext);

    const handleCheck = (event) => {
        const input = event.target.previousElementSibling;

        // Kiểm tra xem input có bị vô hiệu hóa hay không
        if (input.disabled) {
            return; // Ngừng thực hiện nếu input bị vô hiệu hóa
        }

        input.click();
        setSelectedSize(input.value);

        const otherRadios = document.querySelectorAll(
            'input[name="size"]:not(:checked)'
        );
        otherRadios.forEach((radio) => {
            radio.checked = false;
            radio.nextElementSibling.style.backgroundColor = ""; // Reset màu nền
        });

        // Đổi màu nền span
        event.target.style.backgroundColor = "black";
        event.target.style.color = "white";
    };

    const handleIncreaseQuantity = () => {
        if (!selectedSize) {
            toast.error("Vui lòng chọn kích thước trước!");
            return; // Dừng thực thi hàm nếu chưa chọn size
        }

        const selectedProduct = size.find(
            (product) => product.size === selectedSize
        );
        if (selectedProduct && quantity < selectedProduct.stock) {
            setQuantity((prevQuantity) => Number(prevQuantity) + 1);
        } else {
            toast.error(`Số lượng trong kho chỉ còn ${selectedProduct.stock}!`);
        }
    };

    const handleDecreaseQuantity = () => {
        setQuantity((prevQuantity) => Math.max(1, Number(prevQuantity) - 1));
        console.log(quantity);
    };

    //     const newQuantity = parseInt(event.target.value, 10);
    //     const selectedProduct = size.find(product => product.size === selectedSize);
    //     if (selectedProduct && newQuantity <= selectedProduct.stock) {
    //         setQuantity(newQuantity);
    //     }
    // };

    useEffect(() => {
        const fetchDetailProduct = async () => {
            try {
                let data = await productServices.getDetailProduct(id);
                setProduct(data);
            } catch (error) {
                console.log("Lỗi khi lấy chi tiết sản phẩm", error);
            }
        };
        fetchDetailProduct();
    }, [id]);

    useEffect(() => {
        if (product && product.Product) {
            // Kiểm tra xem product1 đã được cập nhật hay chưa
            if (Product1 !== product.Product) {
                setProduct1(product.Product);
            }
        }
    }, [product, Product1]);

    useEffect(() => {
        const fetchSizeStock = async () => {
            try {
                let data = await productServices.getSizeStockProduct(id);
                setSize(data);
            } catch (error) {
                console.log("Lỗi khi lấy size", error);
            }
        };
        fetchSizeStock();
    }, [id]);

    const handleSubmit = async (event) => {
        event.preventDefault(); // Ngăn chặn form submit theo mặc định

        const name = event.target.name.value;
        const price = event.target.price.value;
        const imageUrl = event.target.imageUrl.value;
        const quantity = event.target.quantity.value;
        const size = event.target.size.value;
        const id_product = event.target.id_product.value;

        try {
            const response = await cartServices.addCart({
                name,
                price,
                imageUrl,
                quantity,
                size,
                id_product,
            });

            // Xử lý kết quả từ API (ví dụ: cập nhật state)
            // const decode = await response.json()
            // console.log(decode)
            console.log(response);
            // console.log('Thêm sản phẩm thành công:', response.data);
            toast.success("Thêm sản phẩm vào giỏ hàng thành công!"); // Hiển thị thông báo thành công
        } catch (error) {
            console.error("Lỗi khi thêm vào giỏ hàng:", error);
            toast.error("Lỗi khi thêm vào giỏ hàng!"); // Hiển thị thông báo lỗi
        }
    };

    return (
        <>
            <div className="title_page">
                <ul className="title_page_list">
                    <li className="title_page_fitem">Trang chủ</li>
                    <li className="title_page_litem">{Product1.name}</li>
                </ul>
            </div>
            <div className="container_productdetail">
                <div className="productdetail_img">
                    <img src={product.imageUrl} alt="" />
                </div>
                <div className="productdetail_in4">
                    <div className="productdetail_title">
                        <p className="product_name">{product.name}</p>
                        <p className="product_price">{product.price}</p>
                    </div>
                    <div className="product_option">
                        <p className="option_headding">Kích thước:</p>

                        <div className="option_select">
                            {size.map((product) => (
                                <label
                                    key={product.size}
                                    className="option_select_item"
                                >
                                    <div className="option_select_inner">
                                        <input
                                            type="radio"
                                            name="size"
                                            value={product.size}
                                            checked={
                                                selectedSize === product.size
                                            }
                                            onChange={(e) =>
                                                setSelectedSize(e.target.value)
                                            }
                                            disabled={product.stock == 0}
                                        />
                                        <span
                                            className="checkmark"
                                            onClick={
                                                product.stock == 0
                                                    ? null
                                                    : handleCheck
                                            }
                                            style={{
                                                pointerEvents:
                                                    product.stock == 0
                                                        ? "none"
                                                        : "auto",
                                            }}
                                        >
                                            {product.size}
                                        </span>
                                    </div>
                                </label>
                            ))}
                        </div>

                        <div className="quantity_cart_option">
                            <div className="quantity_box">
                                <button
                                    type="button"
                                    className="decrease"
                                    onClick={handleDecreaseQuantity}
                                >
                                    -
                                </button>
                                <input type="text" value={quantity} readOnly />
                                <button
                                    className="increase"
                                    onClick={handleIncreaseQuantity}
                                >
                                    +
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} action="">
                                <input
                                    type="hidden"
                                    name="name"
                                    value={product.name}
                                />
                                <input
                                    type="hidden"
                                    name="price"
                                    value={product.price}
                                />
                                <input
                                    type="hidden"
                                    name="imageUrl"
                                    value={product.imageUrl}
                                />
                                <input
                                    type="hidden"
                                    name="quantity"
                                    value={quantity}
                                />
                                <input
                                    type="hidden"
                                    name="size"
                                    value={selectedSize}
                                />
                                <input
                                    type="hidden"
                                    name="id_product"
                                    value={id}
                                />

                                {isAuthenticated ? (
                                    <div className="product-single_button">
                                        <button className="btn" href="">
                                            Thêm vào giỏ hàng
                                        </button>
                                    </div>
                                ) : (
                                    <div className="login_prompt">
                                        <p>
                                            Vui lòng đăng nhập để thêm vào giỏ
                                            hàng
                                        </p>
                                    </div>
                                )}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
export default ProductDetail;
