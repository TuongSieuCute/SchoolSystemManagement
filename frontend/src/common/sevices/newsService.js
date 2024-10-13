export const getNewsCategory = () => {
    return new Promise((resolve) => {
        const categories = [{
            id: crypto.randomUUID(),
            title: 'Tin Tức',
            categories: [{
                id: crypto.randomUUID(),
                title: 'tuyển dụng',
            }, {
                id: crypto.randomUUID(),
                title: 'Thông tin sinh viên'
            }, {
                id: crypto.randomUUID(),
                title: 'công đoàn',
            }, {
                id: crypto.randomUUID(),
                title: 'Tổ chức hành chính'
            }]
        }, {
            id: crypto.randomUUID(),
            title: 'Tuyển sinh',
            categories: [{
                id: crypto.randomUUID(),
                title: 'Đại học',
                categories: [{
                    id: crypto.randomUUID(),
                    title: 'Thông báo'
                }, {
                    id: crypto.randomUUID(),
                    title: 'Tin tức',
                }, {
                    id: crypto.randomUUID(),
                    title: 'Thông tin tuyển sinh'
                }, {
                    id: crypto.randomUUID(),
                    title: 'kỳ thi đánh giá năng lực',
                }, {
                    id: crypto.randomUUID(),
                    title: 'Thông báo'
                }, {
                    id: crypto.randomUUID(),
                    title: 'Quy chế, quy định',
                }]
            }, {
                id: crypto.randomUUID(),
                title: 'Sau học',
                categories: [{
                    id: crypto.randomUUID(),
                    title: 'Cao Học',
                    categories: [{
                        id: crypto.randomUUID(),
                        title: 'Thông báo'
                    }, {
                        id: crypto.randomUUID(),
                        title: 'Tin tức',
                    }]
                }, {
                    id: crypto.randomUUID(),
                    title: 'Nghiên cứu sinh',
                    categories: [{
                        id: crypto.randomUUID(),
                        title: 'Thông báo'
                    }, {
                        id: crypto.randomUUID(),
                        title: 'Tin tức',
                    }]
                }, {
                    id: crypto.randomUUID(),
                    title: 'Liên kết',
                }]
            }]
        }];

        resolve(categories);
    });
};

export const getNews = async (categoryId) => {
    let url = 'https://jsonplaceholder.typicode.com/users/1/photos?_limit=50';
    if (categoryId) {
        url = `${url}&albumId=${categoryId}`;
    }

    return await fetch(url).then(response => response.json());
};