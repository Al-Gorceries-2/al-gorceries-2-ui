export interface RecipeViewDto {
    id: string;
    name: string;
    tags: string[];
}

export interface RecipeCreateDto {
    name: string;
    tags: string[];
}
