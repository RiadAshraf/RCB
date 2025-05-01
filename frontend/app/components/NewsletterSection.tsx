import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function NewsletterSection() {
  return (
    <section className="py-16 text-center">
      <h2 className="text-3xl font-bold">Stay Updated on the Next Big Run</h2>
      <p className="mt-4 text-gray-600">Join our newsletter to receive updates about upcoming marathons and exclusive offers.</p>
      <div className="mt-6 flex justify-center items-center space-x-4">
        <Input type="email" placeholder="Enter your email" className="w-64" />
        <Button>Subscribe</Button>
      </div>
    </section>
  );
}