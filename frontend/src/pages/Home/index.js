import { Card } from 'primereact/card';
import { Paginator } from 'primereact/paginator';
import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AppFooter } from '../../common/components/app-footer';
import { AppHeader } from '../../common/components/app-header';
import { getNews, getNewsCategory } from '../../common/sevices/newsService';
import { HomeMenu } from './HomeMenu';
import './styles.css';

const Home = () => {
    const [newsCategories, setNewsCategories] = useState([]);
    const [news, setNews] = useState([]);
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
    const renderNewsHeader = (news) => (
        <img src={news.thumbnailUrl} alt={news.title} className='news-thumbnail' />
    );
    const renderNewsTitle = (news) => (
        <Link to={news.url}>
            <p style={{ 'color': 'black', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>{news.title}</p>
        </Link>
    );

    return (
        <>
            <AppHeader />
            <div className="home-body flex p-6 gap-3">
                <div className="flex w-3">
                    <HomeMenu items={newsCategories} selectCategoryHandler={selectCategoryHandler} />
                </div>
                <div className="flex w-9 flex-wrap flex gap-6">
                    {news && news.map((item) => (
                        <Card className='w-3 fadeindown animation-duration-1000' key={item.id} header={() => renderNewsHeader(item)} title={() => renderNewsTitle(item)}>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!</p>
                        </Card>
                    ))}
                   
                    <Paginator first={0} rows={50} totalRecords={120} rowsPerPageOptions={[10, 20, 30]} onChange={console.log} />
                </div>
            </div>
            <AppFooter />
        </>
    );
};

export default Home;
