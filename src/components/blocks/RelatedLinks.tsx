import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { VFC } from 'react';

const RelatedLinks: VFC = () => (
  <>
    <Typography variant='h2' fontWeight='regular' mt={4}>
      関連リンク集
    </Typography>
    <ul>
      <li>
        <Link href='https://vtuber-saikyo.jp/'>大会公式サイト</Link>
      </li>
      <li>
        <Link href='https://vtuber-saikyo.jp/season4/rule/'>大会ルール</Link>
      </li>
      <li>
        <Link href='https://twitter.com/ShibuyaHAL'>渋谷ハルさん Twitter</Link>
      </li>
      <li>
        <Link href='https://youtube.com/c/HALchannel'>渋谷ハルさん YouTube (大会配信チャンネル)</Link>
      </li>
    </ul>
  </>
);

export default RelatedLinks;
