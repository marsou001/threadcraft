import { Frown } from "lucide-react";

export type ErrorComponentProps = {
  errorMessage?: string;
}

export default function ErrorComponent({ errorMessage }: ErrorComponentProps) {
  return (
    <div className="grid place-items-center h-screen">
      <div className="text-center">
        <div className="grid place-items-center mb-4">
          <Frown className="size-76" />
        </div>
        <p className="text-2xl text-bold">
          { errorMessage !== undefined ? errorMessage : "Something went wrong. Please refresh the page" }
        </p>
      </div>
    </div>
  )
}