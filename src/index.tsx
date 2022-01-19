/*eslint-disable*/
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import ProviderDarkMode from './hooks/useDarkMode'
import {store} from './store'
import App from './App'
import {CssBaseline} from "@material-ui/core";

ReactDOM.render(
    <React.Fragment>
        <ProviderDarkMode>
        <Provider store={store}>
            <CssBaseline />
                <App />
        </Provider>
        </ProviderDarkMode>
    </React.Fragment>,
    document.getElementById('root'),
)
