"use client"

import { cn } from "@/lib/utils"
import { forwardRef, useState } from "react"
import { Button } from "./ui/button"
import { InputProps, Input } from "./ui/input"
import { Eye, EyeOff } from "lucide-react"

const PasswordInput = forwardRef<HTMLInputElement, InputProps>(({ className, ...props }, ref) => {
	const [showPassword, setShowPassword] = useState(false)
	const disabled = props.disabled

	return (
		<div className="relative">
			<Input
				type={showPassword ? "text" : "password"}
				className={cn("hide-password-toggle pr-10", className)}
				ref={ref}
				{...props}
			/>
			<Button
				type="button"
				variant="ghost"
				size="sm"
				className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
				onClick={() => setShowPassword(prev => !prev)}
				disabled={props.disabled}
			>
				{showPassword && !disabled ? (
					<Eye className="h-4 w-4" aria-hidden="true" />
				) : (
					<EyeOff className="h-4 w-4" aria-hidden="true" />
				)}
				<span className="sr-only">{showPassword ? "Esconder senha" : "Mostrar senha"}</span>
			</Button>

			{/* hides browsers password toggles */}
			<style>{`
					.hide-password-toggle::-ms-reveal,
					.hide-password-toggle::-ms-clear {
						visibility: hidden;
						pointer-events: none;
						display: none;
					}
				`}</style>
		</div>
	)
})
PasswordInput.displayName = "PasswordInput"

export { PasswordInput }