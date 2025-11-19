import { QuizItem } from "@/types/assessment";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";

interface QuizCardProps {
  item: QuizItem;
  value: number;
  onChange: (value: number) => void;
}

const labels = [
  "Rarely/Never",
  "Occasionally",
  "Sometimes",
  "Often",
  "Very True"
];

export function QuizCard({ item, value, onChange }: QuizCardProps) {
  return (
    <Card className="glass-card p-6 space-y-6 animate-fade-in hover-scale">
      <div className="space-y-2">
        <div className="flex items-start justify-between">
          <h3 className="text-lg font-medium leading-relaxed flex-1">
            {item.text}
          </h3>
          <span className="text-sm text-muted-foreground ml-4 flex-shrink-0">
            #{item.id}
          </span>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex justify-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 border-2 border-primary glow-primary">
            <span className="text-2xl font-bold text-primary">{value}</span>
          </div>
        </div>

        <Slider
          value={[value]}
          onValueChange={([v]) => onChange(v)}
          min={1}
          max={5}
          step={1}
          className="cursor-pointer"
        />

        <div className="flex justify-between text-[10px] sm:text-xs text-muted-foreground px-1 gap-1">
          {labels.map((label, i) => (
            <span
              key={i}
              onClick={() => onChange(i + 1)}
              className={`text-center transition-colors leading-tight cursor-pointer hover:text-primary ${
                value === i + 1 ? "text-primary font-medium" : ""
              }`}
              style={{ width: "20%", fontSize: "clamp(9px, 2vw, 12px)" }}
            >
              {label}
            </span>
          ))}
        </div>
      </div>
    </Card>
  );
}
