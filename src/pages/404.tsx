import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import type { NextPage } from 'next';
import Layout from 'components/layouts/Layout';

const Page: NextPage = () => {
  return (
    <Layout title='トップ'>
      <Typography variant='h2'>404 Not Found</Typography>
      <p>
        お探しのページは見つかりませんでした。<Link href='/'>トップページに戻る。</Link>
      </p>
    </Layout>
  );
};

export default Page;
