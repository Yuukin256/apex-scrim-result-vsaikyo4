import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import { memo, useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { TeamStats } from 'hooks/useTeamStatsHook';

interface Props {
  teams: TeamStats[];
  numberOfMatches: number;
  enableMaxKill: boolean;
}

const TeamStatsShortText = memo<Props>(function TeamStatsShortText({ teams, numberOfMatches, enableMaxKill }) {
  const points = teams.map((t) => `${t.tag || t.members[0]}${t.total.point}`).join('/');
  const text = `【集計 ${numberOfMatches}試合】${points} (キルポ上限${enableMaxKill ? 'あり' : 'なし'})`;

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Box m={2}>
        <CopyToClipboard text={text}>
          <Button variant='contained' color='primary' startIcon={<ContentCopyIcon />} onClick={handleOpen}>
            総合ポイントのテキストをコピーする
          </Button>
        </CopyToClipboard>
      </Box>

      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity='success'>
          クリップボードにコピーしました！
        </Alert>
      </Snackbar>
    </>
  );
});

export default TeamStatsShortText;
