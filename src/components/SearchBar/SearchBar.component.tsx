import SearchIcon from '@mui/icons-material/Search';

import { Search, SearchIconWrapper, StyledInputBase } from './SearchBar.styles';
import type { SearchBarProps } from './SearchBar.types';

const SearchBar = ({ placeholder }: SearchBarProps) => (
    <Search>
        <StyledInputBase
            placeholder={placeholder}
            inputProps={{ 'aria-label': 'search' }}
        />
        <SearchIconWrapper>
            <SearchIcon color="primary" fontSize="small" />
        </SearchIconWrapper>
    </Search>
);

export default SearchBar;
