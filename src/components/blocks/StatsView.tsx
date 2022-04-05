import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { VFC } from 'react';
import { PlayerResult, TeamResult } from '../../utils/resultData';
import PlayerStatsView from './PlayerStatsView';
import TeamStatsView from './TeamStatsView';

interface Props {
  statsTitle: string;
  teamResult: TeamResult[];
  playerResult: PlayerResult[];
  defaultNumberOfMatches: number;
}

const StatsView: VFC<Props> = ({ statsTitle, teamResult, playerResult, defaultNumberOfMatches }) => (
  <>
    <Typography variant="h2" fontWeight="regular" mt={1}>
      {statsTitle}
    </Typography>

    <ul className="list-disc ml-8">
      <li>マップはすべてWorld&apos;s Edgeです。</li>
    </ul>

    <Paper className="p-3 my-4 border-orange" variant="outlined" square>
      <TeamStatsView result={teamResult} defaultNumberOfMatches={defaultNumberOfMatches} />
    </Paper>

    <Paper className="p-3 my-4 border-orange" variant="outlined" square>
      <PlayerStatsView result={playerResult} />
    </Paper>
  </>
);

export default StatsView;
