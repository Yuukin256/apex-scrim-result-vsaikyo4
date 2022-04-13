import { Typography } from '@mui/material';
import ExternalLink from 'components/atoms/ExternalLink';

const Footer = () => (
  <footer>
    <Typography variant='body2'>
      このサイトはGoogle Analyticsを使用しています (
      <ExternalLink href='https://policies.google.com/technologies/partner-sites?hl=ja'>詳細</ExternalLink>
      )。
    </Typography>
    <Typography variant='body2'>
      © 2022 Yuukin256 (<ExternalLink href='https://twitter.com/Yuukin256'>@Yuukin256</ExternalLink>
      ), Built with <ExternalLink href='https://nextjs.org/'>Next.js</ExternalLink>
    </Typography>
  </footer>
);

export default Footer;
