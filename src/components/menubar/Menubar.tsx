import { useState } from "react";
import { FaBars } from "react-icons/fa";
import { FaBookOpen, FaGear } from "react-icons/fa6";
import { MdSwipe } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import type { ColorScheme } from "../../data/colors";

interface MenubarProps {
    showMenuButtons: boolean;
    colorScheme: ColorScheme;
}

export const Menubar = ({ showMenuButtons, colorScheme }: MenubarProps) => {
    const navigate = useNavigate();

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const Links = () => <>
        <h2 onClick={() => navigate("/recipes")} className={`text-md text-${colorScheme}-600 hover:text-${colorScheme}-500 font-bold flex items-center justify-center space-x-2`}><span>Recipes</span><FaBookOpen /></h2>
        <h2 onClick={() => navigate("/")} className={`text-md font-bold text-${colorScheme}-600 hover:text-${colorScheme}-500 flex items-center justify-center space-x-2`}><span>Swipe</span><MdSwipe /></h2>
        <h2 onClick={() => navigate("/settings")} className={`text-md font-bold text-${colorScheme}-600 hover:text-${colorScheme}-500 flex items-center justify-center space-x-2`}><span>Settings</span><FaGear /></h2>

    </>

    const StaticMenuBarContent = () =>
        <>
            {
                showMenuButtons &&
                <button
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className={`text-${colorScheme}-600 md:hidden`}
                    aria-label="Open menu"
                >
                    <FaBars className="w-5 h-5" />
                </button>
            }

            <h1 className="text-l font-bold text-neutral-300 ml-2">Al-Gorceries 2</h1>

            {
                showMenuButtons &&
                <nav className="hidden md:flex absolute left-4 space-x-6">
                    <Links />
                </nav>
            }
        </>

    const OpenMobileMenuContent = () =>
        <div className="w-full flex items-center justify-center gap-4">
            <Links />
        </div>

    return (
        <div className="w-full h-14">
            <div className="w-full p-4 flex items-center justify-center">
                {!mobileMenuOpen && <StaticMenuBarContent />}
                {mobileMenuOpen && <OpenMobileMenuContent />}
            </div>
        </div>
    );
}

