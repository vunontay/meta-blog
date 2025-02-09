import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Icons } from "@/components/shared/icons";
import { useState } from "react";

interface IPasswordFieldProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    errorMessage?: string;
    label: string;
    require?: boolean;
}

export default function PasswordField({
    errorMessage,
    className,
    label,
    ...rest
}: IPasswordFieldProps) {
    const [isPasswordVisible, setPasswordVisible] = useState<boolean>(false);

    const togglePasswordVisibility = () => {
        setPasswordVisible((prev) => !prev);
    };

    return (
        <div className="space-y-2">
            <Label htmlFor={rest.id || "password"}>
                {label}{" "}
                {rest.required && (
                    <strong className="text-destructive">*</strong>
                )}
            </Label>
            <div className="w-full relative">
                <Input
                    {...rest}
                    type={isPasswordVisible ? "text" : "password"}
                    className={`pr-10 ${className || ""}`}
                />
                <div className="absolute right-0 top-0 mr-3 flex h-full items-center cursor-pointer">
                    {isPasswordVisible ? (
                        <Icons.EyeClosed
                            className="size-4 text-primary"
                            onClick={togglePasswordVisibility}
                        />
                    ) : (
                        <Icons.Eye
                            className="size-4 text-primary"
                            onClick={togglePasswordVisibility}
                        />
                    )}
                </div>
            </div>
            {errorMessage && (
                <p className="text-sm text-destructive">{errorMessage}</p>
            )}
        </div>
    );
}
