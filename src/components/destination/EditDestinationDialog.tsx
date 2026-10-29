"use client";

import * as React from "react";
import { CircleCheck, X } from "lucide-react";

import { cn } from "cn";
import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const categories = [
  "Beach",
  "Mountain",
  "City",
  "Adventure",
  "Cultural",
  "Wildlife",
];

type Destination = {
  _id: string;
  destinationName: string;
  country: string;
  category: string;
  priceUsd: number;
  duration: string;
  departureDate: string;
  imageUrl?: string;
  description?: string;
};

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

export default function EditDestinationDialog({
  destination,
}: {
  destination: Destination;
}) {
  const formRef = React.useRef<HTMLFormElement>(null);

  const [open, setOpen] = React.useState(false);
  const [category, setCategory] = React.useState(destination.category);
  const [categoryError, setCategoryError] = React.useState(false);
  const [submitting, setSubmitting] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [error, setError] = React.useState("");

  React.useEffect(() => {
    if (open) {
      setCategory(destination.category);
      setCategoryError(false);
      setSuccess(false);
      setError("");
      formRef.current?.reset();
    }
  }, [open, destination]);

  function handleCancel() {
    formRef.current?.reset();
    setCategory(destination.category);
    setCategoryError(false);
    setSuccess(false);
    setError("");
    setOpen(false);
  }

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (!category) {
      setCategoryError(true);
      return;
    }

    const formData = new FormData(event.currentTarget);

    const destinationData = {
      destinationName: formData.get("destinationName"),
      country: formData.get("country"),
      category,
      priceUsd: Number(formData.get("priceUsd")),
      duration: formData.get("duration"),
      departureDate: formData.get("departureDate"),
      imageUrl: formData.get("imageUrl"),
      description: formData.get("description"),
    };

    try {
      setSubmitting(true);
      setError("");
      setSuccess(false);

      const res = await fetch(
        `http://localhost:8000/destinations/${destination._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(destinationData),
        }
      );

      if (!res.ok) {
        throw new Error("Failed to update destination.");
      }

      setSuccess(true);

      // Close the dialog after a successful update.
      setOpen(false);

      // Refresh the current page to show updated destination data.
      window.location.reload();
    } catch (err) {
      console.error("Error updating destination:", err);
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button
            type="button"
            variant="outline"
            className="rounded-md"
          >
            Edit
          </Button>
        }
      />

      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Edit Destination</DialogTitle>
          <DialogDescription>
            Update the destination details below.
          </DialogDescription>
        </DialogHeader>

        <form ref={formRef} onSubmit={handleSubmit}>
          <CardContent className="flex flex-col gap-4 px-0">
            <Field label="Destination Name" htmlFor="destinationName">
              <Input
                id="destinationName"
                name="destinationName"
                defaultValue={destination.destinationName}
                required
                placeholder="Bali Paradise"
              />
            </Field>

            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Country" htmlFor="country">
                <Input
                  id="country"
                  name="country"
                  defaultValue={destination.country}
                  required
                  placeholder="Indonesia"
                />
              </Field>

              <Field
                label="Category"
                htmlFor="category"
                error={
                  categoryError
                    ? "Please select a category."
                    : undefined
                }
              >
                <Select
                  value={category}
                  onValueChange={(value) => {
                    setCategory(value);
                    setCategoryError(false);
                  }}
                >
                  <SelectTrigger id="category" className="w-full">
                    <SelectValue placeholder="Select category" />
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
                  defaultValue={destination.priceUsd}
                  required
                />
              </Field>

              <Field label="Duration" htmlFor="duration">
                <Input
                  id="duration"
                  name="duration"
                  defaultValue={destination.duration}
                  required
                  placeholder="e.g. 7 Days/8 Nights"
                />
              </Field>
            </div>

            <Field label="Departure Date" htmlFor="departureDate">
              <Input
                id="departureDate"
                name="departureDate"
                type="date"
                defaultValue={destination.departureDate?.slice(0, 10)}
                required
              />
            </Field>

            <Field label="Image URL" htmlFor="imageUrl">
              <Input
                id="imageUrl"
                name="imageUrl"
                type="url"
                defaultValue={destination.imageUrl ?? ""}
                placeholder="https://example.com/image.jpg"
              />
            </Field>

            <Field label="Description" htmlFor="description">
              <Textarea
                id="description"
                name="description"
                rows={4}
                defaultValue={destination.description ?? ""}
                placeholder="Describe the travel experience..."
              />
            </Field>
          </CardContent>

          {error && (
            <p role="alert" className="mb-4 text-sm text-destructive">
              {error}
            </p>
          )}

          {success && (
            <p
              role="status"
              className="mb-4 flex items-center gap-2 text-sm font-medium text-green-600"
            >
              <CircleCheck className="size-4" />
              Destination updated successfully!
            </p>
          )}

          <CardFooter className="justify-end gap-2 border-t-0 bg-transparent px-0">
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
              disabled={submitting}
            >
              <X className="size-4" />
              Cancel
            </Button>

            <Button type="submit" disabled={submitting}>
              {submitting ? "Updating..." : "Update Destination"}
            </Button>
          </CardFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}