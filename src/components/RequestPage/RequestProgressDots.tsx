import { ReactNode } from "react";
import "./RequestProgressDots.scss";

type Props = {
  currentStep: number;
  totalSteps: number;
};

export function RequestProgressDots({ currentStep, totalSteps }: Props) {
  const dots: ReactNode[] = [];

  for (let index = 0; index < totalSteps; index += 1) {
    const isActive = index === currentStep;
    const isDone = index < currentStep;

    const className = [
      "progressDot",
      isActive ? "isActive" : "",
      isDone ? "isDone" : "",
    ]
      .filter(Boolean)
      .join(" ");

    dots.push(<span key={index} className={className} />);
  }

  return (
    <div className="grid progressDots flow-col place-center gap-2">{dots}</div>
  );
}
