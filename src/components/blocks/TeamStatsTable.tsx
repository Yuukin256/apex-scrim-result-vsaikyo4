import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { memo } from 'react';
import { TeamStats } from '../../hooks/useTeamStatsHook';
import TableCellCenter from '../atoms/TableCellCenter';
import TableCellLeft from '../atoms/TableCellLeft';
import TableCellRight from '../atoms/TableCellRight';
import Tooltip from '../atoms/Tooltip';

const getPlacementColor = (placement: number | null): string => {
  switch (placement) {
    case 1:
      return '#ffd700';
    case 2:
      return '#c0c0c0';
    case 3:
      return '#CD7F32';
    default:
      return '';
  }
};

const HeadRow1 = memo<{ numberOfMatches: number }>(function HeadRow1({ numberOfMatches }) {
  return (
    <TableRow>
      <TableCellCenter colSpan={3} className="font-bold border-r" />
      <TableCellCenter colSpan={3} className="font-bold border-r">
        合計
      </TableCellCenter>
      <TableCellCenter colSpan={3} className="font-bold border-r">
        平均
      </TableCellCenter>
      {[...new Array(numberOfMatches)].map((_, i) => (
        <TableCellCenter className="font-bold border-r last:border-r-0" colSpan={3} key={i + 1}>
          {i + 1}試合目
        </TableCellCenter>
      ))}
    </TableRow>
  );
});

const HeadRow2 = memo<{ numberOfMatches: number }>(function HeadRow2({ numberOfMatches }) {
  return (
    <TableRow>
      <TableCellCenter className="font-bold w-8 border-r">#</TableCellCenter>
      <TableCellCenter className="font-bold w-80 border-r" colSpan={2}>
        チーム
      </TableCellCenter>

      <TableCellCenter className="font-bold w-16">
        <span className="inline-block">ポイ</span>
        <span className="inline-block">ント</span>
      </TableCellCenter>
      <TableCellCenter className="font-bold w-16">
        <span className="inline-block">順位</span>
        <span className="inline-block">ポイ</span>
        <span className="inline-block">ント</span>
      </TableCellCenter>
      <TableCellCenter className="font-bold w-16 border-r">
        <span className="inline-block">キル</span>
        <span className="inline-block">ポイ</span>
        <span className="inline-block">ント</span>
      </TableCellCenter>

      <TableCellCenter className="font-bold w-16">
        <span className="inline-block">ポイ</span>
        <span className="inline-block">ント</span>
      </TableCellCenter>
      <TableCellCenter className="font-bold w-16">順位</TableCellCenter>
      <TableCellCenter className="font-bold w-16 border-r">
        <span className="inline-block">キル</span>
        <span className="inline-block">ポイ</span>
        <span className="inline-block">ント</span>
      </TableCellCenter>

      {[...new Array(numberOfMatches)].flatMap((_, i) => [
        <TableCellCenter className="font-bold w-16" key={3 * i}>
          <span className="inline-block">ポイ</span>
          <span className="inline-block">ント</span>
        </TableCellCenter>,
        <TableCellCenter className="font-bold w-16" key={3 * i + 1}>
          順位
        </TableCellCenter>,
        <TableCellCenter className="font-bold w-16 border-r last:border-r-0" key={3 * i + 2}>
          <span className="inline-block">キル</span>
          <span className="inline-block">ポイ</span>
          <span className="inline-block">ント</span>
        </TableCellCenter>,
      ])}
    </TableRow>
  );
});

const TeamResultRow: React.VFC<{ team: TeamStats; index: number; numberOfMatches: number }> = (props) => {
  const team = props.team;
  return (
    <TableRow hover key={props.index}>
      <TableCellRight className="border-r">{props.index + 1}</TableCellRight>

      <TableCellRight className="whitespace-nowrap">{team.tag}</TableCellRight>
      <Tooltip
        title={
          <ul className="list-none">
            {team.members.map((m, i) => (
              <li className="inline  after:content-['_/_'] last:after:content-none" key={i}>
                {m}
              </li>
            ))}
          </ul>
        }
      >
        <TableCellLeft className="whitespace-nowrap border-r">{team.name}</TableCellLeft>
      </Tooltip>

      <TableCellRight>
        <span className="font-bold">{team.total.point}</span>
      </TableCellRight>
      <TableCellRight>{team.total.placementPoint}</TableCellRight>
      <Tooltip title={`${team.total.kill}キル`}>
        <TableCellRight className="border-r">
          {team.total.kill !== team.total.killPoint ? (
            <span className="italic">{team.total.killPoint}</span>
          ) : (
            team.total.killPoint
          )}
        </TableCellRight>
      </Tooltip>

      <TableCellRight>{team.average.point.toFixed(1)}</TableCellRight>
      <Tooltip title={`${team.average.placementPoint.toFixed(1)}ポイント`}>
        <TableCellRight>{team.average.placement?.toFixed(1) ?? ''}</TableCellRight>
      </Tooltip>
      <Tooltip title={`${(team.average.kill ?? 0).toFixed(1)}キル`}>
        <TableCellRight className="border-r">
          <span className={team.average.kill !== team.average.killPoint ? 'italic' : ''}>
            {team.average.killPoint.toFixed(1)}
          </span>
        </TableCellRight>
      </Tooltip>

      {team.matches.flatMap((match, j) => {
        if (match.placement || match.kill) {
          return [
            <TableCellRight key={`${team.name}_${j}_point`}>{match.point}</TableCellRight>,
            <Tooltip key={`${props.index}_${j}_placement`} title={`${match.placementPoint}ポイント`}>
              <TableCellRight sx={{ backgroundColor: getPlacementColor(match.placement) }}>
                {match.placement}
              </TableCellRight>
            </Tooltip>,
            <Tooltip title={`${match.kill ?? 0}キル`} key={`${props.index}_${j}_kill`}>
              <TableCellRight className="border-r last:border-r-0">{match.killPoint}</TableCellRight>
            </Tooltip>,
          ];
        } else {
          return [
            <TableCellRight key={`${team.name}_${j}_point`}></TableCellRight>,
            <TableCellRight key={`${props.index}_${j}_placement`}></TableCellRight>,
            <TableCellRight key={`${props.index}_${j}_kill`} className="border-r last:border-r-0"></TableCellRight>,
          ];
        }
      })}
    </TableRow>
  );
};

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props {
  teams: TeamStats[];
  numberOfMatches: number;
}

const TeamStatsTable: React.VFC<Props> = ({ teams, numberOfMatches }) => {
  return (
    <TableContainer>
      <Table size="small" className="border-collapse w-auto">
        <TableHead className="bg-gray-50 text-center border-t">
          <HeadRow1 numberOfMatches={numberOfMatches} />
          <HeadRow2 numberOfMatches={numberOfMatches} />
        </TableHead>

        <TableBody>
          {teams.map((team, i) => (
            <TeamResultRow team={team} index={i} numberOfMatches={numberOfMatches} key={i} />
          ))}
        </TableBody>

        <TableHead className="bg-gray-50 text-center border-b">
          <HeadRow2 numberOfMatches={numberOfMatches} />
          <HeadRow1 numberOfMatches={numberOfMatches} />
        </TableHead>
      </Table>
    </TableContainer>
  );
};

export default TeamStatsTable;
