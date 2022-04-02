import type { NextPage } from 'next';
import Layout from '../components/layouts/layout';

const Home: NextPage = () => {
  return (
    <Layout>
      <div>
        <p>
          2022年4月17日に行われる渋谷ハルさん主催の VTuber最協決定戦 SEASON4 Ver APEX LEGENDS の事前練習カスタム
          (スクリム)
          の試合結果一覧です。正確性を保つ努力はしておりますが、集計に誤りがある可能性があります。ご了承ください。
        </p>
        <ul className="list-disc ml-4 text-sm">
          <li>マップはすべてWorld&apos;s Edgeです。</li>
          <li>
            本番は全5試合のうち、1試合目3ポイント、2,3試合目6ポイントのキルポイント上限があります。練習カスタムでは全チームが各マッチのキルポイント上限を意識して動いているわけではないため、キルポイント上限の有無を切り替えて結果を見られるようにしています。
          </li>
          <li>各日6試合目以降の延長戦はキルポイント上限無しで集計しています。</li>
          <li>
            キルポイント上限を適用しているときにキル数が<em>斜体</em>
            で表示されているものは上限を超えていることを意味します。
          </li>
        </ul>
      </div>

      <h2 className="text-2xl mt-4">各種リンク</h2>
      <div>
        <ul className="list-disc ml-4">
          <li>
            <a className="underline text-blue-700" href="https://vtuber-saikyo.jp/">
              大会公式サイト
            </a>
          </li>
          <li>
            <a className="underline text-blue-700" href="https://twitter.com/ShibuyaHAL">
              渋谷ハルさんTwitter
            </a>
          </li>
          <li>
            <a className="underline text-blue-700" href="https://youtube.com/c/HALchannel">
              渋谷ハルさんYouTube
            </a>
          </li>
        </ul>
      </div>
    </Layout>
  );
};

export default Home;
