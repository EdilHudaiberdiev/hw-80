export interface ICategory {
    id: string,
    title: string,
    description: string
    // image: string | null,
}

export interface ICategoryWithoutId {
    title: string,
    description: string
    // image: string | null,
}
