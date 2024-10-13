import React from 'react';
import './styles.css';
import { Link } from 'react-router-dom';
export const AppHeader = () => {
    return (
        <div className="app-header flex justify-content-between p-3">
            <div className="flex align-items-center gap-3">
                <img
                    src="public/images/logoHcmue.png"
                    className="image-logo "
                    alt="logo"
                />
                <Link to="" className="font-bold text-lg">
          Trang Chủ
                </Link>
                <Link to="" className="font-bold text-lg">
          Giới Thiệu
                </Link>

                <Link to="" className="font-bold text-lg">
          Tuyển sinh
                </Link>
                <Link to="" className="font-bold text-lg">
          Đào tạo
                </Link>
            </div>
            <div className="flex align-items-center">
                <Link to="login" className="font-bold text-lg">
          Đăng Nhập
                </Link>
            </div>
        </div>
    );
};
