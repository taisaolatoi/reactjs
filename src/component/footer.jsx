import React from "react";
import logo_phone from '../img/phone.svg'
import logo_email from '../img/email.svg'
import logo_facebook from '../img/facebook.png'
import logo_insta from '../img/insta.svg'
import logo_zalo from '../img/zalo.png'
import logo_tiktok from '../img/tiktok.png'
import logo_ytb from '../img/ytb.svg'
import './Footer.scss'
const Footer = () => {
    return (
        <div>
            <div className="footer_container">
                <div className="footer_inner">
                    <div className="f1">
                        <p className="footer_title">COOLMATE lắng nghe bạn!</p>
                        <p className="footer_desc">Chúng tôi luôn trân trọng và mong đợi nhận được mọi ý kiến đóng góp từ khách hàng để có thể nâng cấp trải nghiệm dịch vụ và sản phẩm tốt hơn nữa.</p>
                    </div>
                    <div className="f2">
                        <div className="footer_in4">
                            <div className="footer_icon">
                                <img src={logo_phone} alt="" />
                            </div>
                            <div>
                                <p>Hotline</p>
                                <p className="footer_desc_1">1900.272737 - 028.7777.2737
                                    <br />
                                    (8:30 - 22:00)</p>

                            </div>
                        </div>

                        <div className="footer_in4">
                            <div className="footer_icon">
                                <img src={logo_email} alt="" />
                            </div>
                            <div>
                                <p>Email</p>
                                <p className="footer_desc_1">maicovan@gmail.com</p>

                            </div>
                        </div>

                    </div>
                    <div className="f3">

                        <li><img src={logo_facebook} alt="" /></li>
                        <li><img src={logo_zalo} alt="" /></li>
                        <li><img src={logo_tiktok} alt="" /></li>
                        <li><img src={logo_insta} alt="" /></li>
                        <li><img src={logo_ytb} alt="" /></li>

                    </div>

                </div>
            </div>
        </div >
    )
}
export default Footer;