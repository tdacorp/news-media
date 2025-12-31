"use client"

import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Users, Target, Award, Globe } from "lucide-react"
import Navbar from "@/components/navbar/navbar"
import Footer from "@/components/footer/footer"
import SubscribeNewsForm from "@/components/suscribe-news-form/suscribe-news"

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-background">
            <Navbar />

            <main className="container mx-auto px-4 py-12">
                {/* Page Header */}
                <div className="mb-12">
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground mb-4">About NewsHub Rajgarh</h1>
                    <h2 className="text-3xl font-bold tracking-tight text-foreground mb-8">Your trusted source for Rajgarh district news and near villages </h2>
                </div>

                {/* Mission Vision */}
                <div className="grid md:grid-cols-2 gap-8 mb-12">
                    <div className="bg-card border border-border rounded-lg p-8">
                        <h2 className="text-2xl font-bold text-foreground mb-4">Our Mission</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            To deliver accurate, timely, and unbiased news coverage of Rajgarh district and surrounding regions. We
                            are committed to bringing you the stories that matter, from local government decisions to community
                            achievements, business developments, and cultural events.
                        </p>
                    </div>

                    <div className="bg-card border border-border rounded-lg p-8">
                        <h2 className="text-2xl font-bold text-foreground mb-4">Our Vision</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            To be Rajgarh's leading news platform, empowering citizens with reliable information and fostering a
                            well-informed community. We believe in journalism that makes a difference and holds accountability at all
                            levels.
                        </p>
                    </div>
                </div>

                <Separator className="my-12" />

                {/* Why Choose Us */}
                <div className="mb-12">
                    <h2 className="text-3xl font-bold text-foreground mb-8">Why Choose NewsHub Rajgarh</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="
                                group bg-card border border-border rounded-xl p-6
                                transition-all duration-300 ease-out
                                hover:-translate-y-2
                                hover:shadow-2xl
                                hover:border-primary/50
                                ">

                            <Target className="
                                w-12 h-12 text-primary mb-4
                                transition-transform duration-300
                                group-hover:scale-110
                                " />

                            <h3 className="text-lg font-bold text-foreground mb-2">Targeted Coverage</h3>
                            <p className="text-sm text-muted-foreground">
                                Focused on Rajgarh district news and local developments that directly impact our community.
                            </p>
                        </div>

                        <div className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-shadow">
                            <Award className="w-12 h-12 text-primary mb-4" />
                            <h3 className="text-lg font-bold text-foreground mb-2">Verified Facts</h3>
                            <p className="text-sm text-muted-foreground">
                                Every story is thoroughly researched and verified before publication to ensure accuracy.
                            </p>
                        </div>

                        <div className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-shadow">
                            <Users className="w-12 h-12 text-primary mb-4" />
                            <h3 className="text-lg font-bold text-foreground mb-2">Community First</h3>
                            <p className="text-sm text-muted-foreground">
                                We prioritize stories that matter to Rajgarh residents and involve the community in our coverage.
                            </p>
                        </div>

                        <div className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-shadow">
                            <Globe className="w-12 h-12 text-primary mb-4" />
                            <h3 className="text-lg font-bold text-foreground mb-2">24/7 Updates</h3>
                            <p className="text-sm text-muted-foreground">
                                Stay updated with breaking news, live coverage, and in-depth analysis throughout the day.
                            </p>
                        </div>
                    </div>
                </div>

                <Separator className="my-12" />

                {/* Story */}
                <div className="mb-12">
                    <h2 className="text-3xl font-bold text-foreground mb-6">Our Story</h2>
                    <div className="
                            bg-card border border-border rounded-xl p-8
                            transition-all duration-300
                            hover:shadow-lg
                            ">

                        <p className="text-muted-foreground leading-relaxed mb-4">
                            NewsHub Rajgarh was founded with a simple belief: that every community deserves access to accurate,
                            reliable news. Starting from Rajgarh district, we have grown to become a trusted news source for thousands
                            of readers across the region.
                        </p>
                        <p className="text-muted-foreground leading-relaxed mb-4">
                            Our team of experienced journalists and reporters work tirelessly to cover the stories that matter - from
                            local government initiatives and business developments to sports achievements and cultural events. We take
                            pride in our commitment to unbiased reporting and journalistic integrity.
                        </p>
                        <p className="text-muted-foreground leading-relaxed">
                            Today, NewsHub Rajgarh covers news across all major categories including National, International, Sports,
                            Entertainment, Technology, and Business, while maintaining our core focus on local Rajgarh district
                            developments.
                        </p>
                    </div>
                </div>

                <Separator className="my-12" />

                {/* Call to Action */}
                <div className="
                            w-full max-w-4xl mx-auto
                            bg-card border border-border rounded-xl
                            p-6 md:p-10
                            transition-shadow duration-300
                            hover:shadow-xl
                            ">
                    <SubscribeNewsForm />

                </div>

            </main>

            <Footer />
        </div>
    )
}
