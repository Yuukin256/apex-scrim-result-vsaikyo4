import { Collection } from '@discordjs/collection';
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
  team: TeamInfo;
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
  const teamResults: TeamResultCollection = teams.mapValues((t) => ({
    id: t.id,
    name: t.name,
    tag: t.tag,
    matches: [],
  }));

  const playerResults: PlayerResultCollection = players.mapValues((p) => ({
    id: p.id,
    name: p.name,
    team: p.team,
    matches: [],
  }));

  data.map((match) => {
    const maxKill = match.maxKill ?? Infinity;

    match.teams.forEach((team) => {
      const prev = teamResults.get(team.id);
      if (!prev) return;

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

      teamResults.set(team.id, {
        ...prev,
        matches: newMatches,
      });

      team.players.forEach((player) => {
        const prev = playerResults.get(player.id);
        if (!prev) return;

        if (player.proxy) {
          const newMatches = prev.matches.concat({
            kill: null,
            damage: null,
          });
          playerResults.set(player.id, {
            ...prev,
            matches: newMatches,
          });
        } else {
          const newMatches = prev.matches.concat({
            kill: player.kill,
            damage: player.damage,
          });
          playerResults.set(player.id, {
            ...prev,
            matches: newMatches,
          });
        }
      });
    });
  });

  return { team: teamResults, player: playerResults };
};
