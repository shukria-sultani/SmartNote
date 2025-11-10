import React, { createContext, useContext, useState, useEffect } from "react";
// Translation data
const translations = {
  en: {
    app_title: "SmartNote",
    nav_link_home: "Home",
    nav_link_notes: "Notes",
    nav_link_about: "About",
    current_lang: "English",
    text_direction: "ltr",
    hero_h1: "Connect Your Thoughts.",
    hero_h1_nextLine: " Fuel Your Progress!",
    hero_p:
      "Get AI Summary, Take Quiz, <br /> Master Your Studies With SmartNote",
    hero_button: "Go to notes",
    why_smartNote: "Why SmartNote?",
    clarity: "Clarity From Chaos",
    org_knowledge:
      "SmartNote transforms fragmented thoughts into organized knowledge.",
    challenge_title: "The Challenge: Where Great Ideas Get Lost",
    challenge_1_title: "Fragmented Notes",
    challenge_1_description:
      "Your ideas are scattered across physical pads, digital sticky notes, and emails. Momentum is killed switching between tools.",
    challenge_2_title: "Search Anxiety",
    challenge_2_description:
      "Searching for information feels like digging through a landfill. You spend more time finding old ideas than creating new ones.",
    challenge_3_title: "No Organization",
    challenge_3_description:
      "Without proper structure, every new note adds to the mental clutter. Your system works against you, leading to idea fatigue.",
    solution_title: "The SmartNote Solutions: Clarity and Intelligence",
    solution_1_title: "AI-Powered Summary",
    solution_1_description:
      "Solves Information Overload. Instantly distill long notes, articles, or meeting transcripts into concise, key takeaways.",
    solution_2_title: "Auto-Quiz Generation",
    solution_2_description:
      "Solves Passive Learning. Turn any note into a customized study quiz to actively test your knowledge and maximize retention.",
    solution_3_title: "Instant Global Search",
    solution_3_description:
      "Solves Search Anxiety. Finds keywords, titles, and content across every note in milliseconds. Searching is now instant recall.",
    solution_4_title: "Smart Subject Filtering",
    solution_4_description:
      "Solves Fragmentation. Quickly assign subjects with one tap and use the filter bar to isolate projects, topics, or categories instantly.",
    footer: "Developed By Shukria ❤",
    filter_text: "Filter the notes by subject",
    search_text: "Search notes by keywords...",
    read: "Read",
    add_note: "Add Note",
    edit_note: "Edit Note",
    delete: "Delete",
    note_title: "Enter the title",
    subject: "Note Subject",
    title: "Note Title",
    note_subject: "Enter the subject",
    note_content: "Enter the content",
    add_title: "Add a new Note",
    update_title: "Update Note",
    take_quiz: "Take Quiz",
    loading_quiz: "Loading Quiz...",
    ai_summary: "AI Summmary",
    loading_summary: "Loading summary...",
    summary_for : "Summary for:",
    download_pdf: "Download PDF",
    bg_color: "Choose background color",
    about_smart: "About SmartNote: My Vision for Smarter Thinking",
    about_description:
      "At SmartNote, we believe your ideas are your most valuable asset. Our vision is to move note-taking beyond simple recording and toward intelligent knowledge activation. We aim to eliminate the chaos of passive information consumption and provide a single, private space where your notes don't just sit—they work for you. SmartNote is built to transform every thought, lecture, and meeting into an active opportunity for learning, recall, and mastery.",
    philosophy: "My Philosopy: Clarity, Control, and Continous Learning",
    philosophy_1: "Calrity Through Simplicity",
    philosophy_2: "Control Over Your Data",
    philosophy_3: "Continous Learning",
    developer: "Meet the Developer",
    developer_info:
      "Hi, I'm Shukria Sultani, a Frontend Developer based in Afghanistan. Throughout my journey as a student and developer, I constantly dealt with complex lecture notes and documentations, and realized that existing note apps only tracked ideas—they didn't manage them. Driven by the need for a smarter system, I built SmartNote. It combines my background in UX design and frontend development with powerful AI to transform how you interact with your own thoughts.",
    contribute: "Contribute to SmartNote: Join the Mission",
    how: "How You Can Help",
    contrib_description:
      "I believe in open development. Every contribution, big or small, helps turn SmartNote into the best tool it can be.",
    code: "Help me refine features, improve performance, and build out the next generation of smart tools",
    design:
      "Help me perfect the user experience and visual design, ensuring SmartNote remains clean and intuitive.",
    github_repo: "GitHub Repository",
    contact_me: "Contact Me",
    contact_name: "Shukria",
    email: "shukria@gmail.com",
    message: "Message...",
    send_message: "Send Message",
    delete_confirmation : "Are you sure that you want to delete this note?",
    yes: "Yes",
    cancel: "Cancel",
    quiz_completeed: "Quiz Completed! 🎉",
    score: "You scored",
    out_of: "out of",
     try_again: "Try Again"
  },
  fa: {
    app_title: "اسمارت نوت",
    nav_link_home: " خانه",
    nav_link_notes: " یادداشت ها",
    nav_link_about: "در باره ",
    current_lang: "  فارسی ",
    text_direction: "rtl",
    hero_h1: "افکار تان را  مرتبط کنید.",
    hero_h1_nextLine: "پیشرفت خود را سرعت دهید!",
    hero_p:
      "با اسمارت نوت، یاداشت های خود را با هوش مصنوعی خلاصه کنید،<br /> دانش خود را امتحان کنید و هوشمندانه تر درس بخوانید.",
    hero_button: "یادداشت ها",
    why_smartNote: "چرا اسمارت نوت؟",
    clarity: "روشنی از دل آشفته گی",
    org_knowledge:
      "اسمارت نوت افکار پراگنده را به دانش سازمان یافته تبدیل میکند.",
    challenge_title: "چالش: جایی که ایده‌های بزرگ گم می‌شوند",
    challenge_1_title: "یادداشت‌های پراکنده",
    challenge_1_description:
      "ایده‌های شما در دفترچه‌های فیزیکی، یادداشت‌های دیجیتال و ایمیل‌ها پخش شده‌اند. با تغییر ابزارها، سرعت عمل از بین می‌رود.",
    challenge_2_title: "اضطراب جستجو",
    challenge_2_description:
      "جستجوی اطلاعات شبیه گشتن در یک زباله‌دان است. شما زمان بیشتری را صرف پیدا کردن ایده‌های قدیمی می‌کنید تا خلق ایده‌های جدید.",
    challenge_3_title: "عدم سازماندهی",
    challenge_3_description:
      "بدون ساختار مناسب، هر یادداشت جدید به آشفتگی ذهنی می‌افزاید. سیستم شما بر علیه شما کار می‌کند و منجر به فرسودگی ایده می‌شود.",
    solution_title: "راه‌حل‌های اسمارت‌نوت: وضوح و هوشمندی",
    solution_1_title: "خلاصه‌سازی با هوش مصنوعی",
    solution_1_description:
      "حل مشکل حجم بالای اطلاعات. فوراً یادداشت‌ها، مقالات یا رونوشت‌های جلسات طولانی را به نکات کلیدی و مختصر تبدیل کنید.",
    solution_2_title: "تولید خودکار آزمون",
    solution_2_description:
      "حل مشکل یادگیری غیرفعال. هر یادداشتی را به یک آزمون سفارشی برای مطالعه تبدیل کنید تا به‌طور فعال دانش خود را بیازمایید و بیشترین میزان یادگیری را داشته باشید.",
    solution_3_title: "جستجوی جهانی فوری",
    solution_3_description:
      "حل مشکل اضطراب جستجو. کلمات کلیدی، عنوان‌ها و محتوا را در کسری از ثانیه در تمامی یادداشت‌ها پیدا کنید. جستجو اکنون به معنای بازیابی فوری است.",
    solution_4_title: "فیلترینگ هوشمند موضوع",
    solution_4_description:
      "حل مشکل پراکندگی. با یک ضربه سریع موضوعات را تعیین کنید و از نوار فیلتر برای جدا کردن فوری پروژه‌ها، مباحث یا دسته‌بندی‌ها استفاده نمایید.",
    footer: "توسعه داده شده توسط شکریه ❤",
    filter_text: "فیلتر بر اساس مضمون",
    search_text: "جستجو با کلمات کلیدی...",
    read: "خواندن",
    delete: "حذف",
    add_note: "اضافه کردن یادداشت",
    update_title: "بروز رسانی یادداشت",
    note_title: "عنوان یادداشت",
    note_subject: "مضمون یادداشت",
    note_content: " محتوای یادداشت",
    add_title: "اضافه کردن یک یادداشت جدید",
    edit_note: "ویرایش یادداشت",
    take_quiz: "گرفتن امتحان",
    loading_quiz: "بارگذاری امتحان...",
    ai_summary: "خلاصه هوش مصنوعی",
    loading_summary: "بارگذاری خلاصه",
    summary_for: "خلاصه:",
    download_pdf: "دانلود پی دی اف",
    bg_color: "انتخاب رنگ پس زمینه",
    about_smart: "درباره اسمارت نوت: چشم‌انداز من برای تفکر هوشمندتر",
    about_description:
      "در اسمارت نوت، ما معتقدیم که ایده‌های شما باارزش‌ترین دارایی شما هستند. چشم‌انداز ما این است که یادداشت‌برداری را فراتر از ثبت ساده و به سمت فعال‌سازی هوشمندانه دانش پیش ببریم. هدف ما از بین بردن آشفتگی مصرف اطلاعات غیرفعال و فراهم کردن یک فضای واحد و خصوصی است که در آن یادداشت‌های شما فقط 'ننشینند' – بلکه برای شما کار کنند. اسمارت نوت ساخته شده تا هر فکر، سخنرانی و جلسه را به یک فرصت فعال برای یادگیری، یادآوری و تسلط تبدیل کند.",
    philosophy: "فلسفه من: وضوح، کنترل و یادگیری مستمر",
    philosophy_1: "وضوح از طریق سادگی",
    philosophy_2: "کنترل بر داده‌های شما",
    philosophy_3: "یادگیری مستمر",
    developer: "آشنایی با توسعه‌دهنده",
    developer_info:
      "سلام، من شکریه سلطانی، یک توسعه‌دهنده فرانت‌اند ساکن افغانستان هستم. در طول سفرم به عنوان دانشجو و توسعه‌دهنده، به طور مداوم با یادداشت‌های سخنرانی و مستندات پیچیده سروکار داشتم و متوجه شدم که برنامه‌های یادداشت‌برداری موجود فقط ایده‌ها را پیگیری می‌کنند – اما آنها را مدیریت نمی‌کنند. با انگیزه نیاز به یک سیستم هوشمندتر، اسمارت نوت را ساختم. این برنامه پیشینه من در طراحی تجربه کاربری (UX) و توسعه فرانت‌اند را با هوش مصنوعی قدرتمند ترکیب می‌کند تا نحوه تعامل شما با افکار خودتان را متحول سازد.",
    contribute: "مشارکت در اسمارت نوت: به این مأموریت بپیوندید",
    how: "چگونه می‌توانید کمک کنید",
    contrib_description:
      "من به توسعه باز اعتقاد دارم. هر مشارکتی، کوچک یا بزرگ، به تبدیل اسمارت نوت به بهترین ابزاری که می‌تواند باشد، کمک می‌کند.",
    code: "به من کمک کنید تا ویژگی‌ها را بهبود بخشم، عملکرد را بهتر کنم و نسل بعدی ابزارهای هوشمند را بسازم.",
    design:
      "به من کمک کنید تا تجربه کاربری و طراحی بصری را تکمیل کنم و مطمئن شوم که اسمارت نوت همچنان تمیز و شهودی باقی می‌ماند.",
    github_repo: " گیت‌هاب",
    contact_me: "تماس با من",
    contact_name: "شکریه",
    email: "shukria@gmail.com",
    message: "پیام...",
    send_message: "ارسال پیام",
    delete_confirmation: "آیا مطمئن هستیدکه این یادداشت حذف شود؟",
    yes: "بلی",
    cancel: "نخیر",
    quiz_completeed : "امتحان تکمیل شد! 🎉",
    score: "شما نمره گرفتید  ",
    out_of: "از",
    try_again: "تلاش دوباره",
    subject: "مضمون یادداشت",
    title: "عنوان یادداشت"
  },
};

const TranslationContext = createContext();
// Context provider
export const TranslationProvider = ({ children }) => {
  const [language, setLanguage] = useState(()=>{
      const savedLang = sessionStorage.getItem("currentLang")
      return savedLang && translations[savedLang] ? savedLang : "en"
  })
  
  const t = (key) => {
    return translations[language][key] || key;
  };

  const dir = translations[language].text_direction;

  // Use useEffect to set the global HTML direction attribute when the language changes
  useEffect(() => {
     sessionStorage.setItem("currentLang", language)
    document.documentElement.setAttribute("dir", dir);
  }, [dir, language]);

  const contextValue = {
    language,
    setLanguage,
    t,
    dir, // Expose text direction for conditional styling
  };

  return (
    <TranslationContext.Provider value={contextValue}>
      {children}
    </TranslationContext.Provider>
  );
};
// Custom hook for making the context easier to use
export const useTranslation = () => useContext(TranslationContext);
