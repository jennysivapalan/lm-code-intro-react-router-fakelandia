import { Outlet } from "react-router-dom";

function MainLayout() {
  return (
    <>
      <main>
        <h1>Justice for Fakelandia ⚖️</h1>

        <Outlet />
      </main>
    </>
  );
}

export default MainLayout;
