import { alpha, Button, styled } from "@mui/material";
import Image from "next/image";
import Router from "next/router";
import logo from "../../../assets/images/mapa-logo.png";

const NavBar = styled("div")(({ theme }) => ({
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-end",
    backgroundColor: theme.palette.background.default,
    borderBottom: "2px solid #4a4a4a",
}));

const Logo = styled("div")(() => ({
    width: "200px",
    cursor: "pointer",
    minWidth: "200px",
}));

const PagesContainer = styled("div")(() => ({
    display: "flex",
    justifyItems: "flex-end",
}))

const PageLink = styled(Button)(({ theme }) => ({
    a: {
        color: theme.palette.text.primary,
        textDecoration: "none",
    
    },
    "&:hover": {
        backgroundColor: "#a3a3a3",
    },
    marginLeft: "20px",
    marginRight: "20px",
    backgroundColor: "#ffffff",
    padding: "10px 20px",
    borderRadius: "8px",
}));

const nav = (path: string) => {
    console.log(Router.pathname, path);
    if(Router.pathname !== path){
        Router.push(path);
    }
}

const Header: React.FC = () => {
    return (
        <NavBar>
            <Logo onClick={() => nav("/")}>
                <Image src={logo} alt="logo"></Image>
            </Logo>
            <PagesContainer>
                <PageLink onClick={() => nav("/")}>
                    <a>
                        Home
                    </a>
                </PageLink>
                <PageLink onClick={() => nav("/example")} sx={{ marginRight: "30px"}}>
                    <a>
                        Example
                    </a>
                </PageLink>
            </PagesContainer>
        </NavBar>
    );
}

export default Header;