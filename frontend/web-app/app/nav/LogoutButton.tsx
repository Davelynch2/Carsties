'use client';
import { signOut } from "next-auth/react"
import { Button } from "flowbite-react/components/Button"

type Props = {
    name: string
    endSessionUrl: string
}

export default function LogoutButton({ name, endSessionUrl }: Props) {
    async function handleLogout() {
        await signOut({ redirect: false })
        window.location.href = endSessionUrl
    }

    return (
        <div className="flex items-center gap-3">
            <span className="text-sm text-gray-700">Welcome {name}</span>
            <Button outline onClick={handleLogout}>
                Logout
            </Button>
        </div>
    )
}
