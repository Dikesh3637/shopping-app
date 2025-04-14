import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router";
import { Button } from "./ui/button";
import React, { useState } from 'react';

export default function SigninForm() {
        const [email, setEmail] = useState("");
        const [password, setPassword] = useState("");
        let navigate = useNavigate();

        const registerRedirect = () => {
                navigate("/auth/register");
        };

        const handleSubmit = async (e) => {
                e.preventDefault();
                console.log("Form submitted");
                console.log("Form submitted", email, password);

                try {
                        console.log("Sending login:", { email, password });

                        const res = await fetch("http://localhost:8080/api/users/login", {
                                method: "POST",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify({ email, password }),
                        });

                        const data = await res.json();
                        console.log('✅ Sign in successful!');
                        console.log('Received token:', data.token); // optional: log token

                        if (data.token) {
                                localStorage.setItem("token", data.token); // save token
                                navigate("/home"); // redirect to protected route
                        }
                } catch (error) {
                        console.error('❌ Error logging in:', error.message);
                }
        };
        return (
                <div className="shadow-input mx-auto w-full max-w-md rounded-none bg-white p-4 md:rounded-2xl md:p-8 dark:bg-black">
                        <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-200">
                                Welcome Back, Hero!
                        </h2>
                        <p className="mt-2 max-w-sm text-sm text-neutral-600 dark:text-neutral-300">
                                Time to gear up — the universe (and your cart) needs you.
                        </p>
                        <form className="my-8" onSubmit={handleSubmit}>
                                <LabelInputContainer className="mb-4">
                                        <Label htmlFor="email">Email Address</Label>
                                        <Input id="email" placeholder="projectmayhem@fc.com" value={email}
                                                onChange={(e) => setEmail(e.target.value)} className="w-full p-2 rounded" />
                                </LabelInputContainer>
                                <LabelInputContainer className="mb-4">
                                        <Label htmlFor="password">Password</Label>
                                        <Input id="password" placeholder="••••••••" type="password" value={password}
                                                onChange={(e) => setPassword(e.target.value)} className="w-full p-2 rounded" />
                                </LabelInputContainer>
                                <button
                                        className="group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset]"
                                        type="submit"
                                >
                                        Sign in &rarr;
                                        <BottomGradient />
                                </button>

                                <div className="my-8 h-[1px] w-full bg-gradient-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-700" />

                                <div className="flex items-center justify-center">
                                        <Button variant="link" onClick={registerRedirect}>
                                                don't have an account ? register here.
                                        </Button>
                                </div>
                        </form>
                </div>
        );
}

const BottomGradient = () => {
        return (
                <>
                        <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
                        <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
                </>
        );
};

const LabelInputContainer = ({ children, className }) => {
        return (
                <div className={cn("flex w-full flex-col space-y-2", className)}>
                        {children}
                </div>
        );
};
