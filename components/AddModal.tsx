"use client"

import React, { FormEvent } from 'react'
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
import { useFormState, useFormStatus } from 'react-dom'
import toast from 'react-hot-toast'

interface props {
    title: string,
    description: string,
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

const AddModal = ({ title, description, action }: props) => {

    const [state, formAction] = useFormState(action, initialState);
    if (!state.status && state.message !== "") {
        toast.error(state.message);
    }

    if (state.status) {
        toast.success(state.message);
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">Add</Button>
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
                                defaultValue="Cloud"
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
                                defaultValue="cloud"
                                className="col-span-3"
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button type="button" variant={"secondary"}>Cancel</Button>
                        </DialogClose>
                        <SubmitButton />
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog >
    )
}

export default AddModal