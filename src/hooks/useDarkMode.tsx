/*eslint-disable*/
import * as React from 'react';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import {
    TypeTheme, ModeType, FNTheme, DarkModeProviderProps,
} from './types';
import themes, { InterfaceMainTheme } from '../themes';


const ThemeContextDispatcher = React.createContext<TypeTheme>({changeTheme: () => null});

export const useDarkModeDispatcher = () => React.useContext(ThemeContextDispatcher);

const initialTheme = () => {
    const type = localStorage.getItem('theme') as ModeType;

    const updatedTheme: InterfaceMainTheme = {
        ...themes,
        palette: {
            ...themes.palette,
            // @ts-ignore
            type: type || 'light',
        },
    };
    return updatedTheme;
};

export const useDarkMode = () => {
    const [theme, setTheme] = React.useState<InterfaceMainTheme>(initialTheme);
    const changeTheme = () => {
        const updatedTheme: InterfaceMainTheme = {
            ...theme,
            palette: {
                ...theme.palette,
                // @ts-ignore
                type: theme.palette?.type === 'dark' ? 'light' : 'dark',
            },
        };

        setTheme(updatedTheme);
    };

    React.useEffect(() => {
        // @ts-ignore
        localStorage.setItem('theme', theme?.palette?.type || 'light');
    }, [theme]);
    return [theme, changeTheme];
};


const DarkModeProvider = ({children}: DarkModeProviderProps) => {
    const [theme, changeTheme] = useDarkMode();
    const themeObject = createMuiTheme(theme as InterfaceMainTheme);
    return (
        <ThemeProvider theme={themeObject}>
            <ThemeContextDispatcher.Provider value={{changeTheme: changeTheme as FNTheme}}>
                {children}
            </ThemeContextDispatcher.Provider>
        </ThemeProvider>
    );
};

export default DarkModeProvider;
