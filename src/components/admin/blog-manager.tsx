"use client";

import { Loader2Icon, PlusIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { toast } from "sonner";

import {
  type AuthorOption,
  BlogForm,
  type BlogFormInitialValues,
  type BlogFormValues,
} from "@/components/admin/blog-form";
import {
  type AdminBlogPostRow,
  BlogTable,
} from "@/components/admin/blog-table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { portableTextToPlainText } from "@/lib/sanity/portable-text";

type BlogPostDetail = AdminBlogPostRow & {
  author?: { _ref: string };
  excerpt?: string;
  content?: unknown;
};

type BlogManagerProps = {
  initialPosts: AdminBlogPostRow[];
  authors: AuthorOption[];
  postDetails: BlogPostDetail[];
};

function parseTags(tags?: string) {
  if (!tags) return [];
  return tags
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);
}

function toIsoDateTime(value?: string) {
  if (!value?.trim()) return undefined;
  return new Date(value).toISOString();
}

export function BlogManager({
  initialPosts,
  authors,
  postDetails,
}: BlogManagerProps) {
  const router = useRouter();
  const [posts, setPosts] = useState(initialPosts);
  const [formOpen, setFormOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<AdminBlogPostRow | null>(
    null,
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeletingId, setIsDeletingId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const refreshPosts = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/admin/blog");
      if (!response.ok) {
        throw new Error("Failed to refresh blog posts");
      }
      const data = (await response.json()) as AdminBlogPostRow[];
      setPosts(data);
      router.refresh();
    } catch (error) {
      toast.error("Failed to refresh blog posts", {
        description:
          error instanceof Error ? error.message : "Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  }, [router]);

  function openCreateForm() {
    setSelectedPost(null);
    setFormOpen(true);
  }

  function openEditForm(post: AdminBlogPostRow) {
    setSelectedPost(post);
    setFormOpen(true);
  }

  function openDeleteDialog(post: AdminBlogPostRow) {
    setSelectedPost(post);
    setDeleteOpen(true);
  }

  function getInitialFormValues(): BlogFormInitialValues | null {
    if (!selectedPost) return null;

    const detail = postDetails.find((post) => post._id === selectedPost._id);
    if (!detail) return null;

    return {
      _id: detail._id,
      title: detail.title,
      slug: detail.slug?.current ?? "",
      authorId: detail.author?._ref ?? "",
      publishedAt: detail.publishedAt
        ? new Date(detail.publishedAt).toISOString().slice(0, 16)
        : "",
      excerpt: detail.excerpt ?? "",
      content: portableTextToPlainText(detail.content),
      tags: detail.tags?.join(", ") ?? "",
    };
  }

  async function handleSubmit(values: BlogFormValues) {
    setIsSubmitting(true);

    const payload = {
      title: values.title,
      slug: values.slug,
      authorId: values.authorId,
      publishedAt: toIsoDateTime(values.publishedAt),
      excerpt: values.excerpt,
      content: values.content,
      tags: parseTags(values.tags),
    };

    try {
      const isEditing = Boolean(selectedPost?._id);
      const response = await fetch(
        isEditing ? `/api/admin/blog/${selectedPost?._id}` : "/api/admin/blog",
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

      toast.success(isEditing ? "Blog post updated" : "Blog post created");
      setFormOpen(false);
      await refreshPosts();
    } catch (error) {
      toast.error("Failed to save blog post", {
        description:
          error instanceof Error ? error.message : "Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleDelete() {
    if (!selectedPost) return;

    setIsDeletingId(selectedPost._id);

    try {
      const response = await fetch(`/api/admin/blog/${selectedPost._id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({
          error: "Request failed",
        }));
        throw new Error(error.error || "Request failed");
      }

      toast.success("Blog post deleted");
      setDeleteOpen(false);
      await refreshPosts();
    } catch (error) {
      toast.error("Failed to delete blog post", {
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
          <h1 className="text-3xl font-bold tracking-tight">Blog Posts</h1>
          <p className="text-muted-foreground mt-2">
            Manage blog content with create, edit, and delete actions.
          </p>
        </div>
        <Button type="button" onClick={openCreateForm}>
          <PlusIcon className="size-4" />
          New Post
        </Button>
      </div>

      {isLoading ? (
        <div className="text-muted-foreground flex items-center justify-center gap-2 rounded-lg border p-8 text-sm">
          <Loader2Icon className="size-4 animate-spin" />
          Loading posts...
        </div>
      ) : (
        <BlogTable
          posts={posts}
          onEdit={openEditForm}
          onDelete={openDeleteDialog}
          isDeletingId={isDeletingId}
        />
      )}

      <BlogForm
        open={formOpen}
        onOpenChange={setFormOpen}
        authors={authors}
        initialValues={getInitialFormValues()}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
      />

      <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete blog post?</DialogTitle>
            <DialogDescription>
              This will permanently delete &ldquo;{selectedPost?.title}&rdquo;.
              This action cannot be undone.
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
