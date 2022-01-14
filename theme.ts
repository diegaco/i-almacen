import { extendTheme, theme } from '@chakra-ui/react';

import { INFORMATION } from './app/constants';

export default extendTheme({
  styles: {
    global: {
      'html,body': {
        width: '100%',
        height: '100%',
        backgroundColor: 'gray.50',
      },
    },
  },
  colors: {
    primary: theme.colors[INFORMATION.brand_color],
  },
});
