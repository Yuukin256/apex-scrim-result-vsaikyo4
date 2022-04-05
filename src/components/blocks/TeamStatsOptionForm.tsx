import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import FormControlLabel, { FormControlLabelProps } from '@mui/material/FormControlLabel';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import { Dispatch, SetStateAction, memo } from 'react';
import type { SortOption } from '../../hooks/useTeamStatsHook';

export interface TeamStatsOptionFormProps {
  sortKey: string;
  setSortKey: Dispatch<SetStateAction<string>>;
  sortOptions: SortOption[];
  enableMaxKill: boolean;
  setEnableMaxKill: Dispatch<SetStateAction<boolean>>;
  includeAdditionalMatch: boolean;
  setIncludeAdditionalMatch: Dispatch<SetStateAction<boolean>>;
  defaultNumberOfMatches: number;
}

const TeamStatsOptionForm = memo<TeamStatsOptionFormProps>(function TeamStatsOptionForm(props) {

  const handleSort = (event: SelectChangeEvent) => props.setSortKey(event.target.value);

  const handleMaxKill: FormControlLabelProps['onChange'] = (_, checked) => props.setEnableMaxKill(checked);

  const handleIncludeAdditionalMatch: FormControlLabelProps['onChange'] = (_, checked) =>
    props.setIncludeAdditionalMatch(checked);

  return (
    <Stack
      className="m-6"
      direction={{ xs: 'column', sm: 'row' }}
      spacing={{ xs: 0, sm: 2, md: 4 }}
      divider={<Divider orientation="vertical" flexItem />}
    >
      <Box>
        <FormControlLabel
          className="ml-0"
          onChange={handleMaxKill}
          control={<Checkbox color="primary" checked={props.enableMaxKill} />}
          label="キルポイント上限を適用する"
        />
      </Box>

      <Box>
        <FormControlLabel
          className="ml-0"
          onChange={handleIncludeAdditionalMatch}
          control={<Checkbox color="primary" checked={props.includeAdditionalMatch} />}
          label={`${props.defaultNumberOfMatches + 1}試合目以降を含める`}
        />
      </Box>

      <Box sx={{ width: '16rem' }}>
        <FormControl fullWidth variant="filled">
          <InputLabel>並べ替え</InputLabel>
          <Select value={props.sortKey} onChange={handleSort} label="並べ替え">
            {props.sortOptions.map((v, i) => (
              <MenuItem value={v.value} key={i}>
                {v.text}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </Stack>
  );
});

export default TeamStatsOptionForm;
