import type { RecipeListViewDto } from "../data/recipeList";
import { POST } from "./api";

export const submitOpinionOnRecipeForRecipeList = (recipeListId: string, opinion: "like" | "dislike", recipeId: string) =>
    POST<RecipeListViewDto>(`/recipeList/${recipeListId}/${opinion}/${recipeId}`);
