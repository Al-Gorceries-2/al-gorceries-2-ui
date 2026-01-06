import type { Household } from "../data/household";
import type { RecipeCreateDto, RecipeViewDto } from "../data/recipe";
import type { RecipeListCreateDto, RecipeListPatchDto, RecipeListViewDto } from "../data/recipeList";
import { DELETE, GET, POST } from "./api";

export const createHousehold = (name: string): Promise<Household> => POST<Household>("/households", { name });
export const getHousehold = (householdId: string): Promise<Household> => GET<Household>(`/households/${householdId}`);
export const joinHousehold = (householdId: string): Promise<Household> =>
    POST<Household>(`/households/${householdId}/users`);
export const leaveHousehold = (householdId: string): Promise<void> => DELETE(`/households/${householdId}/users`);

export const createRecipeForHousehold = (householdId: string, recipe: RecipeCreateDto) =>
    POST<RecipeViewDto>(`/households/${householdId}/recipes`, recipe);
export const getRecipesForHousehold = (householdId: string): Promise<RecipeViewDto[]> =>
    GET<RecipeViewDto[]>(`/households/${householdId}/recipes`);
export const deleteRecipeForHousehold = (householdId: string, recipeId: string): Promise<void> =>
    DELETE(`/households/${householdId}/recipes/${recipeId}`);

export const createRecipeListForHousehold = (householdId: string, recipeList: RecipeListCreateDto) =>
    POST<RecipeListViewDto>(`/households/${householdId}/recipeLists`, recipeList);
export const getRecipeListsForHousehold = (householdId: string): Promise<RecipeListViewDto[]> =>
    GET<RecipeListViewDto[]>(`/households/${householdId}/recipeLists`);
export const patchRecipeListForHousehold = (householdId: string, recipeListId: string, recipeList: RecipeListPatchDto) =>
    POST<RecipeListViewDto>(`/households/${householdId}/recipeLists/${recipeListId}`, recipeList);
