import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ITextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
    icon?: React.ReactNode;
    errorMessage?: string[] | string;
    label: string;
    required?: boolean;
}

export default function TextField({
    icon,
    errorMessage,
    className,
    label,
    ...rest
}: ITextFieldProps) {
    return (
        <div className="space-y-2">
            <Label htmlFor={rest.id}>
                {label}{" "}
                {rest.required && (
                    <strong className="text-destructive">*</strong>
                )}
            </Label>
            <div className="w-full relative">
                <Input {...rest} className={`pr-10 ${className || ""}`} />
                <div className="absolute right-0 top-0 mr-3 flex h-full items-center pointer-events-none">
                    {icon}
                </div>
            </div>
            {errorMessage && (
                <p className="text-sm text-destructive">{errorMessage}</p>
            )}
        </div>
    );
}
