import { Outlet } from "react-router";

export const PublicLayout = () => {
  return (
    <div>
      <main>
        <Outlet />
      </main>
    </div>
  );
};
