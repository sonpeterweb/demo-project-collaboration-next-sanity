import { TestimonialManager } from "@/components/admin/testimonial-manager";
import { writeClient } from "@/lib/sanity/client";
import { allTestimonialsQuery } from "@/lib/sanity/queries";

export const metadata = {
  title: "Testimonials",
};

export default async function AdminTestimonialsPage() {
  const testimonials = await writeClient.fetch(allTestimonialsQuery);

  return <TestimonialManager initialTestimonials={testimonials} />;
}
