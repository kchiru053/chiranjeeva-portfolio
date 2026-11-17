import { useState, type FormEvent } from 'react';
import { motion } from 'framer-motion';
import { runtime } from '../data/remote';
import { EASE } from './fx';

type Status = 'idle' | 'sending' | 'sent' | 'error';

const field =
  'w-full rounded-lg border border-white/15 bg-white/5 px-4 py-3 text-sm text-bone placeholder:text-smoke outline-none transition focus:border-crimson-2 focus:bg-white/10';

/** Posts to the Spring Boot API (POST /api/contact). Only rendered when that backend is reachable. */
export default function ContactForm() {
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState('');

  if (!runtime.backend) return null;

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    setStatus('sending');
    setError('');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: fd.get('name'),
          email: fd.get('email'),
          message: fd.get('message'),
          website: fd.get('website'), // honeypot
        }),
      });
      if (res.ok) {
        setStatus('sent');
        form.reset();
        return;
      }
      const body = (await res.json().catch(() => null)) as { message?: string } | null;
      setError(body?.message ?? 'Something went wrong. Please try again, or email me directly.');
      setStatus('error');
    } catch {
      setError('Could not reach the server. Please email me directly.');
      setStatus('error');
    }
  }

  return (
    <motion.form
      onSubmit={submit}
      className="relative mx-auto mt-12 w-full max-w-xl space-y-3 text-left"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}
    >
      <p className="text-center text-[11px] font-bold uppercase tracking-[0.4em] text-smoke">Send a message</p>
      <div className="grid gap-3 sm:grid-cols-2">
        <input name="name" required maxLength={100} placeholder="Your name" autoComplete="name" className={field} aria-label="Your name" />
        <input name="email" type="email" required maxLength={200} placeholder="Your email" autoComplete="email" className={field} aria-label="Your email" />
      </div>
      <textarea name="message" required minLength={10} maxLength={2000} rows={4} placeholder="What would you like to build together?" className={`${field} resize-y`} aria-label="Your message" />
      {/* honeypot: hidden from people, bots tend to fill it */}
      <input name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 opacity-0" />
      <div className="flex flex-wrap items-center justify-between gap-3">
        <button
          type="submit"
          disabled={status === 'sending'}
          data-cursor="play"
          className="min-h-12 rounded-full bg-crimson px-7 text-sm font-bold tracking-[0.12em] text-white shadow-[0_0_40px_rgba(229,19,43,0.4)] transition hover:bg-crimson-2 disabled:opacity-60"
        >
          {status === 'sending' ? 'SENDING…' : '▶ SEND'}
        </button>
        <p role="status" className={`text-sm ${status === 'error' ? 'text-crimson-2' : 'text-[#46e3a8]'}`}>
          {status === 'sent' && 'Message received — thank you!'}
          {status === 'error' && error}
        </p>
      </div>
    </motion.form>
  );
}
