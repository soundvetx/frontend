export enum UserType {
	Admin = 'ADMIN',
	Developer = 'DEVELOPER',
	Veterinarian = 'VETERINARIAN'
}

export type UserTypeOption = {
	value: UserType
	label: string
}

export type User =
	| { type: UserType.Admin | UserType.Developer, id: number, name: string, email: string, canSendWhatsapp: boolean, isActive: boolean }
	| { type: UserType.Veterinarian, id: number, name: string, email: string, crmv: string, uf: string, canSendWhatsapp: boolean, isActive: boolean }
