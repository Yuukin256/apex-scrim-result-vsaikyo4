import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Fragment, memo } from 'react';
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
      <TableCell align='center' colSpan={3} className='font-bold border-x' />
      <TableCell align='center' colSpan={3} className='font-bold border-r'>
        合計
      </TableCell>
      <TableCell align='center' colSpan={3} className='font-bold border-r'>
        平均
      </TableCell>
      {[...new Array(numberOfMatches)].map((_, i) => (
        <TableCell align='center' className='font-bold border-r' colSpan={3} key={i + 1}>
          {i + 1}試合目
        </TableCell>
      ))}
    </TableRow>
  );
});

const HeadRow2 = memo<{ numberOfMatches: number }>(function HeadRow2({ numberOfMatches }) {
  return (
    <TableRow>
      <TableCell align='center' className='font-bold w-8 border-x'>
        #
      </TableCell>
      <TableCell align='center' className='font-bold w-80 border-r' colSpan={2}>
        チーム
      </TableCell>

      <TableCell align='center' className='font-bold w-16'>
        <span className='inline-block'>ポイ</span>
        <span className='inline-block'>ント</span>
      </TableCell>
      <TableCell align='center' className='font-bold w-16'>
        <span className='inline-block'>順位</span>
        <span className='inline-block'>ポイ</span>
        <span className='inline-block'>ント</span>
      </TableCell>
      <TableCell align='center' className='font-bold w-16 border-r'>
        <span className='inline-block'>キル</span>
        <span className='inline-block'>ポイ</span>
        <span className='inline-block'>ント</span>
      </TableCell>

      <TableCell align='center' className='font-bold w-16'>
        <span className='inline-block'>ポイ</span>
        <span className='inline-block'>ント</span>
      </TableCell>
      <TableCell align='center' className='font-bold w-16'>
        順位
      </TableCell>
      <TableCell align='center' className='font-bold w-16 border-r'>
        <span className='inline-block'>キル</span>
        <span className='inline-block'>ポイ</span>
        <span className='inline-block'>ント</span>
      </TableCell>

      {[...new Array(numberOfMatches)].map((_, i) => (
        <Fragment key={i}>
          <TableCell align='center' className='font-bold w-16'>
            <span className='inline-block'>ポイ</span>
            <span className='inline-block'>ント</span>
          </TableCell>
          <TableCell align='center' className='font-bold w-16'>
            順位
          </TableCell>
          <TableCell align='center' className='font-bold w-16 border-r'>
            <span className='inline-block'>キル</span>
            <span className='inline-block'>ポイ</span>
            <span className='inline-block'>ント</span>
          </TableCell>
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
    if (props.placement !== null && props.kill !== null) {
      return (
        <>
          <TableCell align='right'>{props.point}</TableCell>
          <TableCell align='right'>{props.placementPoint}</TableCell>
          <Tooltip title={`${props.kill}キル`}>
            <TableCell align='right' className={isDifferentKillPointFromKill ? 'italic border-r' : 'border-r'}>
              {props.killPoint}
            </TableCell>
          </Tooltip>
        </>
      );
    } else {
      return (
        <>
          <TableCell align='right'></TableCell>
          <TableCell align='right'></TableCell>
          <TableCell align='right' className='border-r'></TableCell>
        </>
      );
    }
  });

  const AverageStatsCells = memo<BaseTeamStats>(function TotalStatsCells(props) {
    const isDifferentKillPointFromKill = enableMaxKill && props.kill !== props.killPoint;
    if (props.placement !== null && props.kill !== null) {
      return (
        <>
          <TableCell align='right'>{props.point.toFixed(1)}</TableCell>
          <TableCell align='right'>{props.placementPoint.toFixed(1)}</TableCell>
          <Tooltip title={`${props.kill.toFixed(1)}キル`}>
            <TableCell align='right' className={isDifferentKillPointFromKill ? 'italic border-r' : 'border-r'}>
              {props.killPoint.toFixed(1)}
            </TableCell>
          </Tooltip>
        </>
      );
    } else {
      return (
        <>
          <TableCell align='right'></TableCell>
          <TableCell align='right'></TableCell>
          <TableCell align='right' className='border-r'></TableCell>
        </>
      );
    }
  });

  const MatchStatsCells = memo<BaseTeamStats>(function MatchStatsCells(props) {
    if (props.placement !== null && props.kill !== null) {
      const isDifferentKillPointFromKill = enableMaxKill && props.kill !== props.killPoint;
      return (
        <>
          <TableCell align='right'>{props.point}</TableCell>
          <Tooltip title={`${props.placementPoint}ポイント`}>
            <TableCell align='right' sx={{ backgroundColor: getPlacementColor(props.placement) }}>
              {props.placement}
            </TableCell>
          </Tooltip>
          <Tooltip title={`${props.kill}キル`}>
            <TableCell align='right' className={isDifferentKillPointFromKill ? 'italic border-r' : 'border-r'}>
              {props.killPoint}
            </TableCell>
          </Tooltip>
        </>
      );
    } else {
      return (
        <>
          <TableCell align='right'></TableCell>
          <TableCell align='right'></TableCell>
          <TableCell align='right' className='border-r'></TableCell>
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
              <TableCell align='right' className='border-x'>
                {index + 1}
              </TableCell>

              <TableCell align='right' className='whitespace-nowrap'>
                {team.tag}
              </TableCell>
              <Tooltip title={team.members.join(' / ')}>
                <TableCell align='left' className='whitespace-nowrap border-r'>
                  {team.name}
                </TableCell>
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
