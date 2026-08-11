import { useEffect } from 'react';

import { useDebounce } from './useDebounce';
import { useAppDispatch } from '@store/hooks';
import { fetchRestaurantsThunk } from '@features/restaurant/restaurantThunk';
import { useSearchParams } from 'react-router-dom';

export const useSearchRestaurants = () => {
    const dispatch = useAppDispatch();
    const [searchParams] = useSearchParams();

    const keyword = searchParams.get('restaurant') ?? '';

    const debouncedKeyword = useDebounce(keyword);

    useEffect(() => {
        dispatch(
            fetchRestaurantsThunk({
                keyword: debouncedKeyword,
            }),
        );
    }, [debouncedKeyword, dispatch]);
};
