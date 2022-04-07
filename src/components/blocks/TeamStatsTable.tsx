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

      {[...new Array(numberOfMatches)].map((_, i) => (
        <>
          <TableCellCenter className="font-bold w-16" key={`${i}_point`}>
            <span className="inline-block">ポイ</span>
            <span className="inline-block">ント</span>
          </TableCellCenter>
          <TableCellCenter className="font-bold w-16" key={`${i}_placement`}>
            順位
          </TableCellCenter>
          <TableCellCenter className="font-bold w-16 border-r last:border-r-0" key={`${i}_killPoint`}>
            <span className="inline-block">キル</span>
            <span className="inline-block">ポイ</span>
            <span className="inline-block">ント</span>
          </TableCellCenter>
        </>
      ))}
    </TableRow>
  );
});

const TeamResultRow = memo<{ team: TeamStats; index: number }>(function TeamResultRow({ team, index }) {
  return (
    <TableRow hover>
      <TableCellRight className="border-r">{index + 1}</TableCellRight>

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

      {team.matches.map((match, i) => {
        if (match.placement || match.kill) {
          return (
            <>
              <TableCellRight key={`${i}_point`}>{match.point}</TableCellRight>
              <Tooltip title={`${match.placementPoint}ポイント`} key={`${i}_placement`}>
                <TableCellRight sx={{ backgroundColor: getPlacementColor(match.placement) }}>
                  {match.placement}
                </TableCellRight>
              </Tooltip>
              <Tooltip title={`${match.kill ?? 0}キル`} key={`${i}_kill`}>
                <TableCellRight className="border-r last:border-r-0">{match.killPoint}</TableCellRight>
              </Tooltip>
            </>
          );
        } else {
          return (
            <>
              <TableCellRight key={`${i}_point`}></TableCellRight>
              <TableCellRight key={`${i}_placement`}></TableCellRight>
              <TableCellRight className="border-r last:border-r-0" key={`${i}_kill`}></TableCellRight>
            </>
          );
        }
      })}
    </TableRow>
  );
});

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
            <TeamResultRow team={team} index={i} key={team.id} />
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
