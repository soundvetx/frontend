import React from "react"
import { cn } from "@/lib/utils"
import { Control } from "react-hook-form"
import { FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { Checkbox } from "@/components/ui/checkbox"

export type CheckboxOption = {
	id: string
	label: string
	hasObservation?: boolean
}

interface CheckboxItemProps extends React.HTMLAttributes<HTMLDivElement> {
	name: string
	formControl: Control<any, any>
	option: CheckboxOption
	singleOption?: boolean
}

const CheckboxItem = React.forwardRef<HTMLDivElement, CheckboxItemProps>(
	({ className, name, formControl, option, singleOption = false, ...props }, ref) => {
		return (
			<FormField
				key={option.id}
				control={formControl}
				name={name}
				render={({ field }) => {
					return (
						<FormItem
							key={option.id}
							ref={ref}
							className={cn(
								"flex flex-row items-start space-x-2 space-y-0",
								className
							)}
						>
							<FormControl>
								<Checkbox
									checked={field.value?.includes(option.label)}
									onCheckedChange={checked => {
										if (singleOption) {
											if (field.value?.includes(option.label)) {
												return field.onChange("")
											}
											
											return field.onChange(option.label)
										}

										if (checked) {
											return field.onChange([
												...(field.value || []),
												option.label
											])
										}

										return field.onChange(
											(field.value || []).filter(
												(v: string) => v !== option.label
											)
										)
									}}
								/>
							</FormControl>
							<FormLabel className="leading-1 font-normal">{option.label}{option.hasObservation && (<sup>*</sup>)}</FormLabel>
						</FormItem>
					)
				}}
				{...props}
			/>
		)
	}
)
CheckboxItem.displayName = "CheckboxItem"

export { CheckboxItem }
