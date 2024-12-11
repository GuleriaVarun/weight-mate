export interface Theme {
  name: string;
  properties: any;
}

export const light: Theme = {
  name: 'light',
  properties: {
    '--background-default':
      'linear-gradient(to top, #d5d4d0 0%, #d5d4d0 1%, #eeeeec 31%, #efeeec 75%, #e9e9e7 100%)',
    '--icon-default': '#fff',
    '--card-background-main': 'rgb(0 0 0 / 65%)',
    '--footer-background-main': 'rgb(0 0 0 / 65%)',
    '--light-on-dark': '#fff',
    '--header': 'rgb(0 0 0 / 65%)',
    '--profile-content-bg': '#191c1ae3'
  },
};

export const dark: Theme = {
  name: 'dark',
  properties: {
    '--background-default':
      'linear-gradient(to bottom, rgba(255,255,255,0.15) 0%, rgba(0,0,0,0.15) 100%), radial-gradient(at top center, rgba(255,255,255,0.40) 0%, rgba(0,0,0,0.40) 120%) #989898',
    '--icon-default': '#fff',
    '--card-background-main': 'rgb(0 0 0 / 65%)',
    '--footer-background-main': 'rgb(0 0 0 / 65%)',
    '--light-on-dark': '#fff',
    '--header': 'rgb(0 0 0 / 65%)',
    '--profile-content-bg': '#191c1ae3'
  },
};

export const defaultTheme: Theme = {
  name: 'default',
  properties: {
    '--background-default':
      'linear-gradient(142deg, #000000, #075333, #532a07, #074253)',
    '--icon-default': '#fff',
    '--card-background-main': 'rgba(0, 0, 0, 0.25)',
    '--footer-background-main': 'rgba(0, 0, 0, 0.25)',
    '--light-on-dark': '#fff',
    '--header': '#152d1d',
    '--profile-content-bg': '#0e2c18f7'
  },
};
