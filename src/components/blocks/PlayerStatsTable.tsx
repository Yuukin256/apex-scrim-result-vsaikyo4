import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Fragment, memo, VFC } from 'react';
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
        <TableCell align='center' className='font-bold border-x' colSpan={2}></TableCell>
        <TableCell align='center' className='font-bold border-r' colSpan={2}>
          合計
        </TableCell>
        <TableCell align='center' className='font-bold border-r' colSpan={2}>
          平均
        </TableCell>
        {[...new Array(numberOfMatches)].map((_, i) => (
          <TableCell align='center' className='font-bold border-r' colSpan={2} key={i + 1}>
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
        <TableCell align='center' className='font-bold w-48 border-r'>
          選手名
        </TableCell>
        {[...new Array(numberOfMatches + 2)].flatMap((_, i) => [
          <TableCell align='center' className='font-bold w-16' key={2 * i}>
            キル
          </TableCell>,
          <TableCell align='center' className='font-bold w-20 border-r' key={2 * i + 1}>
            <span className='inline-block'>ダメ</span>
            <span className='inline-block'>ージ</span>
          </TableCell>,
        ])}
      </TableRow>
    );
  });

  return (
    <TableContainer>
      <Table size='small' className='border-collapse w-auto'>
        <TableHead className='bg-gray-50 text-center border-t'>
          <HeadRow1 numberOfMatches={numberOfMatches} />
          <HeadRow2 numberOfMatches={numberOfMatches} />
        </TableHead>

        <TableBody>
          {players.map((player, i) => (
            <TableRow hover key={player.id}>
              <TableCell align='right' className='border-x'>
                {i + 1}
              </TableCell>

              <Tooltip title={player.team}>
                <TableCell align='left' className='whitespace-nowrap border-r'>
                  {player.name}
                </TableCell>
              </Tooltip>

              <TableCell align='right'>{player.total.kill}</TableCell>
              <TableCell align='right' className='border-r'>
                {player.total.damage}
              </TableCell>

              <TableCell align='right'>{player.average.kill?.toFixed(1) ?? ''}</TableCell>
              <TableCell align='right' className='border-r'>
                {player.average.damage?.toFixed(1) ?? ''}
              </TableCell>

              {player.matches.map((match, j) => (
                <Fragment key={j}>
                  <TableCell align='right'>{match.kill}</TableCell>
                  <TableCell align='right' className='border-r'>
                    {match.damage}
                  </TableCell>
                </Fragment>
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

export default PlayerStatsTable;
