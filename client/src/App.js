import LoginForm from "./components/LoginForm/LoginForm";
import { UserContextProvider } from "./contexts/UserContext";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import IsUser from "./components/ProtectedRoute/IsUser";

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route element={<IsUser />}>
          <Route path="/" element={<Home />} />
        </Route>
        <Route path="/login" element={<LoginForm />} />
      </Routes>
    </UserContextProvider>
  );
}

export default App;
