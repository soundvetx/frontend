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
		.refine(n => n > 0, { message: "A idade do paciente deve ser maior que zero." }),
	patientAgePeriod: z.string().trim().min(1, {
		message: "Este campo é obrigatório."
	}),
	patientBreed: z.string().trim().min(1, {
		message: "Este campo é obrigatório."
	}),
	patientTutor: z.string().trim().min(1, {
		message: "Este campo é obrigatório."
	}),
	paymentMethod: z.string().trim().min(1, {
		message: "Este campo é obrigatório."
	}),
	chip: z.string().trim().optional(),
	softTissuesWithContrast: z.array(z.string()).optional(),
	softTissuesWithoutContrast: z.array(z.string()).optional(),
	skullItems: z.array(z.string()).optional(),
	axialSkeletonItems: z.array(z.string()).optional(),
	appendicularSkeletonThoracicLimb: z.string().optional(),
	appendicularSkeletonThoracicLimbOptions: z.array(z.string()).optional(),
	appendicularSkeletonPelvicLimb: z.string().optional(),
	appendicularSkeletonPelvicLimbOptions: z.array(z.string()).optional(),
	appendicularSkeletonPelvis: z.array(z.string()).optional(),
	observations: z.string().trim().min(1, {
		message: "Este campo é obrigatório."
	}),
})
.refine(
	(data) => {
		return (
			data.paymentMethod !== "Pet Love" ||
			(data.chip && data.chip.length > 0)
		);
	},
	{
		message: "Este campo é obrigatório quando o método de pagamento é Pet Love.",
		path: ["chip"],
	}
)
.refine(
	(data) => {
		return (
			data.appendicularSkeletonThoracicLimb === '' ||
			(data.appendicularSkeletonThoracicLimbOptions && data.appendicularSkeletonThoracicLimbOptions.length > 0)
		);
	},
	{
		message: "Selecione pelo menos uma opção.",
		path: ["appendicularSkeletonThoracicLimbOptions"],
	}
)
.refine(
	(data) => {
		return (
			data.appendicularSkeletonPelvicLimb === '' ||
			(data.appendicularSkeletonPelvicLimbOptions && data.appendicularSkeletonPelvicLimbOptions.length > 0)
		);
	},
	{
		message: "Selecione pelo menos uma opção.",
		path: ["appendicularSkeletonPelvicLimbOptions"],
	}
)

export type ExamRequest = z.infer<typeof ExamRequestSchema>

export const ExamRequestRequiredFields = [
	'veterinarianClinic',
	'veterinarianName',
	'veterinarianCrmv',
	'veterinarianUf',
	'patientName',
	'patientSpecies',
	'patientSex',
	'patientAge',
	'patientAgePeriod',
	'patientBreed',
	'patientTutor',
	'chip',
	'paymentMethod',
	'observations',
]
