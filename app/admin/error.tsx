'use client';

import { useEffect } from 'react';

export default function Error({ error, reset }: {
    error: Error & { digest?: string };
    reset: () => void;
}) {

    let errorText = error.digest === "3564161799" ? "Invalid user credentials": error.digest
    useEffect(() => {
    }, [error]);

    return (
        <main className="max-w-xs py-8 mx-auto lg:pt-16 flex h-full flex-col items-center justify-center">
            <h2 className="text-center text-lg font-bold">Something Went Wrong!</h2>
            <p className="text-center">Error Code:- {errorText}</p>
            <button
                className="mt-4 rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground transition-colors"
                onClick={
                    () => reset()
                }
            >
                Try again
            </button>
        </main>
    );
}