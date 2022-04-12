import ArticleIcon from '@mui/icons-material/Article';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import HomeIcon from '@mui/icons-material/Home';
import MenuIcon from '@mui/icons-material/Menu';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { NextLinkComposed } from 'components/atoms/Link';

const Header = () => {
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <>
      <AppBar position='sticky'>
        <Toolbar>
          <IconButton
            size='large'
            edge='start'
            color='inherit'
            aria-label='menu'
            sx={{ mr: 2 }}
            onClick={handleDrawerOpen}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant='h6' component='h1' sx={{ flexGrow: 1 }}>
            V最協S4 練習カスタム結果
          </Typography>
        </Toolbar>
      </AppBar>

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
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </Box>
        <Divider />

        <List>
          <ListItemButton component={NextLinkComposed} to={{ pathname: '/' }}>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary='トップページ' />
          </ListItemButton>
        </List>
        <Divider />

        <List>
          <ListSubheader>過去の試合結果</ListSubheader>
          {[
            {
              name: '1日目',
              url: '/day1',
              date: '4月11日',
            },
          ].map((value) => (
            <ListItemButton component={NextLinkComposed} to={{ pathname: value.url }} key={value.name}>
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
            <ListItemButton component={NextLinkComposed} to={{ pathname: value.url }} key={value.primary}>
              {value.icon && <ListItemIcon>{value.icon}</ListItemIcon>}
              <ListItemText primary={value.primary} secondary={value.secondary} />
            </ListItemButton>
          ))}
        </List>
      </Drawer>
    </>
  );
};

export default Header;
