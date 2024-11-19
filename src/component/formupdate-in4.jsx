import React from "react";

const UpdateForm = ({onClose}) => {

    return (
        <div className='popup_body_login'>
            <span className='close_popup' onClick={onClose}>X</span>
            <div className='popup_wraper'>
                <div className="popup_form">
                    <h2>Chỉnh sửa thông tin tài khoản:</h2>
                    <form action="">
                        <div className="form_group_user">
                            <input type="text" />
                            <label htmlFor="">Họ tên của bạn</label>
                        </div>

                        <div className="form_group_user">
                            <label htmlFor="date">Ngày tháng năm:</label>
                            <input
                                type="date"
                                id="date"
                            // value={date}
                            // onChange={handleChange}
                            />
                        </div>

                        <div className="form_group_sex">
                            <div className="group_sex">
                                <label htmlFor="male">Nam:</label>
                                <input
                                    type="radio"
                                    id="male"
                                    name="gender"
                                    value="Nam"
                                // checked={gender === 'Nam'}
                                // onChange={handleChange}
                                />
                            </div>
                            <div className="group_sex">
                                <label htmlFor="female">Nữ:</label>
                                <input
                                    type="radio"
                                    id="female"
                                    name="gender"
                                    value="Nữ"
                                // checked={gender === 'Nữ'}
                                // onChange={handleChange}
                                />
                            </div>
                        </div>
                    </form>
                </div>
                <div className="account_in4_field">
                    <button className="account_in4_btn">Cập nhật tài khoản</button>
                </div>
            </div>
        </div>
    )
}
export default UpdateForm;