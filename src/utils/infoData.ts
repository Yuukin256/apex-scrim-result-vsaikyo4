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

export const teams: TeamInfo[] = teamData;

interface PlayerInfo {
  id: number;
  name: string;
  team: TeamInfo;
}

export const players: PlayerInfo[] = teamData.flatMap((team) =>
  team.players.map((player) => {
    return { ...player, team: team };
  })
);
