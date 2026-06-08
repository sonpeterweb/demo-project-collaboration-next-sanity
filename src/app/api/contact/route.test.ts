/**
 * @jest-environment node
 */

jest.mock("../../../lib/sanity/client", () => ({
  writeClient: {
    create: jest.fn(),
  },
}));

import { writeClient } from "../../../lib/sanity/client";
import { POST } from "./route";

const mockedCreate = writeClient.create as jest.Mock;

describe("POST /api/contact", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockedCreate.mockResolvedValue({ _id: "submission-1" });
  });

  it("creates a contact submission for valid payload", async () => {
    const response = await POST(
      new Request("http://localhost/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "Jane Doe",
          email: "jane@example.com",
          company: "Acme Inc.",
          message: "We would like a product demo please.",
        }),
      }),
    );
    const data = await response.json();

    expect(response.status).toBe(201);
    expect(data).toEqual({ success: true, id: "submission-1" });
    expect(mockedCreate).toHaveBeenCalledWith(
      expect.objectContaining({
        _type: "contactSubmission",
        name: "Jane Doe",
        email: "jane@example.com",
      }),
    );
  });

  it("returns 400 for invalid payload", async () => {
    const response = await POST(
      new Request("http://localhost/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "",
          email: "not-an-email",
          company: "",
          message: "short",
        }),
      }),
    );

    expect(response.status).toBe(400);
    expect(mockedCreate).not.toHaveBeenCalled();
  });
});
