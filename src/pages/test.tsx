import { Divider } from '@mui/material';
import Alert from '@mui/material/Alert';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import type { NextPage } from 'next';
import RelatedLinks from '../components/blocks/RelatedLinks';
import StatsView from '../components/blocks/StatsView';
import Layout from '../components/layouts/Layout';
import testData from '../data/test.json';
import { formatData } from '../utils/resultData';

const Home: NextPage = () => {
  const { team: testTeamResult, player: testPlayerResult } = formatData(testData);
  return (
    <Layout title="テスト">
      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" href="/">
          トップ
        </Link>
        <Typography color="text.primary">テスト</Typography>
      </Breadcrumbs>
      <Divider className="my-2" />

      <p>
        2022年4月17日に行われる渋谷ハルさん主催の VTuber最協決定戦 SEASON4 Ver APEX LEGENDS の事前練習カスタム
        (スクリム)
        の試合結果一覧です。正確性を保つ努力はしておりますが、集計に誤りがある可能性があります。ご了承ください。
      </p>

      <Alert className="my-4" severity="warning">
        以下に表示しているのはテストデータです。データの不整合などの不具合を発見した場合は、トップページ下部に表示したTwitterアカウントからご連絡ください。
      </Alert>

      <StatsView
        statsTitle="テストデータ"
        teamResult={testTeamResult}
        playerResult={testPlayerResult}
        defaultNumberOfMatches={1}
      />

      <RelatedLinks />
    </Layout>
  );
};

export default Home;
