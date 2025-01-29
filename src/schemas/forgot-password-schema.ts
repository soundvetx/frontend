import { z } from "zod"

export const ForgotPasswordSchema = z.object({
	email: z
		.string()
		.trim()
		.min(1, {
			message: "Preencha o campo de e-mail."
		})
		.email({
			message: "E-mail inválido."
		})
})

export type ForgotPassword = z.infer<typeof ForgotPasswordSchema>
