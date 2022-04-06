import { Collection } from '@discordjs/collection';
import teamData from '../data/team.json';

export interface TeamInfo {
  id: number;
  name: string;
  tag: string;
  members: string[];
}

export const teams: Collection<number, TeamInfo> = new Collection(
  teamData.map((t) => [
    t.id,
    {
      id: t.id,
      name: t.name,
      tag: t.tag,
      members: t.players.map((p) => p.name),
    },
  ])
);

export interface PlayerInfo {
  id: number;
  name: string;
  team: Omit<TeamInfo, 'members'>;
}

export const players: Collection<number, PlayerInfo> = new Collection(
  teamData.flatMap((team) =>
    team.players.map((player) => {
      return [
        player.id,
        {
          ...player,
          team: {
            id: team.id,
            name: team.name,
            tag: team.tag,
          },
        },
      ];
    })
  )
);
