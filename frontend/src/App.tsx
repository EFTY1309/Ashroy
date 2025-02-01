import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ChatPage from "./pages/ChatbotPage";
// import MetricsPage from "./pages/MetricsPage";
import Demo from "./pages/Demo";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/metrics" element={<Demo />} />
      </Routes>
    </Router>
  );
};

export default App;
