import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import "./App.css";
import "assets/font/bebas-neue/BebasNeue.otf";
import { useAuth } from "hooks/useAuth";
import { useEffect, useState } from "react";
// ----------
// Pages
// ----------
import LoaderPage from "components/ui/LoaderPage";
import Home from "pages/Home";
import MainLayout from "components/app/MainLayout";
import Channel from "pages/Channel";
import Login from "pages/Login";
import Register from "pages/Register";
import Profile from "pages/Profile";
import UserFavorites from "pages/UserFavorites";
import UserSubscriptions from "pages/UserSubscriptions";
import ForgotPassword from "pages/ForgotPassword";
import ResetPassword from "pages/ResetPassword";
import { Helmet, HelmetProvider } from "react-helmet-async";

function App() {
  const { user, isLoading: isUserLoading } = useAuth();
  const location = useLocation();
  let navigate = useNavigate();

  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!loading && !isUserLoading)
      if (!user?.email && location.pathname.match(/user/)) {
        navigate("/login");
      } else if (
        user?.email &&
        location.pathname.match(/login|register|reset-password|forgot-password/)
      ) {
        navigate("/");
      }
  }, [location, navigate, user, loading, isUserLoading]);

  if (loading) {
    return <LoaderPage />;
  }

  return (
    <HelmetProvider>
      <Helmet>
        <meta
          http-equiv="Content-Security-Policy"
          content="
          default-src 'self';
          script-src 'self' 'unsafe-inline';
          style-src *;
          img-src 'self'  https://i.ytimg.com https://yt3.ggpht.com data:;
          font-src 'self' https://fonts.gstatic.com;
          connect-src 'self' https://netflux-back-789a2df4e080.herokuapp.com https://d1b2sa4lkqbk9q.cloudfront.net https://i.ytimg.com https://localhost:8000 ;
          media-src https://d1b2sa4lkqbk9q.cloudfront.net https://i.ytimg.com;
        "
        />
      </Helmet>
      <Routes>
        {/* Configuration de la CSP */}

        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="channel/:channelId" element={<Channel />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="reset-password" element={<ResetPassword />} />
          <Route path="user/profile" element={<Profile />} />
          <Route path="user/list" element={<UserFavorites />} />
          <Route path="user/subscriptions" element={<UserSubscriptions />} />
        </Route>
      </Routes>
    </HelmetProvider>
  );
}

export default App;
