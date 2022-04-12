import Typography from '@mui/material/Typography';
import { VFC } from 'react';
import ExternalLink from 'components/atoms/ExternalLink';

const RelatedLinks: VFC = () => (
  <>
    <Typography variant='h2' mt={4}>
      関連リンク集
    </Typography>
    <ul>
      <li>
        <ExternalLink href='https://vtuber-saikyo.jp/'>大会公式サイト</ExternalLink>
      </li>
      <li>
        <ExternalLink href='https://vtuber-saikyo.jp/season4/rule/'>大会ルール</ExternalLink>
      </li>
      <li>
        <ExternalLink href='https://twitter.com/ShibuyaHAL'>渋谷ハルさん Twitter</ExternalLink>
      </li>
      <li>
        <ExternalLink href='https://youtube.com/c/HALchannel'>渋谷ハルさん YouTube (大会配信チャンネル)</ExternalLink>
      </li>
    </ul>
  </>
);

export default RelatedLinks;
