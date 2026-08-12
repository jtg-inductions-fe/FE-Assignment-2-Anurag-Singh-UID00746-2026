import SearchIcon from '@mui/icons-material/Search';

import { Search, SearchIconWrapper, StyledInputBase } from './SearchBar.styles';
import type { SearchBarProps } from './SearchBar.types';

export const SearchBar = (props: SearchBarProps) => (
    <Search>
        <StyledInputBase
            placeholder={props.placeholder}
            value={props.value}
            onChange={(e) => props.onChange(e.target.value)}
            inputProps={{ 'aria-label': 'search' }}
        />
        <SearchIconWrapper>
            <SearchIcon color="primary" fontSize="small" />
        </SearchIconWrapper>
    </Search>
);
