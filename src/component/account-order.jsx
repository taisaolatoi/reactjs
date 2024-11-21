import React, { useState, useEffect } from "react";
import orderService from '../services/orderServices'
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './account-order.scss'
import { NavLink } from "react-router-dom";


const AccountPageOrder = () => {
    const [orders, setOrder] = useState([])
    const [userData, setUserData] = useState([]); // Lưu trữ dữ liệu người dùng


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

    let id_user = userData.user && userData.user.id;
    useEffect(() => {
        if (id_user) { // Kiểm tra xem id_user có giá trị hay không
            const fetchOrder = async () => {
                let data = await orderService.getOrder(id_user);
                setOrder(data.data);
            };
            fetchOrder();
        }
    }, [id_user]);



    return (
        <div className="account-order-container">
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Địa chỉ</th>
                        <th>Số điện thoại</th>
                        <th>Trạng thái</th>
                    </tr>
                </thead>
                <tbody>
                    {orders && orders.map((order) => (
                        <tr key={order.id}>
                            <td>
                                <a href="/account/detail-order">{order.id}</a>
                            </td>
                            <td>{order.address}</td>
                            <td>{order.phone}</td>
                            <td>{order.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

    );
}
export default AccountPageOrder;