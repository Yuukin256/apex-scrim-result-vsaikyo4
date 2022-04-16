import ArticleIcon from '@mui/icons-material/Article';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import HomeIcon from '@mui/icons-material/Home';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import { useRouter } from 'next/router';
import { MouseEventHandler, VFC } from 'react';
import ExternalLink from 'components/atoms/ExternalLink';
import { NextLinkComposed } from 'components/atoms/Link';

interface Props {
  open: boolean;
  handleClose: MouseEventHandler<HTMLButtonElement>;
}

const Side: VFC<Props> = ({ open, handleClose: handleClone }) => {
  const router = useRouter();
  return (
    <Drawer variant='persistent' anchor='left' open={open}>
      <Box
        sx={(theme) => ({
          display: 'flex',
          alignItems: 'center',
          padding: theme.spacing(0, 1),
          ...theme.mixins.toolbar,
          justifyContent: 'flex-end',
        })}
      >
        <IconButton onClick={handleClone}>
          <ChevronLeftIcon />
        </IconButton>
      </Box>
      <Divider />

      <List>
        <ListItemButton component={NextLinkComposed} to={{ pathname: '/' }} selected={router.pathname === '/'}>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary='トップページ' secondary='最新の試合結果' />
        </ListItemButton>
      </List>
      <Divider />

      <List>
        <ListSubheader>過去の試合結果</ListSubheader>
        {[
          {
            name: '1日目',
            path: '/day1',
            date: '4月11日',
          },
          {
            name: '2日目',
            path: '/day2',
            date: '4月12日',
          },
          {
            name: '3日目',
            path: '/day3',
            date: '4月13日',
          },
          {
            name: '4日目',
            path: '/day4',
            date: '4月14日',
          },
          {
            name: '5日目',
            path: '/day5',
            date: '4月15日',
          },
          {
            name: '6日目',
            path: '/day6',
            date: '4月16日',
          },
        ].map((value) => (
          <ListItemButton
            component={NextLinkComposed}
            to={{ pathname: value.path }}
            selected={router.pathname === value.path}
            key={value.name}
          >
            <ListItemText primary={value.name} secondary={value.date} />
          </ListItemButton>
        ))}
      </List>
      <Divider />

      <List>
        <ListSubheader>外部リンク</ListSubheader>
        {[
          {
            primary: '大会公式サイト',
            url: 'https://vtuber-saikyo.jp/',
            icon: <HomeIcon />,
          },
          {
            primary: '大会ルール',
            url: 'https://vtuber-saikyo.jp/season4/rule/',
            icon: <ArticleIcon />,
          },
          {
            primary: '渋谷ハルさん Twitter',
            url: 'https://twitter.com/ShibuyaHAL',
            icon: <TwitterIcon />,
          },
          {
            primary: '渋谷ハルさん YouTube',
            secondary: '大会配信チャンネル',
            url: 'https://youtube.com/c/HALchannel',
            icon: <YouTubeIcon />,
          },
        ].map((value) => (
          <ListItemButton component={ExternalLink} href={value.url} key={value.primary}>
            {value.icon && <ListItemIcon>{value.icon}</ListItemIcon>}
            <ListItemText primary={value.primary} secondary={value.secondary} />
          </ListItemButton>
        ))}
      </List>
    </Drawer>
  );
};

export default Side;
