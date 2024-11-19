import React, { useState } from "react";
import logo from '../img/logo-coolmate-new.svg'
import search_icon from '../img/search.svg'
import user_icon from '../img/user.svg'
import cart_icon from '../img/cart.svg'
import Sub_menu from "./sub_menu";
import LoginForm from "../containers/auth/Login";
import RegisForm from "../containers/auth/Register";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Header.scss'

const Header = () => {
    const [showAuthForm, setShowAuthForm] = useState(false);
    const [isLogin, setIsLogin] = useState(true);

    const handleShowAuthForm = () => {
        setShowAuthForm(true);
    };

    const handleCloseAuthForm = () => {
        setShowAuthForm(false);
    };

    const handleToggleAuthForm = () => {
        setIsLogin(!isLogin);
    };

    return (
        <div className="header">
            <div className="logo_header">
                <img src={logo} alt="" />
            </div>
            <div className="nav_header">
                <ul className="nav_sub">
                    <li className="nav_sub_item">
                        <a href="">SẢN PHẨM</a>
                        <Sub_menu />
                    </li>
                    <li className="nav_sub_item">
                        <a href="">ĐỒ LÓT</a>
                    </li>
                    <li className="nav_sub_item">
                        <a href="">ĐỒ THỂ THAO</a>
                    </li>
                </ul>
            </div>
            <div className="header_actions">
                <div className="header_actions_search">
                    <a href="#">
                        <img src={search_icon} alt="" />
                    </a>
                    <input type="text" placeholder="Tìm kiếm sản phẩm..." />
                </div>
                <div className="header_actions_btn">
                    <a href="#" onClick={handleShowAuthForm}>
                        <img src={user_icon} alt="" />
                    </a>
                    {showAuthForm && (
                        <div className="login-modal">
                            {isLogin ? (
                                <LoginForm onClose={handleCloseAuthForm} onToggle={handleToggleAuthForm} />
                            ) : (
                                <RegisForm onClose={handleCloseAuthForm} onToggle={handleToggleAuthForm} />
                            )}
                        </div>
                    )}
                </div>
                <div className="header_actions_btn">
                    <a href="/cart">
                        <img src={cart_icon} alt="" />
                    </a>
                </div>

            </div>
        </div>
    )
}
export default Header;