import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, ArrowLeft } from "lucide-react";

const Privacy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="space-y-8">
          {/* Back Button */}
          <Button variant="outline" asChild className="electric-hover">
            <Link to="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>

          {/* Header */}
          <div className="text-center space-y-4">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
              <Shield className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-4xl font-bold gradient-text">Privacy Policy</h1>
            <p className="text-muted-foreground">
              Your data, your control. Here's how MINDTRX handles your information.
            </p>
          </div>

          {/* Content */}
          <Card className="glass-card p-8 space-y-6">
            <section className="space-y-3">
              <h2 className="text-2xl font-bold">Data Storage</h2>
              <p className="text-muted-foreground leading-relaxed">
                Your assessment answers are stored locally in your browser using localStorage. 
                This means your data never leaves your device unless you explicitly choose to 
                email yourself a report or save it using our optional cloud storage feature.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-2xl font-bold">What We Collect</h2>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Your 27 assessment answers (stored locally)</li>
                <li>Generated report codes (stored locally)</li>
                <li>Email address (only if you request a report via email, not linked to answers)</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-2xl font-bold">What We Don't Do</h2>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>We don't sell your data to third parties</li>
                <li>We don't track your browsing behavior outside this app</li>
                <li>We don't require account creation or authentication</li>
                <li>We don't store personally identifiable information with your answers</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-2xl font-bold">Your Rights</h2>
              <p className="text-muted-foreground leading-relaxed">
                You have complete control over your data. You can:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Clear your browser's localStorage to delete all saved reports</li>
                <li>Request deletion of emailed reports by contacting us</li>
                <li>Retake the assessment as many times as you like</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-2xl font-bold">Report Codes</h2>
              <p className="text-muted-foreground leading-relaxed">
                When you complete the assessment, we generate a unique code that allows you to 
                retrieve your results later. This code is stored only in your browser's localStorage 
                and is not transmitted to our servers unless you opt to use cloud storage features.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-2xl font-bold">Email Reports</h2>
              <p className="text-muted-foreground leading-relaxed">
                If you choose to email yourself a report, we temporarily process your email address 
                to send the report. We may store the email address separately (not linked to your 
                answers) to prevent abuse of the email service. Your assessment answers remain 
                local to your browser.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-2xl font-bold">Contact</h2>
              <p className="text-muted-foreground leading-relaxed">
                Questions about privacy? Reach out to us at privacy@mindtrx.example.com
              </p>
            </section>

            <section className="pt-6 border-t border-border">
              <p className="text-sm text-muted-foreground italic">
                Last updated: {new Date().toLocaleDateString()}
              </p>
            </section>
          </Card>

          {/* CTA */}
          <div className="text-center py-8">
            <Button asChild size="lg" className="electric-hover glow-primary">
              <Link to="/quiz">Start Assessment</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
