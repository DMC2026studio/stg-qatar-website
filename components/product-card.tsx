import Image from "next/image";
import { TextLink } from "@/components/button";

export function ProductCard({
  title,
  description,
  image,
  alt,
  href,
  linkLabel = "Request a quote",
}: {
  title: string;
  description: string;
  image: string;
  alt: string;
  href?: string;
  linkLabel?: string;
}) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-[1.5rem] border border-line bg-white shadow-sm shadow-deep/5">
      <div className="relative aspect-[4/3] bg-muted">
        <Image
          src={image}
          alt={alt}
          fill
          sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
          className="object-contain p-5"
        />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-xl text-deep">{title}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-steel">{description}</p>
        {href ? (
          <div className="mt-5">
            <TextLink href={href}>{linkLabel}</TextLink>
          </div>
        ) : null}
      </div>
    </article>
  );
}
