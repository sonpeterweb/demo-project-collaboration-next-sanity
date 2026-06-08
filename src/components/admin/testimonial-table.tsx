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

export type AdminTestimonialRow = {
  _id: string;
  name: string;
  company: string;
  quote: string;
  rating?: number;
};

type TestimonialTableProps = {
  testimonials: AdminTestimonialRow[];
  onEdit: (testimonial: AdminTestimonialRow) => void;
  onDelete: (testimonial: AdminTestimonialRow) => void;
  isDeletingId?: string | null;
};

export function TestimonialTable({
  testimonials,
  onEdit,
  onDelete,
  isDeletingId,
}: TestimonialTableProps) {
  if (testimonials.length === 0) {
    return (
      <p className="text-muted-foreground rounded-lg border p-8 text-center text-sm">
        No testimonials yet. Add your first testimonial to get started.
      </p>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Company</TableHead>
          <TableHead>Quote</TableHead>
          <TableHead>Rating</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {testimonials.map((testimonial) => (
          <TableRow key={testimonial._id}>
            <TableCell className="font-medium">{testimonial.name}</TableCell>
            <TableCell>{testimonial.company}</TableCell>
            <TableCell className="max-w-sm truncate">
              {testimonial.quote}
            </TableCell>
            <TableCell>{testimonial.rating ?? "—"}</TableCell>
            <TableCell className="text-right">
              <div className="flex justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => onEdit(testimonial)}
                  aria-label={`Edit testimonial from ${testimonial.name}`}
                >
                  <PencilIcon className="size-4" />
                  Edit
                </Button>
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  onClick={() => onDelete(testimonial)}
                  disabled={isDeletingId === testimonial._id}
                  aria-label={`Delete testimonial from ${testimonial.name}`}
                >
                  {isDeletingId === testimonial._id ? (
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
