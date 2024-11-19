import React, { useState } from "react";
import UpdateForm from "./formupdate-in4";
import './account-in4.scss'
import UpdateFormPass from "./formupdate-pass";
const AccountPageIn4 = () => {
    const [showUpdateForm, setShowUpdateForm] = useState(false);

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
            <h3 className="account_page_title">
                Thông tin tài khoản
            </h3>
            <div className="account_in4_form">
                <div className="account_in4_field">
                    <div className="account_in4_label">Họ và Tên</div>
                    <div className="account_in4_value">Văn Phát Đạt</div>
                </div>

                <div className="account_in4_field">
                    <div className="account_in4_label">Số điện thoại</div>
                    <div className="account_in4_value">0583042981</div>
                </div>

                <div className="account_in4_field">
                    <div className="account_in4_label">Giới tính</div>
                    <div className="account_in4_value">Nam</div>
                </div>

                <div className="account_in4_field">
                    <div className="account_in4_label">Ngày sinh</div>
                    <div className="account_in4_value">13/08/2003</div>
                </div>

                <div className="account_in4_field">
                    <button className="account_in4_btn" onClick={handleShowUpdateForm}>Cập nhật</button>
                </div>
                {showUpdateForm && (
                    <div className="login-modal">
                        <UpdateForm onClose={handleCloseUpdateForm} />
                    </div>
                )}
            </div>


            <h3 className="account_page_title">
                Thông tin đăng nhập
            </h3>
            <div className="account_in4_field">
                <div className="account_in4_label">Email</div>
                <div className="account_in4_value">vpdat2100513@student.ctuet.edu.vn</div>
            </div>
            <div className="account_in4_field">
                <div className="account_in4_label">Mật khẩu</div>
                <div className="account_in4_value">**************************</div>
            </div>
            <div className="account_in4_field">
                <button className="account_in4_btn" onClick={handleShowUpdateFormPass}>Cập nhật</button>
            </div>
            {showUpdateFormPass && (
                <div className="login-modal">
                    <UpdateFormPass onClose={handleCloseUpdateFormPass} />
                </div>
            )}
        </>
    )
}
export default AccountPageIn4;