import { InferType } from 'yup';

import { restaurantSchema } from '@validations/restaurant.validation';

export type EditRestaurantFormValues = InferType<typeof restaurantSchema>;
