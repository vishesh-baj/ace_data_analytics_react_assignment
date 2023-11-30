import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import { PATHS } from "./routes/paths";

export default function App() {
  return (
    <div>
      <Routes>
        <Route element={<LoginPage />} path={PATHS.loginPage} />
      </Routes>
    </div>
  );
}
