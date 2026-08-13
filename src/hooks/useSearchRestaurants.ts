import { useEffect } from 'react';

import { useSearchParams } from 'react-router-dom';

import { fetchRestaurantsThunk } from '@features/restaurant/restaurantThunk';
import { useAppDispatch } from '@store/hooks';

import { useDebounce } from './useDebounce';

/**
 * A hook that reads the search query from the URL and automatically
 * fetches matching restaurants from the backend after the user stops typing.
 */
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
