import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../contexts/AuthContext";
import { toast } from "react-toastify";
const UpdateForm = ({ onClose, userData, setUserData }) => {
    const { userId, isAuthenticated } = useContext(AuthContext); // Lấy userId và isAuthenticated từ context

    // Set formData ban đầu từ userData khi mở form
    const [formData, setFormData] = useState({
        fullname: userData.user.fullname || "", // Điền giá trị từ userData
        phone: userData.user.phone || "",
        address: userData.user.address || "",
        gender: userData.user.gender || "",
    });

    // Cập nhật dữ liệu form khi người dùng thay đổi
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Gửi yêu cầu cập nhật tài khoản
    const handleSubmit = (e) => {
        e.preventDefault();

        // Kiểm tra xem có phải đã đăng nhập chưa và có userId hay không
        if (isAuthenticated && userId) {
            // Gửi yêu cầu POST với dữ liệu (không cần gửi token trong header)
            axios
                .put("http://localhost:8080/api/fetch-update-user", {
                    id: userId,
                    fullname: formData.fullname,
                    phone: formData.phone,
                    address: formData.address,
                    gender: formData.gender,
                })
                .then((response) => {
                    if (response.data.errCode === 0) {
                        console.log("Cập nhật thành công", response.data.user); // In thông tin người dùng sau khi cập nhật
                        setUserData(response.data); // Cập nhật state với dữ liệu mới
                        onClose(); // Đóng popup sau khi thành công
                        toast.success("Cập nhật thông tin thành công!");
                    } else {
                        console.error(response.data.errMessage); // Hiển thị thông báo lỗi nếu có
                        toast.error(response.data.errMessage);
                    }
                })
                .catch((error) => {
                    console.error(
                        "Lỗi khi cập nhật thông tin người dùng:",
                        error
                    );
                    toast.error("Lỗi khi cập nhật thông tin!");
                });
        } else {
            console.error("Chưa đăng nhập hoặc thiếu userId");
        }
    };

    return (
        <div className="popup_body_login">
            <span className="close_popup" onClick={() => onClose()}>
                X
            </span>
            <div className="popup_wraper">
                <div className="popup_form">
                    <h2>Chỉnh sửa thông tin tài khoản:</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form_group_user">
                            <label htmlFor="fullname">Họ tên của bạn</label>
                            <input
                                type="text"
                                id="fullname"
                                name="fullname"
                                value={formData.fullname}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form_group_user">
                            <label htmlFor="phone">Số điện thoại</label>
                            <input
                                type="text"
                                id="phone"
                                name="phone"
                                value={formData.phone}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form_group_user">
                            <label htmlFor="address">Địa chỉ</label>
                            <input
                                type="text"
                                id="address"
                                name="address"
                                value={formData.address}
                                onChange={handleInputChange}
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
                                    checked={formData.gender === "Nam"}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="group_sex">
                                <label htmlFor="female">Nữ:</label>
                                <input
                                    type="radio"
                                    id="female"
                                    name="gender"
                                    value="Nữ"
                                    checked={formData.gender === "Nữ"}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                        <div className="account_in4_field">
                            <button type="submit" className="account_in4_btn">
                                Cập nhật tài khoản
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UpdateForm;
