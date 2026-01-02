"use client"


import Footer from "@/components/footer/footer"
import Navbar from "@/components/navbar/navbar"
import { Separator } from "@/components/ui/separator"
import { Phone, Mail, MapPin, Clock } from "lucide-react"

export default function CompanyPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container mx-auto px-4 py-12">
        {/* Page Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Company Information</h1>
          <p className="text-xl text-muted-foreground">Madadgar Teesri aankh News Rajgarh - Leading News Platform of Rajgarh , Alwar District</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 mb-12">
          {/* Company Details */}
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-6">About Our Organization</h2>
            <div className="space-y-6">
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="font-bold text-foreground mb-2">Company Name</h3>
                <p className="text-muted-foreground">Madadgar Teesri aankh News Rajgarh Media Pvt. Ltd.</p>
              </div>

              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="font-bold text-foreground mb-2">Established</h3>
                <p className="text-muted-foreground">2020</p>
              </div>

              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="font-bold text-foreground mb-2">Headquarters</h3>
                <p className="text-muted-foreground">Rajgarh Subistrict, Alwar</p>
              </div>

              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="font-bold text-foreground mb-2">Coverage Area</h3>
                <p className="text-muted-foreground">Rajgarh SubDistrict & Surrounding Regions</p>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-6">Get In Touch</h2>
            <div className="space-y-4">
              <div className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start space-x-4">
                  <MapPin className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold text-foreground">Office Address</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Main Market gol circle, Rajgarh 
                      <br />
                      Alwar District, Rajasthan
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start space-x-4">
                  <Phone className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold text-foreground">Phone</h3>
                    <p className="text-sm text-muted-foreground mt-1">+91-XXXXX XXXXX</p>
                  </div>
                </div>
              </div>

              <div className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start space-x-4">
                  <Mail className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold text-foreground">Email</h3>
                    <p className="text-sm text-muted-foreground mt-1">info@newshubrajgarh.com</p>
                  </div>
                </div>
              </div>

              <div className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start space-x-4">
                  <Clock className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold text-foreground">Working Hours</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Monday - Friday: 9:00 AM - 6:00 PM
                      <br />
                      Saturday - Sunday: 10:00 AM - 4:00 PM
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-12" />

        {/* Team Stats */}
         <div> 
          <h2 className="text-3xl font-bold text-foreground mb-8">Our Team</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="group bg-card border border-border rounded-xl p-6 text-center
            transition-all duration-300 ease-out
            hover:-translate-y-1
            hover:shadow-1xl
            hover:border-primary/50
            ">
              <div className="text-4xl font-bold text-primary mb-2">2</div>
              <p className="text-muted-foreground">Dedicated Journalists</p>
            </div>
            <div className="group bg-card border border-border rounded-xl p-6 text-center
            transition-all duration-300 ease-out
            hover:-translate-y-1
            hover:shadow-1xl
            hover:border-primary/50
            ">
              <div className="text-4xl font-bold text-primary mb-2">5K+</div>
              <p className="text-muted-foreground">Active Readers</p>
            </div>
            <div className="group bg-card border border-border rounded-xl p-6 text-center
            transition-all duration-300 ease-out
            hover:-translate-y-1
            hover:shadow-1xl
            hover:border-primary/50
            ">
              <div className="text-4xl font-bold text-primary mb-2">24/7</div>
              <p className="text-muted-foreground">News Coverage</p>
            </div>
          </div>
        </div> 
      </main>

      <Footer />
    </div>
  )
}
