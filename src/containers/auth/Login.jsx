import React, { useState } from "react";
import axios from "axios"; // Import axios
import "./Auth.scss";

const LoginForm = ({ onClose, onToggle }) => {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Ngừng hành động mặc định của form (không reload trang)

        // Gửi yêu cầu POST đến API đăng nhập sử dụng axios
        await axios.post("http://localhost:8080/api/loginPost", formData);
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
                    <h2>Đăng nhập bằng tài khoản:</h2>
                    <form onSubmit={handleSubmit}>
                        <input
                            name="username"
                            type="text"
                            placeholder="Tên tài khoản"
                            value={formData.username}
                            onChange={handleInputChange}
                        />
                        <input
                            name="password"
                            type="password"
                            placeholder="Mật khẩu"
                            value={formData.password}
                            onChange={handleInputChange}
                        />
                        <button type="submit" className="login_btn">
                            Đăng Nhập
                        </button>
                    </form>
                </div>
                <div className="auth_actions">
                    <a href="#" onClick={onToggle}>
                        Đăng ký
                    </a>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;
