"use client";

import { Loader2Icon, PlusIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { toast } from "sonner";

import {
  PricingForm,
  type PricingFormInitialValues,
  type PricingFormValues,
} from "@/components/admin/pricing-form";
import {
  AdminPricingTable,
  type AdminPricingTierRow,
} from "@/components/admin/pricing-table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type PricingManagerProps = {
  initialTiers: AdminPricingTierRow[];
};

function parseFeatures(value: string) {
  return value
    .split("\n")
    .map((feature) => feature.trim())
    .filter(Boolean);
}

export function PricingManager({ initialTiers }: PricingManagerProps) {
  const router = useRouter();
  const [tiers, setTiers] = useState<AdminPricingTierRow[]>(initialTiers);
  const [formOpen, setFormOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selected, setSelected] = useState<AdminPricingTierRow | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeletingId, setIsDeletingId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const refresh = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/admin/pricing");
      if (!response.ok) throw new Error("Failed to refresh pricing tiers");
      const data = (await response.json()) as AdminPricingTierRow[];
      setTiers(data);
      router.refresh();
    } catch (error) {
      toast.error("Failed to refresh pricing tiers", {
        description:
          error instanceof Error ? error.message : "Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  }, [router]);

  function getInitialValues(): PricingFormInitialValues | null {
    if (!selected) return null;
    return {
      _id: selected._id,
      name: selected.name,
      monthlyPrice: selected.monthlyPrice,
      yearlyPrice: selected.yearlyPrice,
      features: selected.features.join("\n"),
      buttonLabel: selected.buttonLabel ?? "Get Started",
      popular: selected.popular ?? false,
    };
  }

  async function handleSubmit(values: PricingFormValues) {
    setIsSubmitting(true);
    const isEditing = Boolean(selected?._id);
    const payload = {
      ...values,
      features: parseFeatures(values.features),
    };

    try {
      const response = await fetch(
        isEditing
          ? `/api/admin/pricing/${selected?._id}`
          : "/api/admin/pricing",
        {
          method: isEditing ? "PATCH" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        },
      );

      if (!response.ok) {
        const error = await response.json().catch(() => ({
          error: "Request failed",
        }));
        throw new Error(error.error || "Request failed");
      }

      toast.success(
        isEditing ? "Pricing tier updated" : "Pricing tier created",
      );
      setFormOpen(false);
      await refresh();
    } catch (error) {
      toast.error("Failed to save pricing tier", {
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
      const response = await fetch(`/api/admin/pricing/${selected._id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({
          error: "Request failed",
        }));
        throw new Error(error.error || "Request failed");
      }

      toast.success("Pricing tier deleted");
      setDeleteOpen(false);
      await refresh();
    } catch (error) {
      toast.error("Failed to delete pricing tier", {
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
          <h1 className="text-3xl font-bold tracking-tight">Pricing Tiers</h1>
          <p className="text-muted-foreground mt-2">
            Manage pricing plans shown on the marketing site.
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
          New Tier
        </Button>
      </div>

      {isLoading ? (
        <div className="text-muted-foreground flex items-center justify-center gap-2 rounded-lg border p-8 text-sm">
          <Loader2Icon className="size-4 animate-spin" />
          Loading pricing tiers...
        </div>
      ) : (
        <AdminPricingTable
          tiers={tiers}
          onEdit={(tier) => {
            setSelected(tier);
            setFormOpen(true);
          }}
          onDelete={(tier) => {
            setSelected(tier);
            setDeleteOpen(true);
          }}
          isDeletingId={isDeletingId}
        />
      )}

      <PricingForm
        open={formOpen}
        onOpenChange={setFormOpen}
        initialValues={getInitialValues()}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
      />

      <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete pricing tier?</DialogTitle>
            <DialogDescription>
              This will permanently delete the &ldquo;{selected?.name}&rdquo;
              plan. This action cannot be undone.
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
