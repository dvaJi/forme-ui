"use client";

import { useState } from "react";

import { Button } from "../../components/button/button";

import {
  Pricing,
  PricingDescription,
  PricingGrid,
  PricingHeader,
  PricingTier,
  PricingTitle,
  PricingToggle,
} from "./pricing";

const tiers = [
  {
    name: "Solo",
    monthly: "$10",
    annual: "$8",
    description: "One person, one workspace, no seat maths.",
    features: ["Every free component", "Unlimited projects", "Community support"],
  },
  {
    name: "Team",
    monthly: "$30",
    annual: "$24",
    description: "Shared components, shared tokens, one bill.",
    features: [
      "Everything in Solo",
      "Shared component registry",
      "Role based access",
      "Deploy previews",
      "Email support",
    ],
  },
  {
    name: "Company",
    monthly: "$90",
    annual: "$72",
    description: "For organisations that ship their own design system.",
    features: [
      "Everything in Team",
      "Private registry",
      "SAML single sign-on",
      "Audit log",
      "Priority support",
    ],
  },
];

export function PricingDemo() {
  const [annual, setAnnual] = useState(true);

  return (
    <div className="flex flex-col gap-8">
      <Pricing>
        <PricingHeader>
          <PricingTitle>Pricing</PricingTitle>
          <PricingDescription>
            One price per seat, no feature gates on the free tier. Annual billing takes two months
            off, and the component you copied in stays yours either way.
          </PricingDescription>
        </PricingHeader>

        <div className="flex justify-center">
          <PricingToggle annual={annual} onAnnualChange={setAnnual} annualNote="Save 20%" />
        </div>

        <PricingGrid>
          {tiers.map((tier) => (
            <PricingTier
              key={tier.name}
              name={tier.name}
              price={annual ? tier.annual : tier.monthly}
              period="per seat, per month"
              description={tier.description}
              features={tier.features}
              featured={tier.name === "Team"}
            >
              <Button
                variant={tier.name === "Team" ? "primary" : "secondary"}
                className="w-full"
                asChild
              >
                <a href="https://formeui.com">
                  {tier.name === "Solo" ? "Start free" : "Start trial"}
                </a>
              </Button>
            </PricingTier>
          ))}
        </PricingGrid>
      </Pricing>

      <p className="text-center text-xs text-muted-foreground">
        Prices in USD, excluding tax. Cancel whenever you like.
      </p>
    </div>
  );
}
