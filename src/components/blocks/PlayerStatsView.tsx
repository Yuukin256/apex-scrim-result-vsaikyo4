import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import { VFC } from 'react';
import PlayerStatsOptionForm from './PlayerStatsOptionForm';
import PlayerStatsTable from './PlayerStatsTable';
import { usePlayerStats } from 'hooks/usePlayerStatsHook';
import type { PlayerResultCollection } from 'utils/resultData';

interface Props {
  result: PlayerResultCollection;
}

const PlayerStatsView: VFC<Props> = (props) => {
  const { stats, sortKey, setSortKey, sortOptions, numberOfMatches } = usePlayerStats(props.result);

  return (
    <>
      <Accordion square>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant='h5' component='div'>
            注意事項
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <ul>
            <li>
              助っ人 (代理で出場しているプレイヤー)
              の成績は集計対象外です。本来の選手の成績として扱うこともしていません。
            </li>
            <li>キル数はキルポイント上限無しとして集計しています。</li>
          </ul>
        </AccordionDetails>
      </Accordion>

      <PlayerStatsOptionForm sortKey={sortKey} setSortKey={setSortKey} options={sortOptions} />
      <PlayerStatsTable players={stats} numberOfMatches={numberOfMatches} />
    </>
  );
};

export default PlayerStatsView;
