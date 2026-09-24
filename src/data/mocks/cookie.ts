/** Cookie consent copy — the banner and the preferences modal. */

export interface CookieCategoryCopy {
  key: "necessary" | "analytics" | "marketing";
  title: string;
  body: string;
  required?: boolean;
}

export const cookieCopy = {
  privacyHref: "/policies#privacy",
  privacyLabel: "سياسة الخصوصية",
  acceptAllLabel: "قبول الكل",
  rejectAllLabel: "رفض غير الضروري",
  banner: {
    label: "موافقة ملفات تعريف الارتباط",
    title: "هذا الموقع يستخدم ملفات تعريف الارتباط",
    body: "نستخدمها لتشغيل الموقع وتذكّر سلتك ومعرفة أي الصفحات تفيد لنحسّنها. اقبل الكل، أو ارفض غير الضروري، أو اختر فئة بفئة. اطّلع على",
    manageLabel: "إدارة التفضيلات",
  },
  modal: {
    title: "تفضيلات ملفات تعريف الارتباط",
    closeLabel: "إغلاق التفضيلات",
    body: "اختر الفئات التي نُصرَّح باستخدامها. يمكنك تغيير ذلك في أي وقت. اطّلع على",
    saveLabel: "حفظ التفضيلات",
    categories: [
      {
        key: "necessary",
        title: "ضرورية",
        body: "لازمة لعمل الموقع: الأمان والتنقل وتذكّر السلة. لا يمكن إيقافها.",
        required: true,
      },
      {
        key: "analytics",
        title: "تحليلات",
        body: "إحصاءات استخدام مجهولة تخبرنا أي الصفحات تفيد وأيها لا. لا يُبنى أي ملف شخصي.",
      },
      {
        key: "marketing",
        title: "تسويق",
        body: "تتيح لنا قياس أداء الحملات وإظهار العروض التي تهمك. يمكنك إيقافها في أي وقت.",
      },
    ] satisfies CookieCategoryCopy[],
  },
} as const;

export type CookieCopy = typeof cookieCopy;
