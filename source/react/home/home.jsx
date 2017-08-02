import React from 'react'
import ReactDOM from 'react-dom';
import FastClick from 'fastclick';

import Header from './pages/header';

ReactDOM.render(<Header/>,
    document.getElementById('J_reactApp'), function () {
        window.addEventListener('load', function () {
            FastClick.attach(document.body);
        }, false);
    }
);

