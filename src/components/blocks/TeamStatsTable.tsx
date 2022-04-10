import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Fragment, memo } from 'react';
import TableCellCenter from 'components/atoms/TableCellCenter';
import TableCellLeft from 'components/atoms/TableCellLeft';
import TableCellRight from 'components/atoms/TableCellRight';
import Tooltip from 'components/atoms/Tooltip';
import { TeamStats, BaseTeamStats } from 'hooks/useTeamStatsHook';

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
      <TableCellCenter colSpan={3} className='font-bold border-x' />
      <TableCellCenter colSpan={3} className='font-bold border-r'>
        合計
      </TableCellCenter>
      <TableCellCenter colSpan={3} className='font-bold border-r'>
        平均
      </TableCellCenter>
      {[...new Array(numberOfMatches)].map((_, i) => (
        <TableCellCenter className='font-bold border-r' colSpan={3} key={i + 1}>
          {i + 1}試合目
        </TableCellCenter>
      ))}
    </TableRow>
  );
});

const HeadRow2 = memo<{ numberOfMatches: number }>(function HeadRow2({ numberOfMatches }) {
  return (
    <TableRow>
      <TableCellCenter className='font-bold w-8 border-x'>#</TableCellCenter>
      <TableCellCenter className='font-bold w-80 border-r' colSpan={2}>
        チーム
      </TableCellCenter>

      <TableCellCenter className='font-bold w-16'>
        <span className='inline-block'>ポイ</span>
        <span className='inline-block'>ント</span>
      </TableCellCenter>
      <TableCellCenter className='font-bold w-16'>
        <span className='inline-block'>順位</span>
        <span className='inline-block'>ポイ</span>
        <span className='inline-block'>ント</span>
      </TableCellCenter>
      <TableCellCenter className='font-bold w-16 border-r'>
        <span className='inline-block'>キル</span>
        <span className='inline-block'>ポイ</span>
        <span className='inline-block'>ント</span>
      </TableCellCenter>

      <TableCellCenter className='font-bold w-16'>
        <span className='inline-block'>ポイ</span>
        <span className='inline-block'>ント</span>
      </TableCellCenter>
      <TableCellCenter className='font-bold w-16'>順位</TableCellCenter>
      <TableCellCenter className='font-bold w-16 border-r'>
        <span className='inline-block'>キル</span>
        <span className='inline-block'>ポイ</span>
        <span className='inline-block'>ント</span>
      </TableCellCenter>

      {[...new Array(numberOfMatches)].map((_, i) => (
        <Fragment key={i}>
          <TableCellCenter className='font-bold w-16'>
            <span className='inline-block'>ポイ</span>
            <span className='inline-block'>ント</span>
          </TableCellCenter>
          <TableCellCenter className='font-bold w-16'>順位</TableCellCenter>
          <TableCellCenter className='font-bold w-16 border-r'>
            <span className='inline-block'>キル</span>
            <span className='inline-block'>ポイ</span>
            <span className='inline-block'>ント</span>
          </TableCellCenter>
        </Fragment>
      ))}
    </TableRow>
  );
});

interface Props {
  teams: TeamStats[];
  numberOfMatches: number;
  enableMaxKill: boolean;
}

const TeamStatsTable: React.VFC<Props> = ({ teams, numberOfMatches, enableMaxKill }) => {
  const TotalStatsCells = memo<BaseTeamStats>(function TotalStatsCells(props) {
    const isDifferentKillPointFromKill = enableMaxKill && props.kill !== props.killPoint;
    if (props.placement && props.kill) {
      return (
        <>
          <TableCellRight>{props.point}</TableCellRight>
          <TableCellRight>{props.placementPoint}</TableCellRight>
          <Tooltip title={`${props.kill}キル`}>
            <TableCellRight className={isDifferentKillPointFromKill ? 'italic border-r' : 'border-r'}>
              {props.killPoint}
            </TableCellRight>
          </Tooltip>
        </>
      );
    } else {
      return (
        <>
          <TableCellRight></TableCellRight>
          <TableCellRight></TableCellRight>
          <TableCellRight className='border-r'></TableCellRight>
        </>
      );
    }
  });

  const AverageStatsCells = memo<BaseTeamStats>(function TotalStatsCells(props) {
    const isDifferentKillPointFromKill = enableMaxKill && props.kill !== props.killPoint;
    if (props.placement && props.kill) {
      return (
        <>
          <TableCellRight>{props.point.toFixed(1)}</TableCellRight>
          <TableCellRight>{props.placementPoint.toFixed(1)}</TableCellRight>
          <Tooltip title={`${props.kill.toFixed(1)}キル`}>
            <TableCellRight className={isDifferentKillPointFromKill ? 'italic border-r' : 'border-r'}>
              {props.killPoint.toFixed(1)}
            </TableCellRight>
          </Tooltip>
        </>
      );
    } else {
      return (
        <>
          <TableCellRight></TableCellRight>
          <TableCellRight></TableCellRight>
          <TableCellRight className='border-r'></TableCellRight>
        </>
      );
    }
  });

  const MatchStatsCells = memo<BaseTeamStats>(function MatchStatsCells(props) {
    if (props.placement && props.kill) {
      const isDifferentKillPointFromKill = enableMaxKill && props.kill !== props.killPoint;
      return (
        <>
          <TableCellRight>{props.point}</TableCellRight>
          <Tooltip title={`${props.placementPoint}ポイント`}>
            <TableCellRight sx={{ backgroundColor: getPlacementColor(props.placement) }}>
              {props.placement}
            </TableCellRight>
          </Tooltip>
          <Tooltip title={`${props.kill}キル`}>
            <TableCellRight className={isDifferentKillPointFromKill ? 'italic border-r' : 'border-r'}>
              {props.killPoint}
            </TableCellRight>
          </Tooltip>
        </>
      );
    } else {
      return (
        <>
          <TableCellRight></TableCellRight>
          <TableCellRight></TableCellRight>
          <TableCellRight className='border-r'></TableCellRight>
        </>
      );
    }
  });

  return (
    <TableContainer>
      <Table size='small' className='border-collapse w-auto'>
        <TableHead className='bg-gray-50 text-center border-t'>
          <HeadRow1 numberOfMatches={numberOfMatches} />
          <HeadRow2 numberOfMatches={numberOfMatches} />
        </TableHead>

        <TableBody>
          {teams.map((team, index) => (
            <TableRow hover key={team.id}>
              <TableCellRight className='border-x'>{index + 1}</TableCellRight>

              <TableCellRight className='whitespace-nowrap'>{team.tag}</TableCellRight>
              <Tooltip title={team.members.join(' / ')}>
                <TableCellLeft className='whitespace-nowrap border-r'>{team.name}</TableCellLeft>
              </Tooltip>

              <TotalStatsCells {...team.total} />

              <AverageStatsCells {...team.average} />

              {team.matches.map((match, i) => (
                <MatchStatsCells {...match} key={i} />
              ))}
            </TableRow>
          ))}
        </TableBody>

        <TableHead className='bg-gray-50 text-center border-b'>
          <HeadRow2 numberOfMatches={numberOfMatches} />
          <HeadRow1 numberOfMatches={numberOfMatches} />
        </TableHead>
      </Table>
    </TableContainer>
  );
};

export default TeamStatsTable;
