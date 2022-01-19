export type FNTheme = () => void;

export type TypeTheme = {
  changeTheme?: FNTheme;
};
export type ModeType = 'light' | 'dark';
export type DarkModeProviderProps = { children: JSX.Element | JSX.Element[] };
