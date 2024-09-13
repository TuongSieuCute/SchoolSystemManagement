import React, { useState, useEffect } from 'react';
import { getUserInfo } from '../../../helper/token';
import { useNavigate } from 'react-router-dom';
import format from 'date-fns/format'
import '../Student.css'

const Information = () => {
    const [student, setStudent] = useState([]);
    const [course, setCourse] = useState([]);

    const username = getUserInfo().username;
    const navigate = useNavigate();

    useEffect(() => {
        if (username) {
            fetch(`http://localhost:5065/api/Student/${username}`)
                .then(response => response.json())
                .then(data => setStudent(data))
                .catch(err => console.error('Lỗi', err));

            fetch(`http://localhost:5065/api/Course/${username}`)
                .then(response => response.json())
                .then(data => { setCourse(data) })
                .catch(err => console.error('Lỗi', err));
        }
    }, []);

    const handleClickChangePassword = () => {
        navigate('/student/changePassword');
    };

    return (
        <div>
            <h2>Thông tin cá nhân</h2>
            <div className='info'>
                <div className='image-info'>
                    {student ? (
                        <div>
                            <img src={student.urlImage} alt="" />
                            <button>Đổi ảnh</button>
                        </div>
                    ) : ('')}
                </div>
                <div className='persional-info'>
                    {student ? (
                        <div className='table-info'>
                            <table>
                                <tbody>
                                    <tr>
                                        <th>Mã số sinh viên:</th>
                                        <td>{student.studentId}</td>
                                    </tr>
                                    <tr>
                                        <th>Họ và tên:</th>
                                        <td>{student.fullName}</td>
                                    </tr>
                                    <tr>
                                        <th>Ngày sinh:</th>
                                        <td>
                                            {student.dateOfBirth
                                                ? format(new Date(student.dateOfBirth), 'dd/MM/yyyy')
                                                : ''}
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>Nơi sinh:</th>
                                        <td>{student.placeOfBirth}</td>
                                    </tr>
                                    <tr>
                                        <th>Giới tính:</th>
                                        <td>{student.gender === true ? 'Nữ' : 'Nam'}</td>
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
                                        <td>{student.unionParty === true ? 'Có' : 'Không'}</td>
                                    </tr>
                                    <tr>
                                        <th>Loại sinh viên:</th>
                                        <td>{student.typeStudent}</td>
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
                        </div>
                    ) : ('')}
                </div>
            </div>
            <h2>Thông tin khóa học</h2>
            <div className='course'>
                {course.length > 0 ? (
                    <div className='table-info'>
                        <table>
                            <tbody>
                                <tr>
                                    <th>Khóa học:</th>
                                    <td>{course[0].academicYearName}</td>
                                </tr>
                                <tr>
                                    <th>Năm nhập học:</th>
                                    <td>{course[0].year}</td>
                                </tr>
                                <tr>
                                    <th>Khoa:</th>
                                    <td>{course[0].departmentName}</td>
                                </tr>
                                <tr>
                                    <th>Ngành:</th>
                                    <td>{course[0].majorName}</td>
                                </tr>
                            </tbody>
                        </table>

                        <table>
                            <tbody>
                                <tr>
                                    <th>Chương trình đào tạo 1:</th>
                                    <td>{course[0].curriculumFrameworkId1}</td>
                                </tr>
                                <tr>
                                    <th>Chương trình đào tạo 2:</th>
                                    <td>{course[0].curriculumFrameworkId2}</td>
                                </tr>
                                <tr>
                                    <th>Lớp sinh viên:</th>
                                    <td>{course[0].classStudentId}</td>
                                </tr>
                                <tr>
                                    <th>Tên cố vấn học tập:</th>
                                    <td>{course[0].fullName}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                ) : ('')}
            </div>
            <button onClick={handleClickChangePassword}>Đổi mật khẩu</button>
            <button>Cập nhật thông tin sinh viên</button>
        </div>
    );
};

export default Information;
