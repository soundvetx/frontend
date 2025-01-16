import React from "react"
import {
	LogOut,
	User as UserIcon,
	CircleUser,
	ListTodo,
	Users
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { User, UserType } from "@/types/user"
import { UserTypes } from "@/utils/options"
import { useAuth } from "@/contexts/auth-context"
import { CustomDropdownMenuItem } from "./custom-dropdown-menu-item"

interface ProfileDropdownMenuProps extends React.HTMLAttributes<HTMLDivElement> {
	user: User
	canNavigate?: boolean
	beforeNavigate?: () => void
}

const ProfileDropdownMenu = React.forwardRef<HTMLDivElement, ProfileDropdownMenuProps>(
	({ user, canNavigate = true, beforeNavigate = () => {} }, ref) => {
	const { signOut } = useAuth()

	const userTypeName = UserTypes.find((type) => type.value === user.type)?.label
	const userLabel = user.type === UserType.Veterinarian ? `CRMV ${user.crmv}/${user.uf}` : userTypeName

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" size="icon" className="focus-visible:ring-0">
					<CircleUser className="w-7 h-7" />
				</Button>
			</DropdownMenuTrigger>

			<DropdownMenuContent className="w-56" ref={ref}>
				<DropdownMenuLabel className="flex flex-col gap-0">
					<span className="md:hidden">{user.name}</span>
					<span>{userLabel}</span>
				</DropdownMenuLabel>

				<DropdownMenuSeparator />

				<DropdownMenuGroup className="flex flex-col gap-1">
					<CustomDropdownMenuItem
						route="/users"
						selected={window.location.pathname === "/users"}
						needsAdminPrivileges={true}
						canNavigate={canNavigate}
						beforeNavigate={beforeNavigate}
					>
						<Users className="mr-2 h-4 w-4" />
						<span>Usuários</span>
					</CustomDropdownMenuItem>

					<CustomDropdownMenuItem
						route="/"
						selected={window.location.pathname === "/"}
						needsAdminPrivileges={false}
						canNavigate={canNavigate}
						beforeNavigate={beforeNavigate}
					>
						<ListTodo className="mr-2 h-4 w-4" />
						<span>Formulário</span>
					</CustomDropdownMenuItem>
				</DropdownMenuGroup>

				<DropdownMenuSeparator />

				<DropdownMenuGroup className="flex flex-col gap-1">
					<CustomDropdownMenuItem
						route="/profile"
						selected={window.location.pathname === "/profile"}
						needsAdminPrivileges={false}
						canNavigate={canNavigate}
						beforeNavigate={beforeNavigate}
					>
						<UserIcon className="mr-2 h-4 w-4" />
						<span>Perfil</span>
					</CustomDropdownMenuItem>
				</DropdownMenuGroup>

				<DropdownMenuSeparator />

				<CustomDropdownMenuItem
					onClick={signOut}
					selected={false}
					needsAdminPrivileges={false}
					canNavigate={canNavigate}
					beforeNavigate={beforeNavigate}
				>
					<LogOut className="mr-2 h-4 w-4" />
					<span>Sair</span>
				</CustomDropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
})

ProfileDropdownMenu.displayName = "ProfileDropdownMenu"

export { ProfileDropdownMenu }
