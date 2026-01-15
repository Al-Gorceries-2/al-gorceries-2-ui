import { FaApple, FaGoogle } from "react-icons/fa";
import "./App.css"
import { Menubar } from "./components/menubar/Menubar";
import { BASE_URL } from "./service/api";
import { useColorScheme } from "./service/useColorScheme";

export const App = () => {
    const { colorScheme } = useColorScheme();

    const handleSocialLogin = (provider: "google" | "apple") => {
        window.location.href = `${BASE_URL}/oauth2/authorization/${provider}`;
    };

    return (
        <div className="min-h-screen bg-neutral-900 flex flex-col">
            <Menubar showMenuButtons={false} colorScheme={colorScheme} />

            <div className="flex flex-col items-center justify-center flex-1 p-4 space-y-6">
                <h1 className="text-2xl font-bold text-neutral-300 flex-shrink-0">Login / Register</h1>

                <button
                    onClick={() => handleSocialLogin("google")}
                    title="Login / Register via Google"
                    className={`w-full max-w-xs px-5 py-2 bg-${colorScheme}-600 text-neutral-300 rounded-md hover:bg-${colorScheme}-500 transition-all duration-200 flex items-center justify-center space-x-2`}
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
                    onClick={() => handleSocialLogin("apple")}
                    title="Login / Register via Apple not (yet) available"
                    className={`w-full max-w-xs px-5 py-2 bg-${colorScheme}-800 text-neutral-300 rounded-md hover:bg-${colorScheme}-500 transition-all duration-200 flex items-center justify-center space-x-2 cursor-not-allowed`}
                >
                    <span>via Apple</span>
                    <FaApple />
                    <span>not (yet) available</span>
                </button>
            </div>
        </div>
    )
};
