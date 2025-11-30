import { ReactNode } from "react";

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
      "request-progress__dot",
      isActive ? "request-progress__dot--active" : "",
      isDone ? "request-progress__dot--done" : "",
    ]
      .filter(Boolean)
      .join(" ");

    dots.push(<span key={index} className={className} />);
  }

  return <div className="request-progress flex center">{dots}</div>;
}
