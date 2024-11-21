import React, { useContext, useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import "./Layoutaccount.scss";
import { AuthContext } from "../../contexts/AuthContext";

const LayOutAccount = () => {
    const { logout } = useContext(AuthContext);
    return (
        <div className="cotainer_account">
            <div className="account_page_inner">
                <div className="account_page_sidebar">
                    <div className="account_sidebar">
                        <div className="account_sidebar_items">
                            <NavLink
                                to="/account"
                                className="account_sidebar_item"
                            >
                                <span className="circle">
                                    <img
                                        src="https://mcdn.coolmate.me/image/September2023/mceclip6_34.png"
                                        alt=""
                                    />
                                </span>
                                <p>Thông tin tài khoản</p>
                            </NavLink>
                            <a
                                href="/account/order"
                                className="account_sidebar_item"
                            >
                                <span className="circle">
                                    <img
                                        src="https://mcdn.coolmate.me/image/September2023/mceclip4_7.png"
                                        alt=""
                                    />
                                </span>
                                <p>Lịch sử đơn hàng</p>
                            </a>
                            <NavLink
                                to="/"
                                onClick={logout}
                                className="account_sidebar_item"
                            >
                                <span className="circle">
                                    <img
                                        src="https://mcdn.coolmate.me/image/September2023/mceclip4_6.png"
                                        alt=""
                                    />
                                </span>
                                <p>Đăng xuất</p>
                            </NavLink>
                        </div>
                    </div>
                </div>
                <div className="account_page_content">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};
export default LayOutAccount;
