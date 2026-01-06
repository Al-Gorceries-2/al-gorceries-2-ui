import clsx from "clsx";
import { useEffect, useState } from "react";
import { FaBan, FaTrash } from "react-icons/fa";
import { FaSquareArrowUpRight } from "react-icons/fa6";
import type { RecipeViewDto } from "../data/recipe";
import type { ColorScheme } from "../data/colors";

interface RowProps {
    recipe: RecipeViewDto;
    onDelete: (id: string) => void;
    colorScheme: ColorScheme;
};

export default function ExpandableRecipeRow({ recipe, onDelete, colorScheme }: RowProps) {

    const [title, setTitle] = useState(recipe.name);
    const [showDeleteWarning, setShowDeleteWarning] = useState(false);

    useEffect(() => {
        setTitle(showDeleteWarning ? `Are you sure you want to delete ${recipe.name}?` : recipe.name)
    }, [recipe, showDeleteWarning]);

    return (
        <div className="w-full max-w-md rounded-md border-2 border-dotted border-neutral-600 flex justify-between px-4 py-3">
            <span className={clsx("font-semibold w-full", { "text-red-600": showDeleteWarning, "text-neutral-300": !showDeleteWarning })}>{title}</span>
            <div className="flex gap-4">
                {
                    showDeleteWarning ?
                        <>
                            <button title="Cancel" onClick={() => setShowDeleteWarning(false)} className="text-slate-600 hover:text-slate-500 transition-all duration-200 text-md"><FaBan /></button>
                            <button title="Really Delete" onClick={() => onDelete(recipe.id)} className="text-red-600 hover:text-red-500 transition-all duration-200 text-md"><FaTrash /></button>
                        </> :
                        <>
                            <button onClick={() => setShowDeleteWarning(true)} title="Delete" className="text-red-600 hover:text-red-500 transition-all duration-200 text-md"><FaTrash /></button>
                            <button title="View" className={`text-${colorScheme}-800 transition-all duration-200 text-md cursor-not-allowed`}><FaSquareArrowUpRight /></button>
                        </>
                }
            </div>
        </div>
    );
}
