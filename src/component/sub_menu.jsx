import React from "react";
import './Header.scss'
const Sub_menu = (props) => {
    const { type } = props;
    return (
        <div className="sub_nav">
            <div className="sub_nav_2">
                <div className="sn_title">
                    <p>Áo Nam</p>
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
