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
    maxKill: number;
    placement: number | null;
    placementPoint: number;
    kill: number | null;
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

interface Result {
  team: TeamResult[];
  player: PlayerResult[];
}

export const formatData = (data: MatchData[]): Result => {
  const teamResult: TeamResult[] = teams.map((t) => ({
    id: t.id,
    name: t.name,
    tag: t.tag,
    matches: [],
  }));
  const playerResult: PlayerResult[] = players.map((p) => ({
    id: p.id,
    name: p.name,
    team: p.team,
    matches: [],
  }));

  data.map((match) => {
    match.teams.forEach((team) => {
      teamResult
        .find((t) => t.id === team.id)
        ?.matches.push({
          maxKill: match.maxKill ?? Infinity,
          placement: team.placement,
          placementPoint: getPlacementPoint(team.placement),
          kill: team.players
            .map((p) => p.kill)
            .reduce((prev, cur) => (prev === null && cur === null ? null : (prev ?? 0) + (cur ?? 0)), null),
        });

      team.players.forEach((player) => {
        const pushTo = playerResult.find((p) => p.id === player.id)?.matches;
        if (player.proxy) {
          pushTo?.push({
            kill: null,
            damage: null,
          });
        } else {
          pushTo?.push(player);
        }
      });
    });
  });

  return { team: teamResult, player: playerResult };
};
