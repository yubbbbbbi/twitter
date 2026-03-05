// 라우터 설정

import { HashRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Auth from "routes/Auth";
import Home from "routes/Home";
import Profile from "routes/Profile"
import Navigation from "./Navigation";

const AppRouter = ({ isLoggedIn }) => {
    return (
        <Router>
            {isLoggedIn && <Navigation />}
            <Routes>
                {isLoggedIn ? (
                    <>
                        <Route path="/" element={<Home />} />
                        <Route path="/profile" element={<Profile />} />
                        {/* 잘못된 주소로 접근 시 Home으로 */}
                        <Route path="*" element={<Navigate to="/" />} /> 
                    </>
                ) : (
                    <>
                        <Route path="/" element={<Auth />} />
                        {/* 잘못된 주소로 접근 시 Auth으로 */}
                        <Route path="*" element={<Navigate to="/" />} />
                    </>
                )}
            </Routes>
        </Router>
    );
};

export default AppRouter;