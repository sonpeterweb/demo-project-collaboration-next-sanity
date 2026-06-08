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

const blogFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required"),
  authorId: z.string().min(1, "Author is required"),
  publishedAt: z.string().min(1, "Published date is required"),
  excerpt: z.string().optional(),
  content: z.string().min(1, "Content is required"),
  tags: z.string().optional(),
});

export type BlogFormValues = z.infer<typeof blogFormSchema>;

export type AuthorOption = {
  _id: string;
  name: string;
};

export type BlogFormInitialValues = Partial<BlogFormValues> & {
  _id?: string;
};

type BlogFormProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  authors: AuthorOption[];
  initialValues?: BlogFormInitialValues | null;
  onSubmit: (values: BlogFormValues) => Promise<void>;
  isSubmitting?: boolean;
};

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

const defaultValues: BlogFormValues = {
  title: "",
  slug: "",
  authorId: "",
  publishedAt: new Date().toISOString().slice(0, 16),
  excerpt: "",
  content: "",
  tags: "",
};

export function BlogForm({
  open,
  onOpenChange,
  authors,
  initialValues,
  onSubmit,
  isSubmitting = false,
}: BlogFormProps) {
  const isEditing = Boolean(initialValues?._id);

  const form = useForm<BlogFormValues>({
    resolver: zodResolver(blogFormSchema),
    defaultValues,
  });

  useEffect(() => {
    if (open) {
      form.reset({
        title: initialValues?.title ?? "",
        slug: initialValues?.slug ?? "",
        authorId: initialValues?.authorId ?? authors[0]?._id ?? "",
        publishedAt:
          initialValues?.publishedAt ?? new Date().toISOString().slice(0, 16),
        excerpt: initialValues?.excerpt ?? "",
        content: initialValues?.content ?? "",
        tags: initialValues?.tags ?? "",
      });
    }
  }, [open, initialValues, authors, form]);

  async function handleSubmit(values: BlogFormValues) {
    await onSubmit(values);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "Edit Blog Post" : "Create Blog Post"}
          </DialogTitle>
          <DialogDescription>
            {isEditing
              ? "Update the blog post details below."
              : "Add a new blog post to the site."}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Post title"
                      {...field}
                      disabled={isSubmitting}
                      onChange={(event) => {
                        field.onChange(event);
                        if (!isEditing && !form.getValues("slug")) {
                          form.setValue("slug", slugify(event.target.value));
                        }
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid gap-4 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="slug"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Slug</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="post-slug"
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
                name="authorId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Author</FormLabel>
                    <FormControl>
                      <select
                        {...field}
                        disabled={isSubmitting}
                        className="border-input bg-background focus-visible:ring-ring/50 h-9 w-full rounded-md border px-3 text-sm outline-none focus-visible:ring-[3px]"
                      >
                        <option value="">Select author</option>
                        {authors.map((author) => (
                          <option key={author._id} value={author._id}>
                            {author.name}
                          </option>
                        ))}
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="publishedAt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Published At</FormLabel>
                  <FormControl>
                    <Input
                      type="datetime-local"
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
              name="excerpt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Excerpt</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Short summary for listings"
                      className="min-h-20"
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
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Write the post content. Separate paragraphs with a blank line."
                      className="min-h-40"
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
              name="tags"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tags</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="design, product, engineering"
                      {...field}
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
                {isEditing ? "Save Changes" : "Create Post"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
