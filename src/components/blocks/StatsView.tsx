import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
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

const StatsView: VFC<Props> = ({ statsTitle, teamResult, playerResult, defaultNumberOfMatches }) => (
  <>
    <Typography variant='h2' mt={1}>
      {statsTitle}
    </Typography>

    <ul>
      <li>マップはすべてWorld&apos;s Edgeです。</li>
    </ul>

    <Paper className='p-3 my-4 border-saikyoOrange' variant='outlined' square>
      <TeamStatsView result={teamResult} defaultNumberOfMatches={defaultNumberOfMatches} />
    </Paper>

    <Paper className='p-3 my-4 border-saikyoOrange' variant='outlined' square>
      <PlayerStatsView result={playerResult} />
    </Paper>
  </>
);

export default StatsView;
