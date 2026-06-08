import { BlogManager } from "@/components/admin/blog-manager";
import { writeClient } from "@/lib/sanity/client";
import {
  allAuthorsQuery,
  allBlogPostsAdminQuery,
  blogPostByIdAdminQuery,
} from "@/lib/sanity/queries";

export const metadata = {
  title: "Blog Posts",
};

export default async function AdminBlogPage() {
  const [posts, authors] = await Promise.all([
    writeClient.fetch(allBlogPostsAdminQuery),
    writeClient.fetch(allAuthorsQuery),
  ]);

  const postDetails = await Promise.all(
    posts.map((post: { _id: string }) =>
      writeClient.fetch(blogPostByIdAdminQuery, { id: post._id }),
    ),
  );

  return (
    <BlogManager
      initialPosts={posts}
      authors={authors}
      postDetails={postDetails.filter(Boolean)}
    />
  );
}
