import "../styles/globals.css"
import "services/firebase/firebase.service"

function MyApp({ Component, pageProps }: any) {
    return <Component {...pageProps} />
}

export default MyApp
