interface ModelWithId {
    id?: string
}

export type DBModel<T extends ModelWithId> = Omit<T, "id">
