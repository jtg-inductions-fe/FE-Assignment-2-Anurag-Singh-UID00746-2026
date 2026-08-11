import { FOOD_CATEGORY } from '@constant/index';
import { Restaurant } from '../types/restaurant.types';

export const restaurants: Restaurant[] = [
    {
        id: 'RES-001',
        ownerId: 'FDP-001',

        name: 'Punjab Grill',
        description: 'Authentic North Indian & Mughlai Cuisine',

        image: '/src/assets/images/restaurants/punjab-grill.webp',

        isOpenToday: true,
        category: FOOD_CATEGORY.BOTH,

        address: 'DLF Cyber Hub, Gurugram, Haryana',
        contactNumber: '9876543210',

        operatingDays: {
            monday: true,
            tuesday: true,
            wednesday: true,
            thursday: false,
            friday: true,
            saturday: true,
            sunday: true,
        },

        openingTime: '11:00 AM',
        closingTime: '11:00 PM',

        menuItems: [
            {
                id: 'ITEM-001',
                name: 'Butter Chicken',
                description:
                    'Creamy butter chicken cooked in rich tomato gravy.',
                image: '/images/menu/butter-chicken.webp',
                price: 429,
                isVeg: false,
                inStock: true,
            },
            {
                id: 'ITEM-002',
                name: 'Paneer Butter Masala',
                description: 'Soft paneer cubes in buttery tomato gravy.',
                image: '/images/menu/paneer-butter-masala.webp',
                price: 349,
                isVeg: true,
                inStock: true,
            },
            {
                id: 'ITEM-003',
                name: 'Dal Makhani',
                description: 'Slow-cooked black lentils with butter and cream.',
                image: '/images/menu/dal-makhani.webp',
                price: 299,
                isVeg: true,
                inStock: true,
            },
            {
                id: 'ITEM-004',
                name: 'Chicken Biryani',
                description:
                    'Fragrant basmati rice with tender chicken pieces.',
                image: '/images/menu/chicken-biryani.webp',
                price: 399,
                isVeg: false,
                inStock: true,
            },
            {
                id: 'ITEM-005',
                name: 'Veg Biryani',
                description: 'Aromatic basmati rice with fresh vegetables.',
                image: '/images/menu/veg-biryani.webp',
                price: 319,
                isVeg: true,
                inStock: false,
            },
            {
                id: 'ITEM-006',
                name: 'Garlic Naan',
                description:
                    'Freshly baked naan topped with garlic and butter.',
                image: '/images/menu/garlic-naan.webp',
                price: 89,
                isVeg: true,
                inStock: true,
            },
            {
                id: 'ITEM-007',
                name: 'Tandoori Chicken',
                description:
                    'Chicken marinated in spices and roasted in tandoor.',
                image: '/images/menu/tandoori-chicken.webp',
                price: 469,
                isVeg: false,
                inStock: true,
            },
            {
                id: 'ITEM-008',
                name: 'Gulab Jamun',
                description: 'Soft milk dumplings served in sugar syrup.',
                image: '/images/menu/gulab-jamun.webp',
                price: 129,
                isVeg: true,
                inStock: true,
            },
        ],
    },

    {
        id: 'RES-002',
        ownerId: 'FDP-001',

        name: 'California Burrito',
        description: 'Mexican Burritos, Bowls & Tacos',

        image: '/src/assets/images/restaurants/california-burrito.jpeg',

        isOpenToday: true,
        category: FOOD_CATEGORY.BOTH,

        address: 'Sector 29, Gurugram, Haryana',
        contactNumber: '9876543211',

        operatingDays: {
            monday: true,
            tuesday: true,
            wednesday: true,
            thursday: true,
            friday: true,
            saturday: true,
            sunday: true,
        },

        openingTime: '10:00 AM',
        closingTime: '10:30 PM',

        menuItems: [
            {
                id: 'ITEM-009',
                name: 'Chicken Burrito',
                description:
                    'Grilled chicken wrapped with rice, beans and salsa.',
                image: '/images/menu/chicken-burrito.webp',
                price: 349,
                isVeg: false,
                inStock: true,
            },
            {
                id: 'ITEM-010',
                name: 'Veg Burrito',
                description: 'Fresh vegetables, rice, beans and cheese.',
                image: '/images/menu/veg-burrito.webp',
                price: 299,
                isVeg: true,
                inStock: true,
            },
            {
                id: 'ITEM-011',
                name: 'Paneer Rice Bowl',
                description: 'Mexican rice bowl topped with grilled paneer.',
                image: '/images/menu/paneer-rice-bowl.webp',
                price: 319,
                isVeg: true,
                inStock: true,
            },
            {
                id: 'ITEM-012',
                name: 'Chicken Rice Bowl',
                description:
                    'Rice bowl with grilled chicken and fresh veggies.',
                image: '/images/menu/chicken-rice-bowl.webp',
                price: 369,
                isVeg: false,
                inStock: true,
            },
            {
                id: 'ITEM-013',
                name: 'Veg Tacos',
                description: 'Soft tacos stuffed with fresh vegetables.',
                image: '/images/menu/veg-tacos.webp',
                price: 249,
                isVeg: true,
                inStock: true,
            },
            {
                id: 'ITEM-014',
                name: 'Chicken Tacos',
                description: 'Soft tacos filled with grilled chicken.',
                image: '/images/menu/chicken-tacos.webp',
                price: 289,
                isVeg: false,
                inStock: false,
            },
            {
                id: 'ITEM-015',
                name: 'Nachos with Cheese',
                description: 'Crispy nachos served with melted cheese.',
                image: '/images/menu/nachos.webp',
                price: 199,
                isVeg: true,
                inStock: true,
            },
            {
                id: 'ITEM-016',
                name: 'Churros',
                description:
                    'Classic cinnamon sugar churros with chocolate dip.',
                image: '/images/menu/churros.webp',
                price: 159,
                isVeg: true,
                inStock: true,
            },
        ],
    },

    {
        id: 'RES-003',
        ownerId: 'FDP-001',

        name: 'Biryani Blues',
        description: 'Authentic Hyderabadi Biryani & Kebabs',

        image: '/src/assets/images/restaurants/biryani-blues.webp',

        isOpenToday: true,
        category: FOOD_CATEGORY.BOTH,

        address: 'Golf Course Road, Gurugram, Haryana',
        contactNumber: '9876543212',

        operatingDays: {
            monday: true,
            tuesday: true,
            wednesday: true,
            thursday: true,
            friday: true,
            saturday: true,
            sunday: true,
        },

        openingTime: '11:30 AM',
        closingTime: '11:30 PM',

        menuItems: [
            {
                id: 'ITEM-017',
                name: 'Hyderabadi Chicken Biryani',
                description: 'Traditional dum cooked chicken biryani.',
                image: '/images/menu/hyderabadi-chicken-biryani.webp',
                price: 399,
                isVeg: false,
                inStock: true,
            },
            {
                id: 'ITEM-018',
                name: 'Hyderabadi Veg Biryani',
                description: 'Classic dum biryani with fresh vegetables.',
                image: '/images/menu/hyderabadi-veg-biryani.webp',
                price: 329,
                isVeg: true,
                inStock: true,
            },
            {
                id: 'ITEM-019',
                name: 'Chicken 65',
                description: 'Spicy South Indian chicken starter.',
                image: '/images/menu/chicken-65.webp',
                price: 319,
                isVeg: false,
                inStock: true,
            },
            {
                id: 'ITEM-020',
                name: 'Veg Kebab',
                description: 'Smoky grilled vegetable kebabs.',
                image: '/images/menu/veg-kebab.webp',
                price: 249,
                isVeg: true,
                inStock: false,
            },
        ],
    },

    {
        id: 'RES-004',
        ownerId: 'FDP-001',

        name: 'Burger Singh',
        description: 'Indian Style Burgers & Loaded Fries',

        image: '/src/assets/images/restaurants/burger-singh.webp',

        isOpenToday: true,
        category: FOOD_CATEGORY.BOTH,

        address: 'MG Road, Gurugram, Haryana',
        contactNumber: '9876543213',

        operatingDays: {
            monday: true,
            tuesday: false,
            wednesday: false,
            thursday: true,
            friday: true,
            saturday: true,
            sunday: false,
        },

        openingTime: '10:00 AM',
        closingTime: '10:00 PM',

        menuItems: [
            {
                id: 'ITEM-021',
                name: 'Amritsari Murgh Burger',
                description: 'Crispy chicken burger with Indian spices.',
                image: '/images/menu/amritsari-murgh-burger.webp',
                price: 249,
                isVeg: false,
                inStock: true,
            },
            {
                id: 'ITEM-022',
                name: 'Paneer Burger',
                description: 'Grilled paneer burger with signature sauce.',
                image: '/images/menu/paneer-burger.webp',
                price: 219,
                isVeg: true,
                inStock: true,
            },
            {
                id: 'ITEM-023',
                name: 'Loaded Peri Peri Fries',
                description: 'French fries topped with peri peri seasoning.',
                image: '/images/menu/peri-peri-fries.webp',
                price: 169,
                isVeg: true,
                inStock: true,
            },
            {
                id: 'ITEM-024',
                name: 'Chocolate Shake',
                description: 'Rich and creamy chocolate milkshake.',
                image: '/images/menu/chocolate-shake.webp',
                price: 149,
                isVeg: true,
                inStock: true,
            },
        ],
    },

    {
        id: 'RES-005',
        ownerId: 'FDP-003',

        name: 'Naivedyam',
        description: 'Authentic South Indian Cuisine',

        image: '/src/assets/images/restaurants/naivedyam.webp',

        isOpenToday: true,
        category: FOOD_CATEGORY.VEG,

        address: 'Sector 29, Gurugram, Haryana',
        contactNumber: '9876543214',

        operatingDays: {
            monday: true,
            tuesday: true,
            wednesday: true,
            thursday: true,
            friday: true,
            saturday: true,
            sunday: true,
        },

        openingTime: '08:00 AM',
        closingTime: '10:00 PM',

        menuItems: [
            {
                id: 'ITEM-025',
                name: 'Masala Dosa',
                description: 'Crispy dosa served with potato masala.',
                image: '/images/menu/masala-dosa.webp',
                price: 199,
                isVeg: true,
                inStock: true,
            },
            {
                id: 'ITEM-026',
                name: 'Idli Sambar',
                description: 'Soft idlis served with sambar and chutney.',
                image: '/images/menu/idli-sambar.webp',
                price: 149,
                isVeg: true,
                inStock: true,
            },
            {
                id: 'ITEM-027',
                name: 'Filter Coffee',
                description: 'Traditional South Indian filter coffee.',
                image: '/images/menu/filter-coffee.webp',
                price: 89,
                isVeg: true,
                inStock: true,
            },
        ],
    },

    {
        id: 'RES-006',
        ownerId: 'FDP-004',

        name: 'The Big Chill Cafe',
        description: 'Italian, Continental & Desserts',

        image: '/src/assets/images/restaurants/the-big-chill-cafe.webp',

        isOpenToday: true,
        category: FOOD_CATEGORY.NON_VEG,

        address: 'DLF Cyber Hub, Gurugram, Haryana',
        contactNumber: '9876543215',

        operatingDays: {
            monday: true,
            tuesday: false,
            wednesday: false,
            thursday: true,
            friday: true,
            saturday: true,
            sunday: true,
        },

        openingTime: '12:00 PM',
        closingTime: '11:30 PM',

        menuItems: [
            {
                id: 'ITEM-028',
                name: 'Penne Alfredo Pasta',
                description: 'Creamy white sauce pasta with herbs.',
                image: '/images/menu/penne-alfredo.webp',
                price: 349,
                isVeg: true,
                inStock: true,
            },
            {
                id: 'ITEM-029',
                name: 'Grilled Chicken Steak',
                description: 'Juicy grilled chicken served with vegetables.',
                image: '/images/menu/grilled-chicken-steak.webp',
                price: 549,
                isVeg: false,
                inStock: true,
            },
            {
                id: 'ITEM-030',
                name: 'Chocolate Brownie',
                description: 'Warm brownie served with chocolate sauce.',
                image: '/images/menu/chocolate-brownie.webp',
                price: 199,
                isVeg: true,
                inStock: false,
            },
        ],
    },
];
