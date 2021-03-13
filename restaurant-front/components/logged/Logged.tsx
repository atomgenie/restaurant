import { ReactNode, useEffect, useState } from "react"
import { AuthentificationService } from "services/autentification/authentification.service"

import { Spinner, TextField, PrimaryButton } from "@fluentui/react"

interface props {
    children: ReactNode
}

enum LOG_STATE {
    INITIAL,
    LOADING,
    LOGGED,
    UNLOGGED,
}

export const Logged: React.FC<props> = ({ children }) => {
    const [logState, setLogState] = useState<LOG_STATE>(LOG_STATE.INITIAL)

    const [mail, setMail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    useEffect(() => {
        if (logState !== LOG_STATE.INITIAL) {
            return
        }

        const log = async () => {
            setLogState(LOG_STATE.LOADING)

            let logged = false

            try {
                logged = await AuthentificationService.logged()
            } catch {
                logged = false
            }

            if (logged) {
                setLogState(LOG_STATE.LOGGED)
            } else {
                setLogState(LOG_STATE.UNLOGGED)
            }
        }
        log()
    }, [logState])

    const handleLogin = async () => {
        setLogState(LOG_STATE.LOADING)

        try {
            await AuthentificationService.login(mail, password)
        } catch (e) {
            setError(e?.message || "An error occured")
            setLogState(LOG_STATE.UNLOGGED)
            return
        }

        setMail("")
        setPassword("")

        setLogState(LOG_STATE.LOGGED)
    }

    switch (logState) {
        case LOG_STATE.INITIAL:
        case LOG_STATE.LOADING:
            return (
                <div className="flex flex-grow items-center justify-center bg-gray-100">
                    <Spinner label="Loading" />
                </div>
            )
        case LOG_STATE.UNLOGGED:
            return (
                <div className="bg-gray-100 flex-grow overflow-y-auto p-8 flex items-center justify-center">
                    <form
                        className="bg-white rounded shadow border px-6 py-4 flex flex-col gap-4"
                        style={{ width: 400 }}
                        onSubmit={e => {
                            e.preventDefault()
                            handleLogin()
                        }}
                    >
                        <TextField
                            label="E-mail"
                            type="mail"
                            autoComplete="off"
                            value={mail}
                            onChange={(_, value) => setMail(value || "")}
                        />
                        <TextField
                            label="Password"
                            type="password"
                            autoComplete="off"
                            value={password}
                            onChange={(_, value) => setPassword(value || "")}
                        />
                        <PrimaryButton className="self-start" type="submit">
                            Login
                        </PrimaryButton>
                        {error && <div className="text-red-700 text-sm">{error}</div>}
                    </form>
                </div>
            )
        case LOG_STATE.LOGGED:
            return <>{children}</>
    }
}
