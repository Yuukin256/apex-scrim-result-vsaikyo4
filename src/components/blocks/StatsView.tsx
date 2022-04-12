import GroupsIcon from '@mui/icons-material/Groups';
import PersonIcon from '@mui/icons-material/Person';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import MuiTabPanel from '@mui/lab/TabPanel';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import { useState, VFC } from 'react';
import PlayerStatsView from './PlayerStatsView';
import TeamStatsView from './TeamStatsView';
import type { PlayerResultCollection, TeamResultCollection } from 'utils/resultData';

interface Props {
  statsTitle: string;
  teamResult: TeamResultCollection;
  playerResult: PlayerResultCollection;
  defaultNumberOfMatches: number;
}

const TabPanel = styled(MuiTabPanel)(({ theme }) => ({
  [theme.breakpoints.up('sm')]: {
    padding: '20px 8px 0',
  },
  [theme.breakpoints.down('sm')]: {
    padding: '20px 0 0',
  },
}));

const StatsView: VFC<Props> = ({ statsTitle, teamResult, playerResult, defaultNumberOfMatches }) => {
  const [tabValue, setTabValue] = useState('1');

  const handleChange = (_: unknown, newValue: string) => {
    setTabValue(newValue);
  };

  return (
    <>
      <Typography variant='h3' component='h2' mt={4}>
        {statsTitle}
      </Typography>

      <ul>
        <li>マップはすべてWorld&apos;s Edgeです。</li>
      </ul>

      <TabContext value={tabValue}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange}>
            <Tab icon={<GroupsIcon />} iconPosition='start' label='チーム成績' value='1' />
            <Tab icon={<PersonIcon />} iconPosition='start' label='個人成績' value='2' />
          </TabList>
        </Box>
        <TabPanel value='1'>
          <TeamStatsView result={teamResult} defaultNumberOfMatches={defaultNumberOfMatches} />
        </TabPanel>
        <TabPanel value='2'>
          <PlayerStatsView result={playerResult} />
        </TabPanel>
      </TabContext>
    </>
  );
};

export default StatsView;
