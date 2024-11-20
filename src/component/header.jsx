import React, { useState, useEffect, useContext } from "react";
import logo from "../img/logo-coolmate-new.svg";
import search_icon from "../img/search.svg";
import user_icon from "../img/user.svg";
import cart_icon from "../img/cart.svg";
import Sub_menu from "./sub_menu";
import LoginForm from "../containers/auth/Login";
import RegisForm from "../containers/auth/Register";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import productServices from "../services/productServices";
import "./Header.scss";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const Header = () => {
    const { isAuthenticated, user, role, logout } = useContext(AuthContext);
    const [showAuthForm, setShowAuthForm] = useState(false);
    const [isLogin, setIsLogin] = useState(true);
    const [type, setType] = useState([]);

    // Hiển thị form đăng nhập
    const handleShowAuthForm = () => {
        setShowAuthForm(true);
    };

    // Đóng form đăng nhập
    const handleCloseAuthForm = () => {
        setShowAuthForm(false);
    };

    // Chuyển đổi giữa đăng nhập và đăng ký
    const handleToggleAuthForm = () => {
        setIsLogin(!isLogin);
    };

    useEffect(() => {
        const fetchTypeProduct = async () => {
            try {
                let type = await productServices.getTypeProduct();
                setType(type);
            } catch (error) {
                console.error("Lỗi lấy loại sản phẩm:", error);
            }
        };
        fetchTypeProduct();
    }, []);

    return (
        <div className="header">
            <div className="logo_header">
                <NavLink to={"/"}>
                    <img src={logo} alt="Logo" />
                </NavLink>
            </div>
            <div className="nav_header">
                <ul className="nav_sub">
                    <li className="nav_sub_item">
                        <a href="">SẢN PHẨM</a>
                        <Sub_menu type={type} />
                    </li>
                    <li className="nav_sub_item">
                        <a href="#">ĐỒ LÓT</a>
                    </li>
                    <li className="nav_sub_item">
                        <a href="#">ĐỒ THỂ THAO</a>
                    </li>
                </ul>
            </div>
            <div className="header_actions">
                <div className="header_actions_search">
                    <a href="#">
                        <img src={search_icon} alt="Search" />
                    </a>
                    <input type="text" placeholder="Tìm kiếm sản phẩm..." />
                </div>

                {/* Nếu người dùng đã đăng nhập, hiển thị menu người dùng */}
                <div className="header_actions_btn">
                    {isAuthenticated ? (
                        <div className="user_menu">
                            <img src={user_icon} alt="User" />
                            <div className="user_dropdown">
                                <p>Xin chào, {user}</p>
                                {role === "user" && (
                                    <>
                                        {/* Dùng NavLink thay vì a */}
                                        <NavLink to="/account">
                                            Trang cá nhân
                                        </NavLink>
                                        <NavLink onClick={logout} to="#">
                                            Đăng xuất
                                        </NavLink>
                                    </>
                                )}
                            </div>
                        </div>
                    ) : (
                        <a href="#" onClick={handleShowAuthForm}>
                            <img src={user_icon} alt="Login" />
                        </a>
                    )}

                    {showAuthForm && (
                        <div className="login-modal">
                            {isLogin ? (
                                <LoginForm
                                    onClose={handleCloseAuthForm}
                                    onToggle={handleToggleAuthForm}
                                />
                            ) : (
                                <RegisForm
                                    onClose={handleCloseAuthForm}
                                    onToggle={handleToggleAuthForm}
                                />
                            )}
                        </div>
                    )}
                </div>

                <div className="header_actions_btn">
                    <NavLink to={"/cart"}>
                        <img src={cart_icon} alt="Cart" />
                    </NavLink>
                </div>
            </div>
        </div>
    );
};

export default Header;
