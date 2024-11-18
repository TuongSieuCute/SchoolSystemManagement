import { MsalProvider } from '@azure/msal-react';
import { PrimeReactProvider } from 'primereact/api';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { msalInstance } from './helper/authConfig';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { router } from './router';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <PrimeReactProvider>
            <MsalProvider instance={msalInstance}>
                <RouterProvider router={router} />
            </MsalProvider>
        </PrimeReactProvider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
