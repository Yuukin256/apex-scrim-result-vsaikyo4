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
import type { SortOption } from 'hooks/usePlayerStatsHook';

export interface PlayerStatsOptionFormProps {
  defaultNumberOfMatches: number;
  sortKey: string;
  setSortKey: Dispatch<SetStateAction<string>>;
  sortOptions: SortOption[];
  includeAdditionalMatch: boolean;
  setIncludeAdditionalMatch: Dispatch<SetStateAction<boolean>>;
}

const PlayerStatsOptionForm = memo<PlayerStatsOptionFormProps>(function PlayerStatsOptionForm({
  defaultNumberOfMatches,
  sortKey,
  setSortKey,
  sortOptions: options,
  includeAdditionalMatch,
  setIncludeAdditionalMatch,
}) {
  const handleSort = (event: SelectChangeEvent) => {
    setSortKey(event.target.value);
  };

  const handleIncludeAdditionalMatch: FormControlLabelProps['onChange'] = (_, checked) =>
    setIncludeAdditionalMatch(checked);

  return (
    <Stack
      m={2}
      ml={4}
      direction={{ xs: 'column', sm: 'row' }}
      spacing={{ xs: 0, sm: 2, md: 4 }}
      divider={<Divider orientation='vertical' flexItem />}
    >
      <Box>
        <FormControlLabel
          onChange={handleIncludeAdditionalMatch}
          control={<Checkbox color='primary' checked={includeAdditionalMatch} />}
          label={`${defaultNumberOfMatches + 1}試合目以降を含める`}
        />
      </Box>

      <Box width='16rem'>
        <FormControl fullWidth variant='filled'>
          <InputLabel>並べ替え</InputLabel>
          <Select value={sortKey} onChange={handleSort} label='並べ替え'>
            {options.map((v, i) => (
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

export default PlayerStatsOptionForm;
