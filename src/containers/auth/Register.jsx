import react from 'react'
import './Auth.scss'
const RegisForm = ({ onClose, onToggle }) => {
    return (
        <>
            <div className='popup_body_login'>
                <span className='close_popup' onClick={onClose}>X</span>
                <div className='popup_wraper'>
                    <div className='popup_banner'>
                        <img src="https://mcdn.coolmate.me/image/March2024/mceclip4_81.jpg" alt="" />
                    </div>
                    <div className="popup_form">
                        <h2>Đăng ký tài khoản:</h2>
                        <form action="">
                            <div className="in4_group">
                                <input type="text" placeholder='Tên của bạn' />
                                <input type="text" placeholder='SĐT của bạn' />
                            </div>
                            <input type="text" placeholder='Email/SĐT của bạn' />
                            <input type="password" placeholder='Mật khẩu' />
                            <button className='login_btn'>Đăng Ký</button>
                        </form>
                    </div>
                    <div className="auth_actions">
                        <a href="#" onClick={onToggle}>Đăng nhập</a>
                    </div>
                </div>
            </div>
        </>
    )
}
export default RegisForm;