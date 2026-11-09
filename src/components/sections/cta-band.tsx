import { ContactForm } from '@/components/contact/contact-form'
import { CopyEmail } from '@/components/home/copy-email'
import { startIntro } from '@/content/home'
import { site } from '@/content/site'

const corner = 'bg-fg absolute size-[7px]'

/**
 * "Start a project", inside the night band. The real enquiry form (same
 * component and Server Action as /contact), framed like a spec sheet with
 * registration marks on its corners.
 *
 * The form's field ids are prefixed, because the /contact modal can open over
 * this page and render a second copy of the form.
 */
export function CtaBand() {
  return (
    <section aria-labelledby="start-heading" className="theme-night pb-band lg:pb-band-lg pt-8 lg:pt-12">
      <div className="shell">
        <div
          id="start"
          className="border-hairline relative grid grid-cols-1 gap-10 border p-5 sm:p-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] lg:gap-14 lg:p-10"
        >
          <span aria-hidden="true" className={`${corner} -top-1 -left-1`} />
          <span aria-hidden="true" className={`${corner} -top-1 -right-1`} />
          <span aria-hidden="true" className={`${corner} -bottom-1 -left-1`} />
          <span aria-hidden="true" className={`${corner} -right-1 -bottom-1`} />

          <div>
            <h2 id="start-heading" className="type-h2 text-fg">
              {startIntro.heading}
            </h2>
            <p className="type-body text-fg-muted mt-4 mb-6 max-w-[42ch]">{startIntro.body}</p>
            <CopyEmail email={site.email} />
          </div>

          <ContactForm idPrefix="start-" />
        </div>
      </div>
    </section>
  )
}
