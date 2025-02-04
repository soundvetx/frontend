import { createContext, useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"

import { Login } from "@/schemas/login-schema"
import { RequestErrorClient } from "@/types/request"
import { User } from "@/types/user"
import { signInUser } from "@/http/auth/sign-in-user"
import { signOutUser } from "@/http/auth/sign-out-user"
import { refreshUserData } from "@/http/user/refresh-user-data"
import { useLoading } from "@/contexts/loading-context"
import { UserCreateForm } from "@/schemas/user-schema"
import { signUpUser } from "@/http/auth/sign-up-user"
import { ForgotPassword } from "@/schemas/forgot-password-schema"
import { forgotUserPassword } from "@/http/auth/forgot-user-password"
import { ResetPasswordRequest, resetUserPassword } from "@/http/auth/reset-user-password"

interface AuthContextProps {
	isAuthenticated: boolean
	user: User | null
	signIn: (login: Login) => Promise<void>
	signUp: (user: UserCreateForm) => Promise<void>
	signOut: () => Promise<void>,
	forgotPassword: (data: ForgotPassword) => Promise<void>,
	resetPassword: (data: ResetPasswordRequest) => Promise<void>
}

const AuthContext = createContext({} as AuthContextProps)

export function AuthProvider({ children }: { children: React.ReactNode }) {
	const navigate = useNavigate()
	const { setIsLoading } = useLoading()
	const [user, setUser] = useState<User | null>(null)
	const isAuthenticated = !!(localStorage.getItem("soundvetx_token") ?? localStorage.getItem("soundvetx_refresh_token"))

	useEffect(() => {
		if (!["/login", "/register", "/forgot-password", "/reset-password"].includes(window.location.pathname)) {
			refreshUser()
		}
	}, [])

	useEffect(() => {
		if (["/login", "/register", "/forgot-password", "/reset-password"].includes(window.location.pathname) && isAuthenticated) {
			navigate("/")
		}
	}, [window.location.pathname])

	async function refreshUser() {
		try {
			const { data } = await refreshUserData()

			if (!data) {
				return
			}

			setUser(data.user)
		} catch (error: any) {
			const { status } = error as RequestErrorClient

			if (status === 401) {
				navigate("/login")
			}
		}
	}

	async function signUp({ name, email, password, confirmPassword, ...props }: UserCreateForm) {
		setIsLoading(true)

		try {
			const { message } = await signUpUser({
				name,
				email,
				password,
				confirmPassword,
				...props
			})

			toast.success(message.clientMessage)
			navigate(`/login?email=${email}&password=${password}`)
		} catch (error: any) {
			const { message, status } = error as RequestErrorClient
			toast.error(message.clientMessage)

			if (status === 401) {
				navigate("/login")
			}
		} finally {
			setIsLoading(false)
		}
	}

	async function forgotPassword({ email }: ForgotPassword) {
		setIsLoading(true)

		try {
			const { message } = await forgotUserPassword({ email })

			toast.success(message.clientMessage)
			navigate("/login")
		} catch (error: any) {
			const { message, status } = error as RequestErrorClient
			toast.error(message.clientMessage)

			if (status === 401) {
				navigate("/login")
			}
		} finally {
			setIsLoading(false)
		}
	}

	async function resetPassword({ token, newPassword, confirmNewPassword }: ResetPasswordRequest) {
		setIsLoading(true)

		try {
			const { message } = await resetUserPassword({ token, newPassword, confirmNewPassword })

			toast.success(message.clientMessage)
			navigate("/login")
		} catch (error: any) {
			const { message, status } = error as RequestErrorClient
			toast.error(message.clientMessage)

			if (status === 401) {
				navigate("/login")
			}
		} finally {
			setIsLoading(false)
		}
	}

	async function signOut() {
		setIsLoading(true)

		try {
			const { message } = await signOutUser()

			setUser(null)
			toast.success(message.clientMessage)
			navigate("/login")
		} catch (error: any) {
			const { message, status } = error as RequestErrorClient
			toast.error(message.clientMessage)

			if (status === 401) {
				navigate("/login")
			}
		} finally {
			setIsLoading(false)
		}
	}

	async function signIn({ email, password }: Login) {
		setIsLoading(true)

		try {
			const { message, data } = await signInUser({ email, password })

			setUser(data.user)
			localStorage.setItem("soundvetx_token", data.token)
			localStorage.setItem("soundvetx_refresh_token", data.refreshToken)

			toast.success(message.clientMessage)
			navigate("/")
		} catch (error: any) {
			const { message, status } = error as RequestErrorClient
			toast.error(message.clientMessage)

			if (status === 401) {
				navigate("/login")
			}
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<AuthContext.Provider value={{ isAuthenticated, user, signUp, signIn, signOut, forgotPassword, resetPassword }}>
			{children}
		</AuthContext.Provider>
	)
}

export function useAuth() {
	return useContext(AuthContext)
}
