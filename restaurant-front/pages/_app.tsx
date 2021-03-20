import "../styles/globals.css"
import "services/firebase/firebase.service"
import { useRouter } from "next/router"
import { ADMIN_PATH } from "helpers/admin"
import { Admin } from "components/admin"
import { initializeIcons } from "@fluentui/react"
import { useEffect } from "react"

const regexAdmin = new RegExp(`^${ADMIN_PATH}.*$`)

const MyApp = ({ Component, pageProps }: any) => {
    const { route } = useRouter()

    useEffect(() => {
        initializeIcons()
    }, [])

    if (regexAdmin.test(route)) {
        return (
            <Admin>
                <Component {...pageProps} />
            </Admin>
        )
    }

    return <Component {...pageProps} />
}

export default MyApp
