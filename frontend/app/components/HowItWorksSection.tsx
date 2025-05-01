import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function HowItWorksSection() {
  const steps = [
    { step: "✅", title: "Sign Up", description: "Create your account in less than a minute." },
    { step: "✅", title: "Browse Marathons", description: "Find events that match your schedule and preferences." },
    { step: "✅", title: "Book Slot & Pay", description: "Complete your registration with secure payment options." },
    { step: "✅", title: "Collect Bib & Run", description: "Pick up your race kit and enjoy the event!" },
  ];

  return (
    <section className="py-16 text-center">
      <h2 className="text-3xl font-bold">How It Works</h2>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-8">
        {steps.map((step, index) => (
          <Card key={index} className="shadow-lg">
            <CardHeader>
              <div className="text-blue-600 text-4xl mb-4">{step.step}</div>
              <CardTitle className="text-xl font-semibold">{step.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">{step.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}