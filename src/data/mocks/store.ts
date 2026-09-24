/**
 * Catalogue placeholder data — categories and products.
 *
 * Prices are indicative 2026 Saudi retail prices in riyals, VAT (15%)
 * included, rounded to the shelf convention (x99 / x49). Replace with the
 * CMS feed when Payload is wired (obsidian/backend/cms-payload.md).
 */
import type { Category, CategorySlug, Product } from "@/types/store";

export const categories: readonly Category[] = [
  {
    slug: "iphone",
    name: "آيفون",
    description: "كل إصدارات آيفون 17 وآيفون إير وآيفون 16e، بكل السعات والألوان.",
  },
  {
    slug: "accessories",
    name: "الإكسسوارات",
    description: "سماعات وشواحن وكفرات أصلية تكمّل جهازك من اليوم الأول.",
  },
  {
    slug: "smart-devices",
    name: "الأجهزة الذكية",
    description: "ساعات وأجهزة لوحية وأجهزة المنزل الذكي التي تعمل معًا.",
  },
];

export const products: readonly Product[] = [
  {
    slug: "iphone-17-pro-max",
    name: "آيفون 17 برو ماكس بسعة 256GB",
    shortName: "آيفون 17 برو ماكس",
    category: "iphone",
    price: 5699,
    description:
      "أكبر شاشة وأطول بطارية في تاريخ آيفون، مع كاميرا تقريب بصري 8x وهيكل ألمنيوم مصقول يبدد الحرارة أسرع.",
    tags: ["256GB", "برتقالي كوني", "A19 Pro"],
    specs: [
      { label: "الشاشة", value: "6.9 إنش Super Retina XDR بمعدل 120Hz" },
      { label: "المعالج", value: "A19 Pro بست نوى" },
      { label: "الكاميرا", value: "ثلاثية 48MP مع تقريب بصري حتى 8x" },
      { label: "البطارية", value: "حتى 39 ساعة تشغيل فيديو" },
      { label: "الألوان", value: "برتقالي كوني، أزرق داكن، فضي" },
    ],
    variants: [
      { label: "السعة", options: ["256GB", "512GB", "1TB"] },
      { label: "اللون", options: ["برتقالي كوني", "أزرق داكن", "فضي"] },
    ],
    art: "iphone",
    badge: "الأكثر مبيعًا",
    inStock: true,
  },
  {
    slug: "iphone-17-pro",
    name: "آيفون 17 برو بسعة 256GB",
    shortName: "آيفون 17 برو",
    category: "iphone",
    price: 4999,
    description:
      "أداء الفئة الاحترافية في حجم اليد: شاشة 6.3 إنش، كاميرات 48MP الثلاث، وتصوير فيديو ProRes بجودة احترافية.",
    tags: ["256GB", "أزرق داكن", "A19 Pro"],
    specs: [
      { label: "الشاشة", value: "6.3 إنش Super Retina XDR بمعدل 120Hz" },
      { label: "المعالج", value: "A19 Pro بست نوى" },
      { label: "الكاميرا", value: "ثلاثية 48MP مع تقريب بصري حتى 8x" },
      { label: "البطارية", value: "حتى 33 ساعة تشغيل فيديو" },
      { label: "الألوان", value: "برتقالي كوني، أزرق داكن، فضي" },
    ],
    variants: [
      { label: "السعة", options: ["256GB", "512GB", "1TB"] },
      { label: "اللون", options: ["برتقالي كوني", "أزرق داكن", "فضي"] },
    ],
    art: "iphone",
    featured: true,
    inStock: true,
  },
  {
    slug: "iphone-17",
    name: "آيفون 17 بسعة 256GB",
    shortName: "آيفون 17",
    category: "iphone",
    price: 3799,
    description:
      "شاشة 120Hz لأول مرة في الفئة الأساسية، كاميرا أمامية مربعة بتقنية Center Stage، وسعة تبدأ من 256GB.",
    tags: ["256GB", "أسود", "A19"],
    specs: [
      { label: "الشاشة", value: "6.3 إنش Super Retina XDR بمعدل 120Hz" },
      { label: "المعالج", value: "A19" },
      { label: "الكاميرا", value: "مزدوجة 48MP مع كاميرا أمامية Center Stage" },
      { label: "البطارية", value: "حتى 30 ساعة تشغيل فيديو" },
      { label: "الألوان", value: "أسود، أبيض، أخضر ضبابي، أزرق فاتح، لافندر" },
    ],
    variants: [
      { label: "السعة", options: ["256GB", "512GB"] },
      { label: "اللون", options: ["أسود", "أبيض", "أخضر ضبابي", "لافندر"] },
    ],
    art: "iphone",
    inStock: true,
  },
  {
    slug: "iphone-air",
    name: "آيفون إير بسعة 256GB",
    shortName: "آيفون إير",
    category: "iphone",
    price: 4399,
    description:
      "الأنحف على الإطلاق بسماكة 5.6 ملم وإطار من التيتانيوم، مع شاشة 6.5 إنش ومعالج A19 Pro.",
    tags: ["256GB", "تيتانيوم", "5.6 ملم"],
    specs: [
      { label: "الشاشة", value: "6.5 إنش Super Retina XDR بمعدل 120Hz" },
      { label: "المعالج", value: "A19 Pro بخمس نوى" },
      { label: "الكاميرا", value: "48MP Fusion بعدسة واحدة" },
      { label: "السماكة", value: "5.6 ملم، إطار تيتانيوم" },
      { label: "الألوان", value: "أسود فضائي، أبيض سحابي، ذهبي فاتح، أزرق سماوي" },
    ],
    variants: [
      { label: "السعة", options: ["256GB", "512GB", "1TB"] },
      { label: "اللون", options: ["أسود فضائي", "أبيض سحابي", "ذهبي فاتح", "أزرق سماوي"] },
    ],
    art: "iphone",
    badge: "جديد",
    featured: true,
    inStock: true,
  },
  {
    slug: "iphone-16e",
    name: "آيفون 16e بسعة 128GB",
    shortName: "آيفون 16e",
    category: "iphone",
    price: 2599,
    compareAtPrice: 2799,
    description:
      "أقل تكلفة للدخول إلى عالم آيفون مع معالج A18، كاميرا 48MP، وبطارية تدوم أطول من أي آيفون بحجم 6.1 إنش.",
    tags: ["128GB", "أسود", "A18"],
    specs: [
      { label: "الشاشة", value: "6.1 إنش Super Retina XDR" },
      { label: "المعالج", value: "A18" },
      { label: "الكاميرا", value: "48MP Fusion" },
      { label: "البطارية", value: "حتى 26 ساعة تشغيل فيديو" },
      { label: "الألوان", value: "أسود، أبيض" },
    ],
    variants: [
      { label: "السعة", options: ["128GB", "256GB", "512GB"] },
      { label: "اللون", options: ["أسود", "أبيض"] },
    ],
    art: "iphone",
    badge: "عرض",
    inStock: true,
  },
  {
    slug: "airpods-pro-3",
    name: "إيربودز برو 3",
    shortName: "إيربودز برو 3",
    category: "accessories",
    price: 999,
    description:
      "إلغاء ضوضاء أقوى بمرتين، مستشعر نبض القلب لأول مرة، وثبات أفضل في الأذن للرياضة اليومية.",
    tags: ["إلغاء ضوضاء", "مستشعر نبض", "IP57"],
    specs: [
      { label: "الشريحة", value: "H2 مع إلغاء ضوضاء نشط من الجيل الثالث" },
      { label: "الصحة", value: "مستشعر نبض القلب أثناء التمارين" },
      { label: "البطارية", value: "حتى 8 ساعات مع إلغاء الضوضاء، 24 ساعة مع العلبة" },
      { label: "المقاومة", value: "IP57 للماء والعرق والغبار" },
    ],
    art: "airpods",
    featured: true,
    inStock: true,
  },
  {
    slug: "magsafe-charger",
    name: "شاحن MagSafe بقوة 25W",
    shortName: "شاحن MagSafe",
    category: "accessories",
    price: 189,
    description:
      "شحن مغناطيسي سريع بقوة 25W لآيفون 16 و17، متوافق مع معيار Qi2 ومزود بكابل USB-C بطول متر.",
    tags: ["25W", "Qi2", "كابل 1م"],
    specs: [
      { label: "القوة", value: "حتى 25W مع محول 30W أو أعلى" },
      { label: "التوافق", value: "آيفون 12 وأحدث، وإيربودز بعلبة MagSafe" },
      { label: "الكابل", value: "USB-C مدمج بطول 1 متر" },
    ],
    art: "charger",
    inStock: true,
  },
  {
    slug: "iphone-17-pro-silicone-case",
    name: "كفر سيليكون بتقنية MagSafe لآيفون 17 برو",
    shortName: "كفر سيليكون MagSafe",
    category: "accessories",
    price: 229,
    description:
      "سيليكون ناعم من الخارج وبطانة مخملية من الداخل، بمغناطيسات مدمجة تثبّت الشاحن والمحفظة بإحكام.",
    tags: ["MagSafe", "آيفون 17 برو", "سيليكون"],
    specs: [
      { label: "الخامة", value: "سيليكون سائل مع بطانة ألياف دقيقة" },
      { label: "التوافق", value: "آيفون 17 برو" },
      { label: "الألوان", value: "أسود، أخضر عميق، رملي" },
    ],
    variants: [{ label: "اللون", options: ["أسود", "أخضر عميق", "رملي"] }],
    art: "case",
    inStock: true,
  },
  {
    slug: "dual-usb-c-adapter",
    name: "محول طاقة مزدوج USB-C بقوة 35W",
    shortName: "محول طاقة 35W",
    category: "accessories",
    price: 249,
    description:
      "منفذان USB-C يشحنان الآيفون والساعة معًا من مقبس واحد، بحجم مضغوط يناسب السفر.",
    tags: ["35W", "منفذان", "مضغوط"],
    specs: [
      { label: "القوة", value: "35W موزعة تلقائيًا بين المنفذين" },
      { label: "المنافذ", value: "2 × USB-C" },
      { label: "القابس", value: "نوع G المعتمد في المملكة" },
    ],
    art: "adapter",
    inStock: true,
  },
  {
    slug: "apple-watch-series-11",
    name: "ساعة آبل سيريس 11 مقاس 46 ملم GPS",
    shortName: "ساعة آبل سيريس 11",
    category: "smart-devices",
    price: 1799,
    description:
      "شاشة أكثر سطوعًا بزجاج أقوى بمرتين، تنبيهات ارتفاع ضغط الدم، وبطارية تكمل اليوم وتزيد.",
    tags: ["46 ملم", "GPS", "ألمنيوم"],
    specs: [
      { label: "الهيكل", value: "ألمنيوم 46 ملم، مقاوم للماء حتى 50 متر" },
      { label: "الشاشة", value: "Retina دائمة التشغيل بسطوع 2000 شمعة" },
      { label: "الصحة", value: "تنبيهات ضغط الدم، جودة النوم، تخطيط القلب" },
      { label: "البطارية", value: "حتى 24 ساعة، شحن سريع" },
    ],
    variants: [
      { label: "المقاس", options: ["42 ملم", "46 ملم"] },
      { label: "اللون", options: ["أسود", "فضي", "ذهبي وردي"] },
    ],
    art: "watch",
    featured: true,
    inStock: true,
  },
  {
    slug: "ipad-air-m3",
    name: "آيباد إير M3 مقاس 11 إنش بسعة 128GB",
    shortName: "آيباد إير M3",
    category: "smart-devices",
    price: 2699,
    description:
      "معالج M3 في جهاز يزن أقل من نصف كيلو، مع دعم قلم Apple Pencil Pro ولوحة المفاتيح السحرية.",
    tags: ["11 إنش", "M3", "128GB"],
    specs: [
      { label: "الشاشة", value: "Liquid Retina 11 إنش" },
      { label: "المعالج", value: "Apple M3" },
      { label: "السعة", value: "128GB، Wi-Fi 6E" },
      { label: "الملحقات", value: "يدعم Apple Pencil Pro" },
    ],
    variants: [
      { label: "السعة", options: ["128GB", "256GB", "512GB"] },
      { label: "الاتصال", options: ["Wi-Fi", "Wi-Fi + 5G"] },
    ],
    art: "ipad",
    inStock: true,
  },
  {
    slug: "homepod-mini",
    name: "هوم بود ميني",
    shortName: "هوم بود ميني",
    category: "smart-devices",
    price: 449,
    description:
      "صوت محيطي بحجم راحة اليد، ومركز تحكم بالمنزل الذكي يفهم العربية عبر سيري.",
    tags: ["سيري بالعربية", "Thread", "360°"],
    specs: [
      { label: "الصوت", value: "مكبر صوت كامل المدى بصوت 360 درجة" },
      { label: "المنزل الذكي", value: "مركز Matter و Thread" },
      { label: "الألوان", value: "أسود، أبيض، أزرق، برتقالي، أصفر" },
    ],
    variants: [{ label: "اللون", options: ["أسود", "أبيض", "أزرق", "برتقالي"] }],
    art: "homepod",
    inStock: true,
  },
  {
    slug: "apple-tv-4k",
    name: "آبل تي في 4K بسعة 128GB",
    shortName: "آبل تي في 4K",
    category: "smart-devices",
    price: 699,
    description:
      "بث بجودة 4K HDR مع Dolby Atmos، ومركز للمنزل الذكي يربط الكاميرات والإضاءة بشاشة التلفاز.",
    tags: ["4K HDR", "128GB", "Ethernet"],
    specs: [
      { label: "الجودة", value: "4K Dolby Vision و HDR10+" },
      { label: "الصوت", value: "Dolby Atmos" },
      { label: "الاتصال", value: "Wi-Fi 6 و Gigabit Ethernet" },
    ],
    art: "appletv",
    inStock: true,
  },
];

export const getProduct = (slug: string): Product | undefined =>
  products.find((product) => product.slug === slug);

export const getCategory = (slug: string): Category | undefined =>
  categories.find((category) => category.slug === slug);

export const getProductsByCategory = (slug: CategorySlug): Product[] =>
  products.filter((product) => product.category === slug);

export const featuredProducts = (): Product[] =>
  products.filter((product) => product.featured);

export const isCategorySlug = (value: string): value is CategorySlug =>
  categories.some((category) => category.slug === value);
