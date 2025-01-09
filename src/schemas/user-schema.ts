import { z } from "zod"
import { UserType } from "@/types/user"

const AdminCreateSchema = z.object({
	type: z.enum([UserType.Admin, UserType.Developer]),
	name: z.string().trim().min(1, {
		message: "Preencha o campo de nome completo."
	}),
	email: z.string().trim().min(1, {
		message: "Preencha o campo de e-mail."
	}).email({
		message: "E-mail inválido."
	}),
	password: z.string().trim().min(1, {
		message: "Preencha o campo de senha."
	}).min(5, {
		message: "A senha deve ter no mínimo 5 caracteres."
	}),
	confirmPassword: z.string().trim().min(1, {
		message: "Preencha o campo de confirmação de senha."
	})
}).refine(data => data.password === data.confirmPassword, {
	message: "As senhas não coincidem.",
	path: ["confirmPassword"]
})

const VeterinarianCreateSchema = z.object({
	type: z.literal(UserType.Veterinarian),
	name: z.string().trim().min(1, {
		message: "Preencha o campo de nome completo."
	}),
	crmv: z.string().trim().min(1, {
		message: "Preencha o campo de CRMV."
	}),
	uf: z.string().trim().min(1, {
		message: "Preencha o campo de UF."
	}),
	email: z.string().trim().min(1, {
		message: "Preencha o campo de e-mail."
	}).email({
		message: "E-mail inválido."
	}),
	password: z.string().trim().min(1, {
		message: "Preencha o campo de senha."
	}).min(5, {
		message: "A senha deve ter no mínimo 5 caracteres."
	}),
	confirmPassword: z.string().trim().min(1, {
		message: "Preencha o campo de confirmação de senha."
	})
}).refine(data => data.password === data.confirmPassword, {
	message: "As senhas não coincidem.",
	path: ["confirmPassword"]
})

export const UserCreateSchema = z.union([AdminCreateSchema, VeterinarianCreateSchema])
export type UserCreateForm = z.infer<typeof UserCreateSchema>

const AdminUpdateSchema = z.object({
	type: z.enum([UserType.Admin, UserType.Developer], {
		message: ""
	}),
	name: z.string().trim().min(1, {
		message: "Preencha o campo de nome completo."
	}),
	email: z.string().trim().min(1, {
		message: "Preencha o campo de e-mail."
	}).email({
		message: "E-mail inválido."
	})
})

const VeterinarianUpdateSchema = z.object({
	type: z.literal(UserType.Veterinarian),
	name: z.string().trim().min(1, {
		message: "Preencha o campo de nome completo."
	}),
	crmv: z.string().trim().min(1, {
		message: "Preencha o campo de CRMV."
	}),
	uf: z.string().trim().min(1, {
		message: "Preencha o campo de UF."
	}),
	email: z.string().trim().min(1, {
		message: "Preencha o campo de e-mail."
	}).email({
		message: "E-mail inválido."
	})
})

export const UserUpdateSchema = z.union([AdminUpdateSchema, VeterinarianUpdateSchema])
export type UserUpdateForm = z.infer<typeof UserUpdateSchema>
