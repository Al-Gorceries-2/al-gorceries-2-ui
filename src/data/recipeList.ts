import type { RecipeViewDto } from "./recipe";

export interface RecipeListViewDto {
    id: string;
    name: string;
    likedRecipes: RecipeViewDto[];
    dislikedRecipes: RecipeViewDto[];
};

export interface RecipeListCreateDto {
    name: string;
};

export interface RecipeListPatchDto {
    name: string;
}
