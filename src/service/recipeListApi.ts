import type { RecipeListViewDto } from "../data/recipeList";
import { POST } from "./api";

export const submitOpinionOnRecipeForRecipeList = (recipeListId: string, opinion: "like" | "dislike", recipeId: string) =>
    POST<RecipeListViewDto>(`/recipeLists/${recipeListId}/${opinion}/${recipeId}`);
