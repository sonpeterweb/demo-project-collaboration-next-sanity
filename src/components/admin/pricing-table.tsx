"use client";

import { Loader2Icon, PencilIcon, Trash2Icon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export type AdminPricingTierRow = {
  _id: string;
  name: string;
  monthlyPrice: number;
  yearlyPrice: number;
  features: string[];
  buttonLabel?: string;
  popular?: boolean;
};

type AdminPricingTableProps = {
  tiers: AdminPricingTierRow[];
  onEdit: (tier: AdminPricingTierRow) => void;
  onDelete: (tier: AdminPricingTierRow) => void;
  isDeletingId?: string | null;
};

export function AdminPricingTable({
  tiers,
  onEdit,
  onDelete,
  isDeletingId,
}: AdminPricingTableProps) {
  if (tiers.length === 0) {
    return (
      <p className="text-muted-foreground rounded-lg border p-8 text-center text-sm">
        No pricing tiers yet. Create your first plan to get started.
      </p>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Monthly</TableHead>
          <TableHead>Yearly</TableHead>
          <TableHead>Features</TableHead>
          <TableHead>Popular</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tiers.map((tier) => (
          <TableRow key={tier._id}>
            <TableCell className="font-medium">{tier.name}</TableCell>
            <TableCell>${tier.monthlyPrice}</TableCell>
            <TableCell>${tier.yearlyPrice}</TableCell>
            <TableCell className="max-w-xs truncate">
              {tier.features.join(", ")}
            </TableCell>
            <TableCell>{tier.popular ? "Yes" : "No"}</TableCell>
            <TableCell className="text-right">
              <div className="flex justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => onEdit(tier)}
                  aria-label={`Edit ${tier.name} plan`}
                >
                  <PencilIcon className="size-4" />
                  Edit
                </Button>
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  onClick={() => onDelete(tier)}
                  disabled={isDeletingId === tier._id}
                  aria-label={`Delete ${tier.name} plan`}
                >
                  {isDeletingId === tier._id ? (
                    <Loader2Icon className="size-4 animate-spin" />
                  ) : (
                    <Trash2Icon className="size-4" />
                  )}
                  Delete
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
