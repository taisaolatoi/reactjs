import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../contexts/AuthContext"; // Import AuthContext
import { jwtDecode } from "jwt-decode"; // Import jwtDecode
import "./Auth.scss";

const LoginForm = ({ onClose, onToggle }) => {
    const { setIsAuthenticated, setUser, setRole } = useContext(AuthContext); // Lấy các hàm cập nhật trạng thái
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
        e.preventDefault();

        try {
            const response = await axios.post(
                "http://localhost:8080/api/loginPost",
                formData
            );

            if (response.data.errCode === 0) {
                const token = response.data.token;
                // Lưu token vào localStorage
                localStorage.setItem("token", token);

                // Giải mã token và cập nhật trạng thái người dùng
                const decoded = jwtDecode(token);
                setUser(decoded.username); // Cập nhật tên người dùng
                setRole(decoded.role); // Cập nhật role người dùng
                setIsAuthenticated(true); // Đánh dấu là đã đăng nhập thành công

                // Đóng modal sau khi đăng nhập thành công
                onClose();
            } else {
                alert(response.data.errMessage);
            }
        } catch (error) {
            console.error("Đăng nhập thất bại:", error);
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
