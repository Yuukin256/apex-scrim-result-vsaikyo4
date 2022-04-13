import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import GroupsIcon from '@mui/icons-material/Groups';
import PersonIcon from '@mui/icons-material/Person';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import MuiTabPanel from '@mui/lab/TabPanel';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import { useState, VFC } from 'react';
import PlayerStatsOptionForm from './PlayerStatsOptionForm';
import PlayerStatsTable from './PlayerStatsTable';
import TeamStatsOptionForm from './TeamStatsOptionForm';
import TeamStatsShortText from './TeamStatsShortText';
import TeamStatsTable from './TeamStatsTable';
import { usePlayerStats } from 'hooks/usePlayerStatsHook';
import { useTeamStats } from 'hooks/useTeamStatsHook';
import type { PlayerResultCollection, TeamResultCollection } from 'utils/resultData';

interface Props {
  statsTitle: string;
  teamResult: TeamResultCollection;
  playerResult: PlayerResultCollection;
  defaultNumberOfMatches: number;
}

const TabPanel = styled(MuiTabPanel)(({ theme }) => ({
  [theme.breakpoints.up('sm')]: {
    padding: '20px 8px 0',
  },
  [theme.breakpoints.down('sm')]: {
    padding: '20px 0 0',
  },
}));

const StatsView: VFC<Props> = ({ statsTitle, teamResult, playerResult, defaultNumberOfMatches }) => {
  const [tabValue, setTabValue] = useState('1');
  const handleTabChange = (_: unknown, newValue: string) => {
    setTabValue(newValue);
  };

  const teamStats = useTeamStats({
    result: teamResult,
    defaultNumberOfMatches,
  });
  const playerStats = usePlayerStats(playerResult);

  return (
    <>
      <Typography variant='h3' component='h2' mt={4}>
        {statsTitle}
      </Typography>

      <ul>
        <li>マップはすべてWorld&apos;s Edgeです。</li>
      </ul>

      <TabContext value={tabValue}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleTabChange}>
            <Tab icon={<GroupsIcon />} iconPosition='start' label='チーム成績' value='1' />
            <Tab icon={<PersonIcon />} iconPosition='start' label='個人成績' value='2' />
          </TabList>
        </Box>

        <TabPanel value='1'>
          <Accordion square>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant='h5' component='div'>
                注意事項
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <ul>
                <li>
                  本番は全5試合のうち、1試合目6ポイント、2,3試合目9ポイントのキルポイント上限があります。練習カスタムでは全チームが各マッチのキルポイント上限を意識して動いているわけではないため、キルポイント上限の有無を切り替えて結果を見られるようにしています。
                </li>
                <li>{defaultNumberOfMatches + 1}試合目以降の延長戦はキルポイント上限無しとして集計しています。</li>
                <li>
                  キルポイント上限を適用しているときに「キルポイント」の項目が
                  <span style={{ fontStyle: 'italic' }}>斜体</span>
                  で表示されているものは上限を超えていることを意味します。ホバー (タップ)
                  すると、上限適用前のキル数が出ます。
                </li>
                <li>
                  「順位」の項目は、ホバー (タップ) すると順位ポイントが出ます
                  (「平均順位」の場合は平均の順位ポイント)。
                </li>
                <li>
                  「チーム」の項目のチーム名をホバー (タップ) するとチームメンバーが出ます。コーチや助っ人
                  (代理で出場しているプレイヤー) は考慮していません。
                </li>
                <li>
                  タイブレークの処理は「合計ポイント」で並べ替えた場合のみ公式ルールに準拠しています。それ以外の場合のタイブレーク処理は適当です。
                </li>
              </ul>
            </AccordionDetails>
          </Accordion>

          <TeamStatsOptionForm {...teamStats.forForm}></TeamStatsOptionForm>
          <TeamStatsTable
            teams={teamStats.stats}
            numberOfMatches={teamStats.numberOfMatches}
            enableMaxKill={teamStats.forForm.enableMaxKill}
          />
          <TeamStatsShortText
            teams={teamStats.stats}
            numberOfMatches={teamStats.numberOfMatches}
            enableMaxKill={teamStats.forForm.enableMaxKill}
          />
        </TabPanel>

        <TabPanel value='2'>
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
          <PlayerStatsOptionForm {...playerStats.forForm} />
          <PlayerStatsTable players={playerStats.stats} numberOfMatches={playerStats.numberOfMatches} />
        </TabPanel>
      </TabContext>
    </>
  );
};

export default StatsView;
