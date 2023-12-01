import { Routes, Route } from "react-router-dom";
import {
  LoginPage,
  AllDishesPage,
  RankingsPage,
  PageNotFound,
  AllUsers,
} from "./pages";
import AppLayout from "./layout/AppLayout";
import { PATHS } from "./routes/paths";
import PrivateRoute from "./routes/privateRoute";
import AdminRoute from "./routes/AdminRoute";

export default function App() {
  const isAuthenticated = localStorage.getItem("isLoggedIn") === "true";

  return (
    <div>
      <Routes>
        <Route
          path={PATHS.loginPage}
          element={
            isAuthenticated ? (
              <AppLayout>
                <AllDishesPage />
              </AppLayout>
            ) : (
              <LoginPage />
            )
          }
        />
        <Route
          path={PATHS.all_dishes}
          element={
            <PrivateRoute
              element={
                <AppLayout>
                  <AllDishesPage />
                </AppLayout>
              }
              redirectTo={PATHS.loginPage}
            />
          }
        />
        <Route
          path={PATHS.rankings}
          element={
            <PrivateRoute
              element={
                <AppLayout>
                  <RankingsPage />
                </AppLayout>
              }
              redirectTo={PATHS.loginPage}
            />
          }
        />
        {/* admin route */}
        <Route
          path={PATHS.allUsers}
          element={
            <AdminRoute
              element={
                <AppLayout>
                  <AllUsers />
                </AppLayout>
              }
              redirectTo={PATHS.loginPage}
            />
          }
        />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}
