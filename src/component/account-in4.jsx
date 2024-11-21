import React, { useState, useEffect } from "react";
import UpdateForm from "./formupdate-in4";
import "./account-in4.scss";
import UpdateFormPass from "./formupdate-pass";
import axios from "axios";
import { toast } from "react-toastify";

const AccountPageIn4 = () => {
    const [showUpdateForm, setShowUpdateForm] = useState(false);
    const [userData, setUserData] = useState(null); // Lưu trữ dữ liệu người dùng
    const [selectedImage, setSelectedImage] = useState(null); // Lưu trữ ảnh được chọn
    const [showImagePreview, setShowImagePreview] = useState(false); // Hiển thị preview ảnh

    // Kiểm tra trạng thái xác thực và lấy thông tin người dùng
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            axios
                .get("http://localhost:8080/api/fetchGetUserInfo", {
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

    const handleCloseUpdateForm = (updatedUserData) => {
        setShowUpdateForm(false);
        if (updatedUserData) {
            setUserData(updatedUserData); // Cập nhật lại dữ liệu người dùng sau khi thành công
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setSelectedImage(file);
        setShowImagePreview(true);
    };

    const handleUploadImage = async () => {
        if (!selectedImage) {
            return;
        }
        const formData = new FormData();
        formData.append("avatar", selectedImage);
        formData.append("id", userData.user.id); // Gửi ID người dùng
        formData.append("currentImageUrl", userData.user.imageUrl); // Gửi URL ảnh hiện tại

        try {
            const response = await axios.post(
                "http://localhost:8080/update-avatar",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: `Bearer ${localStorage.getItem(
                            "token"
                        )}`,
                    },
                }
            );

            if (response.status === 200) {
                // Cập nhật lại dữ liệu người dùng sau khi upload ảnh thành công
                setUserData({
                    ...userData,
                    user: {
                        ...userData.user,
                        imageUrl: response.data.newAvatarUrl,
                    },
                });
                setSelectedImage(null);
                setShowImagePreview(false);
                toast.success("Cập nhật ảnh đại diện thành công");
            } else {
                console.error(
                    "Lỗi khi upload ảnh lên Cloudinary:",
                    response.data
                );
            }
        } catch (error) {
            console.error("Lỗi khi upload ảnh:", error);
        }
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
                {userData && (
                    <>
                        <div className="account_in4_field">
                            <div className="account_in4_label">
                                Ảnh đại diện
                            </div>
                            <div className="account_in4_value d-flex align-items-center">
                                <label
                                    htmlFor="avatar-input"
                                    className="avatar-container"
                                >
                                    {userData.user.imageUrl && (
                                        <img
                                            src={userData.user.imageUrl}
                                            alt="Ảnh đại diện"
                                            className="user-avatar"
                                        />
                                    )}
                                    {!userData.user.imageUrl && (
                                        <span className="placeholder">
                                            Chọn ảnh
                                        </span>
                                    )}
                                </label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    id="avatar-input"
                                    className="upload-input"
                                />
                                {showImagePreview && (
                                    <>
                                        <img
                                            src={URL.createObjectURL(
                                                selectedImage
                                            )}
                                            alt="Preview"
                                            className="image-preview"
                                        />

                                        <button
                                            className="account_in4_btn ms-3"
                                            onClick={handleUploadImage}
                                        >
                                            Tải lên
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
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
                            <div className="account_in4_label">Giới tính</div>
                            <div className="account_in4_value">
                                {userData.user.gender}
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
                {showUpdateForm && userData && (
                    <div className="login-modal">
                        <UpdateForm
                            onClose={handleCloseUpdateForm} // Truyền callback vào để cập nhật dữ liệu
                            userData={userData}
                            setUserData={setUserData} // Truyền hàm setUserData để cập nhật state
                        />
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
