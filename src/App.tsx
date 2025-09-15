import React, { useState } from "react";
import { Check, Star, Zap, Crown } from "lucide-react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";

interface PriceCardProps {
  price: number;
  planName: string;
  isPopular?: boolean;
  features: string[];
  icon: React.ReactNode;
  buttonText: string;
  priceId: string;
  onPlanSelect: (priceId: string, affiliateCode: string | undefined) => void;
}

const PriceCard: React.FC<PriceCardProps> = ({
  price,
  planName,
  isPopular = false,
  features,
  icon,
  buttonText,
  priceId,
  onPlanSelect,
}) => {
  const [searchParams] = useSearchParams();
  const affiliateCode = searchParams.get("code") || undefined;

  const handlePlanSelect = async () => {
    try {
      const response = await axios.post(
        "https://test.closerx.ai/api/affiliate/landing/",
        {
          affiliate_code: affiliateCode,
          price_id: priceId,
        }
      );
      console.log("API response:", response.data);
      onPlanSelect(priceId, affiliateCode);
      if (response.status === 200) {
        window.open(response.data.payment_link_url, "_blank");
      }
    } catch (error) {
      console.error("Error selecting plan:", error);
    }
  };

  return (
    <div
      className={`relative bg-white text-gray-800 p-8 rounded-2xl shadow-xl m-4 w-80 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
        isPopular ? "ring-4 ring-purple-500 ring-opacity-50" : ""
      }`}
    >
      {isPopular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-bold flex items-center gap-1 shadow-lg">
            <Star className="w-4 h-4" />
            Most Popular
          </div>
        </div>
      )}
      <div className="text-center mb-6">
        <div
          className={`inline-flex p-3 rounded-full mb-4 ${
            isPopular
              ? "bg-gradient-to-r from-purple-100 to-pink-100"
              : "bg-gray-100"
          }`}
        >
          {icon}
        </div>
        <h3 className="text-2xl font-bold text-gray-800 mb-2">{planName}</h3>
        <div className="flex items-baseline justify-center mb-4">
          <span className="text-5xl font-extrabold text-gray-900">
            ${price}
          </span>
          <span className="text-gray-500 ml-2">/month</span>
        </div>
        <p className="text-gray-600">
          Perfect for growing your affiliate network
        </p>
      </div>
      <ul className="space-y-4 mb-8">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-3">
            <div
              className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5 ${
                isPopular ? "bg-purple-100" : "bg-gray-100"
              }`}
            >
              <Check
                className={`w-3 h-3 ${
                  isPopular ? "text-purple-600" : "text-gray-600"
                }`}
              />
            </div>
            <span className="text-gray-700 leading-relaxed">{feature}</span>
          </li>
        ))}
      </ul>
      <button
        onClick={handlePlanSelect}
        className={`w-full py-4 px-6 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-opacity-50 ${
          isPopular
            ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 shadow-lg hover:shadow-xl focus:ring-purple-500"
            : "bg-gray-800 text-white hover:bg-gray-900 shadow-md hover:shadow-lg focus:ring-gray-500"
        }`}
      >
        {buttonText}
      </button>
    </div>
  );
};

interface Plan {
  price: number;
  planName: string;
  isPopular: boolean;
  icon: React.ReactNode;
  buttonText: string;
  priceId: string;
  features: string[];
}

const App: React.FC = () => {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [searchParams] = useSearchParams();
  const priceId = searchParams.get("price_id") || undefined;
  const affiliateCode = searchParams.get("code") || undefined;
  const amount = searchParams.get("amount") || undefined;

  const plans: Plan[] = [
    {
      price: 29,
      planName: "Starter",
      isPopular: true,
      icon: <Zap className="w-6 h-6 text-purple-600" />,
      buttonText: "Start Your Journey",
      priceId: priceId || "starter_price_id",
      features: [
        "Up to 5 affiliate partners",
        "Basic analytics dashboard",
        "Email support",
        "Standard commission tracking",
        "Mobile app access",
        "Monthly performance reports",
      ],
    },
    {
      price: 97,
      planName: "Professional",
      isPopular: false,
      icon: <Star className="w-6 h-6 text-gray-600" />,
      buttonText: "Go Professional",
      priceId: priceId || "professional_price_id",
      features: [
        "Up to 25 affiliate partners",
        "Advanced analytics & insights",
        "Priority email & chat support",
        "Custom commission structures",
        "API access",
        "Weekly performance reports",
        "A/B testing tools",
        "Custom landing pages",
      ],
    },
    {
      price: 297,
      planName: "Enterprise",
      isPopular: false,
      icon: <Crown className="w-6 h-6 text-gray-600" />,
      buttonText: "Scale to Enterprise",
      priceId: priceId || "enterprise_price_id",
      features: [
        "Unlimited affiliate partners",
        "Real-time analytics & AI insights",
        "Dedicated account manager",
        "Multi-tier commission systems",
        "Full API & webhook access",
        "Daily performance reports",
        "Advanced A/B testing suite",
        "White-label solutions",
        "Custom integrations",
        "Priority phone support",
      ],
    },
  ];

  const handlePlanSelect = (priceId: string, affiliateCode: string | undefined) => {
    setSelectedPlan(priceId);
    console.log(
      `Selected plan with priceId: ${priceId}, affiliateCode: ${affiliateCode || "none"}`
    );
  };

  // Filter plans based on the amount parameter
  const selectedAmount = amount ? parseInt(amount, 10) : null;
  const filteredPlan = selectedAmount
    ? plans.find((plan) => plan.price === selectedAmount)
    : null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#483D8B] py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Choose Your Affiliate Plan
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Scale your affiliate marketing business with our comprehensive
            referral management platform
          </p>
        </div>
        <div className="flex flex-col lg:flex-row items-center justify-center gap-4">
          {filteredPlan ? (
            <PriceCard
              price={filteredPlan.price}
              planName={filteredPlan.planName}
              isPopular={filteredPlan.isPopular}
              features={filteredPlan.features}
              icon={filteredPlan.icon}
              buttonText={filteredPlan.buttonText}
              priceId={filteredPlan.priceId}
              onPlanSelect={handlePlanSelect}
            />
          ) : (
            plans.map((plan) => (
              <PriceCard
                key={plan.priceId}
                price={plan.price}
                planName={plan.planName}
                isPopular={plan.isPopular}
                features={plan.features}
                icon={plan.icon}
                buttonText={plan.buttonText}
                priceId={plan.priceId}
                onPlanSelect={handlePlanSelect}
              />
            ))
          )}
        </div>
        <div className="text-center mt-12">
          <p className="text-gray-400 text-sm">
            All plans include a 30-day money-back guarantee
          </p>
        </div>
      </div>
    </div>
  );
};

export default App;