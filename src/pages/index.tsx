import Alert from '@mui/material/Alert';
// import Link from '@mui/material/Link';
import type { NextPage } from 'next';
import RelatedLinks from 'components/blocks/RelatedLinks';
import SiteDescription from 'components/blocks/SiteDescription';
import StatsView from 'components/blocks/StatsView';
import Toc from 'components/blocks/Toc';
import Layout from 'components/layouts/Layout';
import data from 'data/day1.json';
import { formatData } from 'utils/resultData';

const Page: NextPage = () => {
  const { team: teamResult, player: playerResult } = formatData(data);
  return (
    <Layout title='トップ'>
      <SiteDescription />

      <Alert className='my-4' severity='info'>
        カスタム1日目の結果を表示しています。なお、7試合目はリザルト画面のバグのため集計できませんでした。
        {/*過去の結果は「<Link href='#toc'>過去の試合結果</Link>」からご覧いただけます。*/}
      </Alert>

      <StatsView
        statsTitle='1日目 (4月11日)'
        teamResult={teamResult}
        playerResult={playerResult}
        defaultNumberOfMatches={5}
      />

      <Toc id='toc' />

      <RelatedLinks />
    </Layout>
  );
};

export default Page;
