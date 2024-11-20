import React from "react";
<<<<<<< HEAD
import './Header.scss'
const Sub_menu = (props) => {
    const { type } = props;
    return (
        <div className="sub_nav">
            <div className="sub_nav_2">
                <div className="sn_title">
                    <p>Áo Nam</p>
=======
import "./Header.scss";
import { NavLink } from "react-router-dom";
const Sub_menu = () => {
    return (
        <div className="sub_nav">
            <div className="sub_nav_2">
                <div className="sn1">
                    <div className="sn_title">
                        <p>Áo Nam</p>
                    </div>
                    <span></span>
                    <ul className="sn_list">
                        <li className="sn_content">
                            <NavLink to="/product">Áo thun</NavLink>
                        </li>
                        <li className="sn_content">
                            <a href="#">Áo Sơ Mi</a>
                        </li>
                    </ul>
                </div>
                <div className="sn2">
                    <div className="sn_title">
                        <p>Quần Nam</p>
                    </div>
                    <span></span>
                    <ul className="sn_list">
                        <li className="sn_content">
                            <a href="#">Quần Short</a>
                        </li>
                        <li className="sn_content">
                            <a href="#">Quần Jeans</a>
                        </li>
                    </ul>
                </div>
                <div className="sn3">
                    <div className="sn_title">
                        <p>Phụ Kiện</p>
                    </div>
                    <span></span>
                    <ul className="sn_list">
                        <li className="sn_content">
                            <a href="#">Tất/Vớ</a>
                        </li>
                        <li className="sn_content">
                            <a href="#">Mũ/Nón</a>
                        </li>
                        <li className="sn_content">
                            <a href="#">Túi</a>
                        </li>
                    </ul>
>>>>>>> f968758ccdcd2dd13bc6096c409e120da4a8d0df
                </div>

                <ul className="sn_list">
                    {type.map((item) => (
                        <li className="sn_content" key={item.id}>
                            <a href={`/product/${item.id}`}>{item.name}</a>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};
export default Sub_menu;
