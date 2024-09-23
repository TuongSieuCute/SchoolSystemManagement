import React, { useState, useEffect } from 'react';
import { getUserInfo } from '../../../helper/token';
import CurriculumItem from './CurriculumItem';

const CurriculumList = () => {
    const [username, setUsername] = useState("")
    const [subjects, setSubjects] = useState([]);

    useEffect(() => {
        if (username) {
            fetch(`http://localhost:5065/api/InstructionalPlan/${username}`)
                .then(response => response.json())
                .then(data => setSubjects(data))
                .catch(err => console.error('Lỗi', err));
        }
    }, [username]);

    useEffect(() => {
        setUsername(getUserInfo().username);
    }, [])

    const sortSemesters = (semesters) => {
        const semesterOrder = {
            "Học kì 1": 1,
            "Học kì 2": 2,
            "Học kì 3": 3,
            "Học kì 4": 4,
            "Học kì 5": 5,
            "Học kì 6": 6,
            "Học kì 7": 7,
            "Học kì 8": 8
        };
        return semesters.sort((a, b) => (semesterOrder[a] || 0) - (semesterOrder[b] || 0));
    };

    const groupedSubjects = subjects.reduce((acc, item) => {
        if (!acc[item.semesterName]) {
            acc[item.semesterName] = [];
        }
        acc[item.semesterName].push(item);
        return acc;
    }, {});

    const sortedSemesters = sortSemesters(Object.keys(groupedSubjects));

    return (
        <div>
            {sortedSemesters.map((semesterName) => (
                <div key={semesterName}>
                    <h2>{semesterName}</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Mã học phần</th>
                                <th>Tên học phần</th>
                                <th>Loại học phần</th>
                                <th>Số tín chỉ</th>
                            </tr>
                        </thead>
                        <tbody>
                            {groupedSubjects[semesterName].map((item, index) => (
                                <CurriculumItem
                                    key={index}
                                    subjectId={item.subjectId}
                                    subjectName={item.subjectName}
                                    subjectType={item.subjectType}
                                    numberOfCredit={item.numberOfCredit}
                                    isCreditGpa={item.isCreditGpa}
                                />
                            ))}
                        </tbody>
                    </table>
                </div>
            ))}
        </div>
    );
};

export default CurriculumList;