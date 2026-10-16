import { FAQSchema } from "@/components/json-ld"

interface FAQ {
  question: string
  answer: string
}

interface FAQSectionProps {
  title?: string
  faqs: FAQ[]
}

export function FAQSection({ title = "Frequently Asked Questions", faqs }: FAQSectionProps) {
  return (
    <section className="py-12 lg:py-16">
      <FAQSchema faqs={faqs} />
      <div className="mx-auto max-w-3xl">
        <h2 className="mb-8 text-center text-2xl font-bold text-foreground lg:text-3xl">
          {title}
        </h2>
        <div className="w-full">
          {faqs.map((faq, index) => (
            <details key={index} className="border-b border-border py-4">
              <summary className="cursor-pointer text-left text-foreground hover:text-primary">
                {faq.question}
              </summary>
              <p className="pt-3 text-muted-foreground">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
