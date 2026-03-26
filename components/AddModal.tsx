"use client"

import { useActionState, useEffect, useRef, type ComponentProps } from 'react'
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogClose,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useFormStatus } from 'react-dom'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'

interface props {
    title: string,
    description: string,
    triggerText?: string,
    triggerVariant?: ComponentProps<typeof Button>["variant"],
    action: (prevState: any, formData: FormData) => Promise<{
        status: boolean;
        message: string;
    }>
}

const initialState = {
    status: false,
    message: "",
}


function SubmitButton() {
    const { pending } = useFormStatus()

    return (
        <Button
            disabled={pending}
            type="submit"
            className="px-5 py-3 text-sm font-medium text-center rounded-lg focus:outline-none"
        >{pending ? "Saving..." : "Save"}
        </Button>
    )
}

const AddModal = ({ title, description, action, triggerText = "Add", triggerVariant = "outline" }: props) => {

    const [state, formAction] = useActionState(action, initialState);
    const closeButtonRef = useRef<HTMLButtonElement>(null);
    const router = useRouter();
    
    useEffect(() => {
        if (!state.status && state.message !== "") {
            toast.error(state.message);
        }

        if (state.status && state.message !== "") {
            toast.success(state.message);
            // Close the dialog after successful submission
            closeButtonRef.current?.click();
            router.refresh();
        }
    }, [state.status, state.message, router])

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="cursor-pointer" variant={triggerVariant}>{triggerText}</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <form action={formAction} className="m-0 p-0">
                    <DialogHeader>
                        <DialogTitle>{title}</DialogTitle>
                        <DialogDescription>
                            {description}
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-8">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="title" className="text-right">
                                Title
                            </Label>
                            <Input
                                id="title"
                                name="title"
                                defaultValue=""
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="slug" className="text-right">
                                Slug
                            </Label>
                            <Input
                                id="slug"
                                name="slug"
                                defaultValue=""
                                className="col-span-3"
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button ref={closeButtonRef} type="button" variant={"secondary"}>Cancel</Button>
                        </DialogClose>
                        <SubmitButton />
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog >
    )
}

export default AddModal