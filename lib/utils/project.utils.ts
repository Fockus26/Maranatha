import { PROJECT_CATEGORIES, type ProjectCategory } from "@/types/project.types";

export const PROJECT_CATEGORY_VALUES = Object.keys(PROJECT_CATEGORIES) as ProjectCategory[];

export const getProjectCategoryBySlug = (value: string): ProjectCategory | null => {
    const normalizedValue = value.toLowerCase();

    const category = PROJECT_CATEGORY_VALUES.find((key) => {
        const projectCategory = PROJECT_CATEGORIES[key];

        return key.toLowerCase() === normalizedValue || projectCategory.slug === normalizedValue;
    });

    return category ?? null;
};
