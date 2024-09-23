import React from 'react';

const CurriculumItem = (props) => {
    return (
        <tr>
            <td>{props.subjectId}</td>
            <td>{props.subjectName}</td>
            <td>{props.subjectType}</td>
            <td>{props.isCreditGpa ? `${props.numberOfCredit} *` : props.numberOfCredit}</td>
        </tr>
    );
};

export default CurriculumItem;