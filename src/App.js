import './App.css';
import {NavBar} from "./navBar/NavBar.js";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Shop} from "./pages/Shop";
import {Services} from "./pages/Services";
import {ForYourCar} from "./pages/ForYourCar";
import {Contact} from "./pages/Contact";
import {Account} from "./pages/Account";
import {Cart} from "./pages/Cart";
import {Home} from "./pages/Home";

function App() {
  return (
    <div className="App">

        <BrowserRouter>
            <NavBar />
            <Routes>
                <Route path={"/"} element={<Home />} />
                <Route path={"/shop"} element={<Shop />} />
                <Route path={"/services"} element={<Services />} />
                <Route path={"/for-your-car"} element={<ForYourCar />} />
                <Route path={"/contact-us"} element={<Contact />} />
                <Route path={"/login"} element={<Account />} />
                <Route path={"/cart"} element={<Cart />} />
            </Routes>
        </BrowserRouter>

    </div>
  );
}

export default App;
