"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import { Button } from "@/components/button";
import { useLocale } from "@/components/locale-provider";
import { cx } from "@/lib/cx";
import { company } from "@/lib/site";

type Fields = {
  name: string;
  company: string;
  email: string;
  phone: string;
  message: string;
  website: string;
};

type Errors = Partial<Record<keyof Fields, string>>;

const empty: Fields = {
  name: "",
  company: "",
  email: "",
  phone: "",
  message: "",
  website: "",
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-deep">
        {label}
      </label>
      <div className="mt-2">{children}</div>
      {error ? (
        <p id={`${id}-error`} className="mt-2 text-sm text-danger" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}

const inputClass =
  "w-full rounded-xl border border-line bg-muted px-3.5 py-3 text-base text-deep placeholder:text-steel/60";

export function ContactForm({
  compact = false,
  idPrefix = "contact",
}: {
  compact?: boolean;
  idPrefix?: string;
}) {
  const { locale, dict } = useLocale();
  const [values, setValues] = useState<Fields>(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [notice, setNotice] = useState("");
  const [pending, setPending] = useState(false);

  function validate(next: Fields, requireMessage: boolean): Errors {
    const nextErrors: Errors = {};
    if (next.name.trim().length < 2) {
      nextErrors.name = dict.form.errorName;
    }
    if (!emailPattern.test(next.email.trim())) {
      nextErrors.email = dict.form.errorEmail;
    }
    const digits = next.phone.replace(/\D/g, "");
    if (next.phone.trim() && (digits.length < 8 || !/^[0-9+\s()-]+$/.test(next.phone.trim()))) {
      nextErrors.phone = dict.form.errorPhone;
    }
    if (requireMessage && next.message.trim().length < 20) {
      nextErrors.message = dict.form.errorMessage;
    }
    return nextErrors;
  }

  function update(key: keyof Fields, value: string) {
    setValues((current) => ({ ...current, [key]: value }));
    setNotice("");
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validate(values, !compact);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      setNotice("");
      return;
    }

    // Honeypot filled — pretend success, do not open mail client.
    if (values.website.trim()) {
      setNotice(dict.form.noticeSent);
      setValues(empty);
      return;
    }

    setPending(true);
    try {
      // Static GitHub Pages host: open the visitor's email client (no server API).
      const subject = encodeURIComponent(
        compact ? `STG enquiry — ${values.name.trim()}` : `STG contact — ${values.name.trim()}`,
      );
      const body = encodeURIComponent(
        [
          `Name: ${values.name.trim()}`,
          values.company.trim() ? `Company: ${values.company.trim()}` : null,
          `Email: ${values.email.trim()}`,
          values.phone.trim() ? `Phone: ${values.phone.trim()}` : null,
          values.message.trim() ? `\n${values.message.trim()}` : null,
          `\nLocale: ${locale}`,
        ]
          .filter(Boolean)
          .join("\n"),
      );
      window.location.href = `mailto:${company.email}?subject=${subject}&body=${body}`;
      setNotice(dict.form.noticeSent);
      setValues(empty);
    } catch {
      setNotice(dict.form.noticeNotSent);
    } finally {
      setPending(false);
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="relative space-y-4"
      aria-describedby={`${idPrefix}-note`}
    >
      <p id={`${idPrefix}-note`} className="text-sm text-steel">
        {dict.form.note}
      </p>
      <div className="pointer-events-none absolute start-0 top-0 -z-10 h-px w-px overflow-hidden opacity-0" aria-hidden="true">
        <label htmlFor={`${idPrefix}-website`}>Website</label>
        <input
          id={`${idPrefix}-website`}
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={values.website}
          onChange={(event) => update("website", event.target.value)}
        />
      </div>
      <div className={cx("grid gap-4", !compact && "sm:grid-cols-2")}>
        <Field id={`${idPrefix}-name`} label={dict.form.name} error={errors.name}>
          <input
            id={`${idPrefix}-name`}
            name="name"
            autoComplete="name"
            value={values.name}
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={errors.name ? `${idPrefix}-name-error` : undefined}
            onChange={(event) => update("name", event.target.value)}
            className={cx(inputClass, errors.name && "border-danger")}
          />
        </Field>
        {!compact ? (
          <Field id={`${idPrefix}-company`} label={dict.form.company} error={errors.company}>
            <input
              id={`${idPrefix}-company`}
              name="organization"
              autoComplete="organization"
              value={values.company}
              onChange={(event) => update("company", event.target.value)}
              className={inputClass}
            />
          </Field>
        ) : null}
      </div>
      <div className={cx("grid gap-4", !compact && "sm:grid-cols-2")}>
        <Field id={`${idPrefix}-email`} label={dict.form.email} error={errors.email}>
          <input
            id={`${idPrefix}-email`}
            name="email"
            type="email"
            dir="ltr"
            autoComplete="email"
            inputMode="email"
            value={values.email}
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={errors.email ? `${idPrefix}-email-error` : undefined}
            onChange={(event) => update("email", event.target.value)}
            className={cx(inputClass, "latin", errors.email && "border-danger")}
          />
        </Field>
        <Field id={`${idPrefix}-phone`} label={dict.form.telephone} error={errors.phone}>
          <input
            id={`${idPrefix}-phone`}
            name="tel"
            type="tel"
            dir="ltr"
            autoComplete="tel"
            inputMode="tel"
            placeholder="+974"
            value={values.phone}
            aria-invalid={errors.phone ? true : undefined}
            aria-describedby={errors.phone ? `${idPrefix}-phone-error` : undefined}
            onChange={(event) => update("phone", event.target.value)}
            className={cx(inputClass, "latin", errors.phone && "border-danger")}
          />
        </Field>
      </div>
      {!compact ? (
        <Field id={`${idPrefix}-message`} label={dict.form.requirement} error={errors.message}>
          <textarea
            id={`${idPrefix}-message`}
            name="message"
            rows={5}
            value={values.message}
            aria-invalid={errors.message ? true : undefined}
            aria-describedby={errors.message ? `${idPrefix}-message-error` : undefined}
            onChange={(event) => update("message", event.target.value)}
            className={cx(inputClass, "resize-y", errors.message && "border-danger")}
          />
        </Field>
      ) : null}
      <div className="flex flex-col items-start gap-3 pt-1">
        <Button type="submit" variant="gold" className="w-full sm:w-auto" disabled={pending}>
          {compact ? dict.form.getStarted : dict.form.submitEnquiry}
        </Button>
        {notice ? (
          <p role="status" className="text-sm text-deep">
            {notice}
          </p>
        ) : null}
      </div>
    </form>
  );
}
