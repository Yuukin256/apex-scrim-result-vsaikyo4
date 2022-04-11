import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Head from 'next/head';
import React from 'react';
import FabToTop from 'components/atoms/FabToTop';

const Layout: React.VFC<{ children: React.ReactNode; title?: string }> = ({ children, title }) => {
  const siteTitle = 'V最協S4 練習カスタム試合結果 (非公式)';
  const description =
    'VTuber最協決定戦 SEASON4 Ver APEX LEGENDS の事前練習カスタム (スクリム) の試合結果をまとめた非公式サイト';

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
        <Box sx={{ backgroundColor: 'primary.main', p: 2 }}>
          <Typography variant='h1' align='center'>
            <Link href='/' color='#fff' underline='none'>
              V最協S4 練習カスタム試合結果 (非公式)
            </Link>
          </Typography>
        </Box>
        <FabToTop />
        <Box
          sx={(theme) => ({
            [theme.breakpoints.up('sm')]: {
              mx: 2,
            },
            [theme.breakpoints.down('sm')]: {
              mx: 1,
            },
          })}
        >
          <main>{children}</main>
        </Box>
        <Box sx={{ width: '100%', px: 1 }}>
          <footer>
            <p>
              このサイトはGoogle Analyticsを使用しています (
              <Link href='https://policies.google.com/technologies/partner-sites?hl=ja' target='_blank' rel='noopener'>
                詳細
              </Link>
              )。
            </p>
            <p>
              © 2022 Yuukin256 (
              <Link href='https://twitter.com/Yuukin256' target='_blank' rel='noopener'>
                @Yuukin256
              </Link>
              ), Built with{' '}
              <Link href='https://nextjs.org/' target='_blank' rel='noopener'>
                Next.js
              </Link>
            </p>
          </footer>
        </Box>
      </Box>
    </>
  );
};

export default Layout;
