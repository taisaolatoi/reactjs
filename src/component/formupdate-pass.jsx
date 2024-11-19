import React from "react";

const UpdateFormPass = ({ onClose }) => {

    return (
        <div className='popup_body_login'>
            <span className='close_popup' onClick={onClose}>X</span>
            <div className='popup_wraper'>
                <div className="popup_form">
                    <h2>Thay đổi mật khẩu:</h2>
                    <form action="">
                        <div className="form_group_user">
                            <input type="password" />
                            <label htmlFor="">Mật khẩu cũ</label>
                        </div>

                        <div className="form_group_user">
                            <input type="password" />
                            <label htmlFor="">Mật khẩu mới</label>
                        </div>

                        <div className="form_group_user">
                            <input type="password" />
                            <label htmlFor="">Nhập lại mật khẩu</label>
                        </div>
                    </form>
                </div>
                <div className="account_in4_field">
                    <button className="account_in4_btn">Cập nhật mật khẩu</button>
                </div>
            </div>
        </div>
    )
}
export default UpdateFormPass;