import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { SxProps } from '@mui/material/styles';
import { Fragment, memo } from 'react';
import InlineBlockSpan from 'components/atoms/InlineBlockSpan';
import Tooltip from 'components/atoms/Tooltip';
import { TeamStats, BaseTeamStats } from 'hooks/useTeamStatsHook';

const getPlacementStyle = (placement: number | null): SxProps => {
  switch (placement) {
    case 1:
      return { backgroundColor: 'rgb(255, 215, 0, 0.5)' };
    case 2:
      return { backgroundColor: 'rgb(192, 192, 192, 0.5)' };
    case 3:
      return { backgroundColor: 'rgb(205, 127, 50, 0.5)' };
    default:
      return {};
  }
};

const HeadRow1 = memo<{ numberOfMatches: number }>(function HeadRow1({ numberOfMatches }) {
  return (
    <TableRow>
      <TableCell align='center' colSpan={3} sx={{ borderRightWidth: '1px', borderLeftWidth: '1px' }} />
      <TableCell align='center' colSpan={3} sx={{ borderRightWidth: '1px' }}>
        合計
      </TableCell>
      <TableCell align='center' colSpan={3} sx={{ borderRightWidth: '1px' }}>
        平均
      </TableCell>
      {[...new Array(numberOfMatches)].map((_, i) => (
        <TableCell align='center' colSpan={3} sx={{ borderRightWidth: '1px' }} key={i + 1}>
          {i + 1}試合目
        </TableCell>
      ))}
    </TableRow>
  );
});

const HeadRow2 = memo<{ numberOfMatches: number }>(function HeadRow2({ numberOfMatches }) {
  return (
    <TableRow>
      <TableCell align='center' sx={{ width: '2rem', borderRightWidth: '1px', borderLeftWidth: '1px' }}>
        #
      </TableCell>
      <TableCell align='center' colSpan={2} sx={{ width: '25rem', borderRightWidth: '1px' }}>
        チーム
      </TableCell>

      <TableCell align='center' sx={{ width: '3.5rem' }}>
        <InlineBlockSpan>ポイ</InlineBlockSpan>
        <InlineBlockSpan>ント</InlineBlockSpan>
      </TableCell>
      <TableCell align='center' sx={{ width: '3.5rem' }}>
        <InlineBlockSpan>順位</InlineBlockSpan>
        <InlineBlockSpan>ポイ</InlineBlockSpan>
        <InlineBlockSpan>ント</InlineBlockSpan>
      </TableCell>
      <TableCell align='center' sx={{ width: '3.5rem', borderRightWidth: '1px' }}>
        <InlineBlockSpan>キル</InlineBlockSpan>
        <InlineBlockSpan>ポイ</InlineBlockSpan>
        <InlineBlockSpan>ント</InlineBlockSpan>
      </TableCell>

      <TableCell align='center' sx={{ width: '3.5rem' }}>
        <InlineBlockSpan>ポイ</InlineBlockSpan>
        <InlineBlockSpan>ント</InlineBlockSpan>
      </TableCell>
      <TableCell align='center' sx={{ width: '3.5rem' }}>
        順位
      </TableCell>
      <TableCell align='center' sx={{ width: '3.5rem', borderRightWidth: '1px' }}>
        <InlineBlockSpan>キル</InlineBlockSpan>
        <InlineBlockSpan>ポイ</InlineBlockSpan>
        <InlineBlockSpan>ント</InlineBlockSpan>
      </TableCell>

      {[...new Array(numberOfMatches)].map((_, i) => (
        <Fragment key={i}>
          <TableCell align='center' sx={{ width: '3.5rem' }}>
            <InlineBlockSpan>ポイ</InlineBlockSpan>
            <InlineBlockSpan>ント</InlineBlockSpan>
          </TableCell>
          <TableCell align='center' sx={{ width: '3.5rem' }}>
            順位
          </TableCell>
          <TableCell align='center' sx={{ width: '3.5rem', borderRightWidth: '1px' }}>
            <InlineBlockSpan>キル</InlineBlockSpan>
            <InlineBlockSpan>ポイ</InlineBlockSpan>
            <InlineBlockSpan>ント</InlineBlockSpan>
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
            <TableCell
              align='right'
              sx={{ borderRightWidth: '1px', fontStyle: isDifferentKillPointFromKill ? 'italic' : null }}
            >
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
          <TableCell align='right' sx={{ borderRightWidth: '1px' }}></TableCell>
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
          <Tooltip title={`${props.placementPoint.toFixed(1)}ポイント`}>
            <TableCell align='right'>{props.placement.toFixed(1)}</TableCell>
          </Tooltip>
          <Tooltip title={`${props.kill.toFixed(1)}キル`}>
            <TableCell
              align='right'
              sx={{ borderRightWidth: '1px', fontStyle: isDifferentKillPointFromKill ? 'italic' : null }}
            >
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
          <TableCell align='right' sx={{ borderRightWidth: '1px' }}></TableCell>
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
            <TableCell align='right' sx={getPlacementStyle(props.placement)}>
              {props.placement}
            </TableCell>
          </Tooltip>
          <Tooltip title={`${props.kill}キル`}>
            <TableCell
              align='right'
              sx={{ borderRightWidth: '1px', fontStyle: isDifferentKillPointFromKill ? 'italic' : null }}
            >
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
          <TableCell align='right' sx={{ borderRightWidth: '1px' }}></TableCell>
        </>
      );
    }
  });

  return (
    <TableContainer>
      <Table size='small' sx={{ width: 'auto', borderCollapse: 'collapse' }}>
        <TableHead>
          <HeadRow1 numberOfMatches={numberOfMatches} />
          <HeadRow2 numberOfMatches={numberOfMatches} />
        </TableHead>

        <TableBody>
          {teams.map((team, index) => (
            <TableRow hover key={team.id}>
              <TableCell align='right' sx={{ borderRightWidth: '1px', borderLeftWidth: '1px' }}>
                {index + 1}
              </TableCell>

              <TableCell align='right'>{team.tag}</TableCell>
              <Tooltip title={team.members.join(' / ')}>
                <TableCell align='left' sx={{ borderRightWidth: '1px', whiteSpace: 'nowrap' }}>
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

        <TableHead>
          <HeadRow2 numberOfMatches={numberOfMatches} />
          <HeadRow1 numberOfMatches={numberOfMatches} />
        </TableHead>
      </Table>
    </TableContainer>
  );
};

export default TeamStatsTable;
