import { FormSection } from "@/components/form-section"
import { MainTitle } from "@/components/main-title"
import { PasswordInput } from "@/components/password-input"
import { Button } from "@/components/ui/button"
import {
	Form,
	FormField,
	FormItem,
	FormLabel,
	FormControl,
	FormMessage,
	FormDescription} from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useAuth } from "@/contexts/auth-context"
import { useLoading } from "@/contexts/loading-context"
import { Link, useSearchParams } from "react-router-dom"
import { ResetPassword, ResetPasswordSchema } from "@/schemas/reset-password-schema"

export function ResetPasswordPage() {
	const [searchParams] = useSearchParams()
	const token = searchParams.get("token") ?? ""

	const { isLoading } = useLoading()
	const { resetPassword } = useAuth()

	const form = useForm<ResetPassword>({
		resolver: zodResolver(ResetPasswordSchema),
		defaultValues: {
			newPassword: "",
			confirmNewPassword: "",
		}
	})

	async function onSubmit(values: ResetPassword) {
		await resetPassword({ ...values, token })
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
							name="newPassword"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Nova senha</FormLabel>
									<FormDescription>
										Informe uma nova senha para a sua conta
									</FormDescription>
									<FormControl>
										<PasswordInput {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="confirmNewPassword"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Confirmar nova senha</FormLabel>
									<FormControl>
										<PasswordInput {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</FormSection>

					<Button type="submit" disabled={isLoading}>
						Redefinir senha
					</Button>

					<div className="text-center text-sm">
						<Link to="/login">Voltar para o login</Link>
					</div>
				</form>
			</Form>
		</main>
	)
}
