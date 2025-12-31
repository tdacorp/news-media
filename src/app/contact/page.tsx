"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react"
import { useState } from "react"
import Footer from "@/components/footer/footer"
import Navbar from "@/components/navbar/navbar"
import ContactForm from "@/components/contact-form/contact-form"

export default function ContactPage() {

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container mx-auto px-4 py-12">
        {/* Page Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Contact Us</h1>
          <p className="text-xl text-muted-foreground">Get in touch with Tisari aankh News Rajgarh</p>
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
                      General: info@newshubrajgarh.com
                      <br />
                      News Tips: news@newshubrajgarh.com
                      <br />
                      Support: support@newshubrajgarh.com
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

            {/* Map Placeholder */}
            <div className="bg-muted/30 rounded-lg h-64 flex items-center justify-center border border-border">
              <div className="text-muted-foreground text-center">
                <MapPin className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p>Google Map Placeholder</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
