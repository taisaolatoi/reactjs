import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../contexts/AuthContext";
import { toast } from "react-toastify"; // Import toast

const UpdateFormPass = ({ onClose }) => {
    const { userId, isAuthenticated } = useContext(AuthContext);
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === "oldPassword") {
            setOldPassword(value);
        } else if (name === "newPassword") {
            setNewPassword(value);
        } else if (name === "confirmPassword") {
            setConfirmPassword(value);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!isAuthenticated || !userId) {
            console.error("Bạn chưa đăng nhập hoặc thiếu userId");
            return;
        }

        if (newPassword !== confirmPassword) {
            toast.error("Mật khẩu mới không khớp");
            return;
        }

        try {
            const response = await axios.put(
                "http://localhost:8080/api/fetch-change-password",
                {
                    id: userId,
                    oldPassword,
                    newPassword,
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "token"
                        )}`,
                    },
                }
            );

            if (response.data.errCode === 0) {
                console.log("Cập nhật mật khẩu thành công");
                toast.success("Cập nhật mật khẩu thành công!"); // Show success toast
            } else {
                console.error(response.data.errMessage);
                toast.error(response.data.errMessage); // Show error toast
            }
        } catch (error) {
            console.error("Lỗi khi cập nhật mật khẩu:", error);
            toast.error("Lỗi khi cập nhật mật khẩu!"); // Show generic error toast
        }
    };

    return (
        <div className="popup_body_login">
            <span className="close_popup" onClick={() => onClose()}>
                X
            </span>
            <div className="popup_wraper">
                <div className="popup_form">
                    <h2>Thay đổi mật khẩu:</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form_group_user">
                            <input
                                type="password"
                                name="oldPassword"
                                value={oldPassword}
                                onChange={handleInputChange}
                            />
                            <label htmlFor="">Mật khẩu cũ</label>
                        </div>

                        <div className="form_group_user">
                            <input
                                type="password"
                                name="newPassword"
                                value={newPassword}
                                onChange={handleInputChange}
                            />
                            <label htmlFor="">Mật khẩu mới</label>
                        </div>

                        <div className="form_group_user">
                            <input
                                type="password"
                                name="confirmPassword"
                                value={confirmPassword}
                                onChange={handleInputChange}
                            />
                            <label htmlFor="">Nhập lại mật khẩu</label>
                        </div>

                        <div className="account_in4_field">
                            <button type="submit" className="account_in4_btn">
                                Cập nhật mật khẩu
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UpdateFormPass;
