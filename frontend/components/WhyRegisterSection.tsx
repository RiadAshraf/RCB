import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function WhyRegisterSection() {
  const features = [
    { icon: "📝", title: "Easy Registration", description: "Simple process to sign up for any marathon in just a few clicks." },
    { icon: "🔒", title: "Secure Payment", description: "Your transaction details are encrypted and protected at all times." },
    { icon: "📡", title: "Real-time Updates", description: "Get notifications about event changes, weather alerts, and more." },
    { icon: "🎽", title: "Free T-shirt & Bib Kit", description: "Receive a complimentary race kit with every registration." },
  ];

  return (
    <section className="py-16 text-center bg-white">
      <h2 className="text-3xl font-bold">Why Register Through Us?</h2>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-8">
        {features.map((feature, index) => (
          <Card key={index} className="shadow-lg">
            <CardHeader>
              <div className="text-blue-600 text-4xl mb-4">{feature.icon}</div>
              <CardTitle className="text-xl font-semibold">{feature.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">{feature.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}