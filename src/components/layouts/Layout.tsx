import { useDisclosure } from '@mantine/hooks';
import Box from '@mui/material/Box';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Head from 'next/head';
import Footer from './Footer';
import Header from './Header';
import Side from './Side';
import FabToTop from 'components/atoms/FabToTop';

const Layout: React.VFC<{ children: React.ReactNode; title?: string }> = ({ children, title }) => {
  const siteTitle = 'V最協S4 練習カスタム試合結果 (非公式)';
  const description =
    'VTuber最協決定戦 SEASON4 Ver APEX LEGENDS の事前練習カスタム (スクリム) の試合結果をまとめた非公式サイト';

  const [opened, menuHandlers] = useDisclosure(false);

  return (
    <>
      <Head>
        <title>{title ? `${title} - ${siteTitle}` : `${siteTitle}`}</title>
        <meta name='viewport' content='width=device-width,initial-scale=1.0' />
        <meta name='description' content={description} />
        <meta property='og:url' content='https://apex-scrim-result-vsaikyo4.vercel.app/' />
        <meta property='og:title' content={title ? `${title} - ${siteTitle}` : `${siteTitle}`} />
        <meta property='og:site_name' content={title} />
        <meta property='og:description' content={description} />
        <meta property='og:type' content='website' />
        <meta property='og:image' content='' />
        <meta name='twitter:card' content='summary' />
        <meta name='twitter:site' content='@Yuukin256' />
        <meta name='twitter:title' content={title ? `${title} - ${siteTitle}` : `${siteTitle}`} />
        <meta name='twitter:description' content={description} />
        <meta name='twitter:image' content='' />
      </Head>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <ClickAwayListener onClickAway={menuHandlers.close}>
          <div>
            <Header handleMenuOpen={menuHandlers.open} />
            <Side open={opened} handleClose={menuHandlers.close} />
          </div>
        </ClickAwayListener>
        <Box
          sx={(theme) => ({
            [theme.breakpoints.up('sm')]: { mx: 2 },
            [theme.breakpoints.down('sm')]: { mx: 1 },
          })}
        >
          <main>{children}</main>
        </Box>
        <Box sx={{ width: '100%', px: 1, mt: 2 }}>
          <Footer />
        </Box>
        <FabToTop />
      </Box>
    </>
  );
};

export default Layout;
