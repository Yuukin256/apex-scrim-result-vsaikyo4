import { Dispatch, SetStateAction, useMemo, useState } from 'react';

interface BaseStats {
  kill: number | null;
  damage: number | null;
}

export interface PlayerStats {
  name: string;
  team: string;
  total: BaseStats;
  average: BaseStats;
  matches: BaseStats[];
}

const calculateTotalAndAverage = (stats: Omit<PlayerStats, 'total' | 'average'>): PlayerStats => {
  const numberOfMatches = stats.matches.length;

  const total = stats.matches.reduce((prev, cur) => {
    const kill = prev.kill === null || cur.kill === null ? null : (prev.kill ?? 0) + (cur.kill ?? 0);
    const damage = prev.damage === null || cur.damage === null ? null : (prev.damage ?? 0) + (cur.damage ?? 0);
    return {
      kill,
      damage,
    };
  });

  const average = {
    kill: total.kill === null ? null : total.kill / numberOfMatches,
    damage: total.damage === null ? null : total.damage / numberOfMatches,
  };

  return {
    ...stats,
    total,
    average,
  };
};

export interface SortOption {
  value: string;
  text: string;
  sort: (a: PlayerStats, b: PlayerStats) => number;
}

interface Result {
  stats: PlayerStats[];
  numberOfMatches: number;
  sortKey: string;
  setSort: Dispatch<SetStateAction<string>>;
  sortOptions: SortOption[];
}

export const usePlayerStatsSortHook = (
  statsWithoutTotalAndAverage: Omit<PlayerStats, 'total' | 'average'>[]
): Result => {
  const stats = useMemo(
    () => statsWithoutTotalAndAverage.map((p) => calculateTotalAndAverage(p)),
    [statsWithoutTotalAndAverage]
  );
  const numberOfMatches = useMemo(
    () => stats.map((v) => v.matches.length).reduce((prev, cur) => (prev > cur ? prev : cur)),
    [stats]
  );

  const sortOptions = useMemo<SortOption[]>(() => {
    const forMatches = [...new Array(numberOfMatches)].flatMap<SortOption>((_, i) => [
      {
        value: `match${i + 1}_kill`,
        text: `${i + 1}試合目キル`,
        sort: (a, b) => (b.matches[i].kill ?? 0) - (a.matches[i].kill ?? 0),
      },
      {
        value: `match${i + 1}_damage`,
        text: `${i + 1}試合目ダメージ`,
        sort: (a, b) => (b.matches[i].damage ?? 0) - (a.matches[i].damage ?? 0),
      },
    ]);

    return [
      {
        value: 'total_kill',
        text: '合計キル',
        sort: (a, b) => (b.total.kill ?? 0) - (a.total.kill ?? 0),
      },
      {
        value: 'total_damage',
        text: '合計ダメージ',
        sort: (a, b) => (b.total.damage ?? 0) - (a.total.damage ?? 0),
      },
      {
        value: 'average_kill',
        text: '平均キル',
        sort: (a, b) => (b.average.kill ?? 0) - (a.average.kill ?? 0),
      },
      {
        value: 'average_damage',
        text: '平均ダメージ',
        sort: (a, b) => (b.average.damage ?? 0) - (a.average.damage ?? 0),
      },
      ...forMatches,
    ];
  }, [numberOfMatches]);
  const [sortKey, setSort] = useState('total_kill');

  const sorter = sortOptions.find((option) => option.value === sortKey)?.sort;

  // sorter が無いときのエラー防止
  if (!sorter) {
    return {
      stats: stats,
      numberOfMatches,
      sortKey: 'total_kill',
      setSort,
      sortOptions,
    };
  }

  stats.sort(sorter);
  return {
    stats: stats,
    numberOfMatches,
    sortKey,
    setSort,
    sortOptions,
  };
};
