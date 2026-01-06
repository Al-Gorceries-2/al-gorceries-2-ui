import { FaApple, FaGoogle } from "react-icons/fa";
import "./App.css"
import { Menubar } from "./components/menubar/Menubar";
import { BASE_URL } from "./service/api";

export function App() {
    const handleSocialLogin = (provider: "Google" | "Apple") => {
        // Redirect to backend OAuth2 endpoint
        window.location.href = `${BASE_URL}/oauth2/authorization/${provider.toLowerCase()}`;
    };

    return (
        <div className="min-h-screen bg-neutral-900 flex flex-col">
            <Menubar showMenuButtons={false} />

            <div className="flex flex-col items-center justify-center flex-1 p-4 space-y-6">
                <h1 className="text-2xl font-bold text-neutral-300 flex-shrink-0">Login / Register</h1>

                <button
                    onClick={() => handleSocialLogin("Google")}
                    className="w-full max-w-xs px-5 py-2 bg-slate-600 text-neutral-300 rounded-md hover:bg-slate-500 transition-all duration-200 flex items-center justify-center space-x-2"
                >
                    <span>via Google</span>
                    <FaGoogle />
                </button>

                <div className="flex items-center w-full max-w-xs">
                    <hr className="flex-grow border-t border-neutral-300" />
                    <span className="mx-2 text-neutral-300 text-sm">or</span>
                    <hr className="flex-grow border-t border-neutral-300" />
                </div>

                <button
                    onClick={() => handleSocialLogin("Apple")}
                    className="w-full max-w-xs px-5 py-2 bg-slate-600 text-neutral-300 rounded-md hover:bg-slate-500 transition-all duration-200 flex items-center justify-center space-x-2"
                >
                    <span>via Apple</span>
                    <FaApple />
                </button>
            </div>
        </div>
    )
};
