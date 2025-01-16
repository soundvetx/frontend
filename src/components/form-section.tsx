import React from "react"
import { cn } from "@/lib/utils"

interface FormSectionProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
	title?: React.ReactNode
	description?: React.ReactNode
	align?: "left" | "center" | "right"
}

const FormSection = React.forwardRef<HTMLDivElement, FormSectionProps>(
	({ className, title, description, align = "left", children, ...props }, ref) => {
		const id = React.useId()

		return (
			<div id={id} ref={ref} className={cn("flex flex-col w-full gap-2", className)} {...props}>
				<h2
					className={`text-xl sm:text-1.5xl font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-${align}`}
				>
					{title}
				</h2>

				{description && (
					<p
						className={`text-[0.8rem] text-primary leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-${align}`}
					>
						{description}
					</p>
				)}

				<div className="flex flex-col mt-2 gap-5">{children}</div>
			</div>
		)
	}
)
FormSection.displayName = "FormSection"

export { FormSection }
