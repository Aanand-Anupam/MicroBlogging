import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import Button from '@mui/material/Button';

function Header() {
    const authStatus = useSelector(state => state.auth.status);
    const navigate = useNavigate();

    const btn_section = [
        {
            name: "Login",
            slug: "/login",
            icon: <LoginIcon />,
            active: !authStatus
        },
        {
            name: "Sign Up",
            slug: "/signup",
            icon: <LoginIcon />,
            active: !authStatus
        },
        {
            name: "Logout",
            slug: "/logout",
            icon: <LogoutIcon />,
            active: authStatus
        }
    ]
    return (
        <div style={{ position: "absolute", top: 0, width: "75%", right: "10%" }}>
            <nav style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h1>My App</h1>
                <div style={{ display: "flex", gap: "20px" }}>
                    {
                        btn_section.map((item) => (
                            item.active ?
                                <Button key={item.name} variant="outlined" startIcon={item.icon} onClick={() => navigate(item.slug)} >
                                    {item.name}
                                </Button>
                                : null
                        ))
                    }

                </div>
            </nav>
        </div>
    )
}
export default Header;


