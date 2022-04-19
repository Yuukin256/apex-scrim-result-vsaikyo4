import Typography from '@mui/material/Typography';
import type { NextPage } from 'next';
import Link from 'components/atoms/Link';
import SiteDescription from 'components/blocks/SiteDescription';
import Layout from 'components/layouts/Layout';

const Page: NextPage = () => {
  return (
    <Layout title='トップ'>
      <SiteDescription />

      <Typography variant='h4' component='h2'>
        カスタム結果一覧
      </Typography>

      <ul>
        {[
          {
            name: '1日目',
            path: '/day1',
            date: '4月11日',
          },
          {
            name: '2日目',
            path: '/day2',
            date: '4月12日',
          },
          {
            name: '3日目',
            path: '/day3',
            date: '4月13日',
          },
          {
            name: '4日目',
            path: '/day4',
            date: '4月14日',
          },
          {
            name: '5日目',
            path: '/day5',
            date: '4月15日',
          },
          {
            name: '6日目',
            path: '/day6',
            date: '4月16日',
          },
        ].map((value, i) => (
          <li key={i}>
            <Link href={value.path}>
              {value.name} ({value.date})
            </Link>
          </li>
        ))}
      </ul>
    </Layout>
  );
};

export default Page;
