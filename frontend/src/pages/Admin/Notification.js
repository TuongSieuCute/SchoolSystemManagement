import React, { useState, useRef } from 'react';
import { FloatLabel } from 'primereact/floatlabel';
import { InputTextarea } from 'primereact/inputtextarea';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';

const Notification = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const toast = useRef(null);
    const CreateNotification = async () => {
        const data = {
            'title': title,
            'content': content
        };
        try {
            const response = await fetch('https://localhost:7074/api/Notifications', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                toast.current.show({severity:'success', summary: 'Thành công', detail:'Thêm thông báo thành công!', life: 3000});
            } else {
                toast.current.show({severity:'error', summary: 'Lỗi', detail:'Thêm thông báo thất bại!', life: 3000});
            }
        } catch (error) {
            toast.current.show({severity:'error', summary: 'Lỗi', detail:'Thêm thông báo thất bại!', life: 3000});
        }
    };
    return (
        <div>
            <h3 className='title'>THÔNG BÁO</h3>
            <div className='datatable-container'>
                <FloatLabel className='mt-4'>
                    <InputText id="title" value={title} onChange={(e) => setTitle(e.target.value)} className='mt-3 w-full p-2' />
                    <label htmlFor="title" className='cus-label-dropdown'>Tiêu đề</label>
                </FloatLabel>
                <FloatLabel className='mt-4'>
                    <InputTextarea id="content" value={content} onChange={(e) => setContent(e.target.value)} rows={5} cols={30} className='mt-3 w-full p-2' style={{ height: '400px' }} />
                    <label htmlFor="content" className='cus-label-dropdown'>Nội dung</label>
                </FloatLabel>
                <Toast ref={toast} />
                <div className='flex justify-content-end mt-4'>
                    <Button onClick={() => CreateNotification()} label='Đăng bài' icon='pi pi-bell' className='p-2 font-bold gap-2' style={{ background: 'var(--bg-red)' }} />
                </div>
            </div>
        </div>
    );
};

export default Notification;