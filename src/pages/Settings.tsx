import { useCallback, useEffect, useState } from "react";
import { Menubar } from "../components/menubar/Menubar"
import type { Household } from "../data/household";
import { createHousehold, getHousehold, joinHousehold, leaveHousehold } from "../service/householdApi";
import clsx from "clsx";
import { FaBan, FaDoorOpen, FaHouseChimneyMedical, FaUsers } from "react-icons/fa6";
import { useUser } from "../contexts/userContext";
import { colorClasses, colors } from "../data/colors";
import { useColorScheme } from "../service/useColorScheme";

export const Settings = () => {
    const user = useUser();
    const { colorScheme, setColorScheme } = useColorScheme();

    const [loading, setLoading] = useState(true);

    const [household, setHousehold] = useState<Household | null>(null);
    const [showHouseholdLeaveWarning, setShowHouseholdLeaveWarning] = useState(false);
    const [newHouseholdName, setNewHouseholdName] = useState("");
    const [joinHouseholdId, setJoinHouseholdId] = useState("");

    const getUserHousehold = useCallback(async () => {
        if (!user.householdId) {
            setLoading(false);
            return;
        }

        try {
            setHousehold(await getHousehold(user.householdId));
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, [user.householdId]);

    const createNewHousehold = async () => {
        setLoading(true);

        try {
            const newHousehold = await createHousehold(newHouseholdName);
            setHousehold(newHousehold);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    const joinExistingHousehold = async () => {
        setLoading(true);

        try {
            const joinedHousehold = await joinHousehold(joinHouseholdId);
            setHousehold(joinedHousehold);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    const leaveMyHousehold = async () => {
        if (!household || !household.id) {
            return;
        };

        await leaveHousehold(household.id);
        setShowHouseholdLeaveWarning(false);
        setHousehold(null);
    };

    const householdDisplayText = household ? `${household.name} (ID: ${household.id})` : "-";

    useEffect(() => {
        getUserHousehold();
    }, []);

    return (
        <div className="flex flex-col h-screen bg-neutral-900 overflow-hidden">
            <Menubar showMenuButtons={!!household} colorScheme={colorScheme} />
            <div className="flex flex-col items-center flex-1 space-y-6 p-4">
                <h1 className="text-2xl font-bold text-neutral-300">Settings</h1>

                { /* Household loading skeleton */}
                <div className={clsx("w-full max-w-md rounded-md border-2 border-dotted border-neutral-600 animate-pulse px-4 py-4", { "hidden": !loading })}>
                    <div className="h-12 bg-neutral-700 rounded w-full"></div>
                    <div className="h-4 bg-neutral-700 rounded w-3/4 mt-2"></div>
                    <div className="h-10 bg-neutral-700 rounded w-full mt-4"></div>
                </div>

                { /* Household section */}
                <div className={clsx("w-full max-w-md rounded-md border-2 border-dotted border-neutral-600 px-4 py-4 transition-all duration-200", { "hidden": loading || !household })}>
                    <p className="text-neutral-300"><span>You are part of the household</span> <span className="font-semibold">{householdDisplayText}</span></p>
                    <p className="text-neutral-300 text-xs mt-2">Others can use the Household ID to join your Household</p>

                    { /* Leave household section */}
                    <button onClick={() => setShowHouseholdLeaveWarning(true)} title="Leave Household"
                        className={clsx("w-full px-5 py-2 text-neutral-300 rounded-md transition-all duration-200 bg-red-800 hover:bg-red-700 cursor-pointer mt-4 flex items-center justify-center space-x-2", { "hidden": showHouseholdLeaveWarning })}
                    ><span>Leave Household</span><FaDoorOpen /></button>

                    <button onClick={() => setShowHouseholdLeaveWarning(false)} title="Cancel"
                        className={clsx("w-full px-5 py-2 text-neutral-300 rounded-md transition-all duration-200 bg-neutral-700 hover:bg-neutral-600 cursor-pointer mt-4 flex items-center justify-center space-x-2", { "hidden": !showHouseholdLeaveWarning })}
                    ><span>Cancel</span><FaBan /></button>
                    <button onClick={leaveMyHousehold} title="Confirm Leave Household"
                        className={clsx("w-full px-5 py-2 text-neutral-300 rounded-md transition-all duration-200 bg-red-800 hover:bg-red-700 cursor-pointer mt-2 flex items-center justify-center space-x-2", { "hidden": !showHouseholdLeaveWarning })}
                    ><span>Confirm Leave Household</span><FaDoorOpen /></button>
                </div>

                { /* No household section */}
                <div className={clsx("w-full max-w-md rounded-md border-2 border-dotted border-neutral-600 space-y-6 px-4 py-4 transition-all duration-200", { "hidden": loading || household })}>
                    { /* Join household section */}
                    <p className="text-neutral-300 text">Join a Household</p>
                    <input type="text" placeholder="Household ID" value={joinHouseholdId} onChange={(e) => setJoinHouseholdId(e.target.value)}
                        className="w-full border-b-2 border-dotted border-slate-600 bg-transparent placeholder-slate-600 focus:outline-none text-neutral-300"
                    />
                    <p className="text-neutral-300 text-xs">Have someone from the Household you want to join share their Household ID with you (they will find it in their settings)</p>
                    <button onClick={joinExistingHousehold} title="Join Household"
                        className="w-full px-5 py-2 bg-slate-600 text-neutral-300 rounded-md hover:bg-slate-500 transition-all duration-200 flex items-center justify-center space-x-2">
                        <span>Join Household</span>
                        <FaUsers />
                    </button>

                    <div className="flex items-center w-full max-w-xs">
                        <hr className="flex-grow border-t border-neutral-300" />
                        <span className="mx-2 text-neutral-300 text-sm">or</span>
                        <hr className="flex-grow border-t border-neutral-300" />
                    </div>

                    { /* Create household section */}
                    <p className="text-neutral-300">Create a new Household</p>
                    <input type="text" placeholder="Houesehold Name" value={newHouseholdName} onChange={(e) => setNewHouseholdName(e.target.value)}
                        className="w-full border-b-2 border-dotted border-slate-600 bg-transparent placeholder-slate-600 focus:outline-none text-neutral-300"
                    />
                    <button onClick={createNewHousehold} title="Create Household"
                        className="w-full px-5 py-2 bg-slate-600 text-neutral-300 rounded-md hover:bg-slate-500 transition-all duration-200 flex items-center justify-center space-x-2">
                        <span>Create Household</span>
                        <FaHouseChimneyMedical />
                    </button>
                </div>

                { /* Color section */}
                <div className={clsx("w-full max-w-md rounded-md border-2 border-dotted border-neutral-600 px-4 py-4 transition-all duration-200", { "hidden": loading || !household })}>
                    <p className="text-neutral-300">Pick a color scheme for Al-Gorceries</p>
                    <p className="text-neutral-300 text-xs mt-2">Red and green are reserved by the application to indicate behaviour and to hint to expectations</p>

                    <div className="w-full flex flex-wrap justify-center gap-4 mt-4">
                        {
                            colors.map((color) => (
                                <button key={color} onClick={() => setColorScheme(color)} title={color}
                                    className={clsx(
                                        "w-10 h-10 rounded-md transition-all duration-200 cursor-pointer",
                                        colorClasses[color].bg, colorClasses[color].bgHover, colorClasses[color].text, colorClasses[color].textHover, colorClasses[color].border, colorClasses[color].borderHover,
                                        { "ring-2 ring-offset-1 ring-neutral-300": colorScheme === color }
                                    )}
                                />
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
