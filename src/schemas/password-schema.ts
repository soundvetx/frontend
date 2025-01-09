import z from 'zod'

export const PasswordChangeSchema = z.object({
    currentPassword: z.string().trim().min(1, {
        message: "Preencha o campo com a senha atual."
    }),
    newPassword: z.string().trim().min(1, {
		message: "Preencha o campo de nova senha."
	}).min(5, {
		message: "A nova senha deve ter no mínimo 5 caracteres."
	}),
    confirmNewPassword: z.string().trim().min(1, {
		message: "Preencha o campo de confirmação de senha."
	})
}).refine(data => data.newPassword === data.confirmNewPassword, {
	message: "As senhas não coincidem.",
	path: ["confirmNewPassword"]
})

export type PasswordChangeForm = z.infer<typeof PasswordChangeSchema>
