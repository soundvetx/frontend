import { Button } from "@/components/ui/button"
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { FormSection } from "@/components/form-section"
import { FormGrid } from "@/components/form-grid"
import { MainTitle } from "@/components/main-title"
import { CheckboxItem } from "@/components/checkbox-item"
import { Textarea } from "@/components/ui/textarea"
import { useLoading } from "@/contexts/loading-context"
import { generateExamRequest } from "@/http/report/generate-exam-request"
import { ExamRequest, ExamRequestRequiredFields, ExamRequestSchema } from "@/schemas/exam-request-schema"
import { softTissues, skullItems, axialSkeletonItems, federativeUnits, paymentMethods, sexOptions, species, appendicularSkeletonThoracicLimb, appendicularSkeletonThoracicLimbOptions, appendicularSkeletonPelvicLimb, appendicularSkeletonPelvicLimbOptions, appendicularSkeletonPelvis } from "@/utils/options"
import { toast } from "sonner"
import { useAuth } from "@/contexts/auth-context"
import { Header } from "@/components/header"
import { useEffect, useState } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import { RequestErrorClient } from "@/types/request"
import { UserType } from "@/types/user"
import { CustomAlertDialog } from "@/components/custom-alert-dialog"
import { SendExamRequest, sendExamRequest } from "@/http/report/send-exam-request"
import { Main } from "@/components/main"
import { Combobox } from "@/components/combobox"
import { useNavigate } from "react-router-dom"

export function ExamRequestPage() {
	const navigate = useNavigate()
	const { isLoading, setIsLoading } = useLoading()
	const { user } = useAuth()

	const [isAlertOpen, setIsAlertOpen] = useState(false)
	const [canCloseAlert, setCanCloseAlert] = useState(false)
	const [examRequestSent, setExamRequestSent] = useState(false)
	const [sendExamRequestProps, setSendExamRequestProps] = useState<SendExamRequest>({
		veterinarianClinic: "",
		veterinarianName: "",
		patientName: "",
		reportUrl: ""
	})

	const disableVeterinarianNameInput = user ? user.type === UserType.Veterinarian : false
	const canSendToWhatsapp = user ? user.canSendWhatsapp : false

	const form = useForm<ExamRequest>({
		resolver: zodResolver(ExamRequestSchema),
		defaultValues: {
			veterinarianClinic: "",
			veterinarianName: "",
			veterinarianCrmv: "",
			veterinarianUf: "",
			patientName: "",
			patientSpecies: "",
			patientSex: "",
			patientAge: 0,
			patientBreed: "",
			patientTutor: "",
			chip: "",
			paymentMethod: "",
			softTissues: [],
			skullItems: [],
			axialSkeletonItems: [],
			appendicularSkeletonThoracicLimb: "",
			appendicularSkeletonThoracicLimbOptions: [],
			appendicularSkeletonPelvicLimb: "",
			appendicularSkeletonPelvicLimbOptions: [],
			appendicularSkeletonPelvis: [],
			observations: ""
		}
	})

	useEffect(() => {
		if (user && user.type === UserType.Veterinarian) {
			form.setValue("veterinarianName", user.name)
			form.setValue("veterinarianCrmv", user.crmv)
			form.setValue("veterinarianUf", user.uf)
		}
	}, [user])

	useEffect(() => {
		if (form.watch("appendicularSkeletonThoracicLimb") === "") {
			form.setValue("appendicularSkeletonThoracicLimbOptions", [])
		}
	}, [form.watch("appendicularSkeletonThoracicLimb")])

	useEffect(() => {
		if (form.watch("appendicularSkeletonPelvicLimb") === "") {
			form.setValue("appendicularSkeletonPelvicLimbOptions", [])
		}
	}, [form.watch("appendicularSkeletonPelvicLimb")])

	async function onSubmit(values: ExamRequest) {
		setIsLoading(true)

		try {
			const { message, data } = await generateExamRequest(values)
	
			setSendExamRequestProps({
				veterinarianClinic: values.veterinarianClinic,
				veterinarianName: values.veterinarianName,
				patientName: values.patientName,
				reportUrl: data.url
			})
			setIsAlertOpen(true)
	
			toast.success(message.clientMessage)
		} catch (error: any) {
			const { status, message } = error as RequestErrorClient
			toast.error(message.clientMessage)

			if (status === 401) {
				navigate("/login")
			}
		} finally {
			setIsLoading(false)
		}
	}

	function handleCloseAlert() {
		setIsAlertOpen(false)
		setCanCloseAlert(false)
		setExamRequestSent(false)
		form.reset({
			veterinarianClinic: "",
			veterinarianName: user && user.type === UserType.Veterinarian ? user.name : "",
			veterinarianCrmv: user && user.type === UserType.Veterinarian ? user.crmv : "",
			veterinarianUf: user && user.type === UserType.Veterinarian ? user.uf : "",
			patientName: "",
			patientSpecies: "",
			patientSex: "",
			patientAge: 0,
			patientBreed: "",
			patientTutor: "",
			chip: "",
			paymentMethod: "",
			softTissues: [],
			skullItems: [],
			axialSkeletonItems: [],
			appendicularSkeletonThoracicLimb: "",
			appendicularSkeletonThoracicLimbOptions: [],
			appendicularSkeletonPelvicLimb: "",
			appendicularSkeletonPelvicLimbOptions: [],
			appendicularSkeletonPelvis: [],
			observations: ""
		})
	}

	function handleDownload() {
		window.open(sendExamRequestProps.reportUrl, "_blank")
		setCanCloseAlert(true)
	}

	async function handleSendToSoundvetX() {
		toast.info("Enviando para SoundvetX...")
		setIsLoading(true)

		try {
			const { message } = await sendExamRequest(sendExamRequestProps)
	
			toast.success(message.clientMessage)
			setExamRequestSent(true)
			setCanCloseAlert(true)
		} catch (error: any) {
			const { status, message } = error as RequestErrorClient
			toast.error(message.clientMessage)

			if (status === 401) {
				navigate("/login")
			}
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<>
			<Header />

			<Main>
				<MainTitle
					size="small"
					title="Formulário para requisição de exame de imagem"
				/>

				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="flex flex-col w-full gap-8 mt-6"
					>
						<FormSection title="Dados do Requerente">
							<FormField
								control={form.control}
								name="veterinarianClinic"
								render={({ field }) => (
									<FormItem>
										<FormLabel required={ExamRequestRequiredFields.includes(field.name)}>Clínica Veterinária</FormLabel>
										<FormControl>
											<Input {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormGrid cols={3}>
								<FormField
									control={form.control}
									name="veterinarianName"
									render={({ field }) => (
										<FormItem>
											<FormLabel required={ExamRequestRequiredFields.includes(field.name)}>Médica(o) Veterinária(o)</FormLabel>
											<FormDescription>
												Nome completo do(a) Médico(a) Veterinário(a)
											</FormDescription>
											<FormControl>
												{user ? (
													<Input {...field} disabled={disableVeterinarianNameInput} />
												) : (
													<Skeleton className="h-[35px]" />
												)}
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name="veterinarianCrmv"
									render={({ field }) => (
										<FormItem>
											<FormLabel required={ExamRequestRequiredFields.includes(field.name)}>CRMV do(a) Veterinário(a)</FormLabel>
											<FormDescription>
												Inscrição no Conselho Regional de Medicina Veterinária
											</FormDescription>
											<FormControl>
												{user ? (
													<Input placeholder="00000" {...field} disabled={disableVeterinarianNameInput} />
												) : (
													<Skeleton className="h-[35px]" />
												)}
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name="veterinarianUf"
									render={({ field }) => (
										<FormItem>
											<FormLabel required={ExamRequestRequiredFields.includes(field.name)}>UF</FormLabel>
											<FormDescription>
												Unidade Federativa referente ao CRMV
											</FormDescription>
											<FormControl>
												{user ? (
													<Combobox
														className="w-full"
														onValueChange={field.onChange}
														value={user.type === UserType.Veterinarian ? user.uf : field.value}	
														items={federativeUnits}
														placeholder="Selecione uma UF"
														searchPlaceholder="Pesquise por uma UF"
														disabled={disableVeterinarianNameInput}
													/>
												) : (
													<Skeleton className="h-[35px]" />
												)}
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</FormGrid>
						</FormSection>

						<FormSection title="Dados do Paciente">
							<FormGrid cols={4}>
								<FormField
									control={form.control}
									name="patientName"
									render={({ field }) => (
										<FormItem>
											<FormLabel required={ExamRequestRequiredFields.includes(field.name)}>Nome</FormLabel>
											<FormControl>
												<Input {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name="patientAge"
									render={({ field }) => (
										<FormItem>
											<FormLabel required={ExamRequestRequiredFields.includes(field.name)}>Idade</FormLabel>
											<FormControl>
												<Input type="number" {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name="patientBreed"
									render={({ field }) => (
										<FormItem>
											<FormLabel required={ExamRequestRequiredFields.includes(field.name)}>Raça</FormLabel>
											<FormControl>
												<Input {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name="patientTutor"
									render={({ field }) => (
										<FormItem>
											<FormLabel required={ExamRequestRequiredFields.includes(field.name)}>Tutor(a)</FormLabel>
											<FormControl>
												<Input {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name="patientSpecies"
									render={({ field }) => (
										<FormItem>
											<FormLabel required={ExamRequestRequiredFields.includes(field.name)}>Espécie</FormLabel>
											<div className="grid grid-cols-1 gap-2 items-top">
												{species.map(item => (
													<CheckboxItem
														key={item.id}
														name="patientSpecies"
														formControl={form.control}
														option={item}
														singleOption
													/>
												))}
											</div>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name="patientSex"
									render={({ field }) => (
										<FormItem>
											<FormLabel required={ExamRequestRequiredFields.includes(field.name)}>Sexo</FormLabel>
											<div className="grid grid-cols-1 gap-2 items-top">
												{sexOptions.map(item => (
													<CheckboxItem
														key={item.id}
														name="patientSex"
														formControl={form.control}
														option={item}
														singleOption
													/>
												))}
											</div>
											<FormMessage />
										</FormItem>
									)}
								/>
							</FormGrid>
						</FormSection>

						<FormSection title="Dados do Exame">
							<FormField
								control={form.control}
								name="chip"
								render={({ field }) => (
									<FormItem>
										<FormLabel required={ExamRequestRequiredFields.includes(field.name)}>CHIP</FormLabel>
										<FormControl>
											<Input {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="paymentMethod"
								render={({ field }) => (
									<FormItem>
										<FormLabel required={ExamRequestRequiredFields.includes(field.name)}>Pagamento</FormLabel>
										<div className="grid grid-cols-1 gap-2 items-top">
											{paymentMethods.map(item => (
												<CheckboxItem
													key={item.id}
													name="paymentMethod"
													formControl={form.control}
													option={item}
													singleOption
												/>
											))}
										</div>
										<FormMessage />
									</FormItem>
								)}
							/>
						</FormSection>

						<FormSection title="Solicitação">
							<FormGrid cols={2}>
								<FormField
									control={form.control}
									name="softTissues"
									render={({ field }) => (
										<FormItem>
											<FormLabel required={ExamRequestRequiredFields.includes(field.name)}>Tecidos moles</FormLabel>
											<div className="grid grid-cols-1 gap-2 items-top">
												{softTissues.map(item => (
													<CheckboxItem
														key={item.id}
														name="softTissues"
														formControl={form.control}
														option={item}
													/>
												))}
											</div>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name="skullItems"
									render={({ field }) => (
										<FormItem>
											<FormLabel required={ExamRequestRequiredFields.includes(field.name)}>Crânio</FormLabel>
											<div className="grid grid-cols-2 gap-2 items-top">
												{skullItems.map(item => (
													<CheckboxItem
														key={item.id}
														name="skullItems"
														formControl={form.control}
														option={item}
													/>
												))}
											</div>
											<FormDescription>
												<sup>*</sup>Exames com necessidade de sedação para melhor
												posicionamento.
											</FormDescription>
											<FormMessage />
										</FormItem>
									)}
								/>
							</FormGrid>

							<FormGrid title="Esqueleto Apendicular" cols={3}>
								<div className="flex flex-col gap-2">
									<FormField
										control={form.control}
										name="appendicularSkeletonThoracicLimb"
										render={({ field }) => (
											<FormItem>
												<FormLabel required={ExamRequestRequiredFields.includes(field.name)}>Membro Torácico</FormLabel>
												<div className="grid grid-cols-1 gap-2 items-top">
													{appendicularSkeletonThoracicLimb.map(item => (
														<CheckboxItem
															key={item.id}
															name="appendicularSkeletonThoracicLimb"
															formControl={form.control}
															option={item}
															singleOption
														/>
													))}
												</div>
												<FormMessage />
											</FormItem>
										)}
									/>

									{form.watch("appendicularSkeletonThoracicLimb") !== "" && (
										<FormField
											control={form.control}
											name="appendicularSkeletonThoracicLimbOptions"
											render={({ field }) => (
												<FormItem>
													<FormLabel required={ExamRequestRequiredFields.includes(field.name)}>Assinalar opção:</FormLabel>
													<div className="grid grid-cols-2 gap-2 items-top">
														{appendicularSkeletonThoracicLimbOptions.map(item => (
															<CheckboxItem
																key={item.id}
																name="appendicularSkeletonThoracicLimbOptions"
																formControl={form.control}
																option={item}
															/>
														))}
													</div>
													<FormMessage />
												</FormItem>
											)}
										/>
									)}
								</div>

								<div className="flex flex-col gap-2">
									<FormField
										control={form.control}
										name="appendicularSkeletonPelvicLimb"
										render={({ field }) => (
											<FormItem>
												<FormLabel required={ExamRequestRequiredFields.includes(field.name)}>Membro Pélvico</FormLabel>
												<div className="grid grid-cols-1 gap-2 items-top">
													{appendicularSkeletonPelvicLimb.map(item => (
														<CheckboxItem
															key={item.id}
															name="appendicularSkeletonPelvicLimb"
															formControl={form.control}
															option={item}
															singleOption
														/>
													))}
												</div>
												<FormMessage />
											</FormItem>
										)}
									/>

									{form.watch("appendicularSkeletonPelvicLimb") !== "" && (
										<FormField
											control={form.control}
											name="appendicularSkeletonPelvicLimbOptions"
											render={({ field }) => (
												<FormItem>
													<FormLabel required={ExamRequestRequiredFields.includes(field.name)}>Assinalar opção:</FormLabel>
													<div className="grid grid-cols-2 gap-2 items-top">
														{appendicularSkeletonPelvicLimbOptions.map(item => (
															<CheckboxItem
																key={item.id}
																name="appendicularSkeletonPelvicLimbOptions"
																formControl={form.control}
																option={item}
															/>
														))}
													</div>
													<FormMessage />
												</FormItem>
											)}
										/>
									)}
								</div>

								<FormField
									control={form.control}
									name="appendicularSkeletonPelvis"
									render={({ field }) => (
										<FormItem>
											<FormLabel required={ExamRequestRequiredFields.includes(field.name)}>Pelve</FormLabel>
											<div className="grid grid-cols-1 gap-2 items-top">
												{appendicularSkeletonPelvis.map(item => (
													<CheckboxItem
														key={item.id}
														name="appendicularSkeletonPelvis"
														formControl={form.control}
														option={item}
													/>
												))}
											</div>
											<FormMessage />
										</FormItem>
									)}
								/>
							</FormGrid>

							<FormGrid cols={2}>
								<FormField
									control={form.control}
									name="axialSkeletonItems"
									render={({ field }) => (
										<FormItem>
											<FormLabel required={ExamRequestRequiredFields.includes(field.name)}>Esqueleto Axial</FormLabel>
											<div className="grid grid-cols-2 gap-2 items-top">
												{axialSkeletonItems.map(item => (
													<CheckboxItem
														key={item.id}
														name="axialSkeletonItems"
														formControl={form.control}
														option={item}
													/>
												))}
											</div>
											<FormDescription>
												<sup>*</sup>Exames com necessidade de sedação para melhor
												posicionamento.
											</FormDescription>
											<FormMessage />
										</FormItem>
									)}
								/>
							</FormGrid>

							<FormField
								control={form.control}
								name="observations"
								render={({ field }) => (
									<FormItem>
										<FormLabel required={ExamRequestRequiredFields.includes(field.name)}>Observações</FormLabel>
										<FormControl>
											<Textarea className="resize-none" rows={4} {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</FormSection>

						<div className="flex justify-center">
							<Button type="submit" disabled={isLoading} className="px-14">
								Enviar
							</Button>
						</div>
					</form>
				</Form>
			</Main>

			<CustomAlertDialog
				title="Arquivo de Requisição de Exame"
				description="O arquivo de requisição de exame foi gerado com sucesso. O que deseja fazer?"
				cancelText="Fechar"
				confirmText="Fazer Download"
				secondaryButtonText={"Enviar para SoundvetX"}
				onCancel={handleCloseAlert}
				onConfirm={handleDownload}
				onSecondaryButton={handleSendToSoundvetX}
				hideCancelButton={!canCloseAlert}
				hideSecondaryButton={examRequestSent || !canSendToWhatsapp}
				isOpen={isAlertOpen}
			/>
		</>
	)
}
