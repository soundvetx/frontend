import { z } from "zod"

export const ExamRequestSchema = z.object({
	veterinarianClinic: z.string().trim().min(1, {
		message: "Este campo é obrigatório."
	}),
	veterinarianName: z.string().trim().min(1, {
		message: "Este campo é obrigatório."
	}),
	veterinarianCrmv: z.string().trim().min(1, {
		message: "Este campo é obrigatório."
	}),
	veterinarianUf: z.string().trim().min(1, {
		message: "Este campo é obrigatório."
	}),
	patientName: z.string().trim().min(1, {
		message: "Este campo é obrigatório."
	}),
	patientSpecies: z.string().trim().min(1, {
		message: "Este campo é obrigatório."
	}),
	patientSex: z.string().trim().min(1, {
		message: "Este campo é obrigatório."
	}),
	patientAge: z
		.number({ message: "Este campo é obrigatório." })
		.or(
			z
				.string()
				.min(1, { message: "Este campo é obrigatório." })
				.regex(/\d+/)
				.transform(Number)
		)
		.refine(n => n >= 0, { message: "Idade inválida." }),
	patientBreed: z.string().trim().min(1, {
		message: "Este campo é obrigatório."
	}),
	patientTutor: z.string().trim().min(1, {
		message: "Este campo é obrigatório."
	}),
	chip: z.string().trim().min(1, {
		message: "Este campo é obrigatório."
	}),
	paymentMethod: z.string().trim().min(1, {
		message: "Este campo é obrigatório."
	}),
	softTissues: z.array(z.string()).optional(),
	skullItems: z.array(z.string()).optional(),
	axialSkeletonItems: z.array(z.string()).optional(),
	appendicularSkeletonThoracicLimb: z.string().optional(),
	appendicularSkeletonThoracicLimbOptions: z.array(z.string()).optional(),
	appendicularSkeletonPelvicLimb: z.string().optional(),
	appendicularSkeletonPelvicLimbOptions: z.array(z.string()).optional(),
	appendicularSkeletonPelvis: z.array(z.string()).optional(),
	observations: z.string().optional()
})

export type ExamRequest = z.infer<typeof ExamRequestSchema>
