import Image from "next/image";

interface ILogoSquareProps {
    className?: string;
}

export default function LogoSquare({ className }: ILogoSquareProps) {
    return (
        <Image
            className={className}
            src="/logo-light.webp"
            alt="Logo"
            width={158}
            height={36}
            priority
        />
    );
}
