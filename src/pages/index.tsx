import Alert from '@mui/material/Alert';
import type { NextPage } from 'next';
import RelatedLinks from 'components/blocks/RelatedLinks';
import StatsView from 'components/blocks/StatsView';
import Toc from 'components/blocks/Toc';
import Layout from 'components/layouts/Layout';
import testData from 'data/test.json';
import { formatData } from 'utils/resultData';

const Home: NextPage = () => {
  const { team: testTeamResult, player: testPlayerResult } = formatData(testData);
  return (
    <Layout title='トップ'>
      <p>
        2022年4月17日に行われる渋谷ハルさん主催の VTuber最協決定戦 SEASON4 Ver APEX LEGENDS の事前練習カスタム
        (スクリム)
        の試合結果一覧です。正確性を保つ努力はしておりますが、集計に誤りがある可能性があります。ご了承ください。
      </p>

      <Alert className='my-4' severity='warning'>
        ほぼ完成しました！カスタムが始まるまでの間、テストデータを表示しています。データの不整合などの不具合を発見した場合は、ページ下部に表示したTwitterアカウントからご連絡ください。カスタムは4月11日から開始予定です。
      </Alert>

      <StatsView
        statsTitle='テストデータ'
        teamResult={testTeamResult}
        playerResult={testPlayerResult}
        defaultNumberOfMatches={5}
      />

      <Toc />

      <RelatedLinks />
    </Layout>
  );
};

export default Home;
