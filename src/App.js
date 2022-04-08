import Pokemon from "./components/Pokemon/Pokemon";
import Principal from "./components/Principal/Principal";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Pokemon />} />
      <Route path="/principal/:id" element={<Principal />} />
    </Routes>
  );
}

export default App;
