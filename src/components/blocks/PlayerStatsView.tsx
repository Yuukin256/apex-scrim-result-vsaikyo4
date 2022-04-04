import { VFC } from 'react';
import { usePlayerStatsSortHook } from '../../hooks/usePlayerStatsHook';
import PlayerStatsOptionForm from './PlayerStatsOptionForm';
import PlayerStatsTable from './PlayerStatsTable';

const testData = [
  {
    name: '葛葉',
    team: 'KZH 葛葉チーム',
    matches: [
      { kill: 4, damage: 1100 },
      { kill: 0, damage: 100 },
    ],
  },
  {
    name: 'イブラヒム',
    team: 'KZH 葛葉チーム',
    matches: [
      { kill: 0, damage: 777 },
      { kill: 2, damage: 2641 },
    ],
  },
];

const PlayerStatsView: VFC = () => {
  const { stats, sortKey, setSortKey, sortOptions, numberOfMatches } = usePlayerStatsSortHook(testData);

  return (
    <>
      <h3 className="text-xl">個人成績</h3>
      <PlayerStatsOptionForm sortKey={sortKey} setSortKey={setSortKey} options={sortOptions} />
      <PlayerStatsTable players={stats} numberOfMatches={numberOfMatches} />
    </>
  );
};

export default PlayerStatsView;
