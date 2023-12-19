import { Outlet } from "react-router-dom";
import Header from "../header/header";

function MainLayout() {
  return (
    <>
      <main>
        <Header />
        <Outlet />
      </main>
    </>
  );
}

export default MainLayout;
