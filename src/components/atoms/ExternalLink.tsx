import Link, { LinkProps } from '@mui/material/Link';
import { VFC } from 'react';

const ExternalLink: VFC<LinkProps> = ({ children, ...props }) => (
  <Link target='_blank' rel='noopener' {...props}>
    {children}
  </Link>
);

export default ExternalLink;
