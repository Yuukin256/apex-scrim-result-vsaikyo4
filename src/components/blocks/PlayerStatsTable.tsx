import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Fragment, memo, VFC } from 'react';
import TableCellCenter from 'components/atoms/TableCellCenter';
import TableCellLeft from 'components/atoms/TableCellLeft';
import TableCellRight from 'components/atoms/TableCellRight';
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
        <TableCellCenter className='font-bold border-r' colSpan={2}></TableCellCenter>
        <TableCellCenter className='font-bold border-r' colSpan={2}>
          合計
        </TableCellCenter>
        <TableCellCenter className='font-bold border-r' colSpan={2}>
          平均
        </TableCellCenter>
        {[...new Array(numberOfMatches)].map((_, i) => (
          <TableCellCenter className='font-bold border-r last:border-r-0' colSpan={2} key={i + 1}>
            {i + 1}試合目
          </TableCellCenter>
        ))}
      </TableRow>
    );
  });

  const HeadRow2 = memo<{ numberOfMatches: number }>(function HeadRow2({ numberOfMatches }) {
    return (
      <TableRow>
        <TableCellCenter className='font-bold w-8 border-r'>#</TableCellCenter>
        <TableCellCenter className='font-bold w-48 border-r'>選手名</TableCellCenter>
        {[...new Array(numberOfMatches + 2)].flatMap((_, i) => [
          <TableCellCenter className='font-bold w-16' key={2 * i}>
            キル
          </TableCellCenter>,
          <TableCellCenter className='font-bold w-20 border-r last:border-r-0' key={2 * i + 1}>
            <span className='inline-block'>ダメ</span>
            <span className='inline-block'>ージ</span>
          </TableCellCenter>,
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
              <TableCellRight className='border-r'>{i + 1}</TableCellRight>

              <Tooltip title={player.team}>
                <TableCellLeft className='whitespace-nowrap border-r'>{player.name}</TableCellLeft>
              </Tooltip>

              <TableCellRight>{player.total.kill}</TableCellRight>
              <TableCellRight className='border-r'>{player.total.damage}</TableCellRight>

              <TableCellRight>{player.average.kill?.toFixed(1) ?? ''}</TableCellRight>
              <TableCellRight className='border-r'>{player.average.damage?.toFixed(1) ?? 0}</TableCellRight>

              {player.matches.map((match, j) => (
                <Fragment key={j}>
                  <TableCellRight>{match.kill}</TableCellRight>
                  <TableCellRight className='border-r last:border-r-0'>{match.damage}</TableCellRight>
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
