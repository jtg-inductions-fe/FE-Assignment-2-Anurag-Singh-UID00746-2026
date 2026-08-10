import { FOOD_CATEGORY } from '@constant';

import { Restaurant } from '@types';

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
                image: 'https://foodserviceindia.com/wp-content/uploads/2023/06/Frame-61.jpg.webp',
                price: 429,
                isVeg: false,
                stock: 5,
            },
            {
                id: 'ITEM-002',
                name: 'Paneer Butter Masala',
                description: 'Soft paneer cubes in buttery tomato gravy.',
                image: 'https://nutriscan.app/calories-nutrition/images/paneer-butter-masala-2f92c.webp',
                price: 349,
                isVeg: true,
                stock: 6,
            },
            {
                id: 'ITEM-003',
                name: 'Dal Makhani',
                description: 'Slow cooked black lentils with butter and cream.',
                image: 'https://images.slurrp.com/prod/recipe_images/transcribe/main%20course/Dal-makhini.webp?impolicy=slurrp-20210601&width=1200&height=675',
                price: 299,
                isVeg: true,
                stock: 0,
            },
            {
                id: 'ITEM-004',
                name: 'Chicken Biryani',
                description:
                    'Fragrant basmati rice with tender chicken pieces.',
                image: 'https://hotelbeachgarden.com/wp-content/uploads/2024/12/Chicken-Biryani.webp',
                price: 399,
                isVeg: false,
                stock: 8,
            },
            {
                id: 'ITEM-005',
                name: 'Veg Biryani',
                description: 'Aromatic basmati rice with fresh vegetables.',
                image: 'https://www.cookingcarnival.com/wp-content/uploads/2025/09/Vegetable-Dum-Biryani-2.webp',
                price: 319,
                isVeg: true,
                stock: 15,
            },
            {
                id: 'ITEM-006',
                name: 'Garlic Naan',
                description:
                    'Freshly baked naan topped with garlic and butter.',
                image: 'https://manekancor.com/wp-content/uploads/2025/08/11-1.jpg',
                price: 89,
                isVeg: true,
                stock: 20,
            },
            {
                id: 'ITEM-007',
                name: 'Tandoori Chicken',
                description:
                    'Chicken marinated in spices and roasted in tandoor.',
                image: 'https://swadlethbridge.com/assets/popular-dishes/tandoori-chicken.webp',
                price: 469,
                isVeg: false,
                stock: 4,
            },
            {
                id: 'ITEM-008',
                name: 'Gulab Jamun',
                description: 'Soft milk dumplings served in sugar syrup.',
                image: 'https://www.cilantro-kittchenandbar.com/assets/popular-dishes/gulab-jamun.webp',
                price: 129,
                isVeg: true,
                stock: 10,
            },
        ],
    },

    {
        id: 'RES-002',
        ownerId: 'FDP-001',

        name: 'California Burrito',
        description: 'Mexican Burritos, Bowls & Tacos',

        image: '/src/assets/images/restaurants/california-burrito.webp',

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
                image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-vVWvSuHQmycp01i_8IiYa42qM_F1vKVILLU-nnlMtxRoXBvfhVm7Pks&s=10',
                price: 349,
                isVeg: false,
                stock: 5,
            },
            {
                id: 'ITEM-010',
                name: 'Veg Burrito',
                description: 'Fresh vegetables, rice, beans and cheese.',
                image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSM-VfwsvBI2VrGqT-i6Ok9g29wMEKE4o3W-RTCVyCxvJyum_uFJkv3VXd9&s=10',
                price: 299,
                isVeg: true,
                stock: 5,
            },
            {
                id: 'ITEM-011',
                name: 'Paneer Rice Bowl',
                description: 'Mexican rice bowl topped with grilled paneer.',
                image: 'https://c.ndtvimg.com/2024-03/nve877d8_-paneer-rice_625x300_02_March_24.jpg?im=FaceCrop,algorithm=dnn,width=1200,height=886',
                price: 319,
                isVeg: true,
                stock: 5,
            },
            {
                id: 'ITEM-012',
                name: 'Chicken Rice Bowl',
                description:
                    'Rice bowl with grilled chicken and fresh veggies.',
                image: 'https://www.arise-app.com/images/dishes/en/chicken-and-rice-bowl-with-vegetables-1hb66f.webp',
                price: 369,
                isVeg: false,
                stock: 0,
            },
            {
                id: 'ITEM-013',
                name: 'Veg Tacos',
                description: 'Soft tacos stuffed with fresh vegetables.',
                image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvQryANai5TUcHemaIU_rzMIXhntfhLRxojYN5FuaUUrkVl01pStLuzqE&s=10',
                price: 249,
                isVeg: true,
                stock: 0,
            },
            {
                id: 'ITEM-014',
                name: 'Chicken Tacos',
                description: 'Soft tacos filled with grilled chicken.',
                image: 'https://hips.hearstapps.com/hmg-prod/images/slow-cooker-chicken-tacos-recipe-2-67cf3b6ecc8fb.jpeg?crop=0.502xw:1.00xh;0.338xw,0&resize=1200:*',
                price: 289,
                isVeg: false,
                stock: 8,
            },
            {
                id: 'ITEM-015',
                name: 'Nachos with Cheese',
                description: 'Crispy nachos served with melted cheese.',
                image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSENJzRWVAUElJqa_bzokmFYFcMgxqZzoPsjYBHfzpomeeOApuecrntHnha&s=10',
                price: 199,
                isVeg: true,
                stock: 4,
            },
            {
                id: 'ITEM-016',
                name: 'Churros',
                description:
                    'Classic cinnamon sugar churros with chocolate dip.',
                image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwXYChWxeSteq99eWyU30UYI7TW9Teip1B9UyrDFwTDg&s=10',
                price: 159,
                isVeg: true,
                stock: 5,
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
                image: 'https://www.thehosteller.com/_next/image/?url=https%3A%2F%2Fstatic.thehosteller.com%2Fhostel%2Fimages%2Fimage.jpg%2Fimage-1744199226259.jpg&w=2048&q=75',
                price: 399,
                isVeg: false,
                stock: 5,
            },
            {
                id: 'ITEM-018',
                name: 'Hyderabadi Veg Biryani',
                description: 'Classic dum biryani with fresh vegetables.',
                image: 'https://instamart-media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,h_960,w_960//InstamartAssets/1/Hyderabadi_Veg_Dum_Biryani.webp',
                price: 329,
                isVeg: true,
                stock: 5,
            },
            {
                id: 'ITEM-019',
                name: 'Chicken 65',
                description: 'Spicy South Indian chicken starter.',
                image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIpaul1HE96G-rjOqowsAPPaFRnW4YgPzxbrOaBPFyw4yGKTj1AuNy5s4&s=10',
                price: 319,
                isVeg: false,
                stock: 5,
            },
            {
                id: 'ITEM-020',
                name: 'Veg Kebab',
                description: 'Smoky grilled vegetable kebabs.',
                image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ51MjkFwiwP0MDsJSjSNHbXK3taq8PmNVUO0v4Avehh5BHiUtxwhrLIUd8&s=10',
                price: 249,
                isVeg: true,
                stock: 5,
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
                image: 'https://4.imimg.com/data4/EW/PO/MY-10347843/chicken-burger-patty-250x250.jpg',
                price: 249,
                isVeg: false,
                stock: 5,
            },
            {
                id: 'ITEM-022',
                name: 'Paneer Burger',
                description: 'Grilled paneer burger with signature sauce.',
                image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaGcVO2P3YyyczNFW9kklsqdcwu0lppuBZoDme77kd1B-L1QSYb9rFJVI&s=10',
                price: 219,
                isVeg: true,
                stock: 5,
            },
            {
                id: 'ITEM-023',
                name: 'Loaded Peri Peri Fries',
                description: 'French fries topped with peri peri seasoning.',
                image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZVNc1vJOoecYxmyF0S27cqjfNsbZBoMEVMpLmLvzxgGwGgXEM5F-QP9Gf&s=10',
                price: 169,
                isVeg: true,
                stock: 5,
            },
            {
                id: 'ITEM-024',
                name: 'Chocolate Shake',
                description: 'Rich and creamy chocolate milkshake.',
                image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCUmSXo33zFEwESV41D6_h9bHXSpIjMEW94FPxhWv3MT7VTPx02SPnIGU&s=10',
                price: 149,
                isVeg: true,
                stock: 5,
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
                image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzzHiW-CATI7ItBaFCb3h-DlcAPFBt9yFJeel8UEbIB0CD00vnEfot_gpu&s=10',
                price: 199,
                isVeg: true,
                stock: 5,
            },
            {
                id: 'ITEM-026',
                name: 'Idli Sambar',
                description: 'Soft idlis served with sambar and chutney.',
                image: 'https://www.arise-app.com/images/dishes/en/idli-with-sambar-and-chutneys-1413y2.webp',
                price: 149,
                isVeg: true,
                stock: 5,
            },
            {
                id: 'ITEM-027',
                name: 'Filter Coffee',
                description: 'Traditional South Indian filter coffee.',
                image: 'https://assets.envihome.co.in/envihome/images/2026/05/8296d490-7d90-40cb-92df-a16abfde4558.webp',
                price: 89,
                isVeg: true,
                stock: 5,
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
                image: 'https://cdn.sanity.io/images/85daklna/production/e37c506beacdef96a2f7fe56390427a49a6d1fc0-2000x1670.webp',
                price: 349,
                isVeg: true,
                stock: 5,
            },
            {
                id: 'ITEM-029',
                name: 'Grilled Chicken Steak',
                description: 'Juicy grilled chicken served with vegetables.',
                image: 'https://pekinthechef.com/_next/image?url=https%3A%2F%2Fwkefbybaeklskadsmwlu.supabase.co%2Fstorage%2Fv1%2Frender%2Fimage%2Fpublic%2FRecipe%2520Images%2F65476_skirt-steak-chicken.webp%3Fwidth%3D800%26height%3D534%26quality%3D55&w=1200&q=60',
                price: 549,
                isVeg: false,
                stock: 5,
            },
            {
                id: 'ITEM-030',
                name: 'Chocolate Brownie',
                description: 'Warm brownie served with chocolate sauce.',
                image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVenCDlrTPjrso2GKXpB9qnd7tCCy5_cMYiHDlJl6ns3q0_52GQKrt5Bs&s=10',
                price: 199,
                isVeg: true,
                stock: 2,
            },
        ],
    },
];
