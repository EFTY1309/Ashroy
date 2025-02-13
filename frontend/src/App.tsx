import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ChatPage from "./pages/ChatbotPage";
<<<<<<< HEAD
import MetricsPage from "./pages/MetricsPage";
// import Demo from "./pages/Demo";
=======
import Demo from "./pages/Demo";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
>>>>>>> a8856301fd6b0abad479e7c82314be3c8399ec57

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/chat" element={<ChatPage />} />
<<<<<<< HEAD
        <Route path="/metrics" element={< MetricsPage/>} />
=======
        <Route path="/metrics" element={<Demo />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
>>>>>>> a8856301fd6b0abad479e7c82314be3c8399ec57
      </Routes>
    </Router>
  );
};

export default App;