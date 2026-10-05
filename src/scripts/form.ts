/**
 * Contact form: client-side validation (Hungarian messages), honeypot, background JSON POST to
 * FormSubmit's AJAX endpoint (https://formsubmit.co/documentation). No page reload; on success the
 * fields are swapped for an in-place thank-you panel.
 *
 * Client checks are for UX only. FormSubmit is the only server-side layer (its own spam filter + `_honey`).
 */
type Errors = Record<'name' | 'email' | 'message' | 'consent' | 'summary', string>;
type Status = { failure: string; email: string; sending: string };
type Mail = {
  subject: string;
  name: string;
  phone: string;
  topics: string;
  message: string;
  consent: string;
  consentValue: string;
  empty: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function init(form: HTMLFormElement) {
  const errors = JSON.parse(form.dataset.errors ?? '{}') as Errors;
  const status = JSON.parse(form.dataset.status ?? '{}') as Status;
  const mail = JSON.parse(form.dataset.mail ?? '{}') as Mail;
  const endpoint = form.dataset.endpoint ?? '';
  const fields = form.querySelector<HTMLElement>('[data-fields]')!;
  const success = form.querySelector<HTMLElement>('[data-success]')!;
  const successTitle = form.querySelector<HTMLElement>('[data-success-title]')!;
  const again = form.querySelector<HTMLButtonElement>('[data-again]')!;
  const summary = form.querySelector<HTMLElement>('[data-summary]')!;
  const statusEl = form.querySelector<HTMLElement>('[data-status-msg]')!;
  const submit = form.querySelector<HTMLButtonElement>('[data-submit]')!;
  const submitLabel = form.querySelector<HTMLElement>('[data-submit-label]')!;
  const defaultLabel = submitLabel.textContent ?? '';

  const field = (name: string) => form.elements.namedItem(name) as HTMLInputElement | HTMLTextAreaElement;

  const checks: Record<string, () => string | null> = {
    name: () => (field('name').value.trim().length < 2 ? errors.name : null),
    email: () => (EMAIL_RE.test(field('email').value.trim()) ? null : errors.email),
    message: () => (field('message').value.trim().length < 20 ? errors.message : null),
    consent: () => ((field('consent') as HTMLInputElement).checked ? null : errors.consent),
  };

  const show = (name: string, msg: string | null) => {
    const input = field(name);
    const out = form.querySelector<HTMLElement>(`[data-error-for="${name}"]`);
    input.setAttribute('aria-invalid', msg ? 'true' : 'false');
    if (out) out.textContent = msg ?? '';
  };

  const validate = () => {
    let firstInvalid: string | null = null;
    for (const name of Object.keys(checks)) {
      const msg = checks[name]();
      show(name, msg);
      if (msg && !firstInvalid) firstInvalid = name;
    }
    return firstInvalid;
  };

  // Re-validate a field once the user has interacted with it.
  for (const name of Object.keys(checks)) {
    const input = field(name);
    const evt = input.type === 'checkbox' ? 'change' : 'blur';
    input.addEventListener(evt, () => show(name, checks[name]()));
    input.addEventListener('input', () => {
      if (input.getAttribute('aria-invalid') === 'true') show(name, checks[name]());
    });
  }

  const showFailure = () => {
    statusEl.textContent = status.failure;
    const a = document.createElement('a');
    a.href = `mailto:${status.email}`;
    a.textContent = status.email;
    statusEl.append(' ', a);
  };

  const showSuccess = () => {
    // Keep the card the same height so the page does not jump when the fields disappear.
    form.style.setProperty('--sent-min', `${fields.offsetHeight}px`);
    form.reset();
    for (const name of Object.keys(checks)) show(name, null);
    summary.hidden = true;
    statusEl.textContent = '';
    fields.hidden = true;
    success.hidden = false;
    successTitle.focus({ preventScroll: true });
    // Bring the panel into view if the form was taller than the viewport.
    const r = success.getBoundingClientRect();
    if (r.top < 0 || r.bottom > window.innerHeight) {
      success.scrollIntoView({ block: 'center', behavior: 'smooth' });
    }
  };

  again.addEventListener('click', () => {
    success.hidden = true;
    fields.hidden = false;
    field('name').focus();
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    statusEl.textContent = '';
    const invalid = validate();
    if (invalid) {
      summary.textContent = errors.summary;
      summary.hidden = false;
      field(invalid).focus();
      return;
    }
    summary.hidden = true;

    const data = new FormData(form);
    // Honeypot filled: pretend success, send nothing.
    if (String(data.get('_honey') ?? '').trim() !== '') {
      showSuccess();
      return;
    }

    const email = String(data.get('email') ?? '').trim();
    const topics = data.getAll('topics').map(String);
    const phone = String(data.get('phone') ?? '').trim();

    submit.disabled = true;
    submitLabel.textContent = status.sending;
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          [mail.name]: String(data.get('name') ?? '').trim(),
          email, // literal key: FormSubmit uses it for the sender
          [mail.phone]: phone || mail.empty,
          [mail.topics]: topics.length ? topics.join(', ') : mail.empty,
          [mail.message]: String(data.get('message') ?? '').trim(),
          [mail.consent]: mail.consentValue,
          _subject: mail.subject,
          _template: 'table',
          _replyto: email,
          _honey: '',
        }),
      });
      const json = (await res.json().catch(() => null)) as { success?: unknown; message?: string } | null;
      const ok = res.ok && (json?.success === true || json?.success === 'true');
      if (!ok) {
        // FormSubmit answers success:"false" until the address has been activated by e-mail.
        console.warn('FormSubmit:', res.status, json?.message ?? '');
        throw new Error('not-delivered');
      }
      showSuccess();
    } catch {
      showFailure();
    } finally {
      submit.disabled = false;
      submitLabel.textContent = defaultLabel;
    }
  });
}

document.querySelectorAll<HTMLFormElement>('[data-form]').forEach(init);
