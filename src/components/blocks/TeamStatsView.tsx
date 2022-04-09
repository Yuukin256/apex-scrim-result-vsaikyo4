import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import { VFC } from 'react';
import TeamStatsOptionForm from './TeamStatsOptionForm';
import TeamStatsTable from './TeamStatsTable';
import { useTeamStats } from 'hooks/useTeamStatsHook';
import type { TeamResultCollection } from 'utils/resultData';

interface Props {
  result: TeamResultCollection;
  defaultNumberOfMatches: number;
}

const TeamStatsView: VFC<Props> = (props) => {
  const { stats, numberOfMatches, forForm } = useTeamStats(props);
  return (
    <>
      <Typography variant='h3' mb={2}>
        チーム成績
      </Typography>

      <Accordion square defaultExpanded>
        <AccordionSummary className='bg-orange-100' expandIcon={<ExpandMoreIcon />}>
          <Typography variant='h5' component='div'>
            表の注意事項
          </Typography>
        </AccordionSummary>
        <AccordionDetails className='bg-orange-50'>
          <ul className='list-disc list-inside ml-4'>
            <li>
              本番は全5試合のうち、{/* 1試合目3ポイント、2,3試合目6ポイントの*/}
              キルポイント上限があります。練習カスタムでは全チームが各マッチのキルポイント上限を意識して動いているわけではないため、キルポイント上限の有無を切り替えて結果を見られるようにしています。
            </li>
            <li>{props.defaultNumberOfMatches + 1}試合目以降の延長戦はキルポイント上限無しとして集計しています。</li>
            <li>
              キルポイント上限を適用しているときに「キルポイント」の項目が<span className='italic'>斜体</span>
              で表示されているものは上限を超えていることを意味します。ホバー (タップ)
              すると、上限適用前のキル数が出ます。
            </li>
            <li>
              「順位」の項目は、ホバー (タップ) すると順位ポイントが出ます (「平均順位」の場合は平均の順位ポイント)。
            </li>
            <li>
              タイブレークの処理は「合計ポイント」での並べ替えた場合のみ公式ルールに準拠しています。それ以外の場合、タイブレーク処理は適当です。なお、現時点で公式ルールが公開されていないため、Season
              3 のルールを参照しています。
            </li>
          </ul>
        </AccordionDetails>
      </Accordion>

      <TeamStatsOptionForm {...forForm}></TeamStatsOptionForm>
      <TeamStatsTable teams={stats} numberOfMatches={numberOfMatches} />
    </>
  );
};

export default TeamStatsView;
