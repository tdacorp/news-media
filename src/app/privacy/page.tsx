"use client"

import Footer from "@/components/footer/footer"
import Navbar from "@/components/navbar/navbar"
import { Separator } from "@/components/ui/separator"

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container mx-auto px-4 py-12 max-w-3xl">
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-8">Privacy Policy</h1>

        <div className="bg-card border border-border rounded-lg p-8 mb-8">
          <p className="text-muted-foreground mb-4">Last updated: January 2025</p>

          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">1. Introduction</h2>
              <p className="text-muted-foreground leading-relaxed">
                Trisai aankh News Rajgarh ("we," "us," or "our") operates the website. This page informs you of our policies
                regarding the collection, use, and disclosure of personal data when you use our service.
              </p>
            </section>

            <Separator />

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">2. Information Collection and Use</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We collect several different types of information for various purposes to provide and improve our
                service to you.
              </p>
              <ul className="space-y-2 ml-4">
                <li className="text-muted-foreground">• Personal Data: name, email address, and phone number</li>
                <li className="text-muted-foreground">
                  • Usage Data: information about how you interact with our website
                </li>
                <li className="text-muted-foreground">• Cookie Data: cookies and similar tracking technologies</li>
              </ul>
            </section>

            <Separator />

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">3. Use of Data</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                NewsHub Rajgarh uses the collected data for various purposes:
              </p>
              <ul className="space-y-2 ml-4">
                <li className="text-muted-foreground">• To provide and maintain our service</li>
                <li className="text-muted-foreground">• To notify you about changes to our service</li>
                <li className="text-muted-foreground">• To allow you to participate in interactive features</li>
                <li className="text-muted-foreground">• To provide customer support</li>
                <li className="text-muted-foreground">• To gather analysis or valuable information</li>
                <li className="text-muted-foreground">• To monitor the usage of our service</li>
              </ul>
            </section>

            <Separator />

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">4. Security of Data</h2>
              <p className="text-muted-foreground leading-relaxed">
                The security of your data is important to us, but remember that no method of transmission over the
                Internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable
                means to protect your Personal Data, we cannot guarantee its absolute security.
              </p>
            </section>

            <Separator />

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">5. Changes to This Privacy Policy</h2>
              <p className="text-muted-foreground leading-relaxed">
                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new
                Privacy Policy on this page and updating the "effective date" at the top of this Privacy Policy.
              </p>
            </section>

            <Separator />

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">6. Contact Us</h2>
              <p className="text-muted-foreground leading-relaxed">
                If you have any questions about this Privacy Policy, please contact us at:
              </p>
              <div className="mt-4 space-y-2">
                <p className="text-muted-foreground">Email: trisari@newsrajgarh.com</p>
                <p className="text-muted-foreground">Address: Rajgarh , Alwar District Rajasthan</p>
              </div>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
