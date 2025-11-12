import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Header } from "@/components/Header";
import { NeuronField } from "@/components/NeuronField";
import { ArrowRight, Brain, Sparkles } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getReport } from "@/lib/storage";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [code, setCode] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLoadReport = () => {
    if (!code.trim()) {
      toast({
        title: "Enter a code",
        description: "Please enter your report code to continue.",
        variant: "destructive",
      });
      return;
    }

    const report = getReport(code.trim().toUpperCase());
    if (report) {
      navigate(`/results?code=${code.trim().toUpperCase()}`);
    } else {
      toast({
        title: "Report not found",
        description: "No report found with that code. Please check and try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
        <NeuronField />

        <div className="container relative z-10 mx-auto px-4 py-16 text-center">
          <div className="animate-fade-in space-y-8 max-w-4xl mx-auto">
            <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
              <Brain className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Inner Mind Integration Inventory</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
              <span className="gradient-text">MINDTRX</span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
              Discover how you communicate with and trust your inner mind. 
              A self-assessment tool for inner wisdom integration.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <Button
                asChild
                size="lg"
                className="electric-hover hover-scale text-lg px-8 glow-primary"
              >
                <Link to="/quiz">
                  Start Assessment
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="electric-hover hover-scale text-lg px-8"
                asChild
              >
                <a href="#learn-more">
                  Learn More
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="learn-more" className="py-20 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">How It Works</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A comprehensive 27-item assessment that maps your relationship with your inner mind
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <Card className="glass-card p-8 space-y-4 hover-scale">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Brain className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Communication Practices</h3>
              <p className="text-muted-foreground">
                Assess 14 practices that open channels to inner awareness—from meditation and journaling 
                to dreamwork and somatic techniques.
              </p>
            </Card>

            <Card className="glass-card p-8 space-y-4 hover-scale">
              <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-xl font-semibold">Trust in Inner Wisdom</h3>
              <p className="text-muted-foreground">
                Explore 13 beliefs and behaviors that honor inner guidance—from intuition and 
                synchronicity to surrender and symbolic meaning.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Load Report Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <Card className="glass-card p-8 max-w-md mx-auto space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold">Have a Report Code?</h2>
              <p className="text-sm text-muted-foreground">
                Enter your code to view your saved results
              </p>
            </div>

            <div className="flex gap-2">
              <Input
                placeholder="Enter code (e.g., ABC123-XYZ4)"
                value={code}
                onChange={(e) => setCode(e.target.value.toUpperCase())}
                onKeyDown={(e) => e.key === "Enter" && handleLoadReport()}
                className="uppercase"
              />
              <Button onClick={handleLoadReport} className="electric-hover">
                Load
              </Button>
            </div>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-border/50">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>Powered by MINDTRX | Inner Mind Integration Inventory</p>
          <p className="mt-2">
            <Link to="/privacy" className="hover:text-foreground transition-colors">
              Privacy Policy
            </Link>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
