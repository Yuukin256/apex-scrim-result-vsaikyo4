import Head from 'next/head';
import Link from 'next/link';
import React from 'react';
import FabToTop from '../atoms/FabToTop';

const Layout: React.VFC<{ children: React.ReactNode }> = ({ children }) => {
  const title = 'V最協S4 練習カスタム試合結果 (非公式)';
  const description =
    'VTuber最協決定戦 SEASON4 Ver APEX LEGENDS の事前練習カスタム (スクリム) の試合結果をまとめた非公式サイト';

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="viewport" content="width=device-width,initial-scale=1.0" />
        <meta name="description" content={description} />
        <meta property="og:url" content="https://apex-scrim-result-vsaikyo4.vercel.app/" />
        <meta property="og:title" content={title} />
        <meta property="og:site_name" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://apex-scrim-result-vsaikyo4.vercel.app/ogp.png" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@Yuukin256" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content="https://apex-scrim-result-vsaikyo4.vercel.app/ogp.png" />
      </Head>
      <div className="min-h-screen relative">
        <div className="bg-orange p-5">
          <h1 className="text-center text-4xl font-bold text-white">
            <Link href="/">V最協S4 練習カスタム試合結果 (非公式)</Link>
          </h1>
        </div>
        <FabToTop />
        <main className="m-4">{children}</main>
        <footer className="absolute bottom-0 w-full mt-8 p-2 bg-orange text-white">
          © 2022 Yuukin256 (
          <a className="underline visited:text-purple-900 text-blue-700" href="https://twitter.com/Yuukin256">
            @Yuukin256
          </a>
          ), Built with
          {` `}
          <a className="underline visited:text-purple-900 text-blue-700" href="https://nextjs.org/">
            Next.js
          </a>
          .
        </footer>
      </div>
    </>
  );
};

export default Layout;
