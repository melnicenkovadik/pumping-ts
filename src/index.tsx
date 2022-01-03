import * as React from 'react';
import * as ReactDOM from 'react-dom';
import CssBaseline from '@mui/material/CssBaseline';
import App from './App';
import {Provider} from "react-redux";
import {store} from "./store";
import {createTheme, ThemeProvider} from '@mui/material/styles';

const theme = createTheme({
    direction: 'rtl', // Both here and <body dir="rtl">
});


ReactDOM.render(
    <Provider store={store}>
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <App/>
        </ThemeProvider>
    </Provider>,
    document.getElementById('root'),
);
