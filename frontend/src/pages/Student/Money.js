import React, { useState, useEffect } from 'react';
import { useMsal } from '@azure/msal-react';
import { getStudentId } from '../../common/sevices/authService';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';

const YearDataTable = ({ year, money, isDataVisible, toggleDataVisibility }) => {
    const filteredMoney = money.filter(item => item.startDate >= year.startDate && item.endDate <= year.endDate);
    const hasDataForYear = filteredMoney.length > 0;
    const totalModney = filteredMoney.reduce((sum, item) => sum + item.total, 0);

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
    };

    const moneySubject = (rowData) => {
        return formatCurrency(rowData.total);
    };

    return (
        hasDataForYear && (
            <div key={year.label} className='datatable-container'>
                <DataTable
                    emptyMessage=" "
                    value={isDataVisible ? filteredMoney : []}
                    header={
                        <div className="flex flex-wrap align-items-center justify-content-between gap-2">
                            <span>{'Năm học: ' + year.label + ' - ' + year.semesterName}</span>
                            <Button 
                                style={{ background: 'var(--bg-red)'}} 
                                onClick={toggleDataVisibility} 
                                icon={isDataVisible ? 'pi pi-angle-down' : 'pi pi-angle-up'} 
                            />
                        </div>
                    }
                    footer={
                        <div className='flex flex-wrap justify-content-end p-2' style={{ background: 'white' }}>
                            <p><strong>Tổng tiền: </strong>{formatCurrency(totalModney)}</p>
                        </div>
                    }
                >
                    <Column field="subjectName" header="Tên học phần" />
                    <Column field="numberOfCredit" header="Số tín chỉ" />
                    <Column header="Số tiền" body={moneySubject} style={{ width: '10%', textAlign: 'right' }} />
                </DataTable>
            </div>
        )
    );
};

const Money = () => {
    const [studentId, setStudentId] = useState('');
    const [yearOptions, setYearOptions] = useState([]);
    const [rawData, setRawData] = useState([]);
    const [isDataVisible, setIsDataVisible] = useState(false);

    const { accounts } = useMsal();
    const toggleDataVisibility = () => setIsDataVisible(!isDataVisible);

    useEffect(() => {
        if (!accounts?.length) {
            return;
        }
        setStudentId(getStudentId());
    }, [accounts]);

    useEffect(() => {
        fetch('https://localhost:7074/api/Semester')
            .then(response => response.json())
            .then((data) => {
                const options = Array.from(new Set(data.map(item => item.academicYear)))
                    .map(year => data.find(item => item.academicYear === year))
                    .map(item => ({
                        label: item.academicYear,
                        value: item.academicYear,
                        startDate: item.startDate,
                        endDate: item.endDate,
                        semesterName: item.semesterName,
                    }));
                setYearOptions(options);
            })
            .catch(err => console.error('Lỗi', err));
    }, []);

    useEffect(() => {
        if (studentId) {
            fetch('https://localhost:7074/api/CourseRegistration')
                .then(response => response.json())
                .then((data) => {
                    const uniqueData = Array.from(
                        new Map(
                            data
                                .filter(item => item.studentId === studentId)
                                .map(item => [item.subjectName, item])
                        ).values()
                    );
                    setRawData(uniqueData);
                })
                .catch(err => console.error('Lỗi', err));
        }
    }, [studentId])

    return (
        <div>
            <h3 className='title'>HỌC PHÍ</h3>
            <div>
                {yearOptions.map((year) => (
                    <YearDataTable
                        key={year.value}
                        year={year}
                        money={rawData}
                        isDataVisible={isDataVisible}
                        toggleDataVisibility={toggleDataVisibility}
                    />
                ))}
            </div>
        </div>
    );
};

export default Money;