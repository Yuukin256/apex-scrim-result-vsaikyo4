import Alert from '@mui/material/Alert';
import Link from '@mui/material/Link';
import type { NextPage } from 'next';
import StatsView from '../components/blocks/StatsView';
import Layout from '../components/layouts/Layout';
import testData from '../data/test.json';
import { formatData } from '../utils/resultData';

const Home: NextPage = () => {
  const { team: testTeamResult, player: testPlayerResult } = formatData(testData);
  return (
    <Layout title="トップ">
      <div>
        <p>
          2022年4月17日に行われる渋谷ハルさん主催の VTuber最協決定戦 SEASON4 Ver APEX LEGENDS の事前練習カスタム
          (スクリム)
          の試合結果一覧です。正確性を保つ努力はしておりますが、集計に誤りがある可能性があります。ご了承ください。
        </p>

        <Alert className="my-4 font-bold" severity="warning">
          ほぼ完成しました！カスタムが始まるまでの間、テストデータを表示しています。データの不整合などの不具合を発見した場合は、ページ下部に表示したTwitterアカウントからご連絡ください。
        </Alert>
      </div>

      <StatsView
        statsTitle="テストデータ"
        teamResult={testTeamResult}
        playerResult={testPlayerResult}
        defaultNumberOfMatches={1}
      />

      <h2 className="text-2xl mt-4">各種リンク</h2>
      <div>
        <ul className="list-disc ml-8">
          <li>
            <Link href="https://vtuber-saikyo.jp/">大会公式サイト</Link>
          </li>
          <li>
            <Link href="https://vtuber-saikyo.jp/season4/rule/">大会ルール</Link>
          </li>
          <li>
            <Link href="https://twitter.com/ShibuyaHAL">渋谷ハルさん Twitter</Link>
          </li>
          <li>
            <Link href="https://youtube.com/c/HALchannel">渋谷ハルさん YouTube (大会配信チャンネル)</Link>
          </li>
        </ul>
      </div>
    </Layout>
  );
};

export default Home;
