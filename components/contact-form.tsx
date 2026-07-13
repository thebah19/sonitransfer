'use client';

import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const contactSchema = z.object({
  name: z.string().min(2, 'Enter your full name.'),
  email: z.string().email('Enter a valid email address.'),
  topic: z.string().min(1, 'Choose a topic.'),
  message: z.string().min(12, 'Tell us a little more so support can help.')
});

type ContactValues = z.infer<typeof contactSchema>;

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm<ContactValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { topic: 'Transfer support' }
  });

  const onSubmit = async (values: ContactValues) => {
    await new Promise((resolve) => setTimeout(resolve, 350));
    setSubmitted(true);
    toast.success(`Thanks ${values.name}. Your message is ready for support routing.`);
    reset({ topic: 'Transfer support', name: '', email: '', message: '' });
  };

  return (
    <Card className="p-6">
      <form className="grid gap-4" onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="grid gap-2">
          <label className="text-sm font-semibold text-navy" htmlFor="name">Full name</label>
          <input id="name" className="rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-gold focus:ring-4 focus:ring-gold/20" {...register('name')} />
          {errors.name ? <p className="text-sm text-red-600">{errors.name.message}</p> : null}
        </div>
        <div className="grid gap-2">
          <label className="text-sm font-semibold text-navy" htmlFor="email">Email</label>
          <input id="email" type="email" className="rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-gold focus:ring-4 focus:ring-gold/20" {...register('email')} />
          {errors.email ? <p className="text-sm text-red-600">{errors.email.message}</p> : null}
        </div>
        <div className="grid gap-2">
          <label className="text-sm font-semibold text-navy" htmlFor="topic">Topic</label>
          <select id="topic" className="rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-gold focus:ring-4 focus:ring-gold/20" {...register('topic')}>
            <option>Transfer support</option>
            <option>Account verification</option>
            <option>Complaint</option>
            <option>Accessibility or vulnerable customer support</option>
            <option>Partnership enquiry</option>
          </select>
          {errors.topic ? <p className="text-sm text-red-600">{errors.topic.message}</p> : null}
        </div>
        <div className="grid gap-2">
          <label className="text-sm font-semibold text-navy" htmlFor="message">Message</label>
          <textarea id="message" rows={5} className="rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-gold focus:ring-4 focus:ring-gold/20" {...register('message')} />
          {errors.message ? <p className="text-sm text-red-600">{errors.message.message}</p> : null}
        </div>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </Button>
        {submitted ? <p className="text-sm font-medium text-forest">Message validated and ready for API submission.</p> : null}
      </form>
    </Card>
  );
}
