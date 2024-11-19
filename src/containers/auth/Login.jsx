import React from 'react'
import './Auth.scss'

const LoginForm = ({ onClose, onToggle }) => { 
    return (
        <>
            <div className='popup_body_login'>
                <span className='close_popup' onClick={onClose}>X</span>
                <div className='popup_wraper'>
                    <div className='popup_banner'>
                        <img src="https://mcdn.coolmate.me/image/March2024/mceclip4_81.jpg" alt="" />
                    </div>
                    <div className="popup_form">
                        <h2>Đăng nhập bằng tài khoản:</h2>
                        <form action="">
                            <input type="text" placeholder='Email/SĐT của bạn' />
                            <input type="password" placeholder='Mật khẩu' />
                            <button className='login_btn'>Đăng Nhập</button>
                        </form>
                    </div>
                    <div className="auth_actions">
                        <a href="#" onClick={onToggle}>Đăng ký</a> 
                    </div>
                </div>
            </div>
        </>
    )
}
export default LoginForm;