import { useState, useEffect } from "react";
import { Menubar } from "../components/menubar/Menubar";
import ExpandableRecipeRow from "../components/row";
import type { RecipeViewDto } from "../data/recipe";
import { createRecipeForHousehold, deleteRecipeForHousehold, getRecipesForHousehold } from "../service/householdApi";
import { useUser } from "../contexts/userContext";
import { useColorScheme } from "../service/useColorScheme";

export default function RecipesPage() {
    const user = useUser();
    const { colorScheme } = useColorScheme();

    const [recipes, setRecipes] = useState<RecipeViewDto[]>([]);
    const [filter, setFilter] = useState("");
    const [filteredRecipes, setFilteredRecipes] = useState<RecipeViewDto[]>([]);
    const [loading, setLoading] = useState(true);
    const [newRecipeName, setNewRecipeName] = useState("");
    const [newRecipeTags, setNewRecipeTags] = useState("");

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                setRecipes(await getRecipesForHousehold(user.householdId!));
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchRecipes();
    }, [user.householdId]);

    useEffect(() => {
        setFilteredRecipes(recipes.filter(r => r.name.toLowerCase().includes(filter.toLowerCase())));
    }, [filter, recipes]);

    const handleCreate = async () => {
        if (!newRecipeName) return;

        const recipeToCreate = {
            name: newRecipeName,
            tags: newRecipeTags.split(",").map((t) => t.trim()).filter(Boolean),
        };

        try {
            const created = await createRecipeForHousehold(user.householdId!, recipeToCreate);
            setRecipes((prev) => [...prev, created]);
            setNewRecipeName("");
            setNewRecipeTags("");
        } catch (err) {
            console.error(err);
        }
    };

    const handleDelete = async (id: string) => {
        try {
            await deleteRecipeForHousehold(user.householdId!, id);
            setRecipes((prev) => prev.filter((r) => r.id !== id));
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="flex flex-col items-center h-screen bg-neutral-900 overflow-hidden">
            <div className="w-full h-68">
                <Menubar showMenuButtons={true} colorScheme={colorScheme} />

                <div className="w-full flex flex-col items-center flex-1 p-4 space-y-6 h-screen">
                    <div className="w-full flex flex-col items-center space-y-6">
                        <h1 className="text-2xl font-bold text-neutral-300 flex-shrink-0">Household's Recipes</h1>
                        {/* Create new recipe */}
                        <div className="grid grid-cols-[1fr_auto] grid-rows-2 gap-2 items-stretch w-full max-w-md mb-10">
                            <input
                                type="text"
                                placeholder="Recipe Name"
                                value={newRecipeName}
                                onChange={(e) => setNewRecipeName(e.target.value)}
                                className={`border-b-2 border-dotted border-${colorScheme}-600 bg-transparent placeholder-${colorScheme}-600 focus:outline-none text-neutral-300`}
                            />
                            <button
                                onClick={handleCreate}
                                className={`row-span-2 w-full max-w-xs px-5 py-2 bg-${colorScheme}-600 text-neutral-300 rounded-md hover:bg-${colorScheme}-500 transition-all duration-200`}
                            >
                                Add
                            </button>
                            <input
                                type="text"
                                placeholder="Tags (Comma separated)"
                                value={newRecipeTags}
                                onChange={(e) => setNewRecipeTags(e.target.value)}
                                className={`border-b-2 border-dotted border-${colorScheme}-600 bg-transparent placeholder-${colorScheme}-600 focus:outline-none text-neutral-300`}
                            />
                        </div>
                        <input
                            type="text"
                            placeholder="Filter"
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                            className={`w-full max-w-md border-b-2 border-dotted border-${colorScheme}-600 bg-transparent placeholder-${colorScheme}-600 focus:outline-none text-neutral-300`}
                        />
                    </div>
                </div>

            </div>
            <div className="flex flex-col items-center p-4 w-full max-w-md space-y-4 overflow-y-auto mb-4">
                {
                    loading
                        ? Array.from({ length: 5 }).map((_, idx) => (
                            <div
                                key={idx}
                                className={`w-full max-w-md h-13 bg-${colorScheme}-700 animate-pulse rounded-md border-2 border-dotted border-${colorScheme}-600`}
                            />
                        ))
                        : filteredRecipes.map((recipe) => (
                            <ExpandableRecipeRow
                                key={recipe.id}
                                recipe={recipe}
                                onDelete={handleDelete}
                                colorScheme={colorScheme}
                            />
                        ))
                }
            </div>
        </div >
    );
}
