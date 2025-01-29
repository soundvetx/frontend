import { FormSection } from "@/components/form-section"
import { MainTitle } from "@/components/main-title"
import { Button } from "@/components/ui/button"
import {
	Form,
	FormField,
	FormItem,
	FormLabel,
	FormControl,
	FormMessage,
	FormDescription
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useAuth } from "@/contexts/auth-context"
import { Link } from "react-router-dom"
import { useLoading } from "@/contexts/loading-context"
import { ForgotPassword, ForgotPasswordSchema } from "@/schemas/forgot-password-schema"

export function ForgotPasswordPage() {
	const { isLoading, setIsLoading } = useLoading()
	const { forgotPassword } = useAuth()

	const form = useForm<ForgotPassword>({
		resolver: zodResolver(ForgotPasswordSchema),
		defaultValues: {
			email: ""
		}
	})

	async function onSubmit(values: ForgotPassword) {
		setIsLoading(true)
		await forgotPassword(values)
		setIsLoading(false)
	}

	return (
		<main className="flex flex-col items-center justify-center w-full h-full min-h-dvh max-w-md mx-auto py-8 px-4">
			<MainTitle showLogo />
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="flex flex-col w-full gap-8 mt-5"
				>
					<FormSection title="Redefinição de senha" align="center">
						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormLabel>E-mail</FormLabel>
									<FormDescription>
										Enviaremos um e-mail com instruções para redefinir sua senha
									</FormDescription>
									<FormControl>
										<Input placeholder="nome@exemplo.com" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</FormSection>

					<Button type="submit" disabled={isLoading}>
						Enviar e-mail de recuperação
					</Button>

					<div className="text-center text-sm">
						<Link to="/login">Voltar para o login</Link>
					</div>
				</form>
			</Form>
		</main>
	)
}
