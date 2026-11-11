import { useRef, useState } from 'react';
import type { FormEvent } from 'react';
import { Send } from 'lucide-react';

const endpoint = import.meta.env.VITE_FORMSPREE_ENDPOINT?.trim() ?? '';
const configured = /^https:\/\/formspree\.io\/f\/[a-zA-Z0-9]+$/.test(endpoint);

export default function InquiryForm({ compact = false }: { compact?: boolean }) {
    const [pending, setPending] = useState(false);
    const [status, setStatus] = useState('');
    const [failed, setFailed] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const sending = useRef(false);
    const prefix = compact ? 'home-inquiry' : 'contact-inquiry';

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (sending.current || !configured) return;
        const form = event.currentTarget;
        const data = new FormData(form);
        const name = String(data.get('name') ?? '').trim();
        const email = String(data.get('email') ?? '').trim();
        const nextErrors: Record<string, string> = {};
        if (!name) nextErrors.name = 'Please enter your name.';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) nextErrors.email = 'Please enter a valid email address.';
        if (!compact && !data.get('service')) nextErrors.service = 'Please select a service.';
        setErrors(nextErrors);
        setStatus('');
        if (Object.keys(nextErrors).length) {
            form.querySelector<HTMLElement>(`[name="${Object.keys(nextErrors)[0]}"]`)?.focus();
            return;
        }
        data.set('name', name);
        data.set('email', email);
        data.set('source', compact ? 'Homepage' : 'Contact page');
        sending.current = true;
        setPending(true);
        setFailed(false);
        const controller = new AbortController();
        const timeout = window.setTimeout(() => controller.abort(), 15000);
        try {
            const response = await fetch(endpoint, {
                method: 'POST', body: data, headers: { Accept: 'application/json' }, signal: controller.signal,
            });
            const result = await response.json();
            if (!response.ok || result.ok !== true) throw new Error('Submission was not accepted');
            form.reset();
            setStatus('Thanks! Your message has been sent.');
        } catch {
            setFailed(true);
            setStatus('Your message could not be sent. Please try again, or contact us by email or phone.');
        } finally {
            window.clearTimeout(timeout);
            sending.current = false;
            setPending(false);
        }
    }

    const errorProps = (name: string) => ({
        'aria-invalid': Boolean(errors[name]),
        'aria-describedby': errors[name] ? `${prefix}-${name}-error` : undefined,
    });
    const error = (name: string) => errors[name] && <p id={`${prefix}-${name}-error`} className="text-sm text-red-800">{errors[name]}</p>;

    return (
        <form onSubmit={handleSubmit} noValidate aria-label={compact ? 'Homepage inquiry' : 'Contact inquiry'} aria-busy={pending} className="space-y-5">
            {!configured && <p role="status" className="rounded-lg bg-amber-50 p-3 text-sm text-amber-950">Online inquiries are currently unavailable. Please <a className="underline" href="mailto:landscapesindia2015@gmail.com">email us</a> or <a className="underline" href="tel:+919327006384">call +91 93270 06384</a>.</p>}
            <fieldset disabled={pending || !configured} className="space-y-5 disabled:opacity-70">
                <legend className="sr-only">Your inquiry</legend>
                <div className="hidden" aria-hidden="true"><label htmlFor={`${prefix}-website`}>Leave this empty</label><input id={`${prefix}-website`} name="_gotcha" tabIndex={-1} autoComplete="off" /></div>
                <div className="space-y-2">
                    <label htmlFor={`${prefix}-name`}>Name *</label>
                    <input id={`${prefix}-name`} name="name" autoComplete="name" required maxLength={120} className="form-field" {...errorProps('name')} />{error('name')}
                </div>
                {!compact && <div className="space-y-2"><label htmlFor={`${prefix}-phone`}>Phone number</label><input id={`${prefix}-phone`} type="tel" name="phone" autoComplete="tel" maxLength={40} className="form-field" /></div>}
                <div className="space-y-2">
                    <label htmlFor={`${prefix}-email`}>Email address *</label>
                    <input id={`${prefix}-email`} type="email" name="email" autoComplete="email" required maxLength={254} className="form-field" {...errorProps('email')} />{error('email')}
                </div>
                {!compact && <div className="space-y-2">
                    <label htmlFor={`${prefix}-service`}>Interested service *</label>
                    <select id={`${prefix}-service`} name="service" required defaultValue="" className="form-field" {...errorProps('service')}>
                        <option value="" disabled>Select a service</option>
                        <option value="maintenance">Garden Maintenance</option><option value="landscape_design">Landscape Design</option><option value="hardscaping">Hardscaping</option><option value="consultation">Consultation</option>
                    </select>{error('service')}
                </div>}
                <div className="space-y-2"><label htmlFor={`${prefix}-message`}>Tell us about your space</label><textarea id={`${prefix}-message`} name="message" rows={3} maxLength={5000} className="form-field" /></div>
                <button type="submit" className="flex items-center justify-center gap-2 rounded-full bg-dark-spruce px-6 py-3 font-semibold text-white hover:bg-[#1b4d3e] disabled:cursor-not-allowed">{pending ? 'Sending…' : 'Request a conversation'}<Send size={16} aria-hidden="true" /></button>
            </fieldset>
            {status && <p role={failed ? 'alert' : 'status'} className={`rounded-lg p-3 text-sm ${failed ? 'bg-red-50 text-red-900' : 'bg-green-50 text-green-900'}`}>{status}</p>}
            {configured && <p className="text-sm text-gray-600">Your details are sent through Formspree to the verified recipient to respond to your inquiry. Please avoid including sensitive information.</p>}
        </form>
    );
}
