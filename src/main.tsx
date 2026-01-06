import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Swipe } from "./pages/Swipe.tsx"
import { App } from "./App.tsx"
import RecipesPage from "./pages/Recipes.tsx"
import { Settings } from "./pages/Settings.tsx"
import { AuthenticatedRoute } from "./auth/AuthenticatedRoute.tsx"

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/auth" element={<App />} />
                <Route path="/settings" element={<AuthenticatedRoute><Settings /></AuthenticatedRoute>} />
                <Route path="/recipes" element={<AuthenticatedRoute requireHousehold><RecipesPage /></AuthenticatedRoute>} />
                <Route path="/" element={<AuthenticatedRoute requireHousehold><Swipe /></AuthenticatedRoute>} />
            </Routes>
        </BrowserRouter>
    </StrictMode>
);
