import { CustomListItem } from './List.styles';
import { ListProps } from './List.types';
import { List as MuiList } from '@mui/material';

export const List = <T,>(props: ListProps<T>) => {
    return (
        <MuiList>
            {props.items.map((item, index) => (
                <CustomListItem key={index}>
                    {props.renderItem(item)}
                </CustomListItem>
            ))}
        </MuiList>
    );
};
