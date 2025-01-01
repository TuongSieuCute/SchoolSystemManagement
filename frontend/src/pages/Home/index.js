import { Card } from 'primereact/card';
import { Paginator } from 'primereact/paginator';
import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AppFooter } from '../../common/components/app-footer';
import { AppHeader } from '../../common/components/app-header';
import { getNews, getNewsCategory } from '../../common/sevices/newsService';
import { formatDate } from '../../helper/function';
import { HomeMenu } from './HomeMenu/HomeMenu';
import './styles.css';

const Home = () => {
    const [newsCategories, setNewsCategories] = useState([]);
    const [news, setNews] = useState([]);
    const [first, setFirst] = useState(0);
    const rows = 6;
    const fetchCategories = async () => {
        setNewsCategories(await getNewsCategory());
    };
    const fetchNews = async (categoryId) => {
        setNews(await getNews(categoryId));
    };

    useEffect(() => {
        fetchCategories();
        fetchNews();
    }, []);

    const selectCategoryHandler = useCallback((categoryId) => {
        fetchNews(categoryId);
    }, []);
    const renderNewsTitle = (news) => (
        <Link to={news.url} className='no-underline'>
            <p style={{ color: 'black', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>{news.title}</p>
        </Link>
    );
    const renderNewsContent = (news) => (
        <div>
            <p style={{ 'color': 'black', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>{news.content}</p>
            <p style={{ 'color': 'black', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>Ngày đăng tin: {formatDate(news.createdAt)}</p>
        </div>
    );
    const onPageChange = (e) => {
        setFirst(e.first);
    };
    const currentNews = news.slice(first, first + rows);
    return (
        <>
            <AppHeader />
            <div className="home-body flex p-6 gap-6">
                <div className="flex w-3">
                    <HomeMenu items={newsCategories} selectCategoryHandler={selectCategoryHandler} />
                </div>
                <div className="flex w-9 flex-wrap flex gap-2">
                    {currentNews && currentNews.map((item) => (
                        <Card className='fadeindown animation-duration-1000 p-4' style={{ height: '120px', width: '1000px' }} key={item.id} title={() => renderNewsTitle(item)}>
                            {renderNewsContent(item)}
                        </Card>
                    ))}
                </div>
            </div>
            <div className='mb-4'>
                <Paginator style={{ background:'none' }} first={first} rows={rows} totalRecords={news.length} onPageChange={onPageChange} />
            </div>
            <AppFooter />
        </>
    );
};

export default Home;
