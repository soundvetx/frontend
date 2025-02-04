import { z } from "zod"

export const ResetPasswordSchema = z.object({
	token: z.string().trim().min(1, {
		message: "Informe o código de redefinição de senha."
	}),
	newPassword: z.string().trim().min(1, {
		message: "Preencha o campo de nova senha."
	}).min(5, {
		message: "A senha deve ter no mínimo 5 caracteres."
	}),
	confirmNewPassword: z.string().trim().min(1, {
		message: "Preencha o campo de confirmação da nova senha."
	})
})

export type ResetPassword = z.infer<typeof ResetPasswordSchema>
