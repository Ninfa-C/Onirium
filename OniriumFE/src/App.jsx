import "./App.css";
import { Route, Routes } from "react-router-dom";
import Register from "./components/Login/RegisterForm";
import Login from "./components/Login/Login";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { AutoLogin } from "./api/AccountApi";
import ValaxmaHomepage from "./components/HomePage/ValaxmaHomepage";
import CharacterCreate from "./components/CharacterCreation/CharacterCreate";
import MyCharactersPage from "./components/PersonalCreations/MyCharactersPage";
import CreationHomepage from "./components/PersonalCreations/CreationHomepage";
import CharacterDetails from "./components/PersonalCreations/CharacterDetails";
import CampaignHomepage from "./components/Campaign/CampaignHomepage";
import NewCampaign from "./components/Campaign/NewCampaign";
import CampaignDetails from "./components/Campaign/CampaignDetails";
import InvitePage from "./components/Campaign/InvitePage";
import OniriumNavbar from "./components/navbar/OniriumNavbar";
import Guida from "./components/Footer/Guida";
import RegoleBase from "./components/Footer/RegoleBase";
import FAQ from "./components/Footer/FAQ";
import PrivacyPolicy from "./components/Footer/PrivacyPolicy";
import TerminiServizio from "./components/Footer/TerminiServizio";
import ChiSiamo from "./components/Footer/ChiSiamo";
import PrivateRoute from "./components/Generic/PrivateRoute";
import ProfilePage from "./components/navbar/ProfilePage";
import ScrollToTop from "./components/Generic/ScrollToTop"
import EmailConfirmationPage from "./components/Generic/EmailConfirmationPage";
import OniriumFooter from "./components/Footer/OniriumFooter";
import Shop from "./components/Shop/shop";
import NotFound from "./components/Generic/NotFound";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(AutoLogin());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <OniriumNavbar />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<ValaxmaHomepage />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/Account/Register" element={<Register />} />
        <Route path="/Account/Login" element={<Login />} />
        <Route
          path="/Creations/Character/Create"
          element={
            <PrivateRoute>
              <CharacterCreate />
            </PrivateRoute>
          }
        />

        <Route
          path="/Character"
          element={
            <PrivateRoute>
              <MyCharactersPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/Creation/Character/:id"
          element={
            <PrivateRoute>
              <CharacterDetails />
            </PrivateRoute>
          }
        />

        <Route
          path="/Creations"
          element={
            <PrivateRoute>
              <CreationHomepage />
            </PrivateRoute>
          }
        />

        <Route
          path="/Campaign"
          element={
            <PrivateRoute>
              <CampaignHomepage />
            </PrivateRoute>
          }
        />

        <Route
          path="/Campaign/Create"
          element={
            <PrivateRoute>
              <NewCampaign />
            </PrivateRoute>
          }
        />

        <Route
          path="/Campaign/detail/:id"
          element={
            <PrivateRoute>
              <CampaignDetails />
            </PrivateRoute>
          }
        />

        <Route
          path="/inviti/campagna/:id"
          element={
            <PrivateRoute>
              <InvitePage />
            </PrivateRoute>
          }
        />
        <Route
          path="/profilo"
          element={
            <PrivateRoute>
              <ProfilePage />
            </PrivateRoute>
          }
        />
        <Route path="/shop" element={<Shop />} />
        <Route path="/Guida" element={<Guida />} />
        <Route path="/regole-base" element={<RegoleBase />} />
        <Route path="/FAQ" element={<FAQ />} />
        <Route path="/PrivacyPolicy" element={<PrivacyPolicy />} />
        <Route path="/TerminiServizio" element={<TerminiServizio />} />
        <Route path="/ChiSiamo" element={<ChiSiamo />} />
        <Route path="/conferma-email" element={<EmailConfirmationPage />} />
      </Routes>
      <OniriumFooter />
    </>
  );
}

export default App;
