import { Typography } from '@mui/material';
import { VFC } from 'react';
import { usePlayerStats } from '../../hooks/usePlayerStatsHook';
import type { PlayerResultCollection } from '../../utils/resultData';
import PlayerStatsOptionForm from './PlayerStatsOptionForm';
import PlayerStatsTable from './PlayerStatsTable';

interface Props {
  result: PlayerResultCollection;
}

const PlayerStatsView: VFC<Props> = (props) => {
  const { stats, sortKey, setSortKey, sortOptions, numberOfMatches } = usePlayerStats(props.result);

  return (
    <>
      <Typography variant="h3">個人成績</Typography>
      <PlayerStatsOptionForm sortKey={sortKey} setSortKey={setSortKey} options={sortOptions} />
      <PlayerStatsTable players={stats} numberOfMatches={numberOfMatches} />
    </>
  );
};

export default PlayerStatsView;
