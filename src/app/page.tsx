import Image from "next/image";
import {
  ShieldCheck,
  FileUp,
  Wand2,
  Lock,
  Database,
  KeyRound,
  Braces,
  BookUser,
} from "lucide-react";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { Header } from "@/components/layout/Header";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import SecurityRuleGenerator from "@/components/features/SecurityRuleGenerator";
import CertificateManager from "@/components/features/CertificateManager";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { cn } from "@/lib/utils";

const setupSteps = [
  {
    icon: BookUser,
    title: "1. Create Firebase Project",
    description:
      'Go to the Firebase Console and create a new project named "certsecure-demo".',
  },
  {
    icon: KeyRound,
    title: "2. Enable Authentication",
    description:
      "In your new project, navigate to the Authentication section, click on the 'Sign-in method' tab, and enable the Email/Password provider.",
  },
  {
    icon: Database,
    title: "3. Enable Firestore Database",
    description:
      "Navigate to the Firestore Database section and create a new database. Start in 'production mode' for secure defaults.",
  },
  {
    icon: FileUp,
    title: "4. Enable Storage",
    description:
      "Navigate to the Storage section and click 'Get started' to enable Firebase Storage for certificate file uploads.",
  },
  {
    icon: Braces,
    title: "5. Configure Environment Variables",
    description:
      "Create a `.env.local` file in your Next.js project root and add your Firebase project's configuration keys.",
  },
];

const envFileContent = `
NEXT_PUBLIC_FIREBASE_API_KEY="your-api-key"
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="your-project-id.firebaseapp.com"
NEXT_PUBLIC_FIREBASE_PROJECT_ID="your-project-id"
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="your-project-id.appspot.com"
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="your-sender-id"
NEXT_PUBLIC_FIREBASE_APP_ID="your-app-id"
`;

export default function Home() {
  const heroImage = PlaceHolderImages.find((img) => img.id === "1");

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <PageWrapper>
        <main className="flex-1">
          {/* Hero Section */}
          <section className="relative w-full h-80 rounded-xl overflow-hidden mb-12">
            {heroImage && (
              <Image
                src={heroImage.imageUrl}
                alt={heroImage.description}
                fill
                className="object-cover"
                data-ai-hint={heroImage.imageHint}
                priority
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-0 left-0 p-8">
              <h1 className="font-headline text-5xl font-bold text-white shadow-md">
                CertSecure Demo
              </h1>
              <p className="text-xl text-primary-foreground/90 mt-2 max-w-2xl">
                A step-by-step guide to setting up your secure certificate
                verification app with Next.js and Firebase.
              </p>
            </div>
          </section>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content: Setup Guide */}
            <div className="lg:col-span-2 space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle className="font-headline text-3xl flex items-center gap-2">
                    <Lock className="w-8 h-8 text-primary" />
                    <span>Firebase Setup Guide</span>
                  </CardTitle>
                  <CardDescription>
                    Follow these steps to configure your Firebase project.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {setupSteps.map((step, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 bg-primary/10 text-primary rounded-lg flex items-center justify-center">
                          <step.icon className="w-5 h-5" />
                        </div>
                      </div>
                      <div>
                        <h3 className="font-semibold">{step.title}</h3>
                        <p className="text-muted-foreground text-sm">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  ))}
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                        <div className="w-10 h-10 bg-primary/10 text-primary rounded-lg flex items-center justify-center">
                          <Braces className="w-5 h-5" />
                        </div>
                    </div>
                    <div>
                      <h3 className="font-semibold">5. Configure Environment Variables</h3>
                       <p className="text-muted-foreground text-sm mb-2">
                         Create a `.env.local` file in your Next.js project root and add your Firebase project's configuration keys.
                       </p>
                       <pre className="p-4 rounded-md bg-muted text-muted-foreground text-xs overflow-x-auto">
                        <code>{envFileContent.trim()}</code>
                      </pre>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <CertificateManager />
            </div>

            {/* Sidebar: Security Rule Generator */}
            <div className="lg:col-span-1">
              <div className="sticky top-8">
                <SecurityRuleGenerator />
              </div>
            </div>
          </div>
        </main>
      </PageWrapper>
      <footer className="py-6 text-center text-sm text-muted-foreground">
        Built for CertSecure Demo
      </footer>
    </div>
  );
}
