'use client'
import { useRouter, usePathname } from "next/navigation";

import { Dropdown, DropdownDivider, DropdownItem } from "flowbite-react";
import { HiCog, HiUser } from "react-icons/hi";
import { AiFillTrophy, AiOutlineLogout } from "react-icons/ai";
import { AiFillCar } from "react-icons/ai";
import { User } from "next-auth";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { useParamsStore } from "@/hooks/useParamsStore";

type Props = {
    user: User
}

export default function UserActions({user}: Props) {
    const router = useRouter();
    const pathname = usePathname();
    const setParams = useParamsStore(state => state.setParams);

    function setWinner() {
        setParams({ winner : user.username, seller: undefined});
        if (pathname !== '/') {
            router.push('/');
        }
    }

    function setSeller() {
        setParams({ seller: user.username, winner: undefined });
        if (pathname !== '/') {
            router.push('/');
        }
    }

    return (
        <Dropdown inline label={`welcome ${user.name}`} className="cursor-pointer">
            <DropdownItem icon={HiUser} onClick={setSeller}>
                My Auctions
            </DropdownItem>
            <DropdownItem icon={AiFillTrophy} onClick={setWinner}>
                Auctions won
            </DropdownItem>
            <DropdownItem icon={AiFillCar}>
                <Link href='/auctions/create'>
                    Sell my car
                </Link>
            </DropdownItem>
            <DropdownItem icon={HiCog}>
                <Link href='/session'>
                    Session (dev only!)
                </Link>
            </DropdownItem>
            <DropdownDivider />
            <DropdownItem icon={AiOutlineLogout} onClick={() => signOut({redirectTo: '/'})}>
                Sign out
            </DropdownItem>
        </Dropdown>
    )
}