import { MainTitle } from "@/components/main-title";
import { Header } from "@/components/header";
import { Switch } from "@/components/ui/switch";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { useLoading } from "@/contexts/loading-context";
import { canSendMessageUser } from "@/http/user/can-send-message-user";
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
import { ArrowDownAZ, ArrowUpAZ, KeyRound } from "lucide-react";
import { useAuth } from "@/contexts/auth-context";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SortOrder } from "@/types/sort-order";

export function UsersPage() {
    const usersLimit = 25
    const navigate = useNavigate()
    const { user: authUser } = useAuth()
    const { setIsLoading } = useLoading()
    const [users, setUsers] = useState<User[]>([])
    const [search, setSearch] = useState<string>('')
    const [debouncedSearch, setDebouncedSearch] = useState<string>('')
    const [page, setPage] = useState<number>(0)
    const [sortOrder, setSortOrder] = useState<SortOrder>('asc')

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

    async function handleCanSendMessageChange(user: User, checked: boolean) {
        setIsLoading(true)

        try {
            await canSendMessageUser({ userId: user.id.toString() })

            const items = users.map(item => {
                if (item.id === user.id) {
                    return {
                        ...item,
                        canSendMessage: checked
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
            const { data } = await getUsers({
                page,
                limit: usersLimit,
                sortOrder,
                name: debouncedSearch
            })

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

    useEffect(() => {
        const handler = setTimeout(() => setDebouncedSearch(search), 500)
        return () => clearTimeout(handler)
    }, [search])

    useEffect(() => {
        loadUsers()
    }, [debouncedSearch, page, sortOrder])

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

                <div className="flex flex-row gap-2 mb-2 w-full">
                    <Input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        name="search"
                        placeholder="Pesquisar usuário..."
                    />

                    <Button
                        variant="outline"
                        onClick={() => sortOrder === 'asc' ? setSortOrder('desc') : setSortOrder('asc')}
                    >
                        {sortOrder === 'asc' ? (
                            <ArrowDownAZ />
                        ) : (
                            <ArrowUpAZ />
                        )}
                    </Button>
                </div>                

                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="min-w-[100px]">Tipo</TableHead>
                            <TableHead className="min-w-[200px]">Nome</TableHead>
                            <TableHead className="min-w-[150px]">E-mail</TableHead>
                            <TableHead className="min-w-[100px]">CRMV</TableHead>
                            <TableHead className="min-w-[200px]">UF</TableHead>
                            <TableHead className="min-w-[200px] text-right">Pode mandar mensagem?</TableHead>
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
                                            checked={user.canSendMessage}
                                            onCheckedChange={(checked) => {
                                                handleCanSendMessageChange(user, checked)
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

                {(page > 0 || users.length > usersLimit) && (
                    <div className="flex flex-row justify-end w-full mt-4 gap-2">
                        {page > 0 && (
                            <Button
                                size="sm"
                                onClick={() => setPage(prev => prev - 1)}
                            >
                                Anterior
                            </Button>
                        )}

                        {users.length > usersLimit && (
                            <Button
                                size="sm"
                                onClick={() => setPage(prev => prev + 1)}
                            >
                                Próxima
                            </Button>
                        )}
                    </div>
                )}
            </Main>
        </>
    )
}
