import React, { useState, useEffect } from "react";
import UpdateForm from "./formupdate-in4";
import "./account-in4.scss";
import UpdateFormPass from "./formupdate-pass";
import axios from "axios";

const AccountPageIn4 = () => {
    const [showUpdateForm, setShowUpdateForm] = useState(false);
    const [userData, setUserData] = useState(null); // Lưu trữ dữ liệu người dùng

    // Kiểm tra trạng thái xác thực và lấy thông tin người dùng
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            axios
                .get("http://localhost:8080/api/fetchGetUserInfo", {
                    // Thay thế bằng API của bạn
                    headers: {
                        Authorization: `Bearer ${token}`, // Thêm token vào header
                    },
                })
                .then((response) => {
                    setUserData(response.data); // Lưu dữ liệu người dùng vào state
                })
                .catch((error) => {
                    console.error("Lỗi khi lấy thông tin người dùng:", error);
                });
        }
    }, []);

    const handleShowUpdateForm = () => {
        setShowUpdateForm(true);
    };

    const handleCloseUpdateForm = () => {
        setShowUpdateForm(false);
    };

    const [showUpdateFormPass, setShowUpdateFormPass] = useState(false);

    const handleShowUpdateFormPass = () => {
        setShowUpdateFormPass(true);
    };

    const handleCloseUpdateFormPass = () => {
        setShowUpdateFormPass(false);
    };

    return (
        <>
            <h3 className="account_page_title">Thông tin tài khoản</h3>
            <div className="account_in4_form">
                {/* Hiển thị thông tin từ userData */}
                {userData && (
                    <>
                        <div className="account_in4_field">
                            <div className="account_in4_label">Họ và Tên</div>
                            <div className="account_in4_value">
                                {userData.user.fullname}
                            </div>
                        </div>
                        <div className="account_in4_field">
                            <div className="account_in4_label">
                                Số điện thoại
                            </div>
                            <div className="account_in4_value">
                                {userData.user.phone}
                            </div>
                        </div>
                        <div className="account_in4_field">
                            <div className="account_in4_label">Địa chỉ</div>
                            <div className="account_in4_value">
                                {userData.user.address}
                            </div>
                        </div>
                        <div className="account_in4_field">
                            <button
                                className="account_in4_btn"
                                onClick={handleShowUpdateForm}
                            >
                                Thay đổi thông tin cá nhân
                            </button>
                        </div>
                    </>
                )}
                {showUpdateForm && (
                    <div className="login-modal">
                        <UpdateForm onClose={handleCloseUpdateForm} />
                    </div>
                )}
            </div>

            <h3 className="account_page_title">Thông tin đăng nhập</h3>
            {userData && (
                <>
                    <div className="account_in4_field">
                        <div className="account_in4_label">Tài khoản</div>
                        <div className="account_in4_value">
                            {userData.user.username}
                        </div>
                    </div>
                    <div className="account_in4_field">
                        <button
                            className="account_in4_btn"
                            onClick={handleShowUpdateFormPass}
                        >
                            Thay đổi mật khẩu
                        </button>
                    </div>
                </>
            )}

            {showUpdateFormPass && (
                <div className="login-modal">
                    <UpdateFormPass onClose={handleCloseUpdateFormPass} />
                </div>
            )}
        </>
    );
};

export default AccountPageIn4;
