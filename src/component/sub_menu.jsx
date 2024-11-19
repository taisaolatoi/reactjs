import React from "react";
import './Header.scss'
const Sub_menu = () => {
    return (
        <div className="sub_nav">
            <div className="sub_nav_2">
                <div className="sn1">
                    <div className="sn_title"><p>Áo Nam</p></div>
                    <span></span>
                    <ul className="sn_list">
                        <li className="sn_content"><a href="/product">Áo Thun</a></li>
                        <li className="sn_content"><a href="#">Áo Sơ Mi</a></li>
                    </ul>
                </div>
                <div className="sn2">
                    <div className="sn_title"><p>Quần Nam</p></div>
                    <span></span>
                    <ul className="sn_list">
                        <li className="sn_content"><a href="#">Quần Short</a></li>
                        <li className="sn_content"><a href="#">Quần Jeans</a></li>
                    </ul>
                </div>
                <div className="sn3">
                    <div className="sn_title"><p>Phụ Kiện</p></div>
                    <span></span>
                    <ul className="sn_list">
                        <li className="sn_content"><a href="#">Tất/Vớ</a></li>
                        <li className="sn_content"><a href="#">Mũ/Nón</a></li>
                        <li className="sn_content"><a href="#">Túi</a></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
export default Sub_menu;