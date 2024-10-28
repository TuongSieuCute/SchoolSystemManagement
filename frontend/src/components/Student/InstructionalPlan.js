import React, { useState, useEffect, useRef } from 'react';
import { Dropdown } from 'primereact/dropdown';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { getUserInfoLocal } from '../../helper/token';

const InstructionalPlan = () => {
    const [username, setUsername] = useState('');
    const [subjectSemester, setSubjectSemester] = useState({});
    const [subjectElectiveCredit, setSubjectElectiveCredit] = useState({});
    const [selectedExercises1, setSelectedExercises1] = useState([]);
    const [selectedExercises2, setSelectedExercises2] = useState([]);
    const [selectedExercises3, setSelectedExercises3] = useState([]);
    const [selectedModuleGroupId, setSelectedModuleGroupId] = useState([]);
    const [defaultDropdown, setDefaultDropdown] = useState(null);
    const [dropdownOptions, setDropdownOptions] = useState([]);
    const [rawData, setRawData] = useState([]);

    const exercises1 = useRef(['PHYL2401']);
    const exercises2 = useRef(['PHYL2405', 'PHYL2404', 'PHYL2403', 'PHYL2402', 'PHYL2410', 'PHYL2409', 'PHYL2408', 'PHYL2407', 'PHYL2406']);
    const exercises3 = useRef(['PHYL2419', 'PHYL2418', 'PHYL2417', 'PHYL2416', 'PHYL2415', 'PHYL2414', 'PHYL2413', 'PHYL2412', 'PHYL2411']);
    const moduleGroupId = useRef(['EDUC2801', 'PSYC1493', 'PSYC2801', 'DOMS0']);

    useEffect(() => {
        setUsername(getUserInfoLocal().username);
    }, []);

    useEffect(() => {
        if (username) {
            fetch(`http://localhost:5065/api/InstructionalPlan/${username}`)
                .then(response => response.json())
                .then((data) => {
                    const options = data.map(item => ({
                        label: item.trainingProgramName,
                        value: item.trainingProgramName
                    }));
                    const uniqueOptions = Array.from(new Set(options.map(option => option.value)))
                        .map(uniqueValue => options.find(option => option.value === uniqueValue));
                    setDropdownOptions(uniqueOptions);

                    setDefaultDropdown(uniqueOptions[0]?.value || null);

                    setRawData(data);
                })
                .catch(err => console.error('Lỗi', err));
        }
    }, [username]);

    useEffect(() => {
        if (rawData && defaultDropdown) {
            const filteredData = rawData.filter(item => item.trainingProgramName === defaultDropdown);

            // Lọc dữ liệu theo học kì
            const groupedSemesters = filteredData.reduce((acc, subject) => {
                const semesterName = subject.semesterName;
                if (!acc[semesterName]) {
                    acc[semesterName] = [];
                }
                acc[semesterName].push(subject);
                return acc;
            }, {});
            setSubjectSemester(groupedSemesters);

            // Lọc dữ liệu theo nhóm học phần tự chọn
            const groupedSubjects = filteredData.reduce((acc, subject) => {
                const groupId = subject.trainingProgramModuleGroupId;
                if (!acc[groupId]) {
                    acc[groupId] = [];
                }
                acc[groupId].push(subject);
                return acc;
            }, {});

            const filteredGroups = Object.keys(groupedSubjects).reduce((acc, groupId) => {
                const subjectsInGroup = groupedSubjects[groupId];
                const filteredSubjects = subjectsInGroup.filter(subject =>
                    subject.numberOfElectiveCredits > 0 &&
                    subject.subjectType === 'Tự chọn' &&
                    subject.moduleGroupId !== 'NHP1'
                );

                if (filteredSubjects.length > 0) {
                    acc[groupId] = filteredSubjects;
                }

                return acc;
            }, {});
            setSubjectElectiveCredit(filteredGroups);

            setSelectedExercises1(filteredData.filter(subject => exercises1.current.includes(subject.subjectId)));
            setSelectedExercises2(filteredData.filter(subject => exercises2.current.includes(subject.subjectId)));
            setSelectedExercises3(filteredData.filter(subject => exercises3.current.includes(subject.subjectId)));
            setSelectedModuleGroupId(filteredData.filter(subject => moduleGroupId.current.includes(subject.subjectId)));
        }
    }, [rawData, defaultDropdown]);

    const renderNumberOfCredit = (rowData) => {
        return rowData.isCreditGpa === false
            ? rowData.numberOfCredit + '*'
            : rowData.numberOfCredit;
    };

    return (
        <div>
            <div>
                <Dropdown
                    value={defaultDropdown}
                    options={dropdownOptions}
                    onChange={(e) => setDefaultDropdown(e.value)}
                />
            </div>
            <div>
                {Object.keys(subjectSemester)
                    .sort()
                    .map((semesterName) => (
                        <div key={semesterName}>
                            <h3>{semesterName}</h3>
                            <DataTable value={subjectSemester[semesterName]}>
                                <Column header="STT" body={(rowData, options) => options.rowIndex + 1} />
                                <Column field="subjectId" header="Mã học phần" />
                                <Column field="subjectName" header="Tên học phần" />
                                <Column header="Số tín chỉ" body={renderNumberOfCredit} />
                                <Column field="subjectType" header="Loại học phần" />
                            </DataTable>
                        </div>
                    ))}
            </div>
            <div>
                <p>Ghi chú : Những môn có dấu (*) sẽ không tính điểm trung bình mà chỉ là môn điều kiện.</p>
                <p>Sinh viên tích lũy đủ số tín chỉ trong các nhóm tự chọn sau:</p>
                <p>Sinh viên chọn học theo các nhóm sau:</p>
            </div>
            <div>
                <h4>Sinh viên tích lũy 1 tín chỉ trong nhóm</h4>
                <DataTable value={selectedExercises1}>
                    <Column field="subjectId" header="Mã học phần" />
                    <Column field="subjectName" header="Tên học phần" />
                    <Column field="numberOfCredit" header="Số tín chỉ" />
                </DataTable>

                <h4>Sinh viên tích lũy 1 tín chỉ trong nhóm</h4>
                <DataTable value={selectedExercises2}>
                    <Column field="subjectId" header="Mã học phần" />
                    <Column field="subjectName" header="Tên học phần" />
                    <Column field="numberOfCredit" header="Số tín chỉ" />
                </DataTable>

                <h4>Sinh viên tích lũy 1 tín chỉ trong nhóm</h4>
                <DataTable value={selectedExercises3}>
                    <Column field="subjectId" header="Mã học phần" />
                    <Column field="subjectName" header="Tên học phần" />
                    <Column field="numberOfCredit" header="Số tín chỉ" />
                </DataTable>

                <h4>Sinh viên tích lũy 1 tín chỉ trong nhóm</h4>
                <DataTable value={selectedModuleGroupId}>
                    <Column field="subjectId" header="Mã học phần" />
                    <Column field="subjectName" header="Tên học phần" />
                    <Column field="numberOfCredit" header="Số tín chỉ" />
                </DataTable>
            </div>
            <div>
                {Object.keys(subjectElectiveCredit)
                    .sort()
                    .map((groupId) => (
                        <div key={groupId}>
                            <h4>Sinh viên tích lũy {subjectElectiveCredit[groupId][0]?.numberOfElectiveCredits || 0} tín chỉ trong nhóm</h4>
                            <DataTable value={subjectElectiveCredit[groupId]}>
                                <Column field="subjectId" header="Mã học phần" />
                                <Column field="subjectName" header="Tên học phần" />
                                <Column field="numberOfCredit" header="Số tín chỉ" />
                            </DataTable>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default InstructionalPlan;