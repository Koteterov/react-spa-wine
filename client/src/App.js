import { Routes, Route } from "react-router-dom";
import { Suspense } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Logout from "./components/Logout/Logout";
import CreateWinePost from "./components/CreateWinePost/CreateWinePost";
import AllWines from "./components/AllWines/AllWines";
import MyWines from "./components/MyWines/MyWines";
import Profile from "./components/Profile/Profile";
import Details from "./components/Details/Details";
import Edit from "./components/Edit/Edit";
import NotFound from "./components/NotFound/NotFound";

import { UserProvider } from "./contexts/userContext";
import { ServerMessageProvider } from "./contexts/serverMessageContext";
import RouteGuard from "./components/common/RouteGuard";

function App() {
  return (
    <UserProvider>
      <ServerMessageProvider>
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/user/login" element={<Login />} />
            <Route path="/user/register" element={<Register />} />

            <Route
              path="/wine/all"
              element={
                <Suspense fallback={<h1 className="loader">Loading....</h1>}>
                  <AllWines />
                </Suspense>
              }
            />

            <Route path="/wine/details/:wineId" element={<Details />} />
            <Route element={<RouteGuard />}>
              <Route path="/user/logout" element={<Logout />} />
              <Route path="/wine/create" element={<CreateWinePost />} />
              <Route path="/wine/my-wines" element={<MyWines />} />
              <Route path="/user/profile" element={<Profile />} />
              <Route path="/wine/edit/:wineId" element={<Edit />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </ServerMessageProvider>
    </UserProvider>
  );
}

export default App;
