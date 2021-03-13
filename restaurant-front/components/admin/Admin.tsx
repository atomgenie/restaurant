import { Logged } from "components/logged/Logged"
import { Nav, INavLinkGroup } from "@fluentui/react"
import { useRouter } from "next/router"
import { useMemo } from "react"
import { ADMIN_PATH } from "helpers/admin"

interface props {
    children: React.ReactNode
}

const routes: INavLinkGroup[] = [
    {
        links: [
            {
                name: "Home",
                url: ADMIN_PATH,
                key: "key1",
            },
            {
                name: "Plats",
                url: `${ADMIN_PATH}/plats`,
                key: "key3",
            },
        ],
    },
]

export const Admin: React.FC<props> = ({ children }) => {
    const { route, push } = useRouter()

    const currentKey = useMemo(() => {
        const reoderLinks = [...routes[0].links].sort(
            (a, b) => b.url.length - a.url.length,
        )

        for (const routeElm of reoderLinks) {
            if (!routeElm.url) {
                continue
            }

            const regexpRoute = new RegExp(`^${routeElm.url}.*$`)
            if (regexpRoute.test(route)) {
                return routeElm.key
            }
        }

        return undefined
    }, [route])

    return (
        <Logged>
            <div className="flex-grow flex items-stretch overflow-y-hidden">
                <div
                    className="bg-gray-100 flex-shrink-0 overscroll-y-auto"
                    style={{ width: 250 }}
                >
                    <div className="px-4 py-6">Le Saigon ADMIN</div>
                    <Nav
                        groups={routes}
                        selectedKey={currentKey}
                        onLinkClick={(e, item) => {
                            if (!item || !e) {
                                return
                            }

                            e.preventDefault()
                            push(item.url)
                        }}
                    ></Nav>
                </div>
                <div className="flex-grow flex items-stretch overflow-y-hidden">
                    {children}
                </div>
            </div>
        </Logged>
    )
}
