import Alert from '@mui/material/Alert';
import type { NextPage } from 'next';
import InlineMenuIcon from 'components/atoms/InlineMenuIcon';
import SiteDescription from 'components/blocks/SiteDescription';
import StatsView from 'components/blocks/StatsView';
import Layout from 'components/layouts/Layout';
import data from 'data/day6.json';
import { formatData } from 'utils/resultData';

const Page: NextPage = () => {
  const { team: teamResult, player: playerResult } = formatData(data);
  return (
    <Layout title='6日目'>
      <SiteDescription />

      <Alert severity='info'>
        このページにはカスタム6日目の結果を表示しています。他の日の試合結果は左上のメニュー
        <InlineMenuIcon />
        からご覧いただけます。8試合目はリザルト画面のバグのため集計できませんでした。
      </Alert>

      <StatsView
        statsTitle='6日目 (4月16日)'
        teamResult={teamResult}
        playerResult={playerResult}
        defaultNumberOfMatches={5}
      />
    </Layout>
  );
};

export default Page;
