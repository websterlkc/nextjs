'use client'

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, Github, LineChart, GitPullRequestIcon as PullRequest, Star, Tag } from 'lucide-react'
import GoogleButton from "@/components/GoogleButton"
import { useSession } from "next-auth/react"

export default function LandingPage() {
  const { data: session } = useSession();

  return (
    <div className="flex flex-col min-h-screen">
      <style jsx global>{`
        :root {
          --primary: 0 72% 51%;
          --primary-foreground: 0 0% 100%;
          --wood-brown: 25 56% 31%;
        }
      `}</style>
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <Link className="flex items-center justify-center" href="#">
          <Github className="h-6 w-6 mr-2" />
          <span className="font-bold">Webster Github Analyzer</span>
        </Link>
        <nav className="ml-auto flex items-center gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#features">
            Features
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#pricing">
            Pricing
          </Link>
            {session && (
              <Link 
                href="/dashboards"
                className="text-sm font-medium hover:underline underline-offset-4"
              >
                Manage API Keys
              </Link>
            )}
          <div className="flex items-center">
          <GoogleButton showOnPath={['/']} />
          </div>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-[#8B4513]">
                  Analyze GitHub Repositories Like Never Before
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Get deep insights, summaries, and cool facts about any open source GitHub repository with Webster Github Analyzer.
                </p>
              </div>
              <div className="space-x-4">
                <Button>Get Started</Button>
                <Button variant="outline">Learn More</Button>
              </div>
            </div>
          </div>
        </section>
        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-primary/5 dark:bg-primary/10">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12 text-[hsl(var(--wood-brown))]">Key Features</h2>
            <div className="grid gap-6 lg:grid-cols-3 lg:gap-12">
              <Card>
                <CardHeader>
                  <LineChart className="h-10 w-10 mb-2" />
                  <CardTitle>In-depth Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Get comprehensive summaries and insights on any GitHub repository.</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <Star className="h-10 w-10 mb-2" />
                  <CardTitle>Star Tracking</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Monitor star count and growth over time for repositories.</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <PullRequest className="h-10 w-10 mb-2" />
                  <CardTitle>PR Insights</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Stay updated on the latest important pull requests and their impact.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        <section id="pricing" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12 text-[hsl(var(--wood-brown))]">Flexible Pricing</h2>
            <div className="grid gap-6 lg:grid-cols-3 lg:gap-12">
              <Card>
                <CardHeader>
                  <CardTitle>Free Tier</CardTitle>
                  <CardDescription>For casual users</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-4xl font-bold">$0</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">per month</p>
                  <ul className="mt-4 space-y-2">
                    <li className="flex items-center"><Check className="mr-2 h-4 w-4" /> 5 repository analyses per month</li>
                    <li className="flex items-center"><Check className="mr-2 h-4 w-4" /> Basic insights and summaries</li>
                    <li className="flex items-center"><Check className="mr-2 h-4 w-4" /> 30-day data retention</li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Get Started</Button>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Pro</CardTitle>
                  <CardDescription>For power users</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-4xl font-bold">$19</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">per month</p>
                  <ul className="mt-4 space-y-2">
                    <li className="flex items-center"><Check className="mr-2 h-4 w-4" /> Unlimited repository analyses</li>
                    <li className="flex items-center"><Check className="mr-2 h-4 w-4" /> Advanced insights and trends</li>
                    <li className="flex items-center"><Check className="mr-2 h-4 w-4" /> 1-year data retention</li>
                    <li className="flex items-center"><Check className="mr-2 h-4 w-4" /> API access</li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Subscribe</Button>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Enterprise</CardTitle>
                  <CardDescription>For large teams</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-4xl font-bold">Custom</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">contact for pricing</p>
                  <ul className="mt-4 space-y-2">
                    <li className="flex items-center"><Check className="mr-2 h-4 w-4" /> Everything in Pro</li>
                    <li className="flex items-center"><Check className="mr-2 h-4 w-4" /> Dedicated support</li>
                    <li className="flex items-center"><Check className="mr-2 h-4 w-4" /> Custom integrations</li>
                    <li className="flex items-center"><Check className="mr-2 h-4 w-4" /> On-premise deployment options</li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Contact Sales</Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-primary/5 dark:bg-primary/10">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-[hsl(var(--wood-brown))]">
                  Ready to Dive Deep into GitHub Analytics?
                </h2>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Start analyzing your favorite repositories today and uncover insights you never knew existed.
                </p>
              </div>
              <div className="space-x-4">
                <Button size="lg">Get Started for Free</Button>
                <Button size="lg" variant="outline">Schedule a Demo</Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">© 2023 Webster Github Analyzer. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  )
}