import Head from 'next/head';
import Link from 'next/link';
import React from 'react';
import { Helmet } from 'react-helmet';
import FabToTop from '../atomics/fabToTop';

const Layout: React.VFC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <>
      {' '}
      <Head>
        <Helmet
          htmlAttributes={{
            lang: 'ja',
          }}
          title="V最協S4 練習カスタム試合結果 (非公式)"
          titleTemplate="V最協S4 練習カスタム試合結果 (非公式)"
          meta={[
            {
              name: `description`,
              content:
                'VTuber最協決定戦 SEASON4 Ver APEX LEGENDS の事前練習カスタム (スクリム) の試合結果をまとめた非公式サイト',
            },
            {
              property: `og:title`,
              content: 'V最協S4 練習カスタム試合結果 (非公式)',
            },
            {
              property: `og:description`,
              content:
                'VTuber最協決定戦 SEASON4 Ver APEX LEGENDS の事前練習カスタム (スクリム) の試合結果をまとめた非公式サイト',
            },
            {
              property: `og:type`,
              content: `website`,
            },
            {
              name: `twitter:card`,
              content: `summary`,
            },
            {
              name: `twitter:creator`,
              content: 'Yuukin256',
            },
            {
              name: `twitter:title`,
              content: 'V最協S4 練習カスタム試合結果 (非公式)',
            },
            {
              name: `twitter:description`,
              content:
                'VTuber最協決定戦 SEASON4 Ver APEX LEGENDS の事前練習カスタム (スクリム) の試合結果をまとめた非公式サイト',
            },
          ]}
        />
        <title>V最協S4 練習カスタム試合結果 (非公式)</title>
      </Head>
      <div className="">
        <div className="bg-orange p-5">
          <h1 className="text-center text-4xl font-bold text-white">
            <Link href="/">V最協S4 練習カスタム試合結果 (非公式)</Link>
          </h1>
        </div>
        <FabToTop />
        <main className="m-4">{children}</main>
        <footer className="mt-8">
          © 2022 Yuukin256 (
          <a className="underline text-blue-700" href="https://twitter.com/Yuukin256">
            @Yuukin256
          </a>
          ), Built with
          {` `}
          <a className="underline text-blue-700" href="https://nextjs.org/">
            Next.js
          </a>
          .
        </footer>
      </div>
    </>
  );
};

export default Layout;
