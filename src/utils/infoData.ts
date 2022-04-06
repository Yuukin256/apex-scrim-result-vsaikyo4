import { Collection } from '@discordjs/collection';
import teamData from '../data/team.json';

export interface TeamInfo {
  id: number;
  name: string;
  tag: string;
  players: {
    id: number;
    name: string;
  }[];
}

export const teams: Collection<number, TeamInfo> = new Collection(teamData.map((t) => [t.id, t]));

interface PlayerInfo {
  id: number;
  name: string;
  team: TeamInfo;
}

export const players: Collection<number, PlayerInfo> = new Collection(
  teamData.flatMap((team) =>
    team.players.map((player) => {
      return [player.id, { ...player, team: team }];
    })
  )
);
