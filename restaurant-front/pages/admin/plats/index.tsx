import { PrimaryButton } from "@fluentui/react"
import { Laxios } from "services/laxios"
import useSWR from "swr"
import { DetailsList, Spinner, IColumn } from "@fluentui/react"
import { Plat } from "types/plat"

const colmuns: IColumn[] = [
    { key: "name", name: "Name", fieldName: "name", minWidth: 300, isResizable: true },
    {
        key: "tags",
        name: "Tags",
        minWidth: 300,
        onRender: (plat: Plat) => (
            <div className="flex gap-2 flex-wrap">
                {plat.tags.map(tag => (
                    <div
                        key={tag}
                        className="bg-gray-100 border rounded text-xs px-2 py-1"
                    >
                        {tag}
                    </div>
                ))}
            </div>
        ),
    },
]

const Plats = () => {
    const { data, error, revalidate } = useSWR<Plat[]>("/plats/list", Laxios.fetcher)

    const handleAdd = async () => {
        await Laxios.instance().post("/plats/add", {
            name: "Porc caramel",
            tags: ["A test", "Caramel"],
        })
        await revalidate()
    }

    return (
        <div className="flex-grow overscroll-y-auto">
            <div className="py-8 px-4">
                <div>Plats</div>
                <PrimaryButton onClick={handleAdd}>Add</PrimaryButton>
                {!data && !error && <Spinner label="loading..." />}
                {error && <div>{error}</div>}
                {data && <DetailsList items={data} columns={colmuns} />}
            </div>
        </div>
    )
}

export default Plats
