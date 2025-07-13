import Nav from "@/components/nav";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import {
  MicIcon,
  BrainIcon,
  HeartIcon,
  SparklesIcon,
  ShieldCheckIcon,
  ZapIcon,
} from "lucide-react";

export default function Home() {
  return (
    <>
      <Nav />
      <main className="container mx-auto p-4 flex-1">
        {/* Hero Section */}
        <section className="text-center py-20 px-4 min-h-[calc(100dvh-10rem)]">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-6xl font-serif  text-gray-900 mb-6">
              Meet Keimo
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Your friendly AI companion for all ages. A half-bear, half-fox
              character who loves to chat, learn, and grow with you through
              natural voice conversations.
            </p>

            <div className="flex gap-4 justify-center mb-12">
              <SignedOut>
                <Button size="lg" className="text-lg px-8 py-3" asChild>
                  <SignInButton>Start Chatting</SignInButton>
                </Button>
              </SignedOut>
              <SignedIn>
                <Button size="lg" className="text-lg px-8 py-3" asChild>
                  <Link href="/chat">Chat with Keimo</Link>
                </Button>
              </SignedIn>
              <Button
                variant="outline"
                size="lg"
                className="text-lg px-8 py-3"
                // onClick={() => {
                //   document
                //     .querySelector('[data-section="features"]')
                //     ?.scrollIntoView({ behavior: "smooth" });
                // }}
              >
                Learn More
              </Button>
            </div>

            {/* Character Preview */}
            {/* <div className="relative mx-auto w-64 h-64 bg-gradient-to-br from-orange-100 to-blue-100 rounded-full flex items-center justify-center shadow-lg">
              <div className="text-6xl">🐻‍❄️🦊</div>
            </div> */}
          </div>
        </section>

        {/* Features Section */}
        <section data-section="features" className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-serif text-center text-gray-900 mb-16">
              Why Everyone Loves Keimo
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Voice Conversations */}
              <div className="bg-white p-8 rounded-xl border border-gray-100">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <MicIcon className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Natural Voice Chat
                </h3>
                <p className="text-gray-600">
                  Just speak naturally! Keimo listens, understands, and responds
                  with a friendly voice - no typing required.
                </p>
              </div>

              {/* Memory System */}
              <div className="bg-white p-8 rounded-xl border-2 border-gray-100">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <BrainIcon className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Remembers Everything
                </h3>
                <p className="text-gray-600">
                  Keimo remembers your child's interests, stories, and
                  conversations to build meaningful, ongoing relationships.
                </p>
              </div>

              {/* Child-Friendly */}
              <div className="bg-white p-8 rounded-xl border-2 border-gray-100">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <HeartIcon className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Friendly & Supportive
                </h3>
                <p className="text-gray-600">
                  Warm, encouraging, and patient personality that adapts to
                  users of all ages with thoughtful, appropriate responses.
                </p>
              </div>

              {/* AI-Powered */}
              <div className="bg-white p-8 rounded-xl  border-2 border-gray-100">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                  <SparklesIcon className="w-6 h-6 text-orange-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  AI-Powered
                </h3>
                <p className="text-gray-600">
                  Advanced AI technology provides intelligent, contextual
                  responses that adapt to your unique communication style.
                </p>
              </div>

              {/* Animated Character */}
              <div className="bg-white p-8 rounded-xl  border-2 border-gray-100">
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
                  <ZapIcon className="w-6 h-6 text-yellow-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Expressive Character
                </h3>
                <p className="text-gray-600">
                  Watch Keimo come alive with different animations - listening,
                  thinking, and speaking with delightful expressions.
                </p>
              </div>

              {/* Safe & Secure */}
              <div className="bg-white p-8 rounded-xl  border-2 border-gray-100">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                  <ShieldCheckIcon className="w-6 h-6 text-red-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Safe & Secure
                </h3>
                <p className="text-gray-600">
                  Built with privacy and safety in mind. Your conversations are
                  protected and never shared with third parties.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-20 px-4 bg-white rounded-xl border-2 border-gray-100">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-serif text-center text-gray-900 mb-16">
              How Keimo Works
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-xl">1</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Speak
                </h3>
                <p className="text-gray-600">
                  Press the mic button and speak naturally to Keimo
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-xl">2</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Listen
                </h3>
                <p className="text-gray-600">
                  Keimo listens carefully and thinks about the best response
                  using AI
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-xl">3</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Respond
                </h3>
                <p className="text-gray-600">
                  Keimo responds with a warm, friendly voice and remembers the
                  conversation
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-4xl font-serif text-gray-900 mb-6">
              Ready to Meet Keimo?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Experience a friendly AI companion who's always ready to chat,
              learn, and grow together.
            </p>

            <SignedOut>
              <Button size="lg" className="text-lg px-8 py-3" asChild>
                <SignInButton>Get Started Free</SignInButton>
              </Button>
            </SignedOut>
            <SignedIn>
              <Button size="lg" className="text-lg px-8 py-3" asChild>
                <Link href="/chat">Start Chatting Now</Link>
              </Button>
            </SignedIn>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
