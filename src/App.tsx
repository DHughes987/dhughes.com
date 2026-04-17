import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import LandingPage from "@/pages/LandingPage"
import SpaceExplorerPage from "@/pages/SpaceExplorerPage"

export function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/space" element={<SpaceExplorerPage />} />
      </Routes>
    </Router>
  )
}

export default App
