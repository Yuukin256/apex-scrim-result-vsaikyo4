import { useMemo, useState } from 'react';
import { TeamStatsOptionFormProps } from '../components/blocks/TeamStatsOptionForm';
import type { TeamResultCollection } from 'utils/resultData';

interface BaseStats {
  placement: number | null;
  placementPoint: number;
  kill: number | null;
  killPoint: number;
  point: number;
}

export interface TeamStats {
  id: number;
  name: string;
  tag: string;
  members: string[];
  total: BaseStats;
  average: BaseStats;
  matches: BaseStats[];
}

const calculateTotalAndAverage = (stats: Omit<TeamStats, 'total' | 'average'>): TeamStats => {
  const numberOfMatches = stats.matches.filter((s) => s.placement !== null).length;

  // 順位が入力されている試合数が0の場合は、平均の計算でゼロ除算が発生することを防止
  if (numberOfMatches === 0) {
    return {
      ...stats,
      total: {
        placement: null,
        placementPoint: 0,
        kill: null,
        killPoint: 0,
        point: 0,
      },
      average: {
        placement: null,
        placementPoint: 0,
        kill: null,
        killPoint: 0,
        point: 0,
      },
    };
  }

  // 配列の要素が存在しない場合は早期 return 済みのため initialValue は不要
  const total = stats.matches.reduce((prev, cur) => {
    const placement =
      prev.placement === null && cur.placement === null ? null : (prev.placement ?? 0) + (cur.placement ?? 0);
    const placementPoint = prev.placementPoint + cur.placementPoint;
    const kill = prev.kill === null && cur.kill === null ? null : (prev.kill ?? 0) + (cur.kill ?? 0);
    const killPoint = prev.killPoint + cur.killPoint;
    const point = placementPoint + killPoint;
    return {
      placement,
      placementPoint,
      kill,
      killPoint,
      point,
    };
  });

  const average = {
    placement: total.placement === null ? null : total.placement / numberOfMatches,
    placementPoint: total.placementPoint / numberOfMatches,
    kill: total.kill === null ? null : total.kill / numberOfMatches,
    killPoint: total.killPoint / numberOfMatches,
    point: total.point / numberOfMatches,
  };

  return {
    ...stats,
    total,
    average,
  };
};

type SortFunction = (a: TeamStats, b: TeamStats) => number;

export interface SortOption {
  value: string;
  text: string;
  sort: SortFunction;
}

interface Props {
  result: TeamResultCollection;
  defaultNumberOfMatches: number;
}

interface Result {
  stats: TeamStats[];
  numberOfMatches: number;
  forForm: TeamStatsOptionFormProps;
}

export const useTeamStats = ({ result, defaultNumberOfMatches }: Props): Result => {
  const [sortKey, setSortKey] = useState('total_point');
  const [enableMaxKill, setEnableMaxKill] = useState(false);
  const [includeAdditionalMatch, setIncludeAdditionalMatch] = useState(true);

  const stats = useMemo(() => {
    const maxNumberOfMatches = includeAdditionalMatch ? Infinity : defaultNumberOfMatches;

    return result.map((team) => {
      const matches = team.matches.slice(0, maxNumberOfMatches).map<BaseStats>((match) => {
        const killPoint = enableMaxKill ? match.killPointWithMax : match.killPointWithoutMax;
        return {
          placement: match.placement,
          placementPoint: match.placementPoint,
          kill: match.kill,
          killPoint: killPoint,
          point: match.placementPoint + killPoint,
        };
      });

      return calculateTotalAndAverage({ ...team, matches });
    });
  }, [defaultNumberOfMatches, enableMaxKill, includeAdditionalMatch, result]);

  const numberOfMatches = useMemo(
    () => stats.map((v) => v.matches.length).reduce((prev, cur) => Math.max(prev, cur), 0),
    [stats]
  );

  const sortOptions = useMemo<SortOption[]>(() => {
    const forMatches = [...new Array(numberOfMatches)].flatMap<SortOption>((_, i) => [
      {
        value: `match${i + 1}_point`,
        text: `${i + 1}試合目ポイント`,
        sort: (a, b) => b.matches[i].point - a.matches[i].point,
      },
      {
        value: `match${i + 1}_placement`,
        text: `${i + 1}試合目順位`,
        sort: (a, b) => (a.matches[i].placement ?? 20) - (b.matches[i].placement ?? 20),
      },
      {
        value: `match${i + 1}_killPoint`,
        text: `${i + 1}試合目キルポイント`,
        sort: (a, b) => b.matches[i].killPoint - a.matches[i].killPoint,
      },
    ]);

    return [
      {
        value: 'total_point',
        text: '合計ポイント',
        sort: (a, b) => b.total.point - a.total.point,
      },
      {
        value: 'total_placementPoint',
        text: '合計順位ポイント',
        sort: (a, b) => b.total.placementPoint - a.total.placementPoint,
      },
      {
        value: 'total_killPoint',
        text: '合計キルポイント',
        sort: (a, b) => b.total.killPoint - a.total.killPoint,
      },
      {
        value: 'average_point',
        text: '平均ポイント',
        sort: (a, b) => b.average.point - a.average.point,
      },
      {
        value: 'average_placement',
        text: '平均順位',
        sort: (a, b) => (a.average.placementPoint ?? 0) - (b.average.placement ?? 0),
      },
      {
        value: 'average_killPoint',
        text: '平均キルポイント',
        sort: (a, b) => b.average.killPoint - a.average.killPoint,
      },
      ...forMatches,
    ];
  }, [numberOfMatches]);

  const sorter = useMemo(() => {
    return sortOptions.find((option) => option.value === sortKey)?.sort;
  }, [sortKey, sortOptions]);

  const sortedStats = useMemo(() => stats.sort(sorter ?? sortOptions[0].sort), [sortOptions, sorter, stats]);

  // sorter が無いときのエラー防止
  if (!sorter) {
    return {
      stats: sortedStats,
      numberOfMatches,
      forForm: {
        sortKey: 'total_point',
        setSortKey,
        sortOptions,
        enableMaxKill,
        setEnableMaxKill,
        includeAdditionalMatch,
        setIncludeAdditionalMatch,
        defaultNumberOfMatches,
      },
    };
  }

  return {
    stats: sortedStats,
    numberOfMatches,
    forForm: {
      sortKey,
      setSortKey,
      sortOptions,
      enableMaxKill,
      setEnableMaxKill,
      includeAdditionalMatch,
      setIncludeAdditionalMatch,
      defaultNumberOfMatches,
    },
  };
};
