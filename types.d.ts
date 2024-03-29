export interface ICategory {
    id: string,
    title: string,
    description: string
}

export interface ICategoryWithoutId {
    title: string,
    description: string
}

export interface ILocation {
    id: string,
    title: string,
    description: string
}

export interface ILocationWithoutId {
    title: string,
    description: string
}
export interface IItem {
    id: string,
    title: string,
    category_id: string,
    location_id: string,
    description: string,
    image: string | null,
}
export interface IItemWithoutId {
    title: string,
    category_id: string,
    location_id: string,
    description: string,
    image: string | null,
}

