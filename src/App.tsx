import { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./pages/auth/AuthContext";
import ProtectRoute from "./components/ProtectRoute";
import { routes } from "./routes";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            {routes.map((route, index) =>
              route.isProtected ? (
                <Route
                  key={index}
                  path={route.path}
                  element={<ProtectRoute component={route.component} />}
                />
              ) : (
                <Route
                  key={index}
                  path={route.path}
                  element={<route.component />}
                />
              )
            )}
          </Routes>
        </Suspense>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
