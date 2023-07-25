import { User } from "./user"

export enum BlogpostCategory {
    CelestialBodies = 0,
    Physics = 1,
    Technology = 2,
    Other = 3
}

export interface BlogpostSection {
    id?: number,
    title?: string,
    content?: string
}

export interface Blogpost {
    id?: number,
    sections?: BlogpostSection[],
    category?: BlogpostCategory,
    image?: string,
    user?: User
}