import LaunchIcon from '@mui/icons-material/Launch';
import { VFC } from 'react';
import Link, { LinkProps } from './Link';

const ExternalLink: VFC<LinkProps> = ({ children, ...props }) => (
  <Link target='_blank' rel='noopener' {...props}>
    {children}
    <LaunchIcon sx={{fontSize: '0.8rem', verticalAlign: 'middle'}} />
  </Link>
);

export default ExternalLink;
