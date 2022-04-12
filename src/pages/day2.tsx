import Alert from '@mui/material/Alert';
import type { NextPage } from 'next';
import InlineMenuIcon from 'components/atoms/InlineMenuIcon';
import SiteDescription from 'components/blocks/SiteDescription';
import StatsView from 'components/blocks/StatsView';
import Layout from 'components/layouts/Layout';
import data from 'data/day2.json';
import { formatData } from 'utils/resultData';

const Page: NextPage = () => {
  const { team: teamResult, player: playerResult } = formatData(data);
  return (
    <Layout title='2日目'>
      <SiteDescription />

      <Alert className='my-4' severity='info'>
        このページにはカスタム2日目の結果を表示しています。他の日の試合結果は左上のメニュー
        <InlineMenuIcon />
        からご覧いただけます。なお、この日の7試合目はリザルト画面のバグのため集計できませんでした。
      </Alert>

      <StatsView
        statsTitle='2日目 (4月12日)'
        teamResult={teamResult}
        playerResult={playerResult}
        defaultNumberOfMatches={5}
      />
    </Layout>
  );
};

export default Page;