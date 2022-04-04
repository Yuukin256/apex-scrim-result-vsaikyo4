import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Dispatch, SetStateAction, memo } from 'react';
import type { SortOption } from '../../hooks/usePlayerStatsHook';

interface Props {
  sortKey: string;
  setSortKey: Dispatch<SetStateAction<string>>;
  options: SortOption[];
}

const PlayerStatsOptionForm = memo<Props>(function PlayerStatsOptionForm({ sortKey, setSortKey, options }) {
  const handleChange = (event: SelectChangeEvent) => {
    setSortKey(event.target.value);
  };

  return (
    <Box sx={{ width: '16rem', padding: '1rem' }}>
      <FormControl fullWidth variant="filled">
        <InputLabel>並べ替え</InputLabel>
        <Select value={sortKey} onChange={handleChange} label="並べ替え">
          {options.map((v, i) => (
            <MenuItem value={v.value} key={i}>
              {v.text}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
});

export default PlayerStatsOptionForm;
