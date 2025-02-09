import { Icons } from "@/components/shared/icons";
import { Button } from "@/components/ui/button";

interface SubmitButtonProps {
    isLoading: boolean;
    children: React.ReactNode;
}

export default function SubmitButton({
    isLoading,
    children,
}: SubmitButtonProps) {
    return (
        <Button className="w-full" type="submit" disabled={isLoading}>
            {isLoading && (
                <Icons.Spinner className="mr-2 size-4 animate-spin" />
            )}
            {children}
        </Button>
    );
}
