import { Dispatch, SetStateAction, useMemo, useState } from 'react';
import type { PlayerResult, PlayerResultCollection } from '../utils/resultData';

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

const calculateTotalAndAverage = (result: PlayerResult): PlayerStats => {
  const numberOfMatches = result.matches.filter((s) => s.kill !== null).length;

  const total = result.matches.reduce(
    (prev, cur) => {
      const kill = prev.kill === null && cur.kill === null ? null : (prev.kill ?? 0) + (cur.kill ?? 0);
      const damage = prev.damage === null && cur.damage === null ? null : (prev.damage ?? 0) + (cur.damage ?? 0);
      return {
        kill,
        damage,
      };
    },
    {
      kill: null,
      damage: null,
    }
  );

  const average = {
    kill: total.kill === null ? null : total.kill / numberOfMatches,
    damage: total.damage === null ? null : total.damage / numberOfMatches,
  };

  return {
    ...result,
    team: `${result.team.tag} ${result.team.name}`,
    total,
    average,
  };
};

type SortFunction = (a: PlayerStats, b: PlayerStats) => number;

export interface SortOption {
  value: string;
  text: string;
  sort: SortFunction;
}

interface Result {
  stats: PlayerStats[];
  numberOfMatches: number;
  sortKey: string;
  setSortKey: Dispatch<SetStateAction<string>>;
  sortOptions: SortOption[];
}

export const usePlayerStats = (result: PlayerResultCollection): Result => {
  const stats = useMemo(() => result.map((p) => calculateTotalAndAverage(p)), [result]);
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

  const [sortKey, setSortKey] = useState('total_kill');

  const sorter = useMemo(() => {
    return sortOptions.find((option) => option.value === sortKey)?.sort;
  }, [sortKey, sortOptions]);

  const sortedStats = useMemo(() => stats.sort(sorter ?? sortOptions[0].sort), [sortOptions, sorter, stats]);

  // sorter が無いときのエラー防止
  if (!sorter) {
    return {
      stats: sortedStats,
      numberOfMatches,
      sortKey: 'total_kill',
      setSortKey,
      sortOptions,
    };
  }

  return {
    stats: sortedStats,
    numberOfMatches,
    sortKey,
    setSortKey,
    sortOptions,
  };
};
