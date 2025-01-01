import { getSemester } from '../common/sevices/semesterService';
import { getSubject } from '../common/sevices/subjectService';

// Hàm lọc dữ liệu dropdown Year và Semester
export const dropdownYearSemester = async (setOptionsYear, setOptionsSemester) => {
    try {
        const response = await getSemester();
        const data = await response.json();
        if (data?.length) {
            const optionsYear = [...new Set(data.map(item => item.academicYear))].map(year => ({ label: year, value: year }));
            setOptionsYear(optionsYear);

            const optionsSemester = [...new Set(data.map(item => item.semesterName))].map(semester => ({ label: semester, value: semester }));
            setOptionsSemester(optionsSemester);
        } else {
            console.log('Dữ liệu rỗng');
        }
    } catch (error) {
        console.error('Lỗi', error);
    }
};

// Hàm show giá trị mặc định của dropdown Year và Semester
export const defaultYearSemester = async (setSelectedYear, setSelectedSemester) => {
    const today = new Date().toISOString().split('T')[0];
    try {
        const response = await getSemester();
        const data = await response.json();
        if (data) {
            const currentSemester = data.find(item => item.startDate <= today && item.endDate >= today);
            const upcomingSemester = data.find(item => item.startDate > today);
            const selectedSemester = currentSemester || upcomingSemester;
            if (selectedSemester) {
                setSelectedYear(selectedSemester.academicYear);
                setSelectedSemester(selectedSemester.semesterName);
            }
        }
    } catch (error) {
        console.error('Lỗi', error);
    }
};

// Hàm lọc dữ liệu thời gian startDate và endDate
export const checkTime = async (selectedYear, selectedSemester) => {
    try {
        const response = await getSemester();
        const data = await response.json();
        return data?.filter(item => item.academicYear === selectedYear && item.semesterName === selectedSemester) || [];
    } catch (error) {
        console.error('Lỗi', error);
        return [];
    }
};

// Hàm lọc dữ liệu dropdown TrainingProgramName
export const dropdownTrainingProgramName = async (setOptionsTrainingProgramName) => {
    try {
        const response = await getSubject();
        const data = await response.json();
        if (data?.length) {
            const options = [...new Set(data.map(item => item.trainingProgramName))].map(t => ({ label: t, value: t }));
            setOptionsTrainingProgramName(options);
        } else {
            console.log('Dữ liệu rỗng');
        }
    } catch (error) {
        console.error('Lỗi', error);
    }
};

// Hàm fomat ngày tháng năm -> 12/02/2024
export const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
};

// export const toast = (severity) => {
//     const toast = useRef(null);
//     switch (severity) {
//     case 'success':
//         return toast.current.show({ severity: 'success', summary: 'Success', detail: 'Thành công', life: 3000 });
//     case 'info':
//         return toast.current.show({ severity: 'info', summary: 'Info', detail: 'Message Content', life: 3000 });
//     case 'warn':
//         return toast.current.show({ severity: 'warn', summary: 'Warning', detail: 'Cảnh cáo', life: 3000 });
//     case 'error':
//         return toast.current.show({ severity: 'error', summary: 'Error', detail: 'Lỗi', life: 3000 });
//     case 'secondary':
//         return toast.current.show({ severity: 'secondary', summary: 'Secondary', detail: 'Message Content', life: 3000 });
//     default:
//         return toast.current.show({ severity: 'contrast', summary: 'Contrast', detail: 'Message Content', life: 3000 });
//     };
// };