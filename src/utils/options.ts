import { CheckboxOption } from "@/components/checkbox-item"
import { ComboboxItem } from "@/components/combobox"
import { UserType, UserTypeOption } from "@/types/user"

export const agePeriods: CheckboxOption[] = [
	{ id: "years", label: "Anos" },
	{ id: "months", label: "Meses" }
]

export const species: CheckboxOption[] = [
	{ id: "canine", label: "Canino" },
	{ id: "feline", label: "Felino" },
	{ id: "wild", label: "Silvestre" }
]

export const sexOptions: CheckboxOption[] = [
	{ id: "male", label: "Macho" },
	{ id: "female", label: "Fêmea" }
]

export const paymentMethods: CheckboxOption[] = [
	{ id: "petLove", label: "Pet Love" },
	{ id: "private", label: "Particular" }
]

export const softTissuesWithoutContrast: CheckboxOption[] = [
	{ id: "chest", label: "Tórax" },
	{ id: "abdomen", label: "Abdômen" },
	{ id: "skyline", label: "Skyline" },
]

export const softTissuesWithContrast: CheckboxOption[] = [
	{ id: "esophagogram", label: "Esofagograma" },
	{ id: "gastricCavity", label: "Cavidade Gástrica" },
	{ id: "retrogradeUrethrocystography", label: "Uretrocistografia Retrógrada" },
	{ id: "excretoryUrography", label: "Urografia Excretora" },
]

export const skullItems: CheckboxOption[] = [
	{ id: "mandible", label: "Mandíbula", hasObservation: true },
	{ id: "toothRoots", label: "Raízes Dentárias", hasObservation: true },
	{ id: "tympanicBullae", label: "Bulas Timpânicas", hasObservation: true },
	{ id: "skullcap", label: "Calota Craniana", hasObservation: true }
]

export const axialSkeletonItems: CheckboxOption[] = [
	{ id: "cervical", label: "Coluna Cervical", hasObservation: true },
	{ id: "thoracic", label: "Coluna Torácica" },
	{ id: "lumbar", label: "Coluna Lombar" },
	{ id: "cervicothoracic", label: "Cervicotorácica" },
	{ id: "thoracolumbar", label: "Toracolombar" },
	{ id: "lumbosacral", label: "Lombossacral" },
	{ id: "tail", label: "Cauda" }
]

export const appendicularSkeletonThoracicLimb: CheckboxOption[] = [
	{ id: "right", label: "Direito" },
	{ id: "left", label: "Esquerdo" }
]

export const appendicularSkeletonThoracicLimbOptions = [
	{ id: "scapulohumeralJoint", label: "Art. Escapuloumeral" },
	{ id: "humerus", label: "Úmero" },
	{ id: "humeroradioulnarJoint", label: "Art. Umeroradioulnar" },
	{ id: "radiusAndUlna", label: "Rádio e Ulna" },
	{ id: "carpusDigits", label: "Art. Carpos/Falanges" }
]

export const appendicularSkeletonPelvicLimb: CheckboxOption[] = [
	{ id: "right", label: "Direito" },
	{ id: "left", label: "Esquerdo" }
]

export const appendicularSkeletonPelvicLimbOptions = [
	{ id: "femur", label: "Fêmur" },
	{ id: "kneeJoint", label: "Art. Joelho" },
	{ id: "tibiaAndFibula", label: "Tíbia e Fíbula" },
	{ id: "tarsalJointDigits", label: "Art. Társica/Dígitos" }
]

export const appendicularSkeletonPelvis: CheckboxOption[] = [
	{ id: "VDLL", label: "VD + LL" },
	{ id: "pelvisAndKnee", label: "Pelve + Joelho (TPLO)", hasObservation: true }
]

export const federativeUnits: ComboboxItem[] = [
	{ value: "AC", label: "AC" },
	{ value: "AL", label: "AL" },
	{ value: "AP", label: "AP" },
	{ value: "AM", label: "AM" },
	{ value: "BA", label: "BA" },
	{ value: "CE", label: "CE" },
	{ value: "DF", label: "DF" },
	{ value: "ES", label: "ES" },
	{ value: "GO", label: "GO" },
	{ value: "MA", label: "MA" },
	{ value: "MT", label: "MT" },
	{ value: "MS", label: "MS" },
	{ value: "MG", label: "MG" },
	{ value: "PA", label: "PA" },
	{ value: "PB", label: "PB" },
	{ value: "PR", label: "PR" },
	{ value: "PE", label: "PE" },
	{ value: "PI", label: "PI" },
	{ value: "RJ", label: "RJ" },
	{ value: "RN", label: "RN" },
	{ value: "RS", label: "RS" },
	{ value: "RO", label: "RO" },
	{ value: "RR", label: "RR" },
	{ value: "SC", label: "SC" },
	{ value: "SP", label: "SP" },
	{ value: "SE", label: "SE" },
	{ value: "TO", label: "TO" }
];

export const UserTypes: UserTypeOption[] = [
	{ value: UserType.Admin, label: "Administrador" },
	{ value: UserType.Developer, label: "Desenvolvedor" },
	{ value: UserType.Veterinarian, label: "Veterinário" }
];