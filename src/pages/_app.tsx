import { CacheProvider, EmotionCache } from '@emotion/react';
// import { useColorScheme, useLocalStorage } from '@mantine/hooks';
// import { PaletteMode } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useMemo } from 'react';
import GoogleAnalytics from 'components/atoms/GoogleAnalytics';
// import ColorModeContext from 'context/ColorModeContext';
import createEmotionCache from 'lib/createEmotionCache';
import { getTheme } from 'lib/theme';
import 'styles/globals.css';

const clientSideEmotionCache = createEmotionCache();
interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  // const [mode, setMode] = useLocalStorage<PaletteMode>({ key: 'color-scheme', defaultValue: useColorScheme() });

  const theme = useMemo(() => getTheme('light'), []);

  // const colorMode = {
  //   toggleColorMode: () => {
  //     setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  //   },
  // };

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name='viewport' content='initial-scale=1, width=device-width' />
      </Head>
      <GoogleAnalytics />
      {/* <ColorModeContext.Provider value={colorMode}> */}
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
      {/* </ColorModeContext.Provider> */}
    </CacheProvider>
  );
}

export default MyApp;
