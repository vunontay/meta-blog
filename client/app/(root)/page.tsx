import Image from "next/image";
import Container from "@/components/shared/container";

export default function HomePage() {
    return (
        <Container>
            <section className="pt-6">
                <Image
                    src="/opengraph-image.png"
                    alt="Home Banner"
                    width={600}
                    height={600}
                    sizes="100vw"
                    className="w-full h-auto"
                    priority
                />
            </section>
        </Container>
    );
}
