import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { getPosition } from "@/lib/scoring";
import { Scores } from "@/types/assessment";

interface QuadrantVisualizationProps {
  scores: Scores;
  interactive?: boolean;
}

export function QuadrantVisualization({ scores, interactive = false }: QuadrantVisualizationProps) {
  const [ghostComm, setGhostComm] = useState(scores.comm50);
  const [ghostTrust, setGhostTrust] = useState(scores.trust50);

  // Calculate ghost position if in interactive mode
  const ghostScores = interactive
    ? getPosition([
        ...Array(14).fill(Math.round((ghostComm / 50) * 5)),
        ...Array(13).fill(Math.round((ghostTrust / 50) * 5))
      ])
    : null;

  // Convert 0-50 scale to percentage for positioning
  const toPercent = (val: number) => (val / 50) * 100;

  return (
    <div className="space-y-6">
      <Card className="glass-card p-8 relative overflow-hidden">
        {/* Grid background */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(to right, hsl(var(--border)) 1px, transparent 1px),
              linear-gradient(to bottom, hsl(var(--border)) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
          }}
        />

        {/* Quadrant visualization */}
        <div className="relative w-full aspect-square max-w-2xl mx-auto">
          {/* Axes */}
          <div className="absolute inset-0">
            {/* Horizontal axis */}
            <div className="absolute left-0 right-0 top-1/2 h-px bg-gradient-to-r from-accent/50 via-accent to-accent/50 glow-accent" />
            {/* Vertical axis */}
            <div className="absolute top-0 bottom-0 left-1/2 w-px bg-gradient-to-b from-accent/50 via-accent to-accent/50 glow-accent" />

            {/* Threshold lines */}
            <div className="absolute left-0 right-0 h-px bg-border/30" style={{ top: "48%" }} />
            <div className="absolute top-0 bottom-0 w-px bg-border/30" style={{ left: "48%" }} />
          </div>

          {/* Quadrant labels */}
          <div className="absolute bottom-2 left-2 text-xs font-medium text-muted-foreground">
            Disengaged<br />Mind
          </div>
          <div className="absolute top-2 left-2 text-xs font-medium text-muted-foreground">
            Skeptical<br />Explorer
          </div>
          <div className="absolute bottom-2 right-2 text-xs font-medium text-muted-foreground text-right">
            Faithful<br />Seeker
          </div>
          <div className="absolute top-2 right-2 text-xs font-medium text-muted-foreground text-right">
            Integrated<br />Alchemist
          </div>

          {/* Axis labels */}
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-sm text-muted-foreground whitespace-nowrap">
            Trust in the Inner Mind →
          </div>
          <div className="absolute -left-8 top-1/2 -translate-y-1/2 -rotate-90 text-sm text-muted-foreground whitespace-nowrap">
            Communication ↑
          </div>

          {/* Ghost dot (interactive mode) */}
          {interactive && ghostScores && (
            <div
              className="absolute w-4 h-4 -ml-2 -mb-2 rounded-full bg-accent/40 border-2 border-accent animate-pulse-glow transition-all duration-300"
              style={{
                left: `${toPercent(ghostTrust)}%`,
                bottom: `${toPercent(ghostComm)}%`,
              }}
            />
          )}

          {/* User dot */}
          <div
            className="absolute w-6 h-6 -ml-3 -mb-3 rounded-full bg-primary border-4 border-background shadow-lg glow-primary animate-pulse-glow z-10"
            style={{
              left: `${toPercent(scores.trust50)}%`,
              bottom: `${toPercent(scores.comm50)}%`,
            }}
          />
        </div>
      </Card>

      {/* Position info */}
      <div className="text-center space-y-2">
        <div className="text-sm text-muted-foreground">
          Communication: {scores.comm50}/50 • Trust: {scores.trust50}/50
        </div>
        <div className="text-2xl font-bold gradient-text">{scores.quadrant}</div>
        <div className="text-lg text-primary">{scores.position}</div>
      </div>

      {/* Interactive controls */}
      {interactive && ghostScores && (
        <Card className="glass-card p-6 space-y-6">
          <div className="space-y-2">
            <h3 className="text-sm font-medium">🎮 Play with it</h3>
            <p className="text-xs text-muted-foreground">
              Move the sliders to see how different scores would change your quadrant and position
            </p>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Communication</span>
                <span className="text-muted-foreground">{ghostComm}/50</span>
              </div>
              <Slider
                value={[ghostComm]}
                onValueChange={([v]) => setGhostComm(v)}
                min={0}
                max={50}
                step={1}
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Trust</span>
                <span className="text-muted-foreground">{ghostTrust}/50</span>
              </div>
              <Slider
                value={[ghostTrust]}
                onValueChange={([v]) => setGhostTrust(v)}
                min={0}
                max={50}
                step={1}
              />
            </div>

            <div className="pt-4 border-t border-border">
              <div className="text-sm space-y-1">
                <div className="text-muted-foreground">Preview:</div>
                <div className="font-medium">{ghostScores.quadrant}</div>
                <div className="text-sm text-primary">{ghostScores.position}</div>
              </div>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
