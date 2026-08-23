interface IconProps {
  className?: string;
}

export function TelegramIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M21.94 4.13a1.4 1.4 0 0 0-1.52-.26L2.7 11.12c-1.13.44-1.05 2.05.12 2.39l4.42 1.3 1.7 5.3c.33 1.03 1.62 1.33 2.37.56l2.33-2.4 4.35 3.2c.86.63 2.07.17 2.3-.88l2.3-15.1a1.4 1.4 0 0 0-.65-1.36ZM9.4 14.2l8.36-7.53c.36-.32.86.17.55.55l-6.6 7.2-.28 3-1.4-3.4-3.1-.9c-.73-.21-.74-.71.47-.92Z" />
    </svg>
  );
}

export function InstagramIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className={className} aria-hidden="true">
      <rect x="3.2" y="3.2" width="17.6" height="17.6" rx="4.5" />
      <circle cx="12" cy="12" r="4.1" />
      <circle cx="17.2" cy="6.8" r="1.15" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function XIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M17.9 3H21l-6.8 7.8L22.2 21h-6.3l-4.9-6.4L5.4 21H2.3l7.3-8.3L2 3h6.4l4.4 5.9L17.9 3Zm-1.1 16.1h1.7L7.5 4.7H5.6l11.2 14.4Z" />
    </svg>
  );
}

export function YouTubeIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M21.6 7.2a2.5 2.5 0 0 0-1.76-1.77C18.3 5 12 5 12 5s-6.3 0-7.84.43A2.5 2.5 0 0 0 2.4 7.2 26 26 0 0 0 2 12a26 26 0 0 0 .4 4.8 2.5 2.5 0 0 0 1.76 1.77C5.7 19 12 19 12 19s6.3 0 7.84-.43a2.5 2.5 0 0 0 1.76-1.77A26 26 0 0 0 22 12a26 26 0 0 0-.4-4.8ZM10 15.2V8.8l5.2 3.2L10 15.2Z" />
    </svg>
  );
}

export function TikTokIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M20.5 8.3a6.1 6.1 0 0 1-3.6-1.2v6.9a5.9 5.9 0 1 1-5.9-5.9c.2 0 .5 0 .7.05v3.2a2.8 2.8 0 1 0 2 2.65V2h3.2a3.3 3.3 0 0 0 3.6 3.3v3Z" />
    </svg>
  );
}

export function RedditIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M22 12.1a2.6 2.6 0 0 0-4.4-1.9 11.6 11.6 0 0 0-5-1.6l1.1-4 3.1.7a2 2 0 1 0 .2-1.2l-3.8-.9a.7.7 0 0 0-.8.5l-1.3 4.8a11.7 11.7 0 0 0-5.1 1.6 2.6 2.6 0 1 0-3 4.2 5.3 5.3 0 0 0 0 1c0 3.3 3.7 6 8.3 6s8.3-2.7 8.3-6a5.3 5.3 0 0 0 0-1 2.6 2.6 0 0 0 1.4-2.2Zm-16.5 0a1.4 1.4 0 1 1 2.8 0 1.4 1.4 0 0 1-2.8 0Zm11.7 5.7c-1.1 1.1-3 1.5-5.2 1.5s-4.1-.4-5.2-1.5a.6.6 0 0 1 .9-.9c.8.8 2.4 1.2 4.3 1.2s3.5-.4 4.3-1.2a.6.6 0 0 1 .9.9Zm-.4-2.9a1.4 1.4 0 1 1 0-2.9 1.4 1.4 0 0 1 0 2.9Z" />
    </svg>
  );
}

export function MailIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className={className} aria-hidden="true">
      <rect x="3" y="5.5" width="18" height="13" rx="1" />
      <path d="m3.5 7 8.5 6 8.5-6" />
    </svg>
  );
}

export function ArrowIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className} aria-hidden="true">
      <path d="M4 12h15M13 5l7 7-7 7" strokeLinecap="square" />
    </svg>
  );
}

export function PlusMark({ className = "text-line2" }: IconProps) {
  return (
    <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1" className={`w-3 h-3 ${className}`} aria-hidden="true">
      <path d="M6 0v12M0 6h12" />
    </svg>
  );
}

export function socialIcon(id: string, className?: string) {
  switch (id) {
    case "tg-channel":
    case "tg-dm":
      return <TelegramIcon className={className} />;
    case "instagram":
      return <InstagramIcon className={className} />;
    case "x":
      return <XIcon className={className} />;
    case "youtube":
      return <YouTubeIcon className={className} />;
    case "tiktok":
      return <TikTokIcon className={className} />;
    case "reddit":
      return <RedditIcon className={className} />;
    default:
      return null;
  }
}
