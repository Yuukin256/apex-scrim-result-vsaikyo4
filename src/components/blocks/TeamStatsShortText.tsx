import { useClipboard } from '@mantine/hooks';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { memo } from 'react';
import { TeamStats } from 'hooks/useTeamStatsHook';

interface Props {
  teams: TeamStats[];
  numberOfMatches: number;
  enableMaxKill: boolean;
}

const TeamStatsShortText = memo<Props>(function TeamStatsShortText({ teams, numberOfMatches, enableMaxKill }) {
  const points = teams.map((t) => `${t.tag || t.members[0]} ${t.total.point}`).join('/');
  const text = `【集計 ${numberOfMatches}試合】${points} (キルポ上限${enableMaxKill ? 'あり' : 'なし'})`;

  const clipboard = useClipboard({ timeout: 2000 });

  const handleClick = () => clipboard.copy(text);

  return (
    <Box m={2} width={350}>
      <Button
        variant='contained'
        color={clipboard.copied ? 'success' : 'primary'}
        startIcon={<ContentCopyIcon />}
        onClick={handleClick}
        fullWidth
      >
        {clipboard.copied ? 'コピーしました！' : '総合ポイントのテキストをコピーする'}
      </Button>
    </Box>
  );
});

export default TeamStatsShortText;
