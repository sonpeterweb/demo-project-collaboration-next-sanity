"use client";

import { Loader2Icon, PlusIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { toast } from "sonner";

import {
  TestimonialForm,
  type TestimonialFormInitialValues,
  type TestimonialFormValues,
} from "@/components/admin/testimonial-form";
import {
  type AdminTestimonialRow,
  TestimonialTable,
} from "@/components/admin/testimonial-table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type TestimonialManagerProps = {
  initialTestimonials: AdminTestimonialRow[];
};

export function TestimonialManager({
  initialTestimonials,
}: TestimonialManagerProps) {
  const router = useRouter();
  const [testimonials, setTestimonials] =
    useState<AdminTestimonialRow[]>(initialTestimonials);
  const [formOpen, setFormOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selected, setSelected] = useState<AdminTestimonialRow | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeletingId, setIsDeletingId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const refresh = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/admin/testimonials");
      if (!response.ok) throw new Error("Failed to refresh testimonials");
      const data = (await response.json()) as AdminTestimonialRow[];
      setTestimonials(data);
      router.refresh();
    } catch (error) {
      toast.error("Failed to refresh testimonials", {
        description:
          error instanceof Error ? error.message : "Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  }, [router]);

  function getInitialValues(): TestimonialFormInitialValues | null {
    if (!selected) return null;
    return {
      _id: selected._id,
      name: selected.name,
      company: selected.company,
      quote: selected.quote,
      rating: selected.rating ?? 5,
    };
  }

  async function handleSubmit(values: TestimonialFormValues) {
    setIsSubmitting(true);
    const isEditing = Boolean(selected?._id);

    try {
      const response = await fetch(
        isEditing
          ? `/api/admin/testimonials/${selected?._id}`
          : "/api/admin/testimonials",
        {
          method: isEditing ? "PATCH" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        },
      );

      if (!response.ok) {
        const error = await response.json().catch(() => ({
          error: "Request failed",
        }));
        throw new Error(error.error || "Request failed");
      }

      toast.success(isEditing ? "Testimonial updated" : "Testimonial created");
      setFormOpen(false);
      await refresh();
    } catch (error) {
      toast.error("Failed to save testimonial", {
        description:
          error instanceof Error ? error.message : "Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleDelete() {
    if (!selected) return;
    setIsDeletingId(selected._id);

    try {
      const response = await fetch(`/api/admin/testimonials/${selected._id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({
          error: "Request failed",
        }));
        throw new Error(error.error || "Request failed");
      }

      toast.success("Testimonial deleted");
      setDeleteOpen(false);
      await refresh();
    } catch (error) {
      toast.error("Failed to delete testimonial", {
        description:
          error instanceof Error ? error.message : "Please try again.",
      });
    } finally {
      setIsDeletingId(null);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Testimonials</h1>
          <p className="text-muted-foreground mt-2">
            Manage customer quotes shown on marketing pages.
          </p>
        </div>
        <Button
          type="button"
          onClick={() => {
            setSelected(null);
            setFormOpen(true);
          }}
        >
          <PlusIcon className="size-4" />
          New Testimonial
        </Button>
      </div>

      {isLoading ? (
        <div className="text-muted-foreground flex items-center justify-center gap-2 rounded-lg border p-8 text-sm">
          <Loader2Icon className="size-4 animate-spin" />
          Loading testimonials...
        </div>
      ) : (
        <TestimonialTable
          testimonials={testimonials}
          onEdit={(item) => {
            setSelected(item);
            setFormOpen(true);
          }}
          onDelete={(item) => {
            setSelected(item);
            setDeleteOpen(true);
          }}
          isDeletingId={isDeletingId}
        />
      )}

      <TestimonialForm
        open={formOpen}
        onOpenChange={setFormOpen}
        initialValues={getInitialValues()}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
      />

      <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete testimonial?</DialogTitle>
            <DialogDescription>
              This will permanently delete the testimonial from {selected?.name}
              . This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setDeleteOpen(false)}
              disabled={Boolean(isDeletingId)}
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant="destructive"
              onClick={handleDelete}
              disabled={Boolean(isDeletingId)}
            >
              {isDeletingId && (
                <Loader2Icon className="mr-2 size-4 animate-spin" />
              )}
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
