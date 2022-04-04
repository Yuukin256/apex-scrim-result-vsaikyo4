import Alert from '@mui/material/Alert';
import Paper from '@mui/material/Paper';
import type { NextPage } from 'next';
import PlayerStatsView from '../components/blocks/PlayerStatsView';
import TeamStatsView from '../components/blocks/TeamStatsView';
import Layout from '../components/layouts/Layout';

const Home: NextPage = () => {
  return (
    <Layout>
      <div>
        <p>
          2022年4月17日に行われる渋谷ハルさん主催の VTuber最協決定戦 SEASON4 Ver APEX LEGENDS の事前練習カスタム
          (スクリム)
          の試合結果一覧です。正確性を保つ努力はしておりますが、集計に誤りがある可能性があります。ご了承ください。
        </p>
        
        <Alert className="my-4 font-bold" severity="warning">
          現在鋭意開発中です！完成までお待ち下さい。テストデータを表示しています。
        </Alert>

        {/* <ul className="list-disc ml-4 text-sm">
          <li>マップはすべてWorld&apos;s Edgeです。</li>
          <li>
            本番は全5試合のうち、1試合目3ポイント、2,3試合目6ポイントのキルポイント上限があります。練習カスタムでは全チームが各マッチのキルポイント上限を意識して動いているわけではないため、キルポイント上限の有無を切り替えて結果を見られるようにしています。
          </li>
          <li>各日6試合目以降の延長戦はキルポイント上限無しで集計しています。</li>
          <li>
            キルポイント上限を適用しているときにキル数が<em>斜体</em>
            で表示されているものは上限を超えていることを意味します。
          </li>
        </ul> */}
      </div>

      <div>
        <h2 className="text-2xl  mt-4">テストデータ</h2>

        <Paper className="p-3 my-4 border-orange" variant="outlined" square>
          <TeamStatsView />
        </Paper>

        <Paper className="p-3 my-4 border-orange" variant="outlined" square>
          <PlayerStatsView />
        </Paper>
      </div>

      <h2 className="text-2xl mt-4">各種リンク</h2>
      <div>
        <ul className="list-disc ml-4">
          <li>
            <a className="underline visited:text-purple-900 text-orange" href="https://vtuber-saikyo.jp/">
              大会公式サイト
            </a>
          </li>
          <li>
            <a className="underline visited:text-purple-900 text-orange" href="https://twitter.com/ShibuyaHAL">
              渋谷ハルさんTwitter
            </a>
          </li>
          <li>
            <a className="underline visited:text-purple-900 text-orange" href="https://youtube.com/c/HALchannel">
              渋谷ハルさんYouTube
            </a>
          </li>
        </ul>
      </div>
    </Layout>
  );
};

export default Home;
