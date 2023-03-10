import { Routes, Route } from "react-router-dom";

import "./App.css";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import CreateWinePost from "./components/CreateWinePost/CreateWinePost";
import AllWines from "./components/AllWines/AllWines";
import MyWines from "./components/MyWines/MyWines";
import Profile from "./components/Profile/Profile";
import Details from "./components/Details/Details";
import Edit from "./components/Edit/Edit";
import NotFound from "./components/NotFound/NotFound";

function App() {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/user/login" element={<Login />} />
          <Route path="/user/register" element={<Register />} />
          <Route path="/wine/create" element={<CreateWinePost />} />
          <Route path="/wine/all" element={<AllWines />} />
          <Route path="/wine/my-wines" element={<MyWines />} />
          <Route path="/user/profile" element={<Profile />} />
          <Route path="/wine/details" element={<Details />} />
          <Route path="/wine/edit" element={<Edit />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
