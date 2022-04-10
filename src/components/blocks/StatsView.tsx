import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Theme } from '@mui/system/createTheme';
import { VFC } from 'react';
import PlayerStatsView from './PlayerStatsView';
import TeamStatsView from './TeamStatsView';
import type { PlayerResultCollection, TeamResultCollection } from 'utils/resultData';

interface Props {
  statsTitle: string;
  teamResult: TeamResultCollection;
  playerResult: PlayerResultCollection;
  defaultNumberOfMatches: number;
}

const StatsView: VFC<Props> = ({ statsTitle, teamResult, playerResult, defaultNumberOfMatches }) => {
  const matches = useMediaQuery<Theme>((theme) => theme.breakpoints.up('sm'));

  const TeamStats = () => {
    if (!matches) {
      return <TeamStatsView result={teamResult} defaultNumberOfMatches={defaultNumberOfMatches} />;
    } else {
      return (
        <Paper className='p-3 my-4 border-saikyoOrange' variant='outlined' square>
          <TeamStatsView result={teamResult} defaultNumberOfMatches={defaultNumberOfMatches} />
        </Paper>
      );
    }
  };

  const PlayerStats = () => {
    if (!matches) {
      return <PlayerStatsView result={playerResult} />;
    } else {
      return (
        <Paper className='p-3 my-4 border-saikyoOrange' variant='outlined' square>
          <PlayerStatsView result={playerResult} />
        </Paper>
      );
    }
  };

  return (
    <>
      <Typography variant='h2' mt={1}>
        {statsTitle}
      </Typography>

      <ul>
        <li>マップはすべてWorld&apos;s Edgeです。</li>
      </ul>

      <TeamStats />

      <PlayerStats />
    </>
  );
};

export default StatsView;
