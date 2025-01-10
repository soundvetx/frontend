import React from "react"

import { useAuth } from "@/contexts/auth-context"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"
import { ProfileDropdownMenu } from "@/components/profile-dropdown-menu"

import SoundvetxLogo from "@/assets/images/logo_single_primary.png"

interface HeaderProps extends React.HTMLAttributes<HTMLHeadingElement> {
    canNavigate?: boolean
    beforeNavigate?: () => void
}

const Header = React.forwardRef<HTMLHeadingElement, HeaderProps>(
	({ className, canNavigate = true, beforeNavigate = () => {}, ...props }, ref) => {
        const { user } = useAuth()

		return (
            <header
                ref={ref}
                className={cn("flex flex-row items-center justify-between w-full max-w-screen-xl mx-auto py-4 px-4", className)}
                {...props}
            >
                <img src={SoundvetxLogo} alt="SoundvetX" className="h-[30px]" />

                {user ? (
                    <div className="flex flex-row gap-1 items-center">
                        <span className="hidden md:block text-sm">{user.name}</span>
                        <ProfileDropdownMenu
                            user={user}
                            canNavigate={canNavigate}
                            beforeNavigate={beforeNavigate}
                        />
                    </div>
                ) : (
                    <div className="flex flex-row gap-1 items-center">
                        <Skeleton className="hidden md:block h-[40px] w-[150px]" />
                        <Skeleton className="h-[40px] w-[40px]" />
                    </div>
                )}
            </header>
		)
	}
)
Header.displayName = "Header"

export { Header }
