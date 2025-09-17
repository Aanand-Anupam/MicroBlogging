import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FilterIcon from '@mui/icons-material/Filter';
import FilterNoneIcon from '@mui/icons-material/FilterNone';
import MovieFilterIcon from '@mui/icons-material/MovieFilter';
import { useNavigate } from 'react-router-dom';

export default function Footer() {
    const [value, setValue] = React.useState(0);
    const navItems = [
        {
            label: "MyPosts",
            icon: <FilterIcon />,
            slug: "/my-posts",
        },
        {
            label: "Favorites",
            icon: <FavoriteIcon />,
            slug: "/favorite-posts",
        },
        {
            label: "AllPosts",
            icon: <FilterNoneIcon />,
            slug: "/all-posts",
        },
        {
            label: "Add Posts",
            icon: <MovieFilterIcon />,
            slug: "/add-post",
        },
    ];
    const navigate = useNavigate();
    const handleNavigation = (slug) => {
        console.log("Navigated to", slug);
        navigate(slug);
    };

    return (
        <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
            <BottomNavigation
                showLabels
                value={value}
                onChange={(event, newValue) => setValue(newValue)}
                sx={{ bgcolor: "transparent" }}
            >
                {navItems.map((item) => (
                    <BottomNavigationAction
                        key={item.label}
                        label={item.label}
                        icon={item.icon}
                        onClick={() => handleNavigation(item.slug)}
                        sx={{ px: 2 }}
                    />
                ))}
            </BottomNavigation>
        </Box>
    );
}