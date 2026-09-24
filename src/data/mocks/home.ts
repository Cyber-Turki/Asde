/**
 * Home page copy — every string the home view renders. Components stay pure;
 * the CMS replaces this file when content becomes editable.
 */

export interface LinkCopy {
  label: string;
  href: string;
}

export interface HeroCard {
  icon: "globe" | "target";
  caption?: string;
  lines: string[];
}

export interface FeatureRow {
  icon: "seal" | "shield" | "split" | "truck" | "headset";
  title: string;
  body: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export const heroCopy = {
  /** The product framed in the hero. */
  featuredSlug: "iphone-17-pro",
  deviceLabel: "آيفون 17 برو بلون التيتانيوم، واجهة الشاشة تعرض شعار المتجر",
  /** Bracketed statements against each margin — start side, then end side. */
  statements: {
    start: ["أحدث الإصدارات.", "أسعار 2026.", "ضمان سنتين."],
    end: ["أصلي 100%.", "توصيل لكل المملكة.", "تقسيط بدون فوائد."],
  },
  /** The page's only h1, one element per hand-set line. */
  claim: ["هواتف وأجهزة ذكية أصلية بأسعار 2026.", "تصلك أينما كنت في المملكة."],
  cta: { label: "تسوّق الآن", href: "/products" } satisfies LinkCopy,
  cards: [
    {
      icon: "globe",
      caption: "تأسس 2022",
      lines: ["خبرة نثق بها.", "ابتكار نقوده.", "اهتمام بك."],
    },
    {
      icon: "target",
      lines: ["شحن لكل مدن المملكة", "توصيل سريع وآمن"],
    },
  ] satisfies HeroCard[],
} as const;

export const whyUsCopy = {
  id: "why-us",
  title: "لماذا الخليج؟",
  lede: "متجر سعودي متخصص في هواتف آيفون والأجهزة الذكية الأصلية، من لحظة الطلب حتى ما بعد البيع.",
  rows: [
    {
      icon: "seal",
      title: "أجهزة أصلية 100%",
      body: "كل جهاز مختوم من هيئة الاتصالات والفضاء والتقنية ومسجّل بضمان الوكيل المعتمد في المملكة.",
    },
    {
      icon: "shield",
      title: "ضمان سنتين",
      body: "ضمان شامل على كل الأجهزة، مع استبدال فوري خلال 14 يومًا لأي عيب مصنعي.",
    },
    {
      icon: "split",
      title: "تقسيط بدون فوائد",
      body: "قسّم المبلغ على 4 دفعات عبر تابي أو تمارا، أو حتى 12 شهرًا ببطاقات البنوك المشاركة.",
    },
    {
      icon: "truck",
      title: "توصيل خلال 24 ساعة",
      body: "الرياض وجدة والدمام خلال يوم واحد، وباقي مدن المملكة خلال يومين إلى أربعة أيام مع تتبع للطلب.",
    },
    {
      icon: "headset",
      title: "دعم عربي 7 أيام",
      body: "فريق سعودي يرد عبر واتساب والهاتف من 9 صباحًا حتى 12 ليلًا، قبل الشراء وبعده.",
    },
  ] satisfies FeatureRow[],
  cta: { label: "استكشف الأجهزة", href: "/products" } satisfies LinkCopy,
} as const;

export const collectionsCopy = {
  id: "collections",
  title: "التشكيلة.",
  lede: "أحدث هواتف آيفون وإكسسواراتها والأجهزة الذكية، بأسعار 2026 شاملة ضريبة القيمة المضافة.",
  addLabel: "أضف للسلة",
  addedLabel: "أُضيف",
  tagsLabel: "المواصفات",
  cta: { label: "عرض كل المنتجات", href: "/products" } satisfies LinkCopy,
} as const;

export const categoriesCopy = {
  id: "categories",
  title: "الأقسام.",
  lede: "ثلاثة أقسام تغطي كل ما تحتاجه: الهاتف، وما حوله، وما يكمّله.",
  countLabel: "{count} منتجات",
  linkLabel: "تصفّح القسم",
} as const;

export const faqCopy = {
  id: "faq",
  title: "الأسئلة الشائعة.",
  items: [
    {
      question: "هل الأجهزة أصلية ومكفولة؟",
      answer:
        "نعم. كل الأجهزة أصلية ومختومة من هيئة الاتصالات والفضاء والتقنية، وتأتي بضمان سنتين مع استبدال خلال 14 يومًا في حال وجود عيب مصنعي.",
    },
    {
      question: "كيف أقسّط المبلغ؟",
      answer:
        "اختر تابي أو تمارا عند الدفع وقسّم المبلغ على 4 دفعات بدون فوائد أو رسوم، أو حتى 12 شهرًا ببطاقات البنوك المشاركة.",
    },
    {
      question: "كم يستغرق التوصيل؟",
      answer:
        "خلال 24 ساعة في الرياض وجدة والدمام، ومن يومين إلى أربعة أيام لباقي مدن المملكة، مع رقم تتبع لكل طلب.",
    },
    {
      question: "هل يمكنني الإرجاع أو الاستبدال؟",
      answer:
        "نعم. يمكنك الإرجاع أو الاستبدال خلال 14 يومًا من الاستلام بشرط أن يكون الجهاز بحالته الأصلية مع كامل الملحقات.",
    },
    {
      question: "هل الأسعار شاملة ضريبة القيمة المضافة؟",
      answer:
        "نعم. كل الأسعار المعروضة شاملة ضريبة القيمة المضافة 15%، ولا توجد رسوم إضافية عند الدفع.",
    },
  ] satisfies FaqItem[],
} as const;
