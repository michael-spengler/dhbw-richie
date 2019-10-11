import { Theme } from './theme';

export const lightTheme: Theme = {
  name: 'light',
  properties: {
    '--font-color': '#333',
    '--background': '#f6f6f6',
    '--paragraph': '#fff',
    '--input-border': '#dfdfdf',
    '--popupBackground': 'rgba(200, 200, 200, 0.3)',
    '--popupShadow': 'rgba(0, 0, 0, .05)',
    '--scrollbar-thumb-nograb': '#777',
    '--scrollbar-thumb-grab': '#555',
    '--header': 'rgba(0, 0, 0, 0.3)',
    '--fourOfour-tile': 'rgba(255, 255, 255, 0.5)',
    '--landing-bg': "url('../assets/img/landing_light@2k.jpg')"
  }
};
