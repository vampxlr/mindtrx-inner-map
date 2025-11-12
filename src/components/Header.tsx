import { Link } from "react-router-dom";
import { ThemeToggle } from "./ThemeToggle";
import { Brain } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center space-x-2 hover-scale">
          <Brain className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold gradient-text">MINDTRX</span>
        </Link>
        
        <nav className="flex items-center space-x-4">
          <Link 
            to="/privacy" 
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Privacy
          </Link>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
