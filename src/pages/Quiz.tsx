import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { ProgressBar } from "@/components/ProgressBar";
import { QuizCard } from "@/components/QuizCard";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { quizItems, sectionInfo } from "@/lib/questions";
import { getPosition, generateReportCode, validateAnswers } from "@/lib/scoring";
import { saveReport, saveProgress, loadProgress, clearProgress } from "@/lib/storage";
import { Answers } from "@/types/assessment";
import { ArrowLeft, ArrowRight, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Quiz = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [answers, setAnswers] = useState<Answers>(() => {
    const saved = loadProgress();
    return saved || Array(27).fill(3);
  });
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentItem = quizItems[currentIndex];
  const currentSection = sectionInfo[currentItem.section];

  // Save progress on each answer change
  useEffect(() => {
    saveProgress(answers);
  }, [answers]);

  const updateAnswer = (value: number) => {
    const newAnswers = [...answers];
    newAnswers[currentIndex] = value;
    setAnswers(newAnswers);
  };

  const goNext = () => {
    if (currentIndex < quizItems.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const goPrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleComplete = () => {
    if (!validateAnswers(answers)) {
      toast({
        title: "Invalid answers",
        description: "Please ensure all questions are answered.",
        variant: "destructive",
      });
      return;
    }

    const scores = getPosition(answers);
    const code = generateReportCode();
    saveReport(code, answers, scores);
    clearProgress();

    // Confetti effect
    toast({
      title: "Assessment Complete! 🎉",
      description: "Your results are ready.",
    });

    navigate(`/results?code=${code}`);
  };

  const isFirstQuestion = currentIndex === 0;
  const isLastQuestion = currentIndex === quizItems.length - 1;
  const progress = currentIndex + 1;

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <div className="space-y-8">
          {/* Progress */}
          <ProgressBar current={progress} total={quizItems.length} />

          {/* Section Header */}
          <Card className="glass-card p-6">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold gradient-text">
                {currentSection.title}
              </h2>
              <p className="text-sm text-muted-foreground">
                {currentSection.description}
              </p>
            </div>
          </Card>

          {/* Question Card */}
          <QuizCard
            item={currentItem}
            value={answers[currentIndex]}
            onChange={updateAnswer}
          />

          {/* Navigation */}
          <div className="flex gap-4">
            <Button
              variant="outline"
              onClick={goPrev}
              disabled={isFirstQuestion}
              className="electric-hover"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Previous
            </Button>

            <div className="flex-1" />

            {isLastQuestion ? (
              <Button
                onClick={handleComplete}
                className="electric-hover glow-primary"
                size="lg"
              >
                Complete Assessment
                <CheckCircle className="ml-2 h-5 w-5" />
              </Button>
            ) : (
              <Button onClick={goNext} className="electric-hover">
                Next
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            )}
          </div>

          {/* Quick Navigation Dots */}
          <div className="flex justify-center gap-2 flex-wrap">
            {quizItems.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentIndex
                    ? "bg-primary w-8"
                    : index < currentIndex
                    ? "bg-primary/50"
                    : "bg-border"
                }`}
                aria-label={`Go to question ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
