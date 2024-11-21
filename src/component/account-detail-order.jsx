import React from "react";

const AccountDetailOrder = () => {
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
                {/* <tbody>
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
                </tbody> */}
            </table>
        </div>

    );
}
export default AccountDetailOrder;