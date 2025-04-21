import { polar } from "@/lib/polar";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";

const pricingPlans = [
  {
    name: "Free",
    price: "$0",
    priceDetail: "Forever",
    features: [
      "✓ Extract threads (limited)",
      "✓ Download as JSON",
      "✓ Basic video downloads",
    ],
    button: {
      label: "Get Started",
      href: "/checkout?products=41582d2c-ff1a-4294-aae8-032a032b7b01",
      className: "w-full",
      variant: "outline",
    },
    border: "border border-border",
  },
  {
    name: "Plus",
    price: "$8",
    priceDetail: "per month",
    features: [
      "✓ Unlimited thread extraction",
      "✓ Download as JSON & Markdown",
      "✓ High-quality video downloads",
      "✓ Priority support",
    ],
    button: {
      label: "Upgrade to Plus",
      href: "/checkout/plus",
      className: "w-full bg-white",
      variant: undefined,
    },
    border: "border-2 border-white shadow-lg scale-105",
  },
  {
    name: "Pro",
    price: "$29",
    priceDetail: "per month",
    features: [
      "✓ All Pro features",
      "✓ Team access (up to 10 users)",
      "✓ Batch video & thread downloads",
      "✓ Dedicated support",
    ],
    button: {
      label: "Upgrade to Pro",
      href: "/checkout/pro",
      className: "w-full",
      variant: "outline",
    },
    border: "border border-border",
  },
];

const Pricing = () => {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const products = await polar.products.list({ isRecurring: true });
      setProducts(products.result.items);
    };

    fetchProducts();
  }, []);

  const productIds = products.map((product) => product.id);

  return (
    <section className="mt-32 max-w-5xl">
      <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 text-center">
        Pricing
      </h2>
      <p className="text-lg text-gray-400 mb-16 max-w-2xl mx-auto text-center">
        Simple, transparent pricing for everyone. Choose the plan that fits your
        needs.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {pricingPlans.map((plan) => (
          <div
            key={plan.name}
            className={`bg-zinc-900 rounded-xl p-8 flex flex-col items-center text-center ${plan.border}`}
          >
            <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
            <div className="text-3xl font-extrabold text-white mb-2">
              {plan.price}
            </div>
            <div className="text-gray-400 mb-4">{plan.priceDetail}</div>
            <ul className="text-gray-300 text-sm mb-6 space-y-2">
              {plan.features.map((feature, i) => (
                <li key={i}>{feature}</li>
              ))}
            </ul>
            <Button
              asChild
              className={plan.button.className}
              variant={plan.button.variant as any}
            >
              <a href={plan.button.href}>{plan.button.label}</a>
            </Button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Pricing;
