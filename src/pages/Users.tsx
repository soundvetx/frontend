import { MainTitle } from "@/components/main-title";
import { Header } from "@/components/header";
import { Switch } from "@/components/ui/switch";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { useLoading } from "@/contexts/loading-context";
import { canSendWhatsappUser } from "@/http/user/can-send-whatsapp-user";
import { deleteUser } from "@/http/user/delete-user";
import { getUsers } from "@/http/user/get-users";
import { restoreUser } from "@/http/user/restore-user";
import { RequestErrorClient } from "@/types/request";
import { User, UserType } from "@/types/user";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { UserFormDialog } from "@/components/user-form-dialog";
import { UserTypes } from "@/utils/options";
import { FormState } from "@/types/form";
import { ToggleDeleteRestoreButton } from "@/components/toggle-delete-restore-button";
import { Main } from "@/components/main";
import { PasswordResetDialog } from "@/components/password-form-dialog";
import { KeyRound } from "lucide-react";
import { useAuth } from "@/contexts/auth-context";
import { useNavigate } from "react-router-dom";

export function UsersPage() {
    const navigate = useNavigate()
    const { user: authUser } = useAuth()
    const { setIsLoading } = useLoading()
    const [users, setUsers] = useState<User[]>([])

    function handleCreateUser(user: User) {
        users.push(user)
        setUsers(users)
    }

    function handleUpdateUser(user: User) {
        const items = users.map(item => {
            if (item.id === user.id) {
                return {...user}
            }

            return item
        })

        setUsers(items)
    }

    async function handleRestoreUser(user: User) {
        setIsLoading(true)

        try {
            const { message } = await restoreUser({ userId: user.id.toString() })

            const items = users.map(item => {
                if (item.id === user.id) {
                    return {
                        ...item,
                        isActive: true
                    }
                }
    
                return item
            })
    
            setUsers(items)

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

    async function handleDeleteUser(user: User) {
        setIsLoading(true)

        try {
            const { message } = await deleteUser({ userId: user.id.toString() })

            const items = users.map(item => {
                if (item.id === user.id) {
                    return {
                        ...item,
                        isActive: false
                    }
                }
    
                return item
            })
    
            setUsers(items)

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

    async function handleCanSendWhatsappChange(user: User, checked: boolean) {
        setIsLoading(true)

        try {
            await canSendWhatsappUser({ userId: user.id.toString() })

            const items = users.map(item => {
                if (item.id === user.id) {
                    return {
                        ...item,
                        canSendWhatsapp: checked
                    }
                }
    
                return item
            })
    
            setUsers(items)
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

    async function loadUsers() {
        setIsLoading(true)

        try {
            const { data } = await getUsers()

            setUsers(data.users)
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

    useEffect(() => {
        loadUsers()
    }, [])

    return (
        <>
            <Header />

            <Main>
				<MainTitle
					size="small"
					title="Gerenciamento de usuários"
				/>

                <div className="flex flex-row justify-end w-full my-4">
                    <UserFormDialog
                        state={FormState.Create}
                        onClose={handleCreateUser}
                    />
                </div>

                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="min-w-[100px]">Tipo</TableHead>
                            <TableHead className="min-w-[200px]">Nome</TableHead>
                            <TableHead className="min-w-[150px]">E-mail</TableHead>
                            <TableHead className="min-w-[100px]">CRMV</TableHead>
                            <TableHead className="min-w-[200px]">UF</TableHead>
                            <TableHead className="min-w-[200px] text-right">Pode mandar WhatsApp?</TableHead>
                            <TableHead className="min-w-[100px]"></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {users.map(user => {
                            const userType = UserTypes.find(item => item.value === user.type)?.label

                            return (
                                <TableRow key={user.id}>
                                    <TableCell>{userType}</TableCell>
                                    <TableCell>{user.name}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>{user.type === UserType.Veterinarian ? user.crmv : "Não se aplica"}</TableCell>
                                    <TableCell>{user.type === UserType.Veterinarian ? user.uf : "Não se aplica"}</TableCell>
                                    <TableCell className="text-right">
                                        <Switch
                                            checked={user.canSendWhatsapp}
                                            onCheckedChange={(checked) => {
                                                handleCanSendWhatsappChange(user, checked)
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell className="ml-2 flex gap-1">
                                        <UserFormDialog
                                            state={FormState.Update}
                                            user={user}
                                            onClose={handleUpdateUser}
                                            disabled={user.id === authUser?.id}
                                        />

                                        <PasswordResetDialog
                                            user={user}
                                            children={<KeyRound />}
                                            size="icon"
                                            variant="outline"
                                            title="Redefinir senha"
                                            disabled={user.id === authUser?.id}
                                        />

                                        <ToggleDeleteRestoreButton
                                            isDeleted={!user.isActive}
                                            onDelete={() => {
                                                handleDeleteUser(user)
                                            }}
                                            onRestore={() => {
                                                handleRestoreUser(user)
                                            }}
                                            disabled={user.id === authUser?.id}
                                        />
                                    </TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </Main>
        </>
    )
}
