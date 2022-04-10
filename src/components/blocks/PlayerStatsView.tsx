import { VFC } from 'react';
import PlayerStatsOptionForm from './PlayerStatsOptionForm';
import PlayerStatsTable from './PlayerStatsTable';
import { usePlayerStats } from 'hooks/usePlayerStatsHook';
import type { PlayerResultCollection } from 'utils/resultData';

interface Props {
  result: PlayerResultCollection;
}

const PlayerStatsView: VFC<Props> = (props) => {
  const { stats, sortKey, setSortKey, sortOptions, numberOfMatches } = usePlayerStats(props.result);

  return (
    <>
      <PlayerStatsOptionForm sortKey={sortKey} setSortKey={setSortKey} options={sortOptions} />
      <PlayerStatsTable players={stats} numberOfMatches={numberOfMatches} />
    </>
  );
};

export default PlayerStatsView;
