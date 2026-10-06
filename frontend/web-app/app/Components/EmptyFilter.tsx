'use client';

import { useParamsStore } from "@/hooks/useParamsStore";
import { signIn } from "next-auth/react";
import Heading from "./Heading";

type Props = {
    title?: string;
    subtitle?: string;
    showReset?: boolean;
    showLogin?: boolean;
    callbackUrl?: string;
}

export default function EmptyFilter({ 
     title = 'No matches for this filter',
     subtitle = 'Try changing the filter or search term',
     showReset,
     showLogin,
     callbackUrl
    }: Props) {
        const reset = useParamsStore(state => state.reset);

        return (
            <div className="flex flex-col gap-2 items-center justify-center h-[40vh] shadow-lg">
                <Heading title={title} subtitle={subtitle} center />
                <div className="mt-4">
                    {showReset && (
                        <button onClick={reset}>
                            Remove filters
                        </button>
                    )}

                    {showLogin && (
                        <button onClick={() => signIn('id-server', {redirectTo : callbackUrl})}>
                            Login
                        </button>
                    )}
                </div>
            </div>
        )
    }
