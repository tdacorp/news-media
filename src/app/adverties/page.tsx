"use client"

import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { BarChart3, Target, TrendingUp, Users } from "lucide-react"
import Navbar from "@/components/navbar/navbar"
import Footer from "@/components/footer/footer"
import Link from "next/link"

export default function AdvertisePage() {
  const packages = [
    {
      name: "Starter",
      price: "₹5,000",
      period: "/month",
      features: ["Website banner ad", "Category page placement", "5,000+ monthly impressions", "Email support"],
    },
    {
      name: "Professional",
      price: "₹15,000",
      period: "/month",
      featured: true,
      features: [
        "Multiple banner ads",
        "Homepage featured position",
        "Sidebar placement",
        "20,000+ monthly impressions",
        "Newsletter mention",
        "Priority support",
      ],
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "pricing",
      features: [
        "Custom ad placements",
        "Exclusive partnerships",
        "Content sponsorships",
        "50,000+ monthly impressions",
        "Social media promotion",
        "Dedicated account manager",
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container mx-auto px-4 py-12">
        {/* Page Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Advertise With Us</h1>
          <p className="text-xl text-muted-foreground">Reach thousands of engaged readers across Rajgarh district</p>
        </div>

        {/* Why Advertise */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <div className="bg-card border border-border rounded-lg p-6 text-center">
            <Users className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="font-bold text-foreground mb-2">100K+ Readers</h3>
            <p className="text-sm text-muted-foreground">Active audience across Rajgarh</p>
          </div>

          <div className="bg-card border border-border rounded-lg p-6 text-center">
            <Target className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="font-bold text-foreground mb-2">Targeted Reach</h3>
            <p className="text-sm text-muted-foreground">Category-specific placements</p>
          </div>

          <div className="bg-card border border-border rounded-lg p-6 text-center">
            <TrendingUp className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="font-bold text-foreground mb-2">High Engagement</h3>
            <p className="text-sm text-muted-foreground">Quality traffic and interactions</p>
          </div>

          <div className="bg-card border border-border rounded-lg p-6 text-center">
            <BarChart3 className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="font-bold text-foreground mb-2">Detailed Analytics</h3>
            <p className="text-sm text-muted-foreground">Track ad performance</p>
          </div>
        </div>

        <Separator className="my-12" />

        {/* Ad Packages */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-8">Advertising Packages</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {packages.map((pkg) => (
              <div
                key={pkg.name}
                className={`rounded-lg border p-8 transition-all duration-300 ease-out transform ${pkg.featured
                    ? "bg-primary/5 border-primary shadow-lg scale-105"
                    : "bg-card border-border hover:shadow-xl hover:-translate-y-2 hover:scale-[1.02]"
                  }`}

              >
                {pkg.featured && (
                  <div className="bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full inline-block mb-4">
                    Most Popular
                  </div>
                )}
                <h3 className="text-2xl font-bold text-foreground mb-2">{pkg.name}</h3>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-primary">{pkg.price}</span>
                  <span className="text-muted-foreground ml-2">{pkg.period}</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {pkg.features.map((feature) => (
                    <li key={feature} className="flex items-start space-x-3">
                      <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center mt-1 flex-shrink-0">
                        <div className="w-2 h-2 rounded-full bg-primary"></div>
                      </div>
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/contact">
                  <Button className="w-full" variant={pkg.featured ? "default" : "outline"}>
                    Get Contact
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>

        <Separator className="my-12" />

        {/* Ad Placements */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-8">Available Ad Placements</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="font-bold text-lg text-foreground mb-3">Homepage Header Banner</h3>
              <p className="text-muted-foreground text-sm mb-4">
                High-visibility placement at the top of our homepage, seen by all visitors
              </p>
              <div className="bg-muted/30 rounded p-4 h-24 flex items-center justify-center text-muted-foreground">
                Ad Preview Area
              </div>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="font-bold text-lg text-foreground mb-3">Sidebar Advertisement</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Prominent placement in the sidebar visible across all category pages
              </p>
              <div className="bg-muted/30 rounded p-4 h-24 flex items-center justify-center text-muted-foreground">
                Ad Preview Area
              </div>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="font-bold text-lg text-foreground mb-3">Article In-Content Ad</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Integrated within article content for high engagement rates
              </p>
              <div className="bg-muted/30 rounded p-4 h-24 flex items-center justify-center text-muted-foreground">
                Ad Preview Area
              </div>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="font-bold text-lg text-foreground mb-3">Newsletter Sponsorship</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Featured mention in our weekly newsletter sent to all subscribers
              </p>
              <div className="bg-muted/30 rounded p-4 h-24 flex items-center justify-center text-muted-foreground">
                Ad Preview Area
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-primary/10 border border-primary/20 rounded-lg p-8 md:p-12">
          <h2 className="text-2xl font-bold text-foreground mb-4">Ready to Advertise?</h2>
          <p className="text-muted-foreground mb-6">
            Contact our advertising team to discuss custom packages and special offers
          </p>
          <Link href={"/contact"}>
            <Button size="lg" className="text-base px-8">
              Contact Our Advertising Team
            </Button>
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  )
}
