import { Routes, Route } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";

function App() {
  return (
    <>
      <Header />
      <main>
        {/* <Home/> */}
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/user/login" element={<Login />} />

        </Routes>

      </main>
      <Footer />
    </>
  );
}

export default App;
