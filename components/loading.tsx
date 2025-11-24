import { Spinner } from "./ui/spinner";

export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Spinner className="size-10" />
    </div>
  );
}
