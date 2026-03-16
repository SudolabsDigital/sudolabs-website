"use client";

import Link from "next/link";
import Image from "next/image";

/* Tipos */

interface LinkItem {
  label:     string;
  href:      string;
  external?: boolean;
}

interface SdlFooterProps {
  /** Tema de color. Por defecto: "dark" */
  tema?: "dark" | "light";
  /** Lista de links de la derecha. Por defecto: links principales de sudolabs.space */
  links?: LinkItem[];
  /** Texto central personalizado. Por defecto: tagline estándar de Sudolabs */
  tagline?: string;
}

/* Valores por defecto */

const linksDefecto: LinkItem[] = [
  { label: "sudolabs.space", href: "https://sudolabs.space",          external: true },
  { label: "Servicios",      href: "https://sudolabs.space/servicios", external: true },
  { label: "Contacto",       href: "https://sudolabs.space/contacto",  external: true },
];

/* Componente */

export function SdlFooter({
  tema = "dark",
  links = linksDefecto,
  tagline,
}: SdlFooterProps) {
  const año    = new Date().getFullYear();
  const oscuro = tema === "dark";

  return (
    <footer
      className={`sdl-footer${oscuro ? "" : " sdl-light"}`}
      data-dark={oscuro ? "true" : "false"}
    >
      <div className="sdl-footer__inner">

        {/* Marca / Logo */}
        <Link
          href="https://sudolabs.space"
          target="_blank"
          rel="noopener noreferrer"
          className="sdl-footer__brand"
        >
          <div className="sdl-footer__logo-wrapper">
            <Image
              src="/assets/logo-symbol.webp"
              alt=""
              width={32}
              height={32}
              className="sdl-footer__logo"
              priority={false}
            />
          </div>
          <span className="sdl-footer__name">sudolabs</span>
        </Link>

        {/* Texto central */}
        <p className="sdl-footer__tagline">
          {tagline ?? (
            <>
              Desarrollado por Sudolabs
              <span className="sdl-footer__dot">·</span>
              Ingeniería de software, Huancayo, Perú
            </>
          )}
        </p>

        {/* Derecha: links + separador + copyright */}
        <div className="sdl-footer__right">
          {links.length > 0 && (
            <ul className="sdl-footer__links">
              {links.map((link) => (
                <li key={link.href}>
                  {link.external ? (
                    <a href={link.href} target="_blank" rel="noopener noreferrer">
                      {link.label}
                    </a>
                  ) : (
                    <Link href={link.href}>{link.label}</Link>
                  )}
                </li>
              ))}
            </ul>
          )}
          <div className="sdl-footer__separator" aria-hidden="true" />
          <span className="sdl-footer__copy">© {año} Sudolabs Perú</span>
        </div>

      </div>
    </footer>
  );
}
