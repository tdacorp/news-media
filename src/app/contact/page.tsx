"use client"

import Footer from "@/components/footer/footer"
import Navbar from "@/components/navbar/navbar"
import ContactForm from "@/components/contact-form/contact-form"
import { Clock, Mail, MapPin, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ContactPage() {

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container mx-auto px-4 py-12">
        {/* Page Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Contact Us</h1>
          <p className="text-xl text-muted-foreground">Get in touch with Teesri aankh News Rajgarh</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <ContactForm />

          {/* Contact Information */}
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-6">Contact Information</h2>

            <div className="space-y-4 mb-8">
              <div className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-start space-x-4">
                  <MapPin className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold text-foreground mb-2">Office Address</h3>
                    <p className="text-muted-foreground">
                      main market gol circle
                      <br />
                      Rajgarh , 301408
                      <br />
                      alwar, Rajasthan
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-start space-x-4">
                  <Phone className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold text-foreground mb-2">Phone Numbers</h3>
                    <p className="text-muted-foreground">
                      Main: +91-XXXXX XXXXX
                      <br />
                      Editorial: +91-XXXXX XXXXX
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-start space-x-4">
                  <Mail className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold text-foreground mb-2">Email Addresses</h3>
                    <p className="text-muted-foreground">
                      General: info@teesriaankh.com
                      <br />
                      News Tips: news@teesriaankh.com
                      <br />
                      Support: support@teesriaankh.com
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-start space-x-4">
                  <Clock className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold text-foreground mb-2">Business Hours</h3>
                    <p className="text-muted-foreground">
                      Monday - Friday: 9:00 AM - 6:00 PM
                      <br />
                      Saturday - Sunday: 10:00 AM - 4:00 PM
                      <br />
                      Holidays: Closed
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Google Map */}
            <div className="rounded-lg overflow-hidden border border-border h-64">
              {/* Google Map */}
              <div className="rounded-lg overflow-hidden border border-border h-64">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7094.9846192483365!2d76.61034081703858!3d27.235085068398277!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39727d21db10519f%3A0x73b0d1b30e68ef3b!2sAshirwad%20Garden!5e0!3m2!1sen!2sin!4v1767164628790!5m2!1sen!2sin"
                  className="w-full h-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>
            </div>
            <Button
              variant="outline"
              className="mt-3"
              asChild
            >
              <a
                href="https://maps.app.goo.gl/V3qoK7JqHy3UAs6Y8"
                target="_blank"
                rel="noopener noreferrer"
              >
                View on Map
              </a>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
