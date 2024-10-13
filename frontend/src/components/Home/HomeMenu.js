import React, { useMemo, useCallback } from 'react';
import { PanelMenu } from 'primereact/panelmenu';

export const HomeMenu = (props) => {
    const { items } = props;

    const mapCategoryToMenuItems = useCallback((item) => {
        const model = {
            data: item,
            label: item.title,
            command: () => {
                // thực hiện hành động khi người dùng click chuột vào menu.
            }
        };
        if (item.categories) {
            model.items = item.categories.map(category => mapCategoryToMenuItems(category));
        }

        return model;
    }, []);

    const itemsTemplate = useMemo(() => {
        return items.map(item => mapCategoryToMenuItems(item));
    }, [items, mapCategoryToMenuItems]);


    return (
        <div className="card flex w-full h-screen justify-content-center">
            <PanelMenu model={itemsTemplate} className="w-full" multiple />
        </div>
    );
};