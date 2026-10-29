"use client";

import * as React from "react";
import { CircleCheck, Plus, X } from "lucide-react";
import { cn } from "cn";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";

const categories = [
    "Beach",
    "Mountain",
    "City",
    "Adventure",
    "Cultural",
    "Wildlife",
];

function Field({
    label,
    htmlFor,
    error,
    className,
    children,
}: {
    label: string;
    htmlFor: string;
    error?: string;
    className?: string;
    children: React.ReactNode;
}) {
    return (
        <div className={cn("flex flex-col gap-1.5", className)}>
            <Label htmlFor={htmlFor}>{label}</Label>
            {children}
            {error ? (
                <p className="text-xs font-medium text-destructive">{error}</p>
            ) : null}
        </div>
    );
}

export default function AddDestinationPage() {
    const formRef = React.useRef<HTMLFormElement>(null);
    const [category, setCategory] = React.useState<string | null>(null);
    const [categoryError, setCategoryError] = React.useState(false);
    const [submitted, setSubmitted] = React.useState(false);
    const router = useRouter();

    function resetFields() {
        formRef.current?.reset();
        setCategory(null);
        setCategoryError(false);
    }

    function handleCancel() {
        resetFields();
        setSubmitted(false);
    }


    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        // Validate category
        if (!category) {
            setCategoryError(true);
            return;
        }

        // Collect all native form input values
        const formData = new FormData(event.currentTarget);

        // Convert form values into an object
        const destinationData = {
            destinationName: formData.get("destinationName"),
            country: formData.get("country"),
            category: category,
            priceUsd: Number(formData.get("priceUsd")),
            duration: formData.get("duration"),
            departureDate: formData.get("departureDate"),
            imageUrl: formData.get("imageUrl"),
            description: formData.get("description"),
        };

        try {
            const res = await fetch("http://localhost:8000/add-destination", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(destinationData),
            });
           
            console.log(destinationData)
            if (!res.ok) {
                throw new Error("Failed to add destination");
            }

            resetFields();
            
            setSubmitted(true);
            router.push('/destinations')

        } catch (error) {
            console.error("Error adding destination:", error);
        }
    }


    return (
        <main className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 sm:py-10">
            <h1 className="text-3xl font-medium tracking-tight sm:text-4xl">
                Add New Travel Package
            </h1>

            <div className="mt-6 rounded-2xl border border-dashed border-brand/60 p-4 sm:p-6">
                <Card className="shadow-sm ring-border/60">
                    <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col">
                        <CardContent className="flex flex-col gap-4">
                            <Field label="Destination Name" htmlFor="destinationName">
                                <Input
                                    id="destinationName"
                                    name="destinationName"
                                    required
                                    placeholder="Bali Paradise"
                                    className="bg-muted/50"
                                />
                            </Field>

                            <div className="grid gap-4 sm:grid-cols-2">
                                <Field label="Country" htmlFor="country">
                                    <Input
                                        id="country"
                                        name="country"
                                        required
                                        placeholder="Indonesia"
                                        className="bg-muted/50"
                                    />
                                </Field>

                                <Field
                                    label="Category"
                                    htmlFor="category"
                                    error={categoryError ? "Please select a category." : undefined}
                                >
                                    <Select
                                        value={category}
                                        onValueChange={(value) => {
                                            setCategory(value);
                                            setCategoryError(false);
                                        }}
                                    >
                                        <SelectTrigger id="category" className="w-full bg-muted/50">
                                            <SelectValue placeholder="Beach" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {categories.map((option) => (
                                                <SelectItem key={option} value={option}>
                                                    {option}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </Field>
                            </div>

                            <div className="grid gap-4 sm:grid-cols-2">
                                <Field label="Price (USD)" htmlFor="priceUsd">
                                    <Input
                                        id="priceUsd"
                                        name="priceUsd"
                                        type="number"
                                        min={0}
                                        step="1"
                                        required
                                        placeholder="e.g. 1299"
                                        className="bg-muted/50"
                                    />
                                </Field>

                                <Field label="Duration" htmlFor="duration">
                                    <Input
                                        id="duration"
                                        name="duration"
                                        required
                                        placeholder="e.g., 7 Days/8 Nights"
                                        className="bg-muted/50"
                                    />
                                </Field>
                            </div>

                            <Field label="Departure Date" htmlFor="departureDate">
                                <Input
                                    id="departureDate"
                                    name="departureDate"
                                    type="date"
                                    required
                                    className="bg-muted/50"
                                />
                            </Field>

                            <Field label="Image URL" htmlFor="imageUrl">
                                <Input
                                    id="imageUrl"
                                    name="imageUrl"
                                    type="url"
                                    placeholder="https://example.com/image.jpg"
                                    className="bg-muted/50"
                                />
                            </Field>

                            <Field label="Description" htmlFor="description">
                                <Textarea
                                    id="description"
                                    name="description"
                                    rows={4}
                                    placeholder="Describe the travel experience..."
                                    className="min-h-28 bg-muted/50"
                                />
                            </Field>
                        </CardContent>

                        {submitted ? (
                            <div className="px-(--card-spacing)">
                                <p
                                    role="status"
                                    className="flex items-center gap-2 rounded-lg border border-brand/30 bg-brand/10 px-3 py-2 text-sm font-medium text-brand"
                                >
                                    <CircleCheck className="size-4 shrink-0" aria-hidden="true" />
                                    Travel package added — demo only, nothing is saved yet.
                                </p>
                            </div>
                        ) : null}

                        <CardFooter className="justify-end gap-2 border-t-0 bg-transparent">
                            <Button
                                type="button"
                                variant="outline"
                                size="lg"
                                onClick={handleCancel}
                                className="border-destructive/40 text-destructive hover:bg-destructive/10 hover:text-destructive"
                            >
                                <X aria-hidden="true" />
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                size="lg"
                                className="bg-brand text-white hover:bg-brand/90"
                            >
                                <Plus aria-hidden="true" />
                                Add Travel Package
                            </Button>
                        </CardFooter>
                    </form>
                </Card>
            </div>
        </main>
    );
}
