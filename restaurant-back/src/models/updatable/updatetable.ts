export type Updatable<TModel> = TModel & { changes: () => Partial<TModel> }

export const makeUpdateable = <TModel extends {}>(model: TModel): Updatable<TModel> => {
    const mapChange: Partial<TModel> = {}

    const proxied = new Proxy(
        { ...model, changes: () => mapChange },
        {
            set: (obj, props, value) => {
                ;(mapChange as any)[props] = value
                ;(obj as any)[props] = value
                return true
            },
        },
    )

    return proxied
}
