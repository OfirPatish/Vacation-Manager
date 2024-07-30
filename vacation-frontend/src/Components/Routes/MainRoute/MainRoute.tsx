import { Route, Routes } from "react-router-dom";
import MainPage from "../../Layout/MainPage/MainPage";
import Login from "../../Pages/Login/Login";
import Register from "../../Pages/Register/Register";
import Vacations from "../../Pages/Vacations/Vacations";
import AddVacation from "../../Pages/AddVacation/AddVacation";
import EditVacation from "../../Pages/EditVacation/EditVacation";
import Chart from "../../Pages/Chart/Chart";
import NotFound from "../../Pages/NotFound/NotFound";

function MainRoute(): JSX.Element {
  return (
    <div className="MainRoute">
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/vacations" element={<Vacations />} />
        <Route path="/addVacation" element={<AddVacation />} />
        <Route path="/editVacation/:id" element={<EditVacation />} />
        <Route path="/chart" element={<Chart />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default MainRoute;
