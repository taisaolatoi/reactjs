import React, { useState } from "react";
import axios from "axios";
import "./Auth.scss";
import { toast } from "react-toastify";

const RegisForm = ({ onClose, onToggle }) => {
    // State để lưu giá trị các trường trong form
    const [formData, setFormData] = useState({
        username: "",
        phone: "",
        fullname: "",
        password: "",
    });

    // Hàm để cập nhật giá trị của form khi người dùng nhập
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Hàm xử lý khi người dùng nhấn "Đăng Ký"
    const handleSubmit = async (e) => {
        e.preventDefault(); // Ngừng hành động mặc định của form (không reload trang)

        // Gửi yêu cầu POST đến API đăng ký sử dụng axios
        let response = await axios.post(
            "http://localhost:8080/api/registerPost",
            formData
        );
        if (response.data.errCode === 0) {
            toast.success("Đăng ký thành công!");
            onClose(); // Đóng popup
        } else {
            toast.error(response.data.errMessage);
        }
    };

    return (
        <div className="popup_body_login">
            <span className="close_popup" onClick={onClose}>
                X
            </span>
            <div className="popup_wraper">
                <div className="popup_banner">
                    <img
                        src="https://mcdn.coolmate.me/image/March2024/mceclip4_81.jpg"
                        alt=""
                    />
                </div>
                <div className="popup_form">
                    <h2>Đăng ký tài khoản:</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="in4_group">
                            <input
                                name="username"
                                type="text"
                                placeholder="Tài khoản"
                                value={formData.username}
                                onChange={handleInputChange}
                            />
                            <input
                                name="phone"
                                type="text"
                                placeholder="Số điện thoại"
                                value={formData.phone}
                                onChange={handleInputChange}
                            />
                        </div>
                        <input
                            name="fullname"
                            type="text"
                            placeholder="Họ và tên"
                            value={formData.fullname}
                            onChange={handleInputChange}
                        />
                        <input
                            name="password"
                            type="password"
                            placeholder="Mật khẩu"
                            value={formData.password}
                            onChange={handleInputChange}
                        />
                        <button className="login_btn" type="submit">
                            Đăng Ký
                        </button>
                    </form>
                </div>
                <div className="auth_actions">
                    <a href="#" onClick={onToggle}>
                        Đăng nhập
                    </a>
                </div>
            </div>
        </div>
    );
};

export default RegisForm;
