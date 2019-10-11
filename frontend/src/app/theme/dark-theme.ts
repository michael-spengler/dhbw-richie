import { Theme } from './theme';

export const darkTheme: Theme = {
  name: 'dark',
  properties: {
    '--font-color': '#eee',
    '--background': '#222',
    '--paragraph': '#111',
    '--input-border': '#333',
    '--popupBackground': 'rgba(44, 44, 44, 0.75)',
    '--popupShadow': 'rgba(255, 255, 255, .05)',
    '--scrollbar-thumb-nograb': '#888',
    '--scrollbar-thumb-grab': '#aaa',
    '--header': 'rgba(0, 0, 0, 0.6)',
    '--fourOfour-tile': 'rgba(0, 0, 0, 0.5)',
    '--landing-bg': "url('../assets/img/landing_dark2@2k.jpg')"
  }
};
