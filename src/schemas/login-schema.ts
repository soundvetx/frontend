import { z } from "zod"

export const LoginSchema = z.object({
	email: z
		.string()
		.trim()
		.min(1, {
			message: "Preencha o campo de e-mail."
		})
		.email({
			message: "E-mail inválido."
		}),
	password: z.string().trim().min(1, {
		message: "Preencha o campo de senha."
	})
})

export type Login = z.infer<typeof LoginSchema>
