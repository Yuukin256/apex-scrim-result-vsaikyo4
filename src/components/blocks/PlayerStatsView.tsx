import { VFC } from 'react';
import { usePlayerStats } from '../../hooks/usePlayerStatsHook';
import { PlayerResult } from '../../utils/resultData';
import PlayerStatsOptionForm from './PlayerStatsOptionForm';
import PlayerStatsTable from './PlayerStatsTable';

interface Props {
  result: PlayerResult[]
}

const PlayerStatsView: VFC<Props> = (props) => {
  const { stats, sortKey, setSortKey, sortOptions, numberOfMatches } = usePlayerStats(props.result);

  return (
    <>
      <h3 className="text-xl">個人成績</h3>
      <PlayerStatsOptionForm sortKey={sortKey} setSortKey={setSortKey} options={sortOptions} />
      <PlayerStatsTable players={stats} numberOfMatches={numberOfMatches} />
    </>
  );
};

export default PlayerStatsView;
