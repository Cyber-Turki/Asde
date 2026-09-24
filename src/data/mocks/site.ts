/**
 * Site chrome copy — header navigation, footer columns, newsletter, legal.
 */
import { siteConfig } from "@/lib/site";

export interface NavLink {
  label: string;
  href: string;
}

export interface FooterColumn {
  heading: string;
  links: NavLink[];
}

export const navCopy = {
  homeLabel: "الرئيسية",
  links: [
    { label: "المتجر", href: "/products" },
    { label: "آيفون", href: "/products?category=iphone" },
    { label: "الإكسسوارات", href: "/products?category=accessories" },
    { label: "الأجهزة الذكية", href: "/products?category=smart-devices" },
    { label: "الأسئلة الشائعة", href: "/#faq" },
  ] satisfies NavLink[],
  navLabel: "القائمة الرئيسية",
  menuLabel: "القائمة",
  cartLabel: "السلة",
  menuOpenLabel: "فتح القائمة",
  menuCloseLabel: "إغلاق القائمة",
  skipLabel: "تخطّي إلى المحتوى",
} as const;

export const lineItemCopy = {
  removeLabel: "إزالة {name}",
  quantityLabel: "الكمية من {name}",
  decreaseLabel: "أنقص",
  increaseLabel: "أضف",
} as const;

export const cartDrawerCopy = {
  title: "السلة",
  closeLabel: "إغلاق السلة",
  emptyLabel: "سلتك فارغة.",
  browseLabel: "تصفّح المنتجات",
  vatLabel: "الضريبة المضمّنة (15%)",
  totalLabel: "الإجمالي شامل الضريبة",
  checkoutLabel: "إتمام الطلب",
  continueLabel: "متابعة التسوق",
  lineItem: lineItemCopy,
} as const;

export const footerCopy = {
  navLabel: "روابط الموقع",
  columns: [
    {
      heading: "المتجر",
      links: [
        { label: "آيفون", href: "/products?category=iphone" },
        { label: "الإكسسوارات", href: "/products?category=accessories" },
        { label: "الأجهزة الذكية", href: "/products?category=smart-devices" },
        { label: "العروض", href: "/products" },
      ],
    },
    {
      heading: "الخدمات",
      links: [
        { label: "التقسيط", href: "/#why-us" },
        { label: "الضمان", href: "/#why-us" },
        { label: "الشحن والتوصيل", href: "/#why-us" },
      ],
    },
    {
      heading: "الدعم",
      links: [
        { label: "الأسئلة الشائعة", href: "/#faq" },
        { label: "الإرجاع والاستبدال", href: "/policies#returns" },
        { label: "سياسة الخصوصية", href: "/policies#privacy" },
        { label: "الشروط والأحكام", href: "/policies#terms" },
      ],
    },
  ] satisfies FooterColumn[],
  contact: {
    heading: "تواصل معنا",
    phone: siteConfig.phone,
    whatsappHref: `https://wa.me/${siteConfig.whatsapp}`,
    whatsappLabel: "واتساب",
    email: siteConfig.email,
    hours: "يوميًا من 9 صباحًا حتى 12 ليلًا",
  },
  newsletter: {
    heading: "كن أول من يعرف بالعروض.",
    placeholder: "بريدك الإلكتروني",
    submitLabel: "اشتراك",
    consentLabel: "أوافق على استلام العروض والتحديثات.",
    successMessage: "تم الاشتراك. سنراسلك عند أول عرض.",
  },
  legal: {
    copyright: `© 2026 ${siteConfig.name}. جميع الحقوق محفوظة.`,
    vat: `الرقم الضريبي ${siteConfig.vatNumber}`,
    cr: `السجل التجاري ${siteConfig.crNumber}`,
  },
  social: [
    { label: "إنستغرام", href: "https://instagram.com/" },
    { label: "تيك توك", href: "https://tiktok.com/" },
    { label: "يوتيوب", href: "https://youtube.com/" },
  ] satisfies NavLink[],
} as const;
