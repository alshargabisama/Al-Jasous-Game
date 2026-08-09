// player class 
class PLayer{
    constructor(id, name,){
         this.id = id; 
         this.name = name; 
         this.sessionscore = sessionscore; 
         this.totalscore = this.totalscore;
    }

    /* function: add points to the current session 
    @param {number} points 
    */ 
   addScore(points){
    this.sessionscore += points; 
    this.totalscore += points; 
   }
   /* function: to reset the session score to zero */ 
   resetSessionScore(){
    this.sessionscore = 0 ; 
   } 
   /* function: to reset all the total scores */ 

   resetTotalScores (){
     this.totalscore =0; 
   }
} 
// word logic 
// ==========================================
// 2. WORD SYSTEM (Array + Set for O(1) Speed)
// ==========================================

const allWords = [
  "قطة", "كلب", "تفاحة", "موز", "بيتزا", "سيارة", "حافلة", "مدرسة", "معلم", "طبيب",
  "منزل", "هاتف", "حاسوب", "كتاب", "كرسي", "طاولة", "ماء", "قهوة", "شمس", "قمر",
  "نجمة", "شجرة", "زهرة", "سمكة", "طائر", "أسد", "فيل", "كرة قدم", "كرة سلة", "جيتار",
  "بيانو", "كاميرا", "تلفاز", "مستشفى", "مطار", "شاطئ", "جبل", "نهر", "مطر", "ثلج",
  "عيد ميلad", "عرس", "مطعم", "سوبرماركت", "شرطي", "رجل إطفاء", "ملك", "ملكة", "روبوت", "قطار",
  "بركان", "تلسكوب", "غواصة", "مروحية", "لوح تزلج", "دراجة نارية", "سيارة إسعاف", "منارة", "متحف", "مكتبة",
  "قلعة", "هرم", "شلال", "صحراء", "غابة استوائية", "جزيرة", "جواز سفر", "حقيبة سفر", "بوصلة", "منظار",
  "مقلاه", "سماعات", "ساعة ذكية", "لوحة مفاتيح", "مسحبه", "طابعة", "آلة حاسبة", "مصعد", "سلم كهربائي", "ثلاجة",
  "فشار", "همبرغر", "سوشي", "فطيرة", "شوكولاتة", "جوز الهند", "أناناس", "أفوكادو", "تمساح", "بطريق",
  "كنغر", "دلفين", "أخطبوط", "فراشة", "رائد فضاء", "محقق", "مصور", "مهندس معماري", "لاعب كرة قدم", "ساحر",
  "قمامة", "كوكب", "حداد", "عالم آثار", "سلم", "خريطة", "عظام", "طبيب بيطري", "سجن", "جمل",
  "رمل", "كيس", "طبل", "سماعة", "مسلسل", "آلة كاتبة", "غرامة مالية", "ثريا", "حزام", "سم سم",
  "شاحن", "شباك", "عسل", "شبام حضرموت", "جبال", "قلعة القاهرة", "جسر", "سفينه", "منطاد هوائي", "بدلة فضاء",
  "قمر صناعي", "ستارة", "صمغ", "صحن", "خوارزمية", "سماء", "ذكاء صناعي", "بنت الصحن", "فأر", "قوس قزح",
  "دباسة ورق", "فرشاه اسنان", "شميز", "زعفران", "رصاصة", "كرواسون", "خبز مخمر"
];

const wordManager = {
  usedWords: new Set(), // Fast O(1) hash set

  /**
   * Selects an unplayed word randomly in constant O(1) time
   * @returns {string} Selected secret word
   */
  getRandomWord() {
    // If all words have been used, reset the memory pool
    if (this.usedWords.size >= allWords.length) {
      this.resetUsedWords();
    }

    let selectedWord;

    // Fast O(1) sampling until picking an unused entry
    do {
      const randomIndex = Math.floor(Math.random() * allWords.length);
      selectedWord = allWords[randomIndex];
    } while (this.usedWords.has(selectedWord));

    // Record the used word
    this.usedWords.add(selectedWord);
    return selectedWord;
  },

  /**
   * Resets the used word memory tracking
   */
  resetUsedWords() {
    this.usedWords.clear();
  }
}; 


