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

      <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-8 max-w-3xl">
        <div className="space-y-4 sm:space-y-8">
          {/* Progress */}
          <ProgressBar current={progress} total={quizItems.length} />

          {/* Section Header */}
          <Card className="glass-card p-4 sm:p-6">
            <div className="space-y-2">
              <h2 className="text-xl sm:text-2xl font-bold gradient-text">
                {currentSection.title}
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground">
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
          <div className="flex gap-2 sm:gap-4">
            <Button
              variant="outline"
              onClick={goPrev}
              disabled={isFirstQuestion}
              className="electric-hover text-sm sm:text-base"
              size="sm"
            >
              <ArrowLeft className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden xs:inline">Previous</span>
              <span className="xs:hidden">Prev</span>
            </Button>

            <div className="flex-1" />

            {isLastQuestion ? (
              <Button
                onClick={handleComplete}
                className="electric-hover glow-primary text-sm sm:text-base"
                size="sm"
              >
                <span className="hidden sm:inline">Complete Assessment</span>
                <span className="sm:hidden">Complete</span>
                <CheckCircle className="ml-1 sm:ml-2 h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
            ) : (
              <Button onClick={goNext} className="electric-hover text-sm sm:text-base" size="sm">
                Next
                <ArrowRight className="ml-1 sm:ml-2 h-3 w-3 sm:h-4 sm:w-4" />
              </Button>
            )}
          </div>

          {/* Quick Navigation Dots */}
          <div className="flex justify-center gap-1.5 sm:gap-2 flex-wrap px-2">
            {quizItems.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-all ${
                  index === currentIndex
                    ? "bg-primary w-6 sm:w-8 glow-primary"
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
