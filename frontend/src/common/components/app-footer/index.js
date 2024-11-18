import React from 'react';
import './styles.css';
export const AppFooter = () => {
    return (
        <div className="app-footer flex flex-row gap-3 p-3">
            <div className="flex-auto flex-column font-bold text-lg">
                <p>Địa chỉ</p>
                <p>280 An Dương Vương, Phường 4, Quận 5, Thành Phố Hồ Chí Minh</p>
                <p>222 Lê Văn Sỹ, Phường 14, Quận 3, Thành phố Hồ Chí Minh</p>
                <p>351A Lạc Long Quân, Phường 5, Quận 11, Thành phố Hồ Chí Minh</p>
            </div>
            <div className="flex-auto flex-column flex flex-column font-bold text-lg">
                <p>
                    <i className="pi pi-envelope pr-3"></i>
                    <span>
                        Email:{' '}
                        <a href="mailto:Phongctct@hcmue.edu.vn">
                            Phongctct@hcmue.edu.vn
                        </a>
                    </span>
                </p>
                <p>
                    <i className="pi pi-phone pr-3"></i>
                    <span>
                        Hotline: <a href="tel:02838352020">(028) 38352020</a>
                    </span>
                </p>
            </div>
        </div>
    );
};
