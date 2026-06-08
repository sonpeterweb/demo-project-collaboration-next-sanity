"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2Icon } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const testimonialFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  company: z.string().min(1, "Company is required"),
  quote: z.string().min(1, "Quote is required"),
  rating: z.number().min(0).max(5),
});

export type TestimonialFormValues = z.infer<typeof testimonialFormSchema>;

export type TestimonialFormInitialValues = Partial<TestimonialFormValues> & {
  _id?: string;
};

type TestimonialFormProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialValues?: TestimonialFormInitialValues | null;
  onSubmit: (values: TestimonialFormValues) => Promise<void>;
  isSubmitting?: boolean;
};

const defaultValues: TestimonialFormValues = {
  name: "",
  company: "",
  quote: "",
  rating: 5,
};

export function TestimonialForm({
  open,
  onOpenChange,
  initialValues,
  onSubmit,
  isSubmitting = false,
}: TestimonialFormProps) {
  const isEditing = Boolean(initialValues?._id);

  const form = useForm<TestimonialFormValues>({
    resolver: zodResolver(testimonialFormSchema),
    defaultValues,
  });

  useEffect(() => {
    if (open) {
      form.reset({
        name: initialValues?.name ?? "",
        company: initialValues?.company ?? "",
        quote: initialValues?.quote ?? "",
        rating: initialValues?.rating ?? 5,
      });
    }
  }, [open, initialValues, form]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "Edit Testimonial" : "Create Testimonial"}
          </DialogTitle>
          <DialogDescription>
            {isEditing
              ? "Update the testimonial details below."
              : "Add a new customer testimonial."}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={isSubmitting} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="company"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={isSubmitting} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="quote"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quote</FormLabel>
                  <FormControl>
                    <Textarea
                      className="min-h-28"
                      {...field}
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="rating"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rating (0–5)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min={0}
                      max={5}
                      value={field.value}
                      onChange={(event) =>
                        field.onChange(Number(event.target.value))
                      }
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting && (
                  <Loader2Icon className="mr-2 size-4 animate-spin" />
                )}
                {isEditing ? "Save Changes" : "Create Testimonial"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
