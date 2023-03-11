import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext";
import AddSpot from "./components/AddSpot";
import EditSpot from "./components/EditSpot";
import Nav from "./components/Nav";
import SpotsMap from "./components/SpotsMap";
import Login from "./components/Login";
import Account from "./components/Account";
import SpotsList from "./components/SpotsList";
import ProtectedRoute from "./components/ProtectedRoute";
import "./App.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AuthContextProvider>
          <Nav />
          <Routes>
            <Route path="/" element={<SpotsMap />} />
            <Route
              path="/add-spot"
              element={
                <ProtectedRoute>
                  <AddSpot />
                </ProtectedRoute>
              }
            />
            <Route
              path="/edit-spot/:id"
              element={
                <ProtectedRoute>
                  <EditSpot />
                </ProtectedRoute>
              }
            />
            <Route path="/login" element={<Login />} />
            {/* Currently not allowing sign-ups */}
            {/* <Route path="/sign-up" element={<SignUp />} /> */}
            <Route
              path="/account"
              element={
                <ProtectedRoute>
                  <Account />
                </ProtectedRoute>
              }
            />
            <Route
              path="/spots-list"
              element={
                <ProtectedRoute>
                  <SpotsList />
                </ProtectedRoute>
              }
            />
          </Routes>
        </AuthContextProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
