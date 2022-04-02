// 試合ごとの結果 -> チームごとの結果 に変換

import { getPlacementPoint } from './getPlacementPoint';

export interface PlainTeamResult {
  id: number;
  tag: string;
  name: string;
  results: {
    match: number;
    placement: number | string;
    placementPoint: number;
    kill: number | string;
    killPoint: number;
    point: number;
  }[];
}

export interface CalculatedTeamResult {
  noCapped: PlainTeamResult;
  capped: PlainTeamResult;
}

class Team implements CalculatedTeamResult {
  noCapped: PlainTeamResult;
  capped: PlainTeamResult;

  constructor(id: number, tag: string, name: string) {
    this.noCapped = {
      id: id,
      tag: tag,
      name: name,
      results: [],
    };
    this.capped = {
      id: id,
      tag: tag,
      name: name,
      results: [],
    };
  }

  public addMatchResult(match: number, placement: number | string, kill: number | string, maxKill = Infinity): this {
    const placementPoint = getPlacementPoint(placement);
    const numberOfKill = typeof kill === 'string' ? 0 : kill;

    // キルポイント上限なしの場合
    {
      const result = {
        match: match,
        placement: placement,
        placementPoint: placementPoint,
        kill: kill,
        killPoint: numberOfKill,
        point: placementPoint + numberOfKill,
      };
      this.noCapped.results.push(result);
    }

    // キルポイント上限ありの場合
    {
      const killPoint = Math.min(numberOfKill, maxKill);
      const result = {
        match: match,
        placement: placement,
        placementPoint: placementPoint,
        kill: kill,
        killPoint: killPoint,
        point: placementPoint + killPoint,
      };
      this.capped.results.push(result);
    }

    return this;
  }

  public toJSON(): CalculatedTeamResult {
    return {
      noCapped: this.noCapped,
      capped: this.capped,
    };
  }
}

export interface DayResult {
  day: string;
  teams: CalculatedTeamResult[];
}

export interface DayResultInputData {
  day: string;
  matches: {
    match: number;
    map: string;
    maxKill: number | null;
    teams: { id: number; placement: number | string; kill: number | string }[];
  }[];
}

export interface TeamInputData {
  id: number;
  tag: string;
  name: string;
}

const formatResultData = (scrimMatchData: DayResultInputData[], teamData: TeamInputData[]): DayResult[] => {
  const formatted = scrimMatchData.map((dayResult) => {
    const teams: Team[] = teamData.map(({ id, tag, name }) => new Team(id, tag, name));

    dayResult.matches.forEach((matchResult) => {
      matchResult.teams.forEach((teamResult) => {
        teams[teamResult.id - 1].addMatchResult(
          matchResult.match,
          teamResult.placement,
          teamResult.kill,
          matchResult.maxKill ?? Infinity
        );
      });
    });

    return { day: dayResult.day, teams: teams.map((v) => v.toJSON()) };
  });

  return formatted;
};

export default formatResultData;
