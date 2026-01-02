"use client"

import Footer from "@/components/footer/footer"
import Navbar from "@/components/navbar/navbar"
import { Separator } from "@/components/ui/separator"

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container mx-auto px-4 py-12 max-w-3xl">
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-8">Terms of Service</h1>

        <div className="bg-card border border-border rounded-lg p-8 mb-8">
          <p className="text-muted-foreground mb-4">Last updated: January 2025</p>

          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">1. Agreement to Terms</h2>
              <p className="text-muted-foreground leading-relaxed">
                By accessing and using this website, you accept and agree to be bound by the terms and provision of this
                agreement. If you do not agree to abide by the above, please do not use this service.
              </p>
            </section>

            <Separator />

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">2. Use License</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                {`Permission is granted to temporarily download one copy of the materials (information or software) on
                Teesri Aankh  news  Rajgarh's website for personal, non-commercial transitory viewing only. This is the grant of a
                license, not a transfer of title, and under this license you may not:`}
              </p>
              <ul className="space-y-2 ml-4">
                <li className="text-muted-foreground">• Modifying or copying the materials</li>
                <li className="text-muted-foreground">
                  • Using the materials for any commercial purpose or for any public display
                </li>
                <li className="text-muted-foreground">
                  • Attempting to decompile or reverse engineer any software contained on the website
                </li>
                <li className="text-muted-foreground">
                  • Removing any copyright or other proprietary notations from the materials
                </li>
              </ul>
            </section>

            <Separator />

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">3. Disclaimer</h2>
              <p className="text-muted-foreground leading-relaxed">
                {`The materials on Teesri Aankh  News Rajgarh's website are provided on an 'as is' basis. Teesri Aankh  News Rajgarh makes no
                warranties, expressed or implied, and hereby disclaims and negates all other warranties including,
                without limitation, implied warranties or conditions of merchantability, fitness for a particular
                purpose, or non-infringement of intellectual property or other violation of rights.`}
              </p>
            </section>

            <Separator />

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">4. Limitations</h2>
              <p className="text-muted-foreground leading-relaxed">
               {` In no event shall NewsHub Rajgarh or its suppliers be liable for any damages (including, without
                limitation, damages for loss of data or profit, or due to business interruption) arising out of the use
                or inability to use the materials on NewsHub Rajgarh's website.`}
              </p>
            </section>

            <Separator />

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">5. Accuracy of Materials</h2>
              <p className="text-muted-foreground leading-relaxed">
                {`The materials appearing on Trisai aankh News Rajgarh's website could include technical, typographical, or
                photographic errors. Teesri Aankh  News Rajgarh does not warrant that any of the materials on its website are
                accurate, complete, or current. Trisai aankh News Rajgarh may make changes to the materials contained on its
                website at any time without notice.`}
              </p>
            </section>

            <Separator />

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">6. Links</h2>
              <p className="text-muted-foreground leading-relaxed">
                {`Trisai aankh News Rajgarh has not reviewed all of the sites linked to its website and is not responsible for the
                contents of any such linked site. The inclusion of any link does not imply endorsement by Trisai aankh News
                Rajgarh of the site. Use of any such linked website is at the user's own risk.`}
              </p>
            </section>

            <Separator />

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">7. Modifications</h2>
              <p className="text-muted-foreground leading-relaxed">
                {`Trisai aankh News Rajgarh may revise these terms of service for its website at any time without notice. By using
                this website, you are agreeing to be bound by the then current version of these terms of service.`}
              </p>
            </section>

            <Separator />

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">8. Contact Us</h2>
              <p className="text-muted-foreground leading-relaxed">
                If you have any questions about these Terms of Service, please contact us at:
              </p>
              <div className="mt-4 space-y-2">
                <p className="text-muted-foreground">Email: info@teesriaankh.com</p>
                <p className="text-muted-foreground">Address: Rajgarh  Alwar District, Rajasthan </p>
              </div>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
