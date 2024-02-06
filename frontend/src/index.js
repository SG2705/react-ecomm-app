import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';

// Importing app component
import App from './App';

// Importing context
import CartList from './context/cartContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <CartList>
        <App />
    </CartList>
);
