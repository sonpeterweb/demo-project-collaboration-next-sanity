import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import { ContactForm } from "@/components/marketing/contact-form";

describe("ContactForm", () => {
  const fetchMock = jest.fn();

  beforeEach(() => {
    fetchMock.mockResolvedValue({
      ok: true,
      status: 201,
      json: async () => ({ success: true, id: "submission-1" }),
    });
    global.fetch = fetchMock as typeof fetch;
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("renders required fields", () => {
    render(<ContactForm />);

    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/company/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /send message/i }),
    ).toBeInTheDocument();
  });

  it("submits valid form data to the contact API", async () => {
    render(<ContactForm />);

    fireEvent.change(screen.getByLabelText(/name/i), {
      target: { value: "Jane Doe" },
    });
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "jane@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/company/i), {
      target: { value: "Acme Inc." },
    });
    fireEvent.change(screen.getByLabelText(/message/i), {
      target: { value: "We would like a product demo please." },
    });
    fireEvent.click(screen.getByRole("button", { name: /send message/i }));

    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalledWith(
        "/api/contact",
        expect.objectContaining({
          method: "POST",
        }),
      );
    });
  });
});
