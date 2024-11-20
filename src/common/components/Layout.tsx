import Header from "./Header";
import { ToastContainer } from "react-toastify";
import theme from "../../../theme";

const Layout = ({ children }) => {
    return (
        <>
        <Header />
        <div style={{ minHeight: "900px", backgroundColor: theme.palette.background.default}}>
            <ToastContainer />
            {children}
        </div>
        </>
    )
}

export default Layout;