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
import data from 'data/day1.json';
import { formatData } from 'utils/resultData';

const Page: NextPage = () => {
  const { team: testTeamResult, player: testPlayerResult } = formatData(data);
  return (
    <Layout title='1日目'>
      <Breadcrumbs aria-label='breadcrumb' className='my-2'>
        <Link underline='hover' color='inherit' href='/'>
          トップ
        </Link>
        <Typography color='text.primary'>1日目</Typography>
      </Breadcrumbs>
      <Divider className='my-2' />

      <SiteDescription />

      <Alert className='my-4' severity='info'>
        このページにはカスタム1日目の結果を表示しています。最新の結果は「<Link href='/'>トップページ</Link>
        」から、他の日の結果は「<Link href='/#toc'>過去の試合結果</Link>」からご覧いただけます。なお、この日の7試合目はリザルト画面のバグのため集計できませんでした。
      </Alert>

      <StatsView
        statsTitle='1日目 (4月11日)'
        teamResult={testTeamResult}
        playerResult={testPlayerResult}
        defaultNumberOfMatches={5}
      />

      <RelatedLinks />
    </Layout>
  );
};

export default Page;
