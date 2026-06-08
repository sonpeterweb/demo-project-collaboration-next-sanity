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

export type AdminBlogPostRow = {
  _id: string;
  title: string;
  slug?: { current: string };
  authorName?: string;
  publishedAt?: string;
  tags?: string[];
};

type BlogTableProps = {
  posts: AdminBlogPostRow[];
  onEdit: (post: AdminBlogPostRow) => void;
  onDelete: (post: AdminBlogPostRow) => void;
  isDeletingId?: string | null;
};

function formatDate(value?: string) {
  if (!value) return "Draft";
  return new Date(value).toLocaleDateString();
}

export function BlogTable({
  posts,
  onEdit,
  onDelete,
  isDeletingId,
}: BlogTableProps) {
  if (posts.length === 0) {
    return (
      <p className="text-muted-foreground rounded-lg border p-8 text-center text-sm">
        No blog posts yet. Create your first post to get started.
      </p>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Title</TableHead>
          <TableHead>Author</TableHead>
          <TableHead>Published</TableHead>
          <TableHead>Tags</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {posts.map((post) => (
          <TableRow key={post._id}>
            <TableCell className="max-w-xs truncate font-medium">
              {post.title}
            </TableCell>
            <TableCell>{post.authorName ?? "—"}</TableCell>
            <TableCell>{formatDate(post.publishedAt)}</TableCell>
            <TableCell className="max-w-xs truncate">
              {post.tags?.join(", ") || "—"}
            </TableCell>
            <TableCell className="text-right">
              <div className="flex justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => onEdit(post)}
                  aria-label={`Edit ${post.title}`}
                >
                  <PencilIcon className="size-4" />
                  Edit
                </Button>
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  onClick={() => onDelete(post)}
                  disabled={isDeletingId === post._id}
                  aria-label={`Delete ${post.title}`}
                >
                  {isDeletingId === post._id ? (
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
