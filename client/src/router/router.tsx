import { Routes, Route } from "react-router-dom";
import MainLayout from "../components/layouts/main_layouts";
import Home from "../components/home/home";
import Confession from "../components/confession/confession";
import Misdemeanours from "../components/misdemeanours/misdemeanours";
import NotFound from "../components/not_found/not_found";

const Router: React.FC = () => (
  <Routes>
    <Route path="/" element={<MainLayout />}>
      <Route index element={<Home />} />
      <Route path="confession" element={<Confession />} />
      <Route path="misdemeanours" element={<Misdemeanours />} />
      <Route path="*" element={<NotFound />} />
    </Route>
  </Routes>
);

export default Router;
