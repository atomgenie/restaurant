import { useMemo, useState } from "react"
import { AuthentificationService } from "services/autentification/authentification.service"

const Home = () => {
    const [mail, setMail] = useState("")
    const [password, setPassword] = useState("")

    const auth = useMemo(() => new AuthentificationService(), [])

    const handleSend = async () => {
        await auth.register(mail, password)
    }

    return (
        <div>
            <input
                type="text"
                value={mail}
                onChange={e => setMail(e.target.value)}
                placeholder="mail"
                autoComplete="off"
            />
            <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="password"
                autoComplete="off"
            />
            <button onClick={handleSend}>Send</button>
        </div>
    )
}

export default Home
