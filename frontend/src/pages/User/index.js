import { useMsal } from '@azure/msal-react';
import React, { useCallback, useEffect, useState } from 'react';
import { getProfilePicture, getUserId } from '../../common/sevices/authService';
import './styles.css';

export const User = () => {
    const { accounts } = useMsal();
    const [id, setId] = useState('');
    const [student, setStudent] = useState(null);
    const [profilePicture, setProfilePicture] = useState('');
    const getRoles = useCallback(() => {
        if (!accounts?.length) {
            return;
        }
        const roles = accounts[0].idTokenClaims.roles;
        if (!roles?.length) {
            return 'Sinh viên';
        }
        const role = accounts[0].idTokenClaims.roles[0];
        switch (role) {
        case 'Teacher':
            return 'Giáo Viên';
        case 'Admin':
            return 'Admin';
        default:
            return 'Sinh viên';
        }
    }, [accounts]);
    useEffect(() => {
        const setUserData = async () => {
            if (accounts.length) {
                const account = accounts[0];
                setStudent(account);
                const avatar = await getProfilePicture();
                if (avatar) {
                    setProfilePicture(avatar);
                } else {
                    setProfilePicture('/public/Images/avt_girl.jpg');
                }
            }

        };
        setUserData();
        setId(getUserId());
    }, [accounts]);
    return (
        <div>
            <h2>Thông tin cá nhân</h2>
            <div className='info'>
                <div className='image-info'>
                    <div>
                        <img src={profilePicture} alt="profile picture" />
                    </div>
                </div>
                <div className='persional-info'>
                    {student ? (
                        <div className='table-info'>
                            <table>
                                <tbody>
                                    <tr>
                                        <th>Mã số sinh viên:</th>
                                        <td>{id}</td>
                                    </tr>
                                    <tr>
                                        <th>Họ và tên:</th>
                                        <td>{student.idTokenClaims.given_name}</td>
                                    </tr>
                                    <tr>
                                        <th>Email:</th>
                                        <td>
                                            {student.email}
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>Nơi sinh:</th>
                                        <td>{student.placeOfBirth}</td>
                                    </tr>
                                    <tr>
                                        <th>Giới tính:</th>
                                        <td>{student.gender ? 'Nữ' : 'Nam'}</td>
                                    </tr>
                                    <tr>
                                        <th>Dân tộc:</th>
                                        <td>{student.ethnicGroup}</td>
                                    </tr>
                                    <tr>
                                        <th>CMND/CCCD:</th>
                                        <td>{student.citizenIdentification}</td>
                                    </tr>
                                    <tr>
                                        <th>Tôn giáo:</th>
                                        <td>{student.religion}</td>
                                    </tr>
                                </tbody>
                            </table>

                            <table>
                                <tbody>
                                    <tr>
                                        <th>Đảng/Đoàn:</th>
                                        <td>{student.unionParty ? 'Có' : 'Không'}</td>
                                    </tr>
                                    <tr>
                                        <th>Chức vụ:</th>
                                        <td>{getRoles()}</td>
                                    </tr>
                                    <tr>
                                        <th>Tình trạng học tập:</th>
                                        <td>{student.academicStatus}</td>
                                    </tr>
                                    <tr>
                                        <th>Quốc gia:</th>
                                        <td>{student.country}</td>
                                    </tr>
                                    <tr>
                                        <th>Tỉnh:</th>
                                        <td>{student.stateProvince}</td>
                                    </tr>
                                    <tr>
                                        <th>Thành phố:</th>
                                        <td>{student.districtCounty}</td>
                                    </tr>
                                    <tr>
                                        <th>Phường:</th>
                                        <td>{student.wardCommune}</td>
                                    </tr>
                                    <tr>
                                        <th>Số điện thoại:</th>
                                        <td>{student.phoneNumber}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>) : ('')}
                </div>
            </div>
        </div>
    );
};

