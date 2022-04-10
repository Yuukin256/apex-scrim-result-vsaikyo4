import Alert from '@mui/material/Alert';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Divider from '@mui/material/Divider';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import type { NextPage } from 'next';
import RelatedLinks from 'components/blocks/RelatedLinks';
import SiteDescription from 'components/blocks/SiteDescription';
import StatsView from 'components/blocks/StatsView';
import Layout from 'components/layouts/Layout';
import testData from 'data/test.json';
import { formatData } from 'utils/resultData';

const Page: NextPage = () => {
  const { team: testTeamResult, player: testPlayerResult } = formatData(testData);
  return (
    <Layout title='テスト'>
      <Breadcrumbs aria-label='breadcrumb' className='my-2'>
        <Link underline='hover' color='inherit' href='/'>
          トップ
        </Link>
        <Typography color='text.primary'>テスト</Typography>
      </Breadcrumbs>
      <Divider className='my-2' />

      <SiteDescription />

      <Alert className='my-4' severity='warning'>
        このページではテストデータを表示しています。実際の練習カスタムの結果ではありません。最新の結果は「
        <Link href='/' color='secondary.main'>
          トップページ
        </Link>
        」から、他の日の結果は「
        <Link href='/#toc' color='secondary.main'>
          過去の試合結果
        </Link>
        」からご覧いただけます。
      </Alert>

      <StatsView
        statsTitle='テストデータ'
        teamResult={testTeamResult}
        playerResult={testPlayerResult}
        defaultNumberOfMatches={5}
      />

      <RelatedLinks />
    </Layout>
  );
};

export default Page;
