import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Fragment, memo, VFC } from 'react';
import InlineBlockSpan from 'components/atoms/InlineBlockSpan';
import Tooltip from 'components/atoms/Tooltip';
import type { PlayerStats } from 'hooks/usePlayerStatsHook';

interface Props {
  players: PlayerStats[];
  numberOfMatches: number;
}

const PlayerStatsTable: VFC<Props> = ({ players, numberOfMatches }) => {
  const HeadRow1 = memo<{ numberOfMatches: number }>(function HeadRow1({ numberOfMatches }) {
    return (
      <TableRow>
        <TableCell align='center' colSpan={2} sx={{ borderRightWidth: '1px', borderLeftWidth: '1px' }}></TableCell>
        <TableCell align='center' colSpan={2} sx={{ borderRightWidth: '1px' }}>
          合計
        </TableCell>
        <TableCell align='center' colSpan={2} sx={{ borderRightWidth: '1px' }}>
          平均
        </TableCell>
        {[...new Array(numberOfMatches)].map((_, i) => (
          <TableCell align='center' colSpan={2} key={i + 1} sx={{ borderRightWidth: '1px' }}>
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
        <TableCell align='center' sx={{ width: '8rem', borderRightWidth: '1px' }}>
          選手名
        </TableCell>
        {[...new Array(numberOfMatches + 2)].flatMap((_, i) => [
          <TableCell align='center' sx={{ width: '4rem' }} key={2 * i}>
            キル
          </TableCell>,
          <TableCell align='center' sx={{ width: '5rem', borderRightWidth: '1px' }} key={2 * i + 1}>
            <InlineBlockSpan>ダメ</InlineBlockSpan>
            <InlineBlockSpan>ージ</InlineBlockSpan>
          </TableCell>,
        ])}
      </TableRow>
    );
  });

  return (
    <TableContainer>
      <Table size='small' sx={{ width: 'auto', borderCollapse: 'collapse' }}>
        <TableHead>
          <HeadRow1 numberOfMatches={numberOfMatches} />
          <HeadRow2 numberOfMatches={numberOfMatches} />
        </TableHead>

        <TableBody>
          {players.map((player, i) => (
            <TableRow hover key={player.id}>
              <TableCell align='right' sx={{ borderRightWidth: '1px', borderLeftWidth: '1px' }}>
                {i + 1}
              </TableCell>

              <Tooltip title={player.team}>
                <TableCell align='left' sx={{ borderRightWidth: '1px', whiteSpace: 'nowrap' }}>
                  {player.name}
                </TableCell>
              </Tooltip>

              <TableCell align='right'>{player.total.kill}</TableCell>
              <TableCell align='right' sx={{ borderRightWidth: '1px' }}>
                {player.total.damage}
              </TableCell>

              <TableCell align='right'>{player.average.kill?.toFixed(1) ?? ''}</TableCell>
              <TableCell align='right' sx={{ borderRightWidth: '1px' }}>
                {player.average.damage?.toFixed(1) ?? ''}
              </TableCell>

              {player.matches.map((match, j) => (
                <Fragment key={j}>
                  <TableCell align='right'>{match.kill}</TableCell>
                  <TableCell align='right' sx={{ borderRightWidth: '1px' }}>
                    {match.damage}
                  </TableCell>
                </Fragment>
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

export default PlayerStatsTable;
