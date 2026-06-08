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

const pricingFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  monthlyPrice: z.number().min(0, "Monthly price must be 0 or greater"),
  yearlyPrice: z.number().min(0, "Yearly price must be 0 or greater"),
  features: z.string().min(1, "At least one feature is required"),
  buttonLabel: z.string().optional(),
  popular: z.boolean(),
});

export type PricingFormValues = z.infer<typeof pricingFormSchema>;

export type PricingFormInitialValues = Partial<PricingFormValues> & {
  _id?: string;
};

type PricingFormProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialValues?: PricingFormInitialValues | null;
  onSubmit: (values: PricingFormValues) => Promise<void>;
  isSubmitting?: boolean;
};

const defaultValues: PricingFormValues = {
  name: "",
  monthlyPrice: 0,
  yearlyPrice: 0,
  features: "",
  buttonLabel: "Get Started",
  popular: false,
};

export function PricingForm({
  open,
  onOpenChange,
  initialValues,
  onSubmit,
  isSubmitting = false,
}: PricingFormProps) {
  const isEditing = Boolean(initialValues?._id);

  const form = useForm<PricingFormValues>({
    resolver: zodResolver(pricingFormSchema),
    defaultValues,
  });

  useEffect(() => {
    if (open) {
      form.reset({
        name: initialValues?.name ?? "",
        monthlyPrice: initialValues?.monthlyPrice ?? 0,
        yearlyPrice: initialValues?.yearlyPrice ?? 0,
        features: initialValues?.features ?? "",
        buttonLabel: initialValues?.buttonLabel ?? "Get Started",
        popular: initialValues?.popular ?? false,
      });
    }
  }, [open, initialValues, form]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "Edit Pricing Tier" : "Create Pricing Tier"}
          </DialogTitle>
          <DialogDescription>
            {isEditing
              ? "Update the pricing tier details below."
              : "Add a new pricing plan."}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Plan Name</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={isSubmitting} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid gap-4 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="monthlyPrice"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Monthly Price ($)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min={0}
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

              <FormField
                control={form.control}
                name="yearlyPrice"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Yearly Price ($)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min={0}
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
            </div>

            <FormField
              control={form.control}
              name="features"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Features</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="One feature per line"
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
              name="buttonLabel"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Button Label</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={isSubmitting} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="popular"
              render={({ field }) => (
                <FormItem className="flex items-center gap-3 space-y-0">
                  <FormControl>
                    <input
                      type="checkbox"
                      checked={field.value}
                      onChange={field.onChange}
                      disabled={isSubmitting}
                      className="size-4 rounded border"
                      aria-label="Mark as popular plan"
                    />
                  </FormControl>
                  <FormLabel className="font-normal">
                    Mark as popular plan
                  </FormLabel>
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
                {isEditing ? "Save Changes" : "Create Tier"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
