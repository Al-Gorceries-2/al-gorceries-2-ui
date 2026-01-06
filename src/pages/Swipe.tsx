import { useEffect, useState, type JSX } from "react";
import { Menubar } from "../components/menubar/Menubar";
import type { RecipeViewDto } from "../data/recipe";
import clsx from "clsx";
import { FaThumbsDown, FaThumbsUp } from "react-icons/fa";
import type { RecipeListViewDto } from "../data/recipeList";
import { useUser } from "../contexts/userContext";
import type { User } from "../data/user";
import { createRecipeListForHousehold, getRecipeListsForHousehold, getRecipesForHousehold, patchRecipeListForHousehold } from "../service/householdApi";
import { useColorScheme } from "../service/useColorScheme";
import type { ColorScheme } from "../data/colors";
import { submitOpinionOnRecipeForRecipeList } from "../service/recipeListApi";

export const Swipe = () => {
    const user = useUser();
    const { colorScheme } = useColorScheme();

    const [animatingCard, setAnimatingCard] = useState<{ id: string; direction: string } | null>(null);
    const [loading, setLoading] = useState(true);
    const [recipes, setRecipes] = useState<RecipeViewDto[]>([]);
    const [view, setView] = useState<"grid" | "list">("grid");
    const [recipesToSwipe, setRecipesToSwipe] = useState<RecipeViewDto[]>([]);

    const [recipeListName, setRecipeListName] = useState("");
    const [debounceTimer, setDebounceTimer] = useState<NodeJS.Timeout | null>(null);

    const [recipeLists, setRecipeLists] = useState<RecipeListViewDto[]>([]);
    const [recipeList, setRecipeList] = useState<RecipeListViewDto | null>(null);
    const [likedRecipes, setLikedRecipes] = useState<RecipeViewDto[]>([]);
    const [dislikedRecipes, setDislikedRecipes] = useState<RecipeViewDto[]>([]);

    useEffect(() => {
        const fetchRecipeLists = async () => {
            try {
                setRecipeLists(await getRecipeListsForHousehold(user.householdId!));
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchRecipeLists();
    }, [user.householdId]);

    useEffect(() => {
        if (!recipeList || recipeList.name === recipeListName) {
            console.log("No update needed for recipe list name");
            return;
        };

        if (debounceTimer) {
            clearTimeout(debounceTimer);
        }

        const timer = setTimeout(() => {
            console.log("Upadting recipe list with id", recipeList.id, "to name", recipeListName);
            updateRecipeListName(recipeList.id, recipeListName);
        }, 800);

        setDebounceTimer(timer);

        // Cleanup on unmount
        return () => clearTimeout(timer);
    }, [recipeListName]);

    useEffect(() => {
        if (recipeList) {
            setRecipeListName(recipeList.name);
            setLikedRecipes(recipeList.likedRecipes);
            setDislikedRecipes(recipeList.dislikedRecipes);
            setRecipesToSwipe(recipes.filter(r => !recipeList.likedRecipes.find(lr => lr.id === r.id) && !recipeList.dislikedRecipes.find(dr => dr.id === r.id)));
        }
    }, [recipeList]);

    const updateRecipeListName = async (id: string, name: string) => {
        setRecipeList(await patchRecipeListForHousehold(user.householdId!, id, { name }));
    }

    const addRecipeToRecipeList = (opinion: "like" | "dislike") => async (recipe: RecipeViewDto) => {
        setRecipeList(await submitOpinionOnRecipeForRecipeList(recipeList!.id, opinion, recipe.id));
    }

    const likeRecipe = addRecipeToRecipeList("like");
    const dislikeRecipe = addRecipeToRecipeList("dislike");

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                setRecipes(await getRecipesForHousehold(user.householdId!));
            } finally {
                setLoading(false);
            }
        };
        fetchRecipes();
    }, []);

    const handleSwipe = (direction: "left" | "right") => {
        if (!recipesToSwipe.length) return;

        const topCard = recipesToSwipe[0];
        setAnimatingCard({ id: topCard.id, direction });

        // After animation ends, remove the card
        setTimeout(() => {
            console.log(direction === "right" ? "Liked:" : "Disliked:", topCard.name);
            if (direction === "right") {
                likeRecipe(topCard);
            } else {
                dislikeRecipe(topCard);
            }
            setRecipesToSwipe((prev) => prev.slice(1));
            setAnimatingCard(null);
        }, 300); // match transition duration
    };

    return (
        <div className="flex flex-col h-screen bg-neutral-900 overflow-hidden">
            <div className="h-66">
                <Menubar showMenuButtons={true} colorScheme={colorScheme} />

                <div className="flex flex-col items-center flex-1 space-y-6 p-4">
                    {
                        !recipeList && <RecipeListSelection setRecipeList={setRecipeList} recipeLists={recipeLists} user={user} colorScheme={colorScheme} />
                    }

                    {
                        recipeList &&
                        <div className="flex items-center w-full max-w-xs mb-12">
                            <input
                                type="text"
                                placeholder="{ Recipe List Name }"
                                value={recipeListName}
                                onChange={(e) => setRecipeListName(e.target.value)}
                                className={`flex-grow border-b-2 border-dotted border-${colorScheme}-600 bg-transparent placeholder-${colorScheme}-600 focus:outline-none text-neutral-300 text-2xl font-bold`}
                            />
                        </div>
                    }

                    {
                        recipeList &&
                        <>
                            <SplitLayoutButton view={view} setView={setView} colorScheme={colorScheme} />


                            {view === "grid" &&
                                <>
                                    <div className="relative w-80 h-96">
                                        {
                                            loading ?
                                                <div className={`absolute w-80 h-96 rounded-xl bg-${colorScheme}-700 animate-pulse border-2 border-dotted border-${colorScheme}-600`} />
                                                :
                                                (
                                                    recipesToSwipe.length === 0 ? <div className={`absolute w-80 h-96 rounded-xl bg-${colorScheme}-700 border-2 border-dotted border-${colorScheme}-600`}><img src="sara_pot.jpg" className="rounded-xl opacity-50" alt="A picture of my girlfriend's and my cat Sara sitting in a plant pot." /></div> : recipesToSwipe.map((recipe, index) => {
                                                        const isAnimating = animatingCard?.id === recipe.id;
                                                        const translateX = isAnimating ? (animatingCard?.direction === "right" ? 500 : -500) : 0;
                                                        const rotate = isAnimating ? (animatingCard?.direction === "right" ? 15 : -15) : 0;

                                                        return (
                                                            <div
                                                                key={recipe.id}
                                                                className={`absolute w-80 h-96 rounded-xl bg-${colorScheme}-700 border-2 border-dotted border-${colorScheme}-600 flex items-end p-4 transition-transform duration-300`}
                                                                style={{
                                                                    transform: `translateX(${translateX}px) rotate(${rotate}deg)`,
                                                                    zIndex: recipesToSwipe.length - index,
                                                                    // backgroundImage: `url(${recipe.imgUrl})`,
                                                                    backgroundSize: "cover",
                                                                    backgroundPosition: "center",
                                                                }}
                                                            >
                                                                <h2 className="text-xl font-bold text-white">{recipe.name}</h2>
                                                            </div>
                                                        );
                                                    })
                                                )
                                        }
                                    </div>

                                    {/* Buttons */}
                                    <div className={clsx("flex space-x-6 mt-8", { "hidden": recipesToSwipe.length === 0 })}>
                                        <button
                                            disabled={!recipeList || !!animatingCard}
                                            onClick={() => handleSwipe("left")}
                                            className={clsx("w-full max-w-xs px-5 py-2 text-neutral-300 rounded-md transition-all duration-200", {
                                                "bg-red-800 hover:bg-red-700 cursor-pointer": !!recipeList,
                                                "bg-red-900 opacity-50 cursor-not-allowed": !recipeList || !!animatingCard
                                            })}
                                        >
                                            Dislike
                                        </button>
                                        <button
                                            disabled={!recipeList || !!animatingCard}
                                            onClick={() => handleSwipe("right")}
                                            className={clsx("w-full max-w-xs px-5 py-2 text-neutral-300 rounded-md transition-all duration-200", {
                                                "bg-green-800 hover:bg-green-700 cursor-pointer": !!recipeList,
                                                "bg-green-900 opacity-50 cursor-not-allowed": !recipeList || !!animatingCard
                                            })}
                                        >
                                            Like
                                        </button>
                                    </div>
                                    <div className={clsx("flex space-x-6 mt-8 text-md text-neutral-300", { "hidden": recipesToSwipe.length > 0 })}>
                                        No more recipes to swipe!
                                    </div>
                                </>
                            }
                            <div
                                className={clsx(
                                    "grid grid-cols-2 gap-2 w-full max-w-md flex-1 overflow-hidden",
                                    { "hidden": view === "grid" }
                                )}
                            >
                                <h3 className="text-l font-bold text-neutral-300 text-center p-4">Disliked Recipes</h3>
                                <h3 className="text-l font-bold text-neutral-300 text-center p-4">Liked Recipes</h3>
                            </div>
                        </>
                    }
                </div>
            </div>

            {
                recipeList &&

                <div
                    className={clsx(
                        "grid grid-cols-2 gap-2 w-full max-w-md flex-1 overflow-hidden",
                        { "hidden": view === "grid" }
                    )}
                >
                    <div className="space-y-4 overflow-y-auto mb-4 p-4">
                        {
                            dislikedRecipes.map(recipe => (
                                <Row
                                    key={recipe.id}
                                    recipe={recipe}
                                    changeOpinion={likeRecipe}
                                    changeOpinionIcon={<FaThumbsUp />}
                                    changeOpinionTitle="Actually like this recipe"
                                    colorScheme={colorScheme}
                                />
                            ))
                        }
                    </div>
                    <div className="space-y-4 overflow-y-auto mb-4 p-4">
                        {
                            likedRecipes.map(recipe => (
                                <Row
                                    key={recipe.id}
                                    recipe={recipe}
                                    changeOpinion={dislikeRecipe}
                                    changeOpinionIcon={<FaThumbsDown />}
                                    changeOpinionTitle="Actually dislike this recipe"
                                    colorScheme={colorScheme}
                                />
                            ))
                        }
                    </div>
                </div>
            }
        </div >
    );
}

interface RecipeListSelectionProps {
    setRecipeList: (recipeList: RecipeListViewDto | null) => void;
    recipeLists: RecipeListViewDto[];
    user: User;
    colorScheme: ColorScheme;
}

const RecipeListSelection = ({ setRecipeList, recipeLists, user, colorScheme }: RecipeListSelectionProps) => {

    const [debounceTimer, setDebounceTimer] = useState<NodeJS.Timeout | null>(null);

    const [newRecipeListName, setNewRecipeListName] = useState("");

    const createNewRecipeList = async (name: string) => {
        setRecipeList(await createRecipeListForHousehold(user.householdId!, { name }));
    };

    useEffect(() => {
        if (!newRecipeListName) return;

        if (debounceTimer) {
            clearTimeout(debounceTimer);
        }

        const timer = setTimeout(() => {
            createNewRecipeList(newRecipeListName);
        }, 800);

        setDebounceTimer(timer);

        // Cleanup on unmount
        return () => clearTimeout(timer);
    }, [newRecipeListName]);

    return (
        <>
            <div className="flex items-center w-full max-w-xs">
                <input
                    type="text"
                    placeholder="{ New Recipe List Name }"
                    value={newRecipeListName}
                    onChange={(e) => setNewRecipeListName(e.target.value)}
                    className={`flex-grow border-b-2 border-dotted border-${colorScheme}-600 bg-transparent placeholder-${colorScheme}-600 focus:outline-none text-neutral-300 text-2xl font-bold`}
                />
            </div>
            <div className="flex items-center w-full max-w-xs">
                <hr className="flex-grow border-t border-neutral-300" />
                <span className="mx-2 text-neutral-300 text-sm">or</span>
                <hr className="flex-grow border-t border-neutral-300" />
            </div>
            <div className="flex items-center space-x-2 w-full max-w-xs">
                <select
                    defaultValue=""
                    onChange={(e) => setRecipeList(recipeLists.find(rl => rl.id === e.target.value) || null)}
                    className={`flex-grow border-b-2 border-dotted border-${colorScheme}-600 bg-transparent text-neutral-300 text-2xl font-bold focus:outline-none`}
                >
                    <option value="" disabled className={`bg-${colorScheme}-800 text-neutral-300`}>
                        {"{ Select Recipe List }"}
                    </option>

                    {recipeLists.map(rl => (
                        <option
                            key={rl.id}
                            value={rl.id}
                            className={`bg-${colorScheme}-800 text-neutral-300`}
                        >
                            {rl.name}
                        </option>
                    ))}
                </select>
            </div>
        </>
    );
}

interface SplitLayoutButtonProps {
    view: "grid" | "list";
    setView: (view: "grid" | "list") => void;
    colorScheme: ColorScheme;
}

const SplitLayoutButton = ({ view, setView, colorScheme }: SplitLayoutButtonProps) => {

    const buttonBackgroundColor = (button: "grid" | "list", view: "grid" | "list") => {
        return button === view ? `bg-${colorScheme}-400` : `bg-${colorScheme}-600`;
    };

    return (
        <div className="w-full flex max-w-xs rounded-md" role="group">
            <button
                type="button"
                onClick={() => setView("grid")}
                className={clsx(`w-full px-4 py-2 rounded-l-md hover:bg-${colorScheme}-500 transition-all duration-200 ${buttonBackgroundColor("grid", view)}`, {
                    "text-neutral-100": view === "grid",
                    "text-neutral-300": view !== "grid"
                })}
            >
                Swipe
            </button>
            <button
                type="button"
                onClick={() => setView("list")}
                className={clsx(`w-full px-4 py-2 rounded-r-md hover:bg-${colorScheme}-500 transition-all duration-200 ${buttonBackgroundColor("list", view)}`, {
                    "text-neutral-100": view === "list",
                    "text-neutral-300": view !== "list"
                })}
            >
                Recipes
            </button>
        </div>
    );
}

interface RowProps {
    recipe: RecipeViewDto;
    changeOpinion: (recipe: RecipeViewDto) => void;
    changeOpinionIcon: JSX.Element;
    changeOpinionTitle: string;
    colorScheme: ColorScheme;
}

const Row = ({ recipe, changeOpinion, changeOpinionIcon, changeOpinionTitle, colorScheme }: RowProps) => {
    return (
        <div className={`w-full max-w-md rounded-md border-2 border-dotted border-${colorScheme}-600 flex justify-between px-4 py-3`}>
            <span className="text-neutral-300 font-semibold w-full">{recipe.name}</span>
            <div className="flex gap-4 ml-2">
                <button title={changeOpinionTitle} onClick={() => changeOpinion(recipe)} className={`text-${colorScheme}-600 hover:text-${colorScheme}-500 transition-all duration-200 text-md`}>{changeOpinionIcon}</button>
            </div>
        </div>
    );
}
