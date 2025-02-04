import { z } from "zod"

export const ResetPasswordSchema = z.object({
	newPassword: z.string().trim().min(1, {
		message: "Preencha o campo de nova senha."
	}).min(5, {
		message: "A senha deve ter no mínimo 5 caracteres."
	}),
	confirmNewPassword: z.string().trim().min(1, {
		message: "Preencha o campo de confirmação da nova senha."
	})
}).refine(data => data.newPassword === data.confirmNewPassword, {
	message: "As senhas não coincidem.",
	path: ["confirmNewPassword"]
})

export type ResetPassword = z.infer<typeof ResetPasswordSchema>
