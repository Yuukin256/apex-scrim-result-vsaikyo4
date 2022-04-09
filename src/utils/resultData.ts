import { Collection } from 'functional-collection';
import { getPlacementPoint } from './getPlacementPoint';
import { players, TeamInfo, teams } from './infoData';

interface MatchData {
  match: number;
  maxKill: number | null;
  teams: {
    id: number;
    placement: number | null;
    players: {
      id: number;
      kill: number | null;
      damage: number | null;
      proxy: string | null;
    }[];
  }[];
}

export interface TeamResult {
  id: number;
  name: string;
  tag: string;
  members: string[];
  matches: {
    placement: number | null;
    placementPoint: number;
    kill: number | null;
    killPointWithoutMax: number;
    killPointWithMax: number;
  }[];
}

export interface PlayerResult {
  id: number;
  name: string;
  team: Omit<TeamInfo, 'members'>;
  matches: {
    kill: number | null;
    damage: number | null;
  }[];
}

export type TeamResultCollection = Collection<number, TeamResult>;
export type PlayerResultCollection = Collection<number, PlayerResult>;

interface Result {
  team: TeamResultCollection;
  player: PlayerResultCollection;
}

export const formatData = (data: MatchData[]): Result => {
  const teamResults: TeamResultCollection = teams.mapValues((t) => ({ ...t, matches: [] }));

  const playerResults: PlayerResultCollection = players.mapValues((p) => ({
    id: p.id,
    name: p.name,
    team: p.team,
    matches: [],
  }));

  data.map((match) => {
    const maxKill = match.maxKill ?? Infinity;

    match.teams.forEach((team) => {
      teamResults.update(team.id, (prev) => {
        const kill = team.players
          .map((p) => p.kill)
          .reduce((prev, cur) => (prev === null && cur === null ? null : (prev ?? 0) + (cur ?? 0)), null);
        const newResult = {
          placement: team.placement,
          placementPoint: getPlacementPoint(team.placement),
          kill: kill,
          killPointWithoutMax: kill ?? 0,
          killPointWithMax: Math.min(kill ?? 0, maxKill),
        };
        const newMatches = prev.matches.concat(newResult);

        return {
          ...prev,
          matches: newMatches,
        };
      });

      team.players.forEach((player) => {
        playerResults.update(player.id, (prev) => {
          if (player.proxy) {
            const newMatches = prev.matches.concat({
              kill: null,
              damage: null,
            });
            return {
              ...prev,
              matches: newMatches,
            };
          } else {
            const newMatches = prev.matches.concat({
              kill: player.kill,
              damage: player.damage,
            });
            return {
              ...prev,
              matches: newMatches,
            };
          }
        });
      });
    });
  });

  return { team: teamResults, player: playerResults };
};
