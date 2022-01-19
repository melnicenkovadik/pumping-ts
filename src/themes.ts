import { ThemeOptions } from '@material-ui/core/styles';

export type InterfaceMainTheme = ThemeOptions & {};

const themes: InterfaceMainTheme = {
  palette: {
    type: 'light',
    primary: {
      main: '#6c6c6c',
    },
    secondary: {
      main: '#f6f6f6',
    },
  },
};

export default themes;
