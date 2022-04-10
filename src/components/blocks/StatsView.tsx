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

const StatsView: VFC<Props> = ({ statsTitle, teamResult, playerResult, defaultNumberOfMatches }) => {
  return (
    <>
      <Typography variant='h2' mt={1}>
        {statsTitle}
      </Typography>

      <ul>
        <li>マップはすべてWorld&apos;s Edgeです。</li>
      </ul>

      <TeamStatsView result={teamResult} defaultNumberOfMatches={defaultNumberOfMatches} />

      <PlayerStatsView result={playerResult} />
    </>
  );
};

export default StatsView;
