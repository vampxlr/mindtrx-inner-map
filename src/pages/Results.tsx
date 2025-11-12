import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { QuadrantVisualization } from "@/components/QuadrantVisualization";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { getReport } from "@/lib/storage";
import { getFeedback } from "@/lib/feedback";
import { StoredReport } from "@/types/assessment";
import { Copy, Mail, Download, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Results = () => {
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  const [report, setReport] = useState<StoredReport | null>(null);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [sending, setSending] = useState(false);

  const code = searchParams.get("code");

  useEffect(() => {
    if (code) {
      const loadedReport = getReport(code);
      if (loadedReport) {
        setReport(loadedReport);
      }
    }
  }, [code]);

  const copyCode = () => {
    if (code) {
      navigator.clipboard.writeText(code);
      toast({
        title: "Code copied!",
        description: "Your report code has been copied to clipboard.",
      });
    }
  };

  const shareResults = () => {
    const url = `${window.location.origin}/results?code=${code}`;
    if (navigator.share) {
      navigator.share({
        title: "My MINDTRX Results",
        text: "Check out my Inner Mind Integration Inventory results!",
        url,
      });
    } else {
      navigator.clipboard.writeText(url);
      toast({
        title: "Link copied!",
        description: "Share link copied to clipboard.",
      });
    }
  };

  const handleEmailReport = async () => {
    if (!email || !name) {
      toast({
        title: "Missing information",
        description: "Please enter your name and email.",
        variant: "destructive",
      });
      return;
    }

    setSending(true);
    
    // Simulate email sending (in production, this would call an API)
    setTimeout(() => {
      setSending(false);
      toast({
        title: "Email sent!",
        description: "Your report has been sent to your email.",
      });
      setEmail("");
      setName("");
    }, 1000);
  };

  if (!report) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <Card className="glass-card p-8 max-w-md mx-auto">
            <h2 className="text-2xl font-bold mb-4">Report Not Found</h2>
            <p className="text-muted-foreground mb-6">
              We couldn't find a report with that code. Please check and try again.
            </p>
            <Button asChild>
              <Link to="/">Return Home</Link>
            </Button>
          </Card>
        </div>
      </div>
    );
  }

  const { scores } = report;
  const feedback = getFeedback(scores.quadrant, scores.position);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="space-y-8">
          {/* Header */}
          <div className="flex items-center justify-between">
            <Button variant="outline" asChild className="electric-hover">
              <Link to="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Home
              </Link>
            </Button>

            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={copyCode}
                className="electric-hover"
              >
                <Copy className="mr-2 h-4 w-4" />
                Copy Code
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={shareResults}
                className="electric-hover"
              >
                <Download className="mr-2 h-4 w-4" />
                Share
              </Button>
            </div>
          </div>

          {/* Title */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold gradient-text">
              Your MINDTRX Results
            </h1>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
              <span className="text-sm font-mono">{code}</span>
            </div>
          </div>

          {/* Scores */}
          <Card className="glass-card p-6">
            <h2 className="text-2xl font-bold mb-6">Your Scores</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <div className="text-sm text-muted-foreground mb-2">
                  Communication with the Inner Mind
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-primary">
                    {scores.comm_raw}
                  </span>
                  <span className="text-muted-foreground">/ 70</span>
                  <span className="ml-auto text-sm text-muted-foreground">
                    ({scores.comm50}/50 normalized)
                  </span>
                </div>
              </div>

              <div>
                <div className="text-sm text-muted-foreground mb-2">
                  Trust in the Inner Mind
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-accent">
                    {scores.trust_raw}
                  </span>
                  <span className="text-muted-foreground">/ 65</span>
                  <span className="ml-auto text-sm text-muted-foreground">
                    ({scores.trust50}/50 normalized)
                  </span>
                </div>
              </div>
            </div>
          </Card>

          {/* Quadrant Visualization */}
          <QuadrantVisualization scores={scores} interactive={true} />

          {/* Feedback */}
          <Card className="glass-card p-8 space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-4">
                Understanding Your Quadrant: {scores.quadrant}
              </h2>
              <p className="text-muted-foreground mb-4">{feedback.quadrant.summary}</p>
              <p className="leading-relaxed">{feedback.quadrant.detailed}</p>
            </div>

            <div className="border-t border-border pt-6">
              <h3 className="text-xl font-bold mb-4">
                Your Specific Position: {scores.position}
              </h3>
              <p className="text-muted-foreground mb-4">{feedback.position.summary}</p>
              <p className="leading-relaxed">{feedback.position.detailed}</p>
            </div>
          </Card>

          {/* Explanation */}
          <Card className="glass-card p-6 bg-muted/20">
            <h3 className="font-semibold mb-3">How to Read Your Results</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Your <strong>Communication score</strong> reflects how often you actively engage 
              inner-mind practices like meditation, journaling, and dreamwork. Your{" "}
              <strong>Trust score</strong> reflects how deeply you rely on inner guidance, 
              intuition, and synchronicity. As your dot moves up (more communication) and to 
              the right (more trust), you're integrating practice and faith—gradually embodying 
              the <strong>Integrated Alchemist</strong> archetype where inner wisdom becomes 
              a reliable compass for life.
            </p>
          </Card>

          {/* Email Report */}
          <Card className="glass-card p-8">
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold mb-2">Email Your Report</h3>
                <p className="text-sm text-muted-foreground">
                  Get a copy of your results sent to your inbox for future reference.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <Input
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <Input
                  type="email"
                  placeholder="Your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <Button
                onClick={handleEmailReport}
                disabled={sending}
                className="electric-hover w-full md:w-auto"
              >
                <Mail className="mr-2 h-4 w-4" />
                {sending ? "Sending..." : "Send Report"}
              </Button>
            </div>
          </Card>

          {/* Retake */}
          <div className="text-center py-8">
            <Button asChild size="lg" className="electric-hover glow-primary">
              <Link to="/quiz">Take Assessment Again</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Results;
