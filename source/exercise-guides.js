/* Researched exercise guides, 2026-10-29. Image slots intentionally empty.
   Visual specs describe future assets; primary/secondary colors are schematic roles, not EMG. */
(function(root){
  const data = {
  "exercises": {
    "Chest-Supported Dumbbell Row": {
      "cues": [
        "سینه روی نیمکت و پاها ثابت",
        "آرنج‌ها را به سمت پهلو عقب ببر",
        "با بازشدن کنترل‌شدهٔ دست‌ها برگرد"
      ],
      "error": "برای بالا آوردن دمبل سینه را از پشتی جدا نکن.",
      "image": null,
      "visual": "نمای سه‌ربعِ پشت؛ دست‌های آویزان ← دمبل کنار تنه؛ نمای کوچک گیرش خنثی. لت و بخش میانی پشت سبز؛ دو دمبل و تماس سینه واضح.",
      "sources": [
        "S1"
      ],
      "primary": [
        "لت و پشت میانی"
      ],
      "secondary": [
        "جلو بازو",
        "دلتوئید خلفی"
      ]
    },
    "Chest-Supported Machine Row": {
      "cues": [
        "صندلی و پد را برای دسترسی راحت تنظیم کن",
        "بدون جداشدن سینه دسته‌ها را بکش",
        "دسته‌ها را آرام جلو ببر"
      ],
      "error": "عقب‌کشیدن تنه برای کامل‌کردن تکرار.",
      "image": null,
      "visual": "نمای سه‌ربع کنار؛ پد سینه و مسیر اهرم واقعی دیده شود؛ لت و بخش میانی پشت.",
      "sources": [
        "S2",
        "S3"
      ],
      "primary": [
        "لت و پشت میانی"
      ],
      "secondary": [
        "جلو بازو",
        "دلتوئید خلفی"
      ]
    },
    "Neutral-Grip Lat Pulldown": {
      "cues": [
        "پد ران ثابت و کف دست‌ها روبه‌هم",
        "آرنج‌ها را پایین و نزدیک پهلو بیاور",
        "دسته را آرام بالا ببر و دامنهٔ راحت شانه را حفظ کن"
      ],
      "error": "تاب‌دادن تنه یا کشیدن پشت گردن.",
      "image": null,
      "visual": "سه‌ربع جلو؛ دستهٔ موازی، کابل از بالا، دست‌های بالا ← دسته مقابل بالای سینه؛ لت سبز. رسیدن دسته به سینه اجباری ترسیم نشود.",
      "sources": [
        "S4"
      ],
      "primary": [
        "لت"
      ],
      "secondary": [
        "خم‌کننده‌های آرنج",
        "عضلات کمکی کتف"
      ]
    },
    "Machine Lat Pulldown": {
      "cues": [
        "صندلی و پد ران متناسب با دسترسی دسته",
        "دسته‌ها را جلوی بدن پایین بکش",
        "آرام و بدون عقب‌رفتن زیاد تنه برگرد"
      ],
      "error": "دستگاهِ اهرمی را با لت کابل یا کشیدن پشت گردن اشتباه نکنیم.",
      "image": null,
      "visual": "نمای سه‌ربع جلو با محور اهرم و دسته‌های واقعی، دست بالا ← کنار بالای سینه؛ لت؛ گیرش متناسب با وسیله.",
      "sources": [
        "S4"
      ],
      "primary": [
        "لت"
      ],
      "secondary": [
        "خم‌کننده‌های آرنج",
        "عضلات کمکی کتف"
      ]
    },
    "Neutral-Grip Assisted Pull-Up": {
      "cues": [
        "دستهٔ موازی و تکیه‌گاه کمکی را درست بگیر",
        "بدون تاب بدن را بالا ببر",
        "پایین‌رفتن را کنترل کن"
      ],
      "error": "رهاکردن ناگهانی تکیه‌گاه یا جلوکشیدن گردن برای عبور چانه.",
      "image": null,
      "visual": "سه‌ربع جلو؛ دستگاه کمکی، محل زانو/پا و جهت کمک دستگاه مشخص؛ لت، بازو کمکی.",
      "sources": [
        "S4"
      ],
      "primary": [
        "لت"
      ],
      "secondary": [
        "خم‌کننده‌های آرنج",
        "عضلات کمکی کتف"
      ],
      "setup": "دستگاه کمک‌بارفیکس با پد زانو و گیرش خنثی."
    },
    "Single-Arm Cable Row": {
      "cues": [
        "نشسته روی دستگاه روئینگ، پاها روی تکیه‌گاه",
        "آرنج را به سمت کنار لگن بکش",
        "با تنهٔ پایدار دست را آرام جلو ببر"
      ],
      "error": "عقب‌رفتن تنه یا چرخاندن شدید کمر برای جابه‌جایی وزنه.",
      "image": null,
      "visual": "سه‌ربع کنار دست فعال؛ نشیمن دستگاه، تکیه‌گاه پا و اتصال تک‌دسته در قرقرهٔ پایین واضح؛ دست جلو ← کنار تنه؛ لت و پشت میانی اصلی، جلو بازو و دلتوئید خلفی کمکی.",
      "sources": [
        "S2",
        "S3"
      ],
      "primary": [
        "لت و پشت میانی"
      ],
      "secondary": [
        "جلو بازو",
        "دلتوئید خلفی"
      ],
      "setup": "نشسته روی دستگاه روئینگ؛ تک‌دسته، قرقرهٔ پایین و پا روی تکیه‌گاه."
    },
    "Seated Cable Row": {
      "cues": [
        "پاها روی تکیه‌گاه و زانو کمی نرم",
        "دسته را به سمت پایین سینه/بالای شکم بکش",
        "بدون خم‌کردن کمر آرام برگرد"
      ],
      "error": "رفت‌وبرگشت زیاد بالاتنه یا قوزکردن برای کشش بیشتر.",
      "image": null,
      "visual": "نمای کنار و جزئیات گیرش؛ قرقرهٔ پایین، مسیر کابل، دست کشیده ← دسته نزدیک تنه؛ لت و پشت میانی.",
      "sources": [
        "S2",
        "S3"
      ],
      "primary": [
        "لت و پشت میانی"
      ],
      "secondary": [
        "جلو بازو",
        "دلتوئید خلفی"
      ]
    },
    "Single-Arm Cable Chest Press": {
      "cues": [
        "پشت به قرقره، پاها پایدار",
        "دسته را از کنار سینه جلو ببر",
        "بدون چرخش تنه آرام برگرد"
      ],
      "error": "چرخاندن لگن و کمر همراه فشار.",
      "image": null,
      "visual": "سه‌ربعِ دست فعال؛ کابل از پشت در حوالی سینه، یک دست فعال و دست آزاد واضح؛ سینه سبز.",
      "sources": [
        "S5"
      ],
      "primary": [
        "سینه"
      ],
      "secondary": [
        "سه‌سر",
        "دلتوئید قدامی"
      ]
    },
    "Single-Arm Machine Chest Press": {
      "cues": [
        "دسته در ارتفاع راحت سینه",
        "یک دست فشار بده و تنه ثابت بماند",
        "کنترل‌شده برگرد"
      ],
      "error": "دستگاهِ دسته‌های به‌هم‌متصل را تک‌دست فرض نکنیم.",
      "image": null,
      "visual": "دستگاه با بازوهای مستقل؛ یک دست فعال، پشت روی پشتی؛ سینه.",
      "sources": [
        "S5"
      ],
      "primary": [
        "سینه"
      ],
      "secondary": [
        "سه‌سر",
        "دلتوئید قدامی"
      ],
      "setup": "فقط دستگاه با دسته‌های مستقل برای اجرای تک‌دست."
    },
    "Neutral-Grip Dumbbell Bench Press": {
      "cues": [
        "پا و تنه روی تکیه‌گاه پایدار",
        "کف دست‌ها روبه‌هم و مچ روی ساعد",
        "در دامنهٔ راحت شانه پایین برو و آرام پرس کن"
      ],
      "error": "پایین‌بردن اجباری بازو زیر دامنهٔ راحت یا خم‌شدن مچ.",
      "image": null,
      "visual": "نمای سه‌ربع جلو با نمای کوچک از سر نیمکت؛ دو دمبل موازی، آرنج حدود ۳۰–۴۵ درجه از تنه به‌عنوان راهنمای برنامه؛ سینه.",
      "sources": [
        "S6"
      ],
      "primary": [
        "سینه"
      ],
      "secondary": [
        "سه‌سر",
        "دلتوئید قدامی"
      ]
    },
    "Machine Chest Press": {
      "cues": [
        "صندلی را برای ارتفاع مناسب دسته تنظیم کن",
        "با تکیهٔ پشت فشار بده",
        "بدون ضربه آرام برگرد"
      ],
      "error": "عقب‌رفتن بیش از حد دسته‌ها و جداشدن پشت.",
      "image": null,
      "visual": "نمای سه‌ربع کنار، محور و مسیر واقعی دستگاه؛ سینه، دلتوئید قدامی و سه‌سر کمکی.",
      "sources": [
        "S5"
      ],
      "primary": [
        "سینه"
      ],
      "secondary": [
        "سه‌سر",
        "دلتوئید قدامی"
      ]
    },
    "Incline Dumbbell Press": {
      "cues": [
        "شیب ملایم نیمکت مطابق برنامه",
        "مچ‌ها در امتداد ساعد",
        "پایین‌رفتن و پرس در دامنهٔ راحت"
      ],
      "error": "شیب زیاد را با همین نام و همین تصویر جایگزین نکنیم؛ کمر را برای جبران قوس نده.",
      "image": null,
      "visual": "سه‌ربع کنار؛ شیب ۱۵–۳۰ درجه انتخاب برنامه است، نه مقدار بهینهٔ قطعی؛ تأکید شماتیک بخش ترقوه‌ای سینه.",
      "sources": [
        "S6",
        "S7"
      ],
      "primary": [
        "سینه"
      ],
      "secondary": [
        "سه‌سر",
        "دلتوئید قدامی"
      ]
    },
    "Incline Machine Press": {
      "cues": [
        "صندلی و دسته متناسب با مسیر دستگاه",
        "پشت روی پشتی",
        "دسته‌ها را بدون بالاانداختن شانه جلو/بالا ببر"
      ],
      "error": "اشتباه گرفتن با پرس سرشانهٔ دستگاه.",
      "image": null,
      "visual": "سه‌ربع کنار با دسته و ریل واقعی؛ مسیر مایل سینه؛ بخش بالایی سینه.",
      "sources": [
        "S5",
        "S7"
      ],
      "primary": [
        "سینه"
      ],
      "secondary": [
        "سه‌سر",
        "دلتوئید قدامی"
      ]
    },
    "Dumbbell Floor Press": {
      "cues": [
        "روی زمین، پاها ثابت",
        "بازو آرام به زمین نزدیک شود",
        "بدون جهش پرس کن"
      ],
      "error": "کوبیدن آرنج یا استفاده از زمین برای پرتاب وزنه.",
      "image": null,
      "visual": "نمای سه‌ربع کنار؛ بازو نزدیک تماس زمین ← دست‌ها بالای سینه؛ سینه و سه‌سر، نبود نیمکت روشن.",
      "sources": [
        "S6"
      ],
      "primary": [
        "سینه"
      ],
      "secondary": [
        "سه‌سر",
        "دلتوئید قدامی"
      ]
    },
    "Dumbbell Bench Press": {
      "cues": [
        "چهارچوب بدن ثابت",
        "دمبل‌ها را کنترل‌شده کنار سینه پایین بیاور",
        "با مچ مستقیم بالا ببر"
      ],
      "error": "برخورد دمبل‌ها، پرتاب وزنه یا رهاکردن ناگهانی در پایان.",
      "image": null,
      "visual": "نیمکت صاف و گیرش متعارف، مستقل از تصویر گیرش خنثی؛ سینه.",
      "sources": [
        "S6"
      ],
      "primary": [
        "سینه"
      ],
      "secondary": [
        "سه‌سر",
        "دلتوئید قدامی"
      ]
    },
    "Reverse Pec Deck": {
      "cues": [
        "صندلی متناسب با ارتفاع دسته و دسترسی راحت",
        "آرنج کمی خم",
        "بازوها را باز کن و آرام برگرد"
      ],
      "error": "فشار اجباری برای جمع‌کردن حداکثری کتف یا عقب‌بردن بیش از حد بازو.",
      "image": null,
      "visual": "نمای سه‌ربع پشت؛ سینه رو به پد، دسته‌ها جلو ← دو طرف؛ دلتوئید خلفی با پشت میانی کمکی.",
      "sources": [
        "S8",
        "S9"
      ],
      "primary": [
        "دلتوئید خلفی"
      ],
      "secondary": [
        "پشت میانی"
      ]
    },
    "Chest-Supported Dumbbell Rear Delt Raise": {
      "cues": [
        "سینه روی نیمکت شیب‌دار",
        "با آرنج کمی خم دست‌ها را باز کن",
        "تا دامنهٔ قابل‌کنترل بالا برو و آرام پایین بیاور"
      ],
      "error": "تبدیل حرکت به روئینگ با خم‌کردن زیاد آرنج.",
      "image": null,
      "visual": "سه‌ربع پشت، نمای کوچک از بالا برای مسیر T؛ آرنج تقریباً ثابت، دلتوئید خلفی.",
      "sources": [
        "S9"
      ],
      "primary": [
        "دلتوئید خلفی"
      ],
      "secondary": [
        "پشت میانی"
      ]
    },
    "Dumbbell Lateral Raise": {
      "cues": [
        "تنه ثابت و دست‌ها کمی جلوتر از پهلو",
        "آرنج نرم و مسیر راحت شانه",
        "تا حوالی ارتفاع شانه بالا برو و آرام پایین بیاور"
      ],
      "error": "تاب‌دادن بدن یا چرخاندن اجباری شست رو به پایین.",
      "image": null,
      "visual": "نمای جلو/سه‌ربع، دمبل پایین ← بازو نزدیک افق در صفحهٔ اندکی جلوی بدن؛ دلتوئید میانی.",
      "sources": [
        "S10"
      ],
      "primary": [
        "دلتوئید میانی"
      ],
      "secondary": [
        "عضلات گردش کتف"
      ]
    },
    "Cable Lateral Raise": {
      "cues": [
        "کابل و تکیه‌گاه درست تنظیم شود",
        "تنه ثابت و آرنج نرم",
        "دست را از مسیر راحت به پهلو بالا ببر و کنترل‌شده برگرد"
      ],
      "error": "با تاب تنه یا بالاانداختن شانه، کابل را بالا نبر.",
      "image": null,
      "visual": "سه‌ربع جلو با نمایش قرقره، کابل و دست فعال؛ دلتوئید میانی.",
      "sources": [
        "S10"
      ],
      "primary": [
        "دلتوئید میانی"
      ],
      "secondary": [
        "عضلات گردش کتف"
      ],
      "setup": "ایستاده، قرقرهٔ پایین و کابل از جلوی بدن."
    },
    "Standing Single-Arm Landmine Press": {
      "cues": [
        "پایهٔ میله ثابت و پاها پایدار",
        "یک دست میله را بالا و جلو فشار دهد",
        "بدون قوس اضافهٔ کمر برگرد"
      ],
      "error": "تصویرِ دو دست، لانج عمیق یا فشار عمودی کامل را جایگزین نکنیم.",
      "image": null,
      "visual": "سه‌ربع کنار دست فعال؛ تمام میله و محور زمین داخل قاب؛ یک دست کنار شانه ← بالا/جلو؛ دلتوئید قدامی، سینهٔ بالایی کمکی.",
      "sources": [
        "S11"
      ],
      "primary": [
        "دلتوئید قدامی"
      ],
      "secondary": [
        "سه‌سر",
        "سینهٔ بالایی"
      ]
    },
    "Half-Kneeling Landmine Press": {
      "cues": [
        "یک زانو روی پد، پای دیگر جلو",
        "لگن و تنه پایدار",
        "یک‌دست میله را بالا و جلو فشار بده"
      ],
      "error": "جای زانوی روی زمین و پای جلو را بین دو فریم عوض نکنیم.",
      "image": null,
      "visual": "سه‌ربع کنار؛ زانو/پا و تک‌دست‌بودن واضح؛ دلتوئید قدامی، سینه کمکی.",
      "sources": [
        "S11"
      ],
      "primary": [
        "دلتوئید قدامی"
      ],
      "secondary": [
        "سه‌سر",
        "سینهٔ بالایی"
      ],
      "setup": "زانوی سمت دست فعال روی پد؛ پای مخالف جلو."
    },
    "Cable Curl": {
      "cues": [
        "قرقره پایین و مچ راحت",
        "آرنج‌ها نزدیک تنه",
        "ساعد را بالا بیاور و آهسته باز کن"
      ],
      "error": "عقب‌انداختن تنه و جلوپرتاب‌کردن شانه.",
      "image": null,
      "visual": "سه‌ربع جلو؛ اتصال کابل واقعی و نوع دسته مشخص؛ جلو بازو، بازویی کمکی.",
      "sources": [
        "S12"
      ],
      "primary": [
        "دوسربازویی و بازویی"
      ],
      "secondary": [
        "بازویی‌زنداعلایی"
      ]
    },
    "Dumbbell Curl": {
      "cues": [
        "پاها ثابت و مچ مستقیم",
        "آرنج نزدیک تنه",
        "با کنترل بالا و پایین برو"
      ],
      "error": "تغییر ناخودآگاه به هامر یا تاب‌دادن بدن.",
      "image": null,
      "visual": "سه‌ربع جلو، کف دستِ رو به جلو/بالا واضح؛ جلو بازو؛ هر دو فریم یک نوع گیرش.",
      "sources": [
        "S13"
      ],
      "primary": [
        "دوسربازویی و بازویی"
      ],
      "secondary": [
        "بازویی‌زنداعلایی"
      ]
    },
    "Rope Triceps Pressdown": {
      "cues": [
        "طناب از قرقره بالا",
        "آرنج‌ها نزدیک تنه",
        "ساعدها را پایین باز کن و آرام برگرد"
      ],
      "error": "هل‌دادن با شانه/تنه یا خم‌شدن زیاد مچ.",
      "image": null,
      "visual": "نمای سه‌ربع کنار؛ طناب دوشاخه، دو دست و کابل بالای سر دیده شود؛ سه‌سر پشت بازو.",
      "sources": [
        "S14"
      ],
      "primary": [
        "سه‌سر"
      ],
      "secondary": []
    },
    "Seated Leg Curl": {
      "cues": [
        "زانو هم‌راستای محور و ران زیر پد",
        "لگن روی صندلی",
        "زانوها را خم کن و آرام باز کن"
      ],
      "error": "بلندشدن لگن یا مجبورکردن کاربر به خم‌شدن زیاد به جلو.",
      "image": null,
      "visual": "نمای کنار؛ پد ران و پد پشت پایین ساق مشخص؛ زانوی بازِ راحت ← خم؛ همسترینگ.",
      "sources": [
        "S15"
      ],
      "primary": [
        "همسترینگ"
      ],
      "secondary": [
        "دوقلو"
      ]
    },
    "Lying Leg Curl": {
      "cues": [
        "زانو نزدیک محور و پد بالای پاشنه",
        "لگن روی پد",
        "زانوها را خم کن و آهسته باز کن"
      ],
      "error": "بلندکردن لگن و قوس‌دادن کمر.",
      "image": null,
      "visual": "کنار یا سه‌ربع پشت؛ دمر روی دستگاه، پا پایین ← ساق بالا؛ همسترینگ.",
      "sources": [
        "S15"
      ],
      "primary": [
        "همسترینگ"
      ],
      "secondary": [
        "دوقلو"
      ]
    },
    "Trap Bar Deadlift": {
      "cues": [
        "وسط میله، دستهٔ بلند و تنه مهار",
        "زمین را هل بده و بایست",
        "میله را کنترل‌شده زمین بگذار و دوباره تنظیم کن"
      ],
      "error": "خم‌کردن بازو، عقب‌دادن تنه در بالا، جهش از زمین.",
      "image": null,
      "visual": "سه فریم کنار/سه‌ربع: تنظیم روی زمین، جداشدن از زمین، ایستاده؛ دستهٔ بلند، دست‌ها کنار بدن، چهارسر و باسن؛ همسترینگ/راست‌کننده‌ها کمکی.",
      "sources": [
        "S16"
      ],
      "primary": [
        "چهارسر و باسن"
      ],
      "secondary": [
        "همسترینگ",
        "راست‌کننده‌های ستون مهره‌ها (نگهدارنده)"
      ]
    },
    "Dumbbell Romanian Deadlift": {
      "cues": [
        "زانو کمی نرم و دمبل نزدیک پا",
        "باسن عقب برود",
        "تا دامنهٔ کنترل‌شدهٔ لگن پایین برو و بایست"
      ],
      "error": "برای رساندن دمبل به زمین کمر را گرد نکن؛ به اسکوات تبدیل نشود.",
      "image": null,
      "visual": "سه فریم کنار: ایستاده، میانهٔ هیپ‌هینج، انتهای دامنه؛ همسترینگ و باسن.",
      "sources": [
        "S17"
      ],
      "primary": [
        "همسترینگ و باسن"
      ],
      "secondary": [
        "راست‌کننده‌های ستون مهره‌ها (نگهدارنده)"
      ]
    },
    "Leg Press": {
      "cues": [
        "کف پا ثابت و لگن روی پشتی",
        "زانو هم‌جهت پنجه",
        "تا عمق کنترل‌شده پایین برو و بدون ضربه بالا بیاور"
      ],
      "error": "جمع‌شدن لگن از پشتی یا بیش‌کشیدگی زانو.",
      "image": null,
      "visual": "کنار و نمای کوچک صفحه از جلو؛ نوع دستگاه ۴۵ درجه/افقی مشخص؛ چهارسر و باسن.",
      "sources": [
        "S18"
      ],
      "primary": [
        "چهارسر و باسن"
      ],
      "secondary": [],
      "setup": "پیش‌فرض: دستگاه پرس پا با سورتمهٔ ۴۵ درجه."
    },
    "Hack Squat": {
      "cues": [
        "پشت و شانه روی پد",
        "پاها پایدار",
        "با زانوی هم‌جهت پنجه پایین و بالا برو"
      ],
      "error": "بلندشدن پاشنه یا جداشدن لگن و کمر از پشتی.",
      "image": null,
      "visual": "سه‌ربع کنار؛ پد شانه و ریل مایل دیده شوند؛ چهارسر و باسن.",
      "sources": [
        "S19"
      ],
      "primary": [
        "چهارسر و باسن"
      ],
      "secondary": []
    },
    "Single-Leg Leg Press": {
      "cues": [
        "یک پا روی صفحه و لگن صاف",
        "زانو در راستای پنجه",
        "با دامنه‌ای که لگن ثابت می‌ماند حرکت کن"
      ],
      "error": "چرخش لگن یا نمایش پای آزاد در مسیر صفحه.",
      "image": null,
      "visual": "سه‌ربع جلو+نمای کنار کوچک؛ جای پای فعال و پای آزاد امن؛ چهارسر و باسن.",
      "sources": [
        "S18"
      ],
      "primary": [
        "چهارسر و باسن"
      ],
      "secondary": [],
      "setup": "همان پرس پای سورتمه‌ای؛ پای فعال بالای صفحه و پای آزاد بیرون مسیر سورتمه."
    },
    "Split Squat": {
      "cues": [
        "پاها در وضعیت گام ثابت",
        "با کمک دست تعادل بگیر",
        "پایین برو و با پای جلو بلند شو"
      ],
      "error": "تصویر بلغاری با پای عقب روی نیمکت، یا لانجِ همراه قدم‌برداشتن.",
      "image": null,
      "visual": "سه‌ربع کنار؛ پای عقب روی زمین و دست روی تکیه‌گاه؛ بالا ← پایین؛ چهارسر و باسن پای جلو.",
      "sources": [
        "S19"
      ],
      "primary": [
        "چهارسر و باسن"
      ],
      "secondary": []
    },
    "Leg Extension": {
      "cues": [
        "زانو هم‌محور دستگاه و پد بالای مچ",
        "ساق را کنترل‌شده بالا ببر",
        "آرام به خم‌شدن راحت زانو برگرد"
      ],
      "error": "برای بالا آوردن وزنه کمر را قوس نده؛ انتها را ضربه‌ای قفل نکن.",
      "image": null,
      "visual": "نمای کنار با نقطهٔ محور زانو؛ ساق پایین ← نزدیک صاف؛ چهارسر. یک نشان کوچک مکث در فاز پایین از تنظیم برنامه بیاید.",
      "sources": [
        "S20",
        "S21"
      ],
      "primary": [
        "چهارسر"
      ],
      "secondary": []
    },
    "Seated Calf Raise": {
      "cues": [
        "سینهٔ پا روی لبه و زانو زیر پد",
        "پاشنه آرام پایین",
        "بدون فنر روی پنجه بالا برو"
      ],
      "error": "پد روی کشکک یا تغییر حرکت به بازوبسته‌کردن زانو.",
      "image": null,
      "visual": "کنار؛ دستگاه نشسته و جزئیات مچ پایین/بالا؛ تأکید نعلی با نمای آناتومیک توضیح‌دار، نه ادعای انزوای کامل.",
      "sources": [
        "S22",
        "S23"
      ],
      "primary": [
        "نعلی"
      ],
      "secondary": [
        "دوقلو (نقش کمتر)"
      ]
    },
    "Landmine Lateral Raise": {
      "cues": [
        "مهار میله ثابت و آرنج کمی نرم باشد",
        "میله را از جلوی بدن در مسیر قطری به بیرون ببر؛ حداکثر تا ارتفاع شانه",
        "بدون تاب یا کج‌شدن تنه، کنترل‌شده برگرد"
      ],
      "error": "حرکت را با پرس رو به بالا یا تاب‌دادن تنه جایگزین نکن.",
      "image": null,
      "visual": "دو وضعیت پس از تطبیق اجرا؛ دوربین و محور باید نشان بدهند میله چگونه از جلوی بدن به سمت بیرون می‌رود؛ هدف‌گذاری رنگ پس از تأیید مسیر.",
      "sources": [
        "S24"
      ],
      "primary": [
        "دلتوئید میانی"
      ],
      "secondary": [
        "عضلات گردش کتف"
      ],
      "setup": "ایستاده؛ مسیر قطری از جلوی بدن به بیرون، حداکثر تا ارتفاع شانه."
    },
    "Calf Press on Leg Press": {
      "cues": [
        "سینهٔ پا روی لبهٔ امن",
        "زانوها در وضعیت ثابت",
        "فقط مچ را آرام پایین و بالا ببر"
      ],
      "error": "رهاکردن ضامن یا لغزش کف پا از صفحه؛ نمایش حرکت اسکواتی زانو.",
      "image": null,
      "visual": "کنار+کلوزآپ پا؛ پاشنه پایین/بالا، صفحه و مهار امن دستگاه؛ دوقلو و نعلی.",
      "sources": [
        "S18",
        "S22",
        "S23"
      ],
      "primary": [
        "دوقلو و نعلی"
      ],
      "secondary": [
        "تثبیت‌کننده‌های مچ"
      ]
    },
    "Standing Calf Raise": {
      "cues": [
        "پنجه روی تکیه‌گاه امن",
        "تنه و زانو پایدار",
        "پاشنه را کنترل‌شده پایین و بالا ببر"
      ],
      "error": "تاب‌دادن بدن یا پریدن از پایین.",
      "image": null,
      "visual": "نمای کنار با کلوزآپ مچ؛ مدل دستگاه یا دمبل پیش از تولید انتخاب شود؛ دوقلو و نعلی، تأکید دوقلو.",
      "sources": [
        "S22",
        "S23"
      ],
      "primary": [
        "دوقلو و نعلی"
      ],
      "secondary": [
        "تثبیت‌کننده‌های مچ"
      ],
      "setup": "پیش‌فرض: دستگاه ایستاده با پد روی شانه."
    },
    "Pallof Press": {
      "cues": [
        "پهلو به کابلِ هم‌ارتفاع سینه",
        "دست‌ها جلو بروند و تنه ثابت بماند",
        "مکث و بازگشت آرام"
      ],
      "error": "تصویر نباید چرخش تنه را آموزش دهد؛ مقاومت ضدچرخش است.",
      "image": null,
      "visual": "نمای سه‌ربع جلو؛ کابل از کنار، دسته کنار سینه ← جلوی سینه؛ خط جهت نیرو جدا از فلش دست؛ دیوارهٔ شکم با توضیح تثبیت.",
      "sources": [
        "S25"
      ],
      "primary": [
        "دیوارهٔ شکم (تثبیت تنه)"
      ],
      "secondary": []
    },
    "Suitcase Carry": {
      "cues": [
        "دمبل فقط در یک دست",
        "قامت متعادل و شانه‌ها کنترل‌شده",
        "قدم‌های کوتاه و آرام، سپس سمت دیگر"
      ],
      "error": "دو دمبل آن را به Farmer’s Carry تبدیل می‌کند؛ خم‌شدن به طرفین نمایش داده نشود.",
      "image": null,
      "visual": "نمای جلو برای راستای تنه و نمای کنار کوچک برای قدم؛ دو فریم قدم‌زدن، نه خم‌شدن جانبی؛ میان‌تنه و ساعد؛ نه عضلهٔ سطحی ساختگی برای عمقی‌ها.",
      "sources": [
        "S26"
      ],
      "primary": [
        "دیوارهٔ شکم (تثبیت تنه)"
      ],
      "secondary": [
        "ساعد و گیرش"
      ]
    },
    "Bodyweight Overhead Squat": {
      "cues": [
        "دست‌ها بالای سر در دامنهٔ راحت",
        "کف پا ثابت و زانو هم‌جهت پنجه",
        "فقط تا عمقِ قابل‌کنترل پایین برو"
      ],
      "error": "برای صاف نگه‌داشتن دست‌ها کمر را بیش‌ازحد قوس نده؛ اسکوات عمیق اجباری نیست.",
      "image": null,
      "visual": "کنار+نمای جلو کوچک؛ بدون هالتر/چوب، ایستاده ← پایینِ قابل‌کنترل؛ چهارسر/باسن و تثبیت‌کننده‌ها شماتیک.",
      "sources": [
        "S19"
      ],
      "primary": [
        "چهارسر و باسن"
      ],
      "secondary": []
    },
    "Band External Rotation": {
      "cues": [
        "اتصال کش در ارتفاع آرنج",
        "آرنج خم و کنار تنه",
        "ساعد را بیرون بچرخان و آرام برگرد"
      ],
      "error": "بازشدن آرنج از تنه یا چرخیدن کل بدن.",
      "image": null,
      "visual": "جلو/سه‌ربع؛ حولهٔ کوچک اختیاری کنار آرنج؛ چرخش ساعد، نه دورشدن بازو؛ تحت‌خاری و گرد کوچک در نمای پشت مشخص.",
      "sources": [
        "S27"
      ],
      "primary": [
        "تحت‌خاری و گرد کوچک"
      ],
      "secondary": [
        "دلتوئید خلفی"
      ]
    },
    "Band Face Pull": {
      "cues": [
        "کش در حوالی صورت مهار شود",
        "با تنهٔ پایدار دست‌ها را به کنار صورت بکش",
        "آرام برگرد"
      ],
      "error": "کشش سنگین با عقب‌رفتن تنه یا شراگ عمدی.",
      "image": null,
      "visual": "سه‌ربع جلو؛ اتصال کش در صورت، بازو جلو ← دست کنار صورت؛ دلتوئید خلفی و پشت بالایی؛ با تصویر سیم‌کش اشتباه نشود.",
      "sources": [
        "S28"
      ],
      "primary": [
        "دلتوئید خلفی و پشت میانی"
      ],
      "secondary": [
        "چرخاننده‌های خارجی شانه"
      ]
    },
    "Standing Wall Calf Stretch": {
      "cues": [
        "دست روی دیوار و پاها جابه‌جا",
        "پای عقب صاف و پاشنه پایین",
        "بدون ضربه در کشش ملایم بمان"
      ],
      "error": "بلندشدن پاشنه یا چرخاندن پای عقب به بیرون.",
      "image": null,
      "visual": "یک وضعیت نگه‌داشتنی از کنار+جزئیات پاشنه؛ فلش کوچک انتقال وزن، نه تکرار بالا و پایین؛ ساق عقب.",
      "sources": [
        "S29"
      ],
      "primary": [],
      "secondary": []
    },
    "Mini-Band Lateral Walk": {
      "cues": [
        "کش بالای زانو برای نسخهٔ پایه",
        "زانوها کمی خم و لگن ثابت",
        "گام‌های جانبی کوتاه بدون جمع‌شدن کامل پاها"
      ],
      "error": "تصویر را مثل اسکوات راه‌رفتنی عمیق یا تاب‌دادن تنه نکشیم.",
      "image": null,
      "visual": "نمای جلو، سه حالت پا کنارهمِ با فاصله/گام باز/دنبال‌کردن؛ فلش افقی؛ باسن میانی با تأکید کنترل لگن.",
      "sources": [
        "S30"
      ],
      "primary": [
        "سرینی میانی و کوچک"
      ],
      "secondary": [
        "بخش‌های کمکی باسن"
      ]
    },
    "Treadmill": {
      "cues": [
        "شروع با سرعت راحت",
        "قامت طبیعی و قدم‌های قابل‌کنترل",
        "سرعت/شیب را تدریجی تنظیم کن"
      ],
      "error": "آویزان‌شدن از دسته‌ها یا استفاده از تصویر دویدن برای برنامهٔ پیاده‌روی.",
      "image": null,
      "visual": "نمای کنارِ پیاده‌روی، تسمه و گیرهٔ ایمنی؛ تصویر عضلات غالب لازم نیست. برنامهٔ اینتروال و پیوسته متن مستقل دارند.",
      "sources": [
        "S31"
      ],
      "primary": [],
      "secondary": []
    },
    "Stationary Bike": {
      "cues": [
        "زین متناسب با دسترسی پا",
        "در پایین رکاب زانو کمی خم",
        "لگن ثابت و رکاب‌زدن روان"
      ],
      "error": "تاب‌خوردن لگن برای رسیدن پا به رکاب.",
      "image": null,
      "visual": "نمای کنار، دو موقعیت رکاب و تنظیم ارتفاع زین؛ مسیر چرخشی رکاب؛ بدون عدد ثابت برای همه.",
      "sources": [
        "S31"
      ],
      "primary": [],
      "secondary": []
    },
    "Elliptical": {
      "cues": [
        "کف پا روی پد و تنه متعادل",
        "حرکت روان و مقاومت مناسب",
        "دسته‌ها بدون کشیدن شدید تنه همراه شوند"
      ],
      "error": "پا خارج از پد یا تصویر دستگاه استپر به‌جای الپتیکال.",
      "image": null,
      "visual": "نمای سه‌ربع کنار؛ مسیر بیضوی پد، دو وضعیتِ واقعی همان دستگاه؛ تصویر عضلات جدا لازم نیست.",
      "sources": [
        "S31"
      ],
      "primary": [],
      "secondary": []
    }
  },
  "sources": {
    "S1": {
      "title": "PureGym: Incline / Chest-Supported Row",
      "url": "https://www.puregym.com/exercises/back/rows/incline-row/"
    },
    "S2": {
      "title": "ACE: Seated Row",
      "url": "https://www.acefitness.org/resources/everyone/exercise-library/168/seated-row/"
    },
    "S3": {
      "title": "Western University: Back/Lats equipment guides",
      "url": "https://www.uwo.ca/campusrec/orientation/equipment_guides/backlats.html"
    },
    "S4": {
      "title": "ACE: Seated Lat Pulldown",
      "url": "https://www.acefitness.org/resources/everyone/exercise-library/158/seated-lat-pulldown/"
    },
    "S5": {
      "title": "ACE: Seated Chest Press",
      "url": "https://www.acefitness.org/resources/everyone/exercise-library/188/seated-chest-press/"
    },
    "S6": {
      "title": "ACE: Dumbbell Chest Press",
      "url": "https://www.acefitness.org/resources/everyone/exercise-library/19/chest-press/"
    },
    "S7": {
      "title": "NASM: Single-Arm Incline Dumbbell Chest Press",
      "url": "https://www.nasm.org/resource-center/exercise-library/single-arm-incline-dumbbell-chest-press"
    },
    "S8": {
      "title": "Life Fitness: Pectoral Fly / Rear Deltoid",
      "url": "https://www.lifefitness.com/en-us/catalog/strength-training/selectorized/insignia-series-pectoral-fly-rear-deltoid"
    },
    "S9": {
      "title": "ACE: Incline Reverse Fly",
      "url": "https://www.acefitness.org/resources/everyone/exercise-library/34/incline-reverse-fly/"
    },
    "S10": {
      "title": "ACE: Lateral Raise",
      "url": "https://www.acefitness.org/resources/everyone/exercise-library/26/lateral-raise/"
    },
    "S11": {
      "title": "NSCA TSAC Report 67، صفحهٔ چاپی ۳۱، شکل 4A/4B",
      "url": "https://www.nsca.com/globalassets/education/tsac-report/tsac-report-67.pdf"
    },
    "S12": {
      "title": "ACE: Standing Bicep Curl",
      "url": "https://www.acefitness.org/resources/everyone/exercise-library/322/standing-bicep-curl/"
    },
    "S13": {
      "title": "ACE: Seated Biceps Curl",
      "url": "https://www.acefitness.org/resources/everyone/exercise-library/44/seated-biceps-curl/"
    },
    "S14": {
      "title": "ACE: Rope Triceps Pressdown",
      "url": "https://www.acefitness.org/resources/everyone/exercise-library/3/triceps-pressdown/"
    },
    "S15": {
      "title": "Maeo et al.: Seated versus prone leg curl، PMID 33009197",
      "url": "https://pubmed.ncbi.nlm.nih.gov/33009197/"
    },
    "S16": {
      "title": "ASCA: Trap Bar Deadlift",
      "url": "https://www.strengthandconditioning.org/exercise-highlight/2418-trap-bar-deadlift"
    },
    "S17": {
      "title": "ACE Technique Series: Romanian Deadlift",
      "url": "https://www.acefitness.org/continuing-education/prosource/january-2016/5767/ace-technique-series-romanian-deadlift/"
    },
    "S18": {
      "title": "ACE: Seated Leg Press",
      "url": "https://www.acefitness.org/resources/everyone/exercise-library/154/seated-leg-press/"
    },
    "S19": {
      "title": "PureGym: Squat Variations",
      "url": "https://www.puregym.com/exercises/legs/quad-exercises/squats/"
    },
    "S20": {
      "title": "Hawaii Pacific Health: Seated Leg Extensions",
      "url": "https://livinghealthy.hawaiipacifichealth.org/wellness/fitness/your-exercise-routine-seated-leg-extensions"
    },
    "S21": {
      "title": "Larsen et al.: Hip flexion angle in leg extension، PMID 39699974",
      "url": "https://pubmed.ncbi.nlm.nih.gov/39699974/"
    },
    "S22": {
      "title": "PureGym: Calf Raises",
      "url": "https://www.puregym.com/exercises/legs/calf-exercises/calf-raises/"
    },
    "S23": {
      "title": "Kinoshita et al.: Standing vs seated calf-raise training، PMID 38156065",
      "url": "https://pubmed.ncbi.nlm.nih.gov/38156065/"
    },
    "S24": {
      "title": "Muscle & Strength: Landmine Lateral Raise",
      "url": "https://www.muscleandstrength.com/exercises/landmine-lateral-raise"
    },
    "S25": {
      "title": "ACE: Standing Anti-Rotation Press",
      "url": "https://www.acefitness.org/resources/everyone/exercise-library/332/standing-anti-rotation-press/"
    },
    "S26": {
      "title": "ACE: Dumbbell Suitcase Carry",
      "url": "https://www.acefitness.org/resources/everyone/exercise-library/358/suitcase-carry/"
    },
    "S27": {
      "title": "AAOS: Rotator Cuff and Shoulder Conditioning",
      "url": "https://www.orthoinfo.org/recovery/rotator-cuff-and-shoulder-conditioning-program"
    },
    "S28": {
      "title": "PureGym: Face Pulls",
      "url": "https://www.puregym.com/exercises/arms-and-shoulders/rear-delt-exercises/face-pulls/"
    },
    "S29": {
      "title": "ACE: Standing Dorsi-Flexion / Calf Stretch",
      "url": "https://www.acefitness.org/resources/everyone/exercise-library/152/standing-dorsi-flexion-calf-stretch/"
    },
    "S30": {
      "title": "NASM: Active Recovery، بخش Lateral Band Walk",
      "url": "https://www.nasm.org/resource-center/blog/active-recovery"
    },
    "S31": {
      "title": "ACE: Submaximal Talk Test for VT1",
      "url": "https://contentcdn.eacefitness.com/assets/certification/ace-answers/forms/pt/42_Submaximal_Talk_Test_For_VT1_Protocol.pdf"
    },
    "S32": {
      "title": "Martín-Fuentes et al.: Feet position in inclined leg press، PMID 34085847",
      "url": "https://pubmed.ncbi.nlm.nih.gov/34085847/"
    }
  },
  "colors": {
    "primary": "#C5F04A",
    "secondary": "#8FCFFF"
  }
};
  if(typeof module==='object' && module.exports)module.exports=data;
  else root.TamrinGuides=data;
})(typeof globalThis!=='undefined'?globalThis:this);
