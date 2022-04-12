import ExternalLink from 'components/atoms/ExternalLink';

const Footer = () => (
  <footer>
    <p>
      このサイトはGoogle Analyticsを使用しています (
      <ExternalLink href='https://policies.google.com/technologies/partner-sites?hl=ja'>詳細</ExternalLink>
      )。
    </p>
    <p>
      © 2022 Yuukin256 (<ExternalLink href='https://twitter.com/Yuukin256'>@Yuukin256</ExternalLink>
      ), Built with <ExternalLink href='https://nextjs.org/'>Next.js</ExternalLink>
    </p>
  </footer>
);

export default Footer;
