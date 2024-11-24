import React, { useState, useEffect, useRef } from 'react';
import { Dropdown } from 'primereact/dropdown';
import { FloatLabel } from 'primereact/floatlabel';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useMsal } from '@azure/msal-react';
import { getUserId } from '../../common/sevices/authService';

const InstructionalPlan = () => {
    const [studentId, setStudentId] = useState('');
    const [subjectSemester, setSubjectSemester] = useState([]);
    const [subjectElectiveCredit, setSubjectElectiveCredit] = useState({});
    const [selectedExercises1, setSelectedExercises1] = useState([]);
    const [selectedExercises2, setSelectedExercises2] = useState([]);
    const [selectedExercises3, setSelectedExercises3] = useState([]);
    const [selectedModuleGroupId, setSelectedModuleGroupId] = useState([]);
    const [defaultDropdown, setDefaultDropdown] = useState(null);
    const [dropdownOptions, setDropdownOptions] = useState([]);
    const [rawData, setRawData] = useState([]);
    const [selectedSemester, setSelectedSemester] = useState(null);

    const { accounts, instance } = useMsal();

    const exercises1 = useRef(['PHYL2401']);
    const exercises2 = useRef(['PHYL2405', 'PHYL2404', 'PHYL2403', 'PHYL2402', 'PHYL2410', 'PHYL2409', 'PHYL2408', 'PHYL2407', 'PHYL2406']);
    const exercises3 = useRef(['PHYL2419', 'PHYL2418', 'PHYL2417', 'PHYL2416', 'PHYL2415', 'PHYL2414', 'PHYL2413', 'PHYL2412', 'PHYL2411']);
    const moduleGroupId = useRef(['EDUC2801', 'PSYC1493', 'PSYC2801', 'DOMS0']);
    const semesters = [
        { label: 'Học kỳ 1', value: 'Học kì 1' },
        { label: 'Học kỳ 2', value: 'Học kì 2' },
        { label: 'Học kỳ 3', value: 'Học kì 3' },
        { label: 'Học kỳ 4', value: 'Học kì 4' },
        { label: 'Học kỳ 5', value: 'Học kì 5' },
        { label: 'Học kỳ 6', value: 'Học kì 6' },
        { label: 'Học kỳ 7', value: 'Học kì 7' },
        { label: 'Học kỳ 8', value: 'Học kì 8' }
    ];

    const semesterFilterTemplate = (options) => {
        return (
            <Dropdown
                value={selectedSemester}
                options={semesters}
                onChange={(e) => {
                    setSelectedSemester(e.value);
                    options.filterCallback(e.value); 
                }}
                placeholder="Chọn học kỳ"
                filter
            />
        );
    };

    useEffect(() => {
        if (!accounts?.length) {
            return;
        }
        setStudentId(getUserId());
    }, [accounts]);

    useEffect(() => {
        if (studentId) {
            fetch(`http://localhost:5065/api/InstructionalPlan/${studentId}`)
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
    }, [studentId]);

    useEffect(() => {
        if (rawData && defaultDropdown) {
            const filteredData = rawData.filter(item => item.trainingProgramName === defaultDropdown);

            setSubjectSemester(filteredData);

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
            <h1 className='title'>Chương trình đào tạo</h1>
            <div>
                <FloatLabel>
                    <Dropdown
                        value={defaultDropdown}
                        options={dropdownOptions}
                        onChange={(e) => setDefaultDropdown(e.value)}
                        className='cus-dropdown'
                        panelClassName='cus-panel-dropdown'
                    />
                    <label htmlFor="defaultDropdown" className='cus-label-dropdown'>Chương trình đào tạo</label>
                </FloatLabel>
            </div>
            <div>
                <DataTable
                    value={subjectSemester}
                    scrollable scrollHeight="500px"
                    sortMode="multiple"
                    multiSortMeta={[
                        { field: 'semesterName', order: 1 },
                        { field: 'subjectType', order: 1 }
                    ]}
                    filters={{ 'semesterName': { value: selectedSemester, matchMode: 'equals' } }}
                    filterDisplay="row"
                >
                    <Column field="subjectId" header="Mã học phần" />
                    <Column field="subjectName" header="Tên học phần" />
                    <Column header="Số tín chỉ" body={renderNumberOfCredit} />
                    <Column field="subjectType" header="Loại học phần" />
                    <Column
                        field="semesterName"
                        header="Học kì"
                        filter
                        filterElement={semesterFilterTemplate}
                    />
                </DataTable>
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
        </div >
    );
};

export default InstructionalPlan;