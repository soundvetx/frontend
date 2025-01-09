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
	FormDescription
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useAuth } from "@/contexts/auth-context"
import { useLoading } from "@/contexts/loading-context"
import { federativeUnits } from "@/utils/options"
import { UserCreateForm, UserCreateSchema } from "@/schemas/user-schema"
import { UserType } from "@/types/user"
import { Combobox } from "@/components/combobox"
import { Link } from "react-router-dom"

export function RegisterPage() {
	const { isLoading } = useLoading()
	const { signUp } = useAuth()

	const form = useForm<UserCreateForm>({
		resolver: zodResolver(UserCreateSchema),
		defaultValues: {
			type: UserType.Veterinarian,
			name: "",
			crmv: "",
			uf: "",
			email: "",
			password: "",
			confirmPassword: ""
		}
	})

	async function onSubmit(values: UserCreateForm) {
		await signUp(values)
	}

	return (
		<main className="flex flex-col items-center justify-center w-full h-full min-h-dvh max-w-md mx-auto py-8 px-4">
			<MainTitle title="SoundvetX" size="large" />

			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="flex flex-col w-full gap-8 mt-5"
				>
					<FormSection title="Cadastrar conta" align="center">
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Nome completo</FormLabel>
									<FormControl>
										<Input {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="crmv"
							render={({ field }) => (
								<FormItem>
									<FormLabel>CRMV</FormLabel>
									<FormDescription>
										Número de inscrição no Conselho Regional de Medicina
										Veterinária
									</FormDescription>
									<FormControl>
										<Input placeholder="00000" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="uf"
							render={({ field }) => (
								<FormItem>
									<FormLabel>UF</FormLabel>
									<FormDescription>
										Unidade Federativa referente ao CRMV
									</FormDescription>
									<FormControl>
										<Combobox
											className="w-full"
											onValueChange={field.onChange}
											value={field.value}	
											items={federativeUnits}
											placeholder="Selecione uma UF"
											searchPlaceholder="Pesquise por uma UF"
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormLabel>E-mail</FormLabel>
									<FormControl>
										<Input {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="password"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Senha</FormLabel>
									<FormControl>
										<PasswordInput {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="confirmPassword"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Confirmar senha</FormLabel>
									<FormControl>
										<PasswordInput {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</FormSection>

					<Button type="submit" disabled={isLoading}>
						Cadastrar
					</Button>

					<div className="text-center">
						Já possui uma conta? <Link to="/login">Faça seu login!</Link>
					</div>
				</form>
			</Form>
		</main>
	)
}
