/**
 * @jest-environment node
 */

import { NextResponse } from "next/server";

jest.mock("../../../../lib/admin-auth", () => ({
  requireAdminSession: jest.fn(),
}));

jest.mock("../../../../lib/sanity/client", () => ({
  writeClient: {
    fetch: jest.fn(),
    create: jest.fn(),
    patch: jest.fn(),
    delete: jest.fn(),
  },
}));

import { requireAdminSession } from "../../../../lib/admin-auth";
import { writeClient } from "../../../../lib/sanity/client";
import { DELETE, PATCH } from "./[id]/route";
import { GET, POST } from "./route";

const mockedRequireAdminSession = requireAdminSession as jest.MockedFunction<
  typeof requireAdminSession
>;
const mockedWriteClient = writeClient as unknown as {
  fetch: jest.Mock;
  create: jest.Mock;
  patch: jest.Mock;
  delete: jest.Mock;
};

describe("admin blog API routes", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockedRequireAdminSession.mockResolvedValue({
      session: {
        user: { id: "user-1", name: "Admin" },
        expires: "2099-01-01T00:00:00.000Z",
      },
      error: null,
    });
  });

  it("returns 401 when unauthenticated", async () => {
    mockedRequireAdminSession.mockResolvedValue({
      session: null,
      error: NextResponse.json({ error: "Unauthorized" }, { status: 401 }),
    });

    const response = await GET();

    expect(response.status).toBe(401);
  });

  it("returns blog posts for authenticated users", async () => {
    mockedWriteClient.fetch.mockResolvedValue([
      { _id: "post-1", title: "Hello" },
    ]);

    const response = await GET();
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data).toEqual([{ _id: "post-1", title: "Hello" }]);
  });

  it("creates a blog post with validated payload", async () => {
    mockedWriteClient.create.mockResolvedValue({ _id: "post-2" });

    const response = await POST(
      new Request("http://localhost/api/admin/blog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: "New Post",
          slug: "new-post",
          authorId: "author-1",
          publishedAt: new Date().toISOString(),
          content: "Body copy",
          tags: ["product"],
        }),
      }),
    );
    const data = await response.json();

    expect(response.status).toBe(201);
    expect(data).toEqual({ success: true, id: "post-2" });
    expect(mockedWriteClient.create).toHaveBeenCalled();
  });

  it("creates a draft blog post without publishedAt", async () => {
    mockedWriteClient.create.mockResolvedValue({ _id: "post-draft" });

    const response = await POST(
      new Request("http://localhost/api/admin/blog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: "Draft Post",
          slug: "draft-post",
          authorId: "author-1",
          content: "Draft body",
        }),
      }),
    );
    const data = await response.json();

    expect(response.status).toBe(201);
    expect(data).toEqual({ success: true, id: "post-draft" });
    expect(mockedWriteClient.create).toHaveBeenCalledWith(
      expect.not.objectContaining({ publishedAt: expect.anything() }),
    );
  });

  it("updates a blog post", async () => {
    const commit = jest.fn().mockResolvedValue(undefined);
    const patchChain = { unset: jest.fn().mockReturnThis(), commit };
    mockedWriteClient.patch.mockReturnValue({
      set: jest.fn().mockReturnValue(patchChain),
    });

    const response = await PATCH(
      new Request("http://localhost/api/admin/blog/post-1", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: "Updated Post",
          slug: "updated-post",
          authorId: "author-1",
          publishedAt: new Date().toISOString(),
          content: "Updated body",
        }),
      }),
      { params: Promise.resolve({ id: "post-1" }) },
    );
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data).toEqual({ success: true, id: "post-1" });
    expect(commit).toHaveBeenCalled();
  });

  it("deletes a blog post", async () => {
    mockedWriteClient.delete.mockResolvedValue(undefined);

    const response = await DELETE(
      new Request("http://localhost/api/admin/blog/post-1", {
        method: "DELETE",
      }),
      { params: Promise.resolve({ id: "post-1" }) },
    );
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data).toEqual({ success: true, id: "post-1" });
    expect(mockedWriteClient.delete).toHaveBeenCalledWith("post-1");
  });
});
