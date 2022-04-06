import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import { VFC } from 'react';
import { useTeamStats } from '../../hooks/useTeamStatsHook';
import type { TeamResultCollection } from '../../utils/resultData';
import TeamStatsOptionForm from './TeamStatsOptionForm';
import TeamStatsTable from './TeamStatsTable';

interface Props {
  result: TeamResultCollection;
  defaultNumberOfMatches: number;
}

const TeamStatsView: VFC<Props> = (props) => {
  const { stats, numberOfMatches, forForm } = useTeamStats(props);
  return (
    <>
      <Typography variant="h3" mb={2}>
        チーム成績
      </Typography>

      <Accordion square defaultExpanded>
        <AccordionSummary className="bg-orange-100" expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h5" component="div">表の注意事項</Typography>
        </AccordionSummary>
        <AccordionDetails className="bg-orange-50">
          <ul className="list-disc list-inside ml-4">
            {/* <li>
            本番は全5試合のうち、1試合目3ポイント、2,3試合目6ポイントのキルポイント上限があります。練習カスタムでは全チームが各マッチのキルポイント上限を意識して動いているわけではないため、キルポイント上限の有無を切り替えて結果を見られるようにしています。
            </li>
            <li>各日6試合目以降の延長戦はキルポイント上限無しとして集計しています。</li> */}
            <li>
              キルポイント上限を適用しているときに「キルポイント」の項目が<em>斜体</em>
              で表示されているものは上限を超えていることを意味します。ホバー (タップ)
              すると、上限適用前のキル数が出ます。
            </li>
            <li>「平均順位」の項目は、ホバー (タップ) すると平均の順位ポイントが出ます。</li>
            <li>各試合の「順位」の項目は、ホバー (タップ) すると順位ポイントが出ます。</li>
          </ul>
        </AccordionDetails>
      </Accordion>

      <TeamStatsOptionForm {...forForm}></TeamStatsOptionForm>
      <TeamStatsTable teams={stats} numberOfMatches={numberOfMatches} />
    </>
  );
};

export default TeamStatsView;
