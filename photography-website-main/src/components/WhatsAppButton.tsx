interface WhatsAppButtonProps {
  whatsapp: string;
}

export default function WhatsAppButton({ whatsapp }: WhatsAppButtonProps) {
  if (!whatsapp) return null;

  const digits = whatsapp.replace(/[^0-9]/g, "");

  return (
    <a
      href={`https://wa.me/${digits}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full border border-gold/30 bg-charcoal text-gold shadow-lg shadow-black/40 transition-all duration-200 hover:scale-105 hover:border-gold hover:bg-gold hover:text-ink active:scale-95"
    >
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className="h-6 w-6"
        aria-hidden="true"
      >
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.05-.52-.099-.149-.668-1.612-.916-2.207-.242-.579-.487-.5-.668-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487 2.981 1.287 2.981.858 3.604.805.622-.054 2.01-.821 2.293-1.616.282-.795.282-1.477.198-1.615-.084-.139-.297-.223-.595-.372z" />
        <path d="M20.52 3.449C12.831-3.984.106 1.407.101 11.893c0 2.096.549 4.14 1.595 5.945L0 24l6.335-1.652c1.746.943 3.71 1.444 5.71 1.447h.006c6.585 0 11.946-5.36 11.949-11.945.001-3.191-1.241-6.184-3.481-8.401zm-8.413 18.219h-.005c-1.762-.001-3.49-.474-4.997-1.367l-.358-.213-3.71.967.992-3.617-.234-.371a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.853-9.947 9.853z" />
      </svg>
    </a>
  );
}
