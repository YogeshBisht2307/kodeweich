"use client";

import React, { useRef, useState } from "react";
import toast from "react-hot-toast";
import emailjs from "@emailjs/browser";
import { Button } from "@/components/ui/button";


const ConnectForm = () => {
    const form = useRef<any>();
    const [isSending, setIsSending] = useState<boolean>(false);

    const sendEmail = (event: React.FormEvent) => {
        event.preventDefault();
        setIsSending(true);
    
        emailjs.sendForm(
            process.env.NEXT_PUBLIC_EMAIL_SERVICE_ID as string,
            process.env.NEXT_PUBLIC_EMAIL_TEMPLATE_ID as string,
            form.current, process.env.NEXT_PUBLIC_EMAIL_PUBLIC_KEY
        ).then(() => {
            form.current.reset();
            setIsSending(false);
            toast.success('Thanku! We will revert you soon.', {duration: 5000})
        }, (error) => {
            setIsSending(false);
            toast.error('Unable to send message.', {duration: 5000})
        });
    };

    return (
        <div className="max-w-screen-md py-8 mx-auto lg:py-8">
            <form ref={form} onSubmit={sendEmail} className="space-y-4">
                <div>
                    <label htmlFor="name" className="block mb-2 text-sm font-medium">Your Good Name</label>
                    <input type="name" id="name" name="user_name" className="block w-full p-3 text-sm border rounded-lg focus:outline-none bg-muted text-muted-foreground" placeholder="kodeweich" required />
                </div>
                <div>
                    <label htmlFor="email" className="block mb-2 text-sm font-medium">Your email</label>
                    <input type="email" id="email" name="user_email" className="block w-full p-3 text-sm border rounded-lg focus:outline-none bg-muted text-muted-foreground" placeholder="name@kodewiech.com" required />
                </div>
                <div className="sm:col-span-2">
                    <label htmlFor="message" className="block mb-2 text-sm font-medium">Your message</label>
                    <textarea id="message" name="message" rows={4} className="block p-2.5 w-full text-sm border rounded-lg focus:outline-none bg-muted text-muted-foreground" placeholder="Leave a comment..."></textarea>
                </div>
                <Button 
                    type="submit"
                    disabled={isSending}
                    className="px-5 py-3 text-sm font-medium text-center rounded-lg sm:w-fit focus:outline-none bg-primary text-primary-foreground float-right sm:float-left"
                >
                    {isSending ? "Sending..." : "Send message"}
                </Button>
            </form>
        </div>
    )
}

export default ConnectForm