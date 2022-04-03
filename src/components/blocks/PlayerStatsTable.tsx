import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Tooltip from '@mui/material/Tooltip';
import type { VFC } from 'react';
import type { PlayerStats } from '../../hooks/usePlayerStatsHook';
import TableCellCenter from '../atoms/TableCellCenter';
import TableCellRight from '../atoms/TableCellRight';

interface Props {
  players: PlayerStats[];
  numberOfMatches: number;
}

const PlayerStatsTable: VFC<Props> = ({ players, numberOfMatches }) => {
  const HeadRow1: VFC = () => (
    <TableRow>
      <TableCell className="border-r" colSpan={2}></TableCell>
      <TableCellCenter className="border-r" colSpan={2}>
        合計
      </TableCellCenter>
      <TableCellCenter className="border-r" colSpan={2}>
        平均
      </TableCellCenter>
      {[...new Array(numberOfMatches)].map((_, i) => (
        <TableCellCenter className="border-r last:border-r-0" colSpan={2} key={i + 1}>
          {i + 1}試合目
        </TableCellCenter>
      ))}
    </TableRow>
  );

  const HeadRow2: VFC = () => (
    <TableRow>
      <TableCellCenter className="font-bold w-16 border-r">順位</TableCellCenter>
      <TableCellCenter className="font-bold w-48 border-r">選手名</TableCellCenter>
      {[...new Array(numberOfMatches + 2)].flatMap((_, i) => [
        <TableCellCenter className="w-24" key={2 * i}>
          キル
        </TableCellCenter>,
        <TableCellCenter className="w-24 border-r last:border-r-0" key={2 * i + 1}>
          ダメージ
        </TableCellCenter>,
      ])}
    </TableRow>
  );

  return (
    <TableContainer>
      <Table size="small" className="border-collapse w-auto">
        <TableHead className="bg-gray-50 text-center border-t">
          <HeadRow1 />
          <HeadRow2 />
        </TableHead>

        <TableBody>
          {players.map((player, i) => (
            <TableRow hover key={i}>
              <TableCellRight className="border-r">{i + 1}</TableCellRight>

              <Tooltip title={player.team}>
                <TableCell className="border-r">{player.name}</TableCell>
              </Tooltip>

              <TableCellRight>{player.total.kill}</TableCellRight>

              <TableCellRight className="border-r">{player.total.damage}</TableCellRight>

              <TableCellRight>{player.average.kill}</TableCellRight>

              <TableCellRight className="border-r">{player.average.damage}</TableCellRight>

              {player.matches.flatMap((match, j) => [
                <TableCell key={2 * j}>{match.kill}</TableCell>,
                <TableCell className="border-r last:border-r-0" key={2 * j + 1}>
                  {match.damage}
                </TableCell>,
              ])}
            </TableRow>
          ))}
        </TableBody>

        <TableHead className="bg-gray-50 text-center border-b">
          <HeadRow2 />
          <HeadRow1 />
        </TableHead>
      </Table>
    </TableContainer>
  );
};

export default PlayerStatsTable;
