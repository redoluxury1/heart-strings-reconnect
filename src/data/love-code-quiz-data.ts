
import { LoveCodeQuestion, LoveCodeDescriptions } from '../types/love-code-quiz';

// Quiz questions data
export const quizQuestions: LoveCodeQuestion[] = [
  {
    id: 'q1',
    text: "When you're having a really tough day, what would help you feel most supported by your partner?",
    answers: [
      { id: 'q1a1', text: "They say something kind and reassuring to remind me I'm not alone.", code: 'loving_words' },
      { id: 'q1a2', text: "They leave a small surprise or note that shows they were thinking of me.", code: 'thoughtful_gestures' },
      { id: 'q1a3', text: "They stop what they're doing to spend uninterrupted time with me.", code: 'intentional_time' },
      { id: 'q1a4', text: "They take something off my plate without me asking.", code: 'helpful_actions' },
      { id: 'q1a5', text: "They hold me close or sit near me quietly.", code: 'physical_connection' }
    ]
  },
  {
    id: 'q2',
    text: "What makes you feel most loved in everyday life — not just big moments?",
    answers: [
      { id: 'q2a1', text: "When they tell me they appreciate me or admire something I did.", code: 'loving_words' },
      { id: 'q2a2', text: "When I find my favorite snack or coffee waiting for me without asking.", code: 'thoughtful_gestures' },
      { id: 'q2a3', text: "When they choose to do something with me, even if it's small.", code: 'intentional_time' },
      { id: 'q2a4', text: "When they remember to take care of something that matters to me.", code: 'helpful_actions' },
      { id: 'q2a5', text: "When they reach for my hand, touch my back, or cuddle for no reason.", code: 'physical_connection' }
    ]
  },
  {
    id: 'q3',
    text: "How do you feel most connected to your partner during conflict repair?",
    answers: [
      { id: 'q3a1', text: "When they express clearly that they still love and value me.", code: 'loving_words' },
      { id: 'q3a2', text: "When they follow up later with a thoughtful apology or small peace offering.", code: 'thoughtful_gestures' },
      { id: 'q3a3', text: "When they give time just to talk and listen without distraction.", code: 'intentional_time' },
      { id: 'q3a4', text: "When they show through actions that they're trying to do better.", code: 'helpful_actions' },
      { id: 'q3a5', text: "When we hug or hold hands and reconnect physically.", code: 'physical_connection' }
    ]
  },
  {
    id: 'q4',
    text: "Which of these would mean the most to you on a random Tuesday?",
    answers: [
      { id: 'q4a1', text: "A sweet text or unexpected compliment.", code: 'loving_words' },
      { id: 'q4a2', text: "A small treat on your desk or a coffee brought home.", code: 'thoughtful_gestures' },
      { id: 'q4a3', text: "A spontaneous invite to do something together.", code: 'intentional_time' },
      { id: 'q4a4', text: "A task finished that you've been avoiding.", code: 'helpful_actions' },
      { id: 'q4a5', text: "A long hug or affectionate touch as you pass by.", code: 'physical_connection' }
    ]
  },
  {
    id: 'q5',
    text: "What makes you feel emotionally safe with your partner?",
    answers: [
      { id: 'q5a1', text: "When they speak to me with encouragement and kindness.", code: 'loving_words' },
      { id: 'q5a2', text: "When they go out of their way to show they've been thinking of me.", code: 'thoughtful_gestures' },
      { id: 'q5a3', text: "When they consistently make space to talk about deeper things.", code: 'intentional_time' },
      { id: 'q5a4', text: "When they notice I'm overwhelmed and jump in to help.", code: 'helpful_actions' },
      { id: 'q5a5', text: "When they hold me without needing to fix anything.", code: 'physical_connection' }
    ]
  },
  {
    id: 'q6',
    text: "How do you know your partner is truly paying attention to you?",
    answers: [
      { id: 'q6a1', text: "They repeat something I said and affirm it out loud.", code: 'loving_words' },
      { id: 'q6a2', text: "They give me a small gift that shows they remembered something I mentioned.", code: 'thoughtful_gestures' },
      { id: 'q6a3', text: "They put away distractions and give me their full focus.", code: 'intentional_time' },
      { id: 'q6a4', text: "They act on something I brought up without needing a reminder.", code: 'helpful_actions' },
      { id: 'q6a5', text: "They reach out physically while I'm talking — like holding my hand or leaning in.", code: 'physical_connection' }
    ]
  },
  {
    id: 'q7',
    text: "What do you tend to remember most about a good day together?",
    answers: [
      { id: 'q7a1', text: "Something sweet or meaningful they said to me.", code: 'loving_words' },
      { id: 'q7a2', text: "A small gesture or surprise that caught me off guard.", code: 'thoughtful_gestures' },
      { id: 'q7a3', text: "The feeling of being fully present with each other.", code: 'intentional_time' },
      { id: 'q7a4', text: "Something they did that lightened my load or made life easier.", code: 'helpful_actions' },
      { id: 'q7a5', text: "A physical moment — a hug, a look, or the way we cuddled.", code: 'physical_connection' }
    ]
  },
  {
    id: 'q8',
    text: "What makes you feel most reassured when you're doubting the relationship?",
    answers: [
      { id: 'q8a1', text: "Hearing clearly how much I'm loved or wanted.", code: 'loving_words' },
      { id: 'q8a2', text: "A spontaneous, thoughtful gesture to show they're thinking of me.", code: 'thoughtful_gestures' },
      { id: 'q8a3', text: "Uninterrupted time together to reconnect emotionally.", code: 'intentional_time' },
      { id: 'q8a4', text: "Consistent action that shows they're committed and trying.", code: 'helpful_actions' },
      { id: 'q8a5', text: "Physical closeness that reminds me we're still connected.", code: 'physical_connection' }
    ]
  },
  {
    id: 'q9',
    text: "What makes an apology feel real to you?",
    answers: [
      { id: 'q9a1', text: "When it's expressed clearly and vulnerably in words.", code: 'loving_words' },
      { id: 'q9a2', text: "When it comes with a small, thoughtful act to show they care.", code: 'thoughtful_gestures' },
      { id: 'q9a3', text: "When they make time to talk it out fully and listen.", code: 'intentional_time' },
      { id: 'q9a4', text: "When they do something to make it right or follow through on a promise.", code: 'helpful_actions' },
      { id: 'q9a5', text: "When they hold me and don't rush the process.", code: 'physical_connection' }
    ]
  },
  {
    id: 'q10',
    text: "Which of these would most likely make you feel frustrated or disconnected?",
    answers: [
      { id: 'q10a1', text: "A lack of affirming words or appreciation.", code: 'loving_words' },
      { id: 'q10a2', text: "Feeling forgotten or overlooked in small ways.", code: 'thoughtful_gestures' },
      { id: 'q10a3', text: "Never having enough intentional time together.", code: 'intentional_time' },
      { id: 'q10a4', text: "Always feeling like you're doing everything alone.", code: 'helpful_actions' },
      { id: 'q10a5', text: "A lack of physical touch or affection.", code: 'physical_connection' }
    ]
  },
  {
    id: 'q11',
    text: "How do you prefer to celebrate a special occasion?",
    answers: [
      { id: 'q11a1', text: "With a heartfelt message or handwritten letter.", code: 'loving_words' },
      { id: 'q11a2', text: "With a meaningful gift or surprise.", code: 'thoughtful_gestures' },
      { id: 'q11a3', text: "With a day or evening spent fully together.", code: 'intentional_time' },
      { id: 'q11a4', text: "With help planning or organizing the day.", code: 'helpful_actions' },
      { id: 'q11a5', text: "With intimacy, affection, or just holding each other close.", code: 'physical_connection' }
    ]
  },
  {
    id: 'q12',
    text: "If you had to go a week without something, what would be hardest to lose?",
    answers: [
      { id: 'q12a1', text: "Encouraging words from your partner.", code: 'loving_words' },
      { id: 'q12a2', text: "Unexpected thoughtful acts.", code: 'thoughtful_gestures' },
      { id: 'q12a3', text: "Quality time just the two of you.", code: 'intentional_time' },
      { id: 'q12a4', text: "Shared responsibilities or practical support.", code: 'helpful_actions' },
      { id: 'q12a5', text: "Physical intimacy and closeness.", code: 'physical_connection' }
    ]
  },
  {
    id: 'q13',
    text: "When you think about the future, what brings you the most comfort?",
    answers: [
      { id: 'q13a1', text: "Knowing we'll always speak love to each other out loud.", code: 'loving_words' },
      { id: 'q13a2', text: "Knowing we'll always surprise and delight each other in small ways.", code: 'thoughtful_gestures' },
      { id: 'q13a3', text: "Knowing we'll never stop making time to connect.", code: 'intentional_time' },
      { id: 'q13a4', text: "Knowing we'll show up and support each other through anything.", code: 'helpful_actions' },
      { id: 'q13a5', text: "Knowing we'll stay physically close — from hand-holding to intimacy.", code: 'physical_connection' }
    ]
  },
  {
    id: 'q14',
    text: "How do you show love when your partner is struggling?",
    answers: [
      { id: 'q14a1', text: "I tell them how strong or loved they are.", code: 'loving_words' },
      { id: 'q14a2', text: "I leave notes, gifts, or thoughtful reminders they're not alone.", code: 'thoughtful_gestures' },
      { id: 'q14a3', text: "I sit with them and just spend time being present.", code: 'intentional_time' },
      { id: 'q14a4', text: "I do something for them that makes their life easier.", code: 'helpful_actions' },
      { id: 'q14a5', text: "I hold them or stay physically close.", code: 'physical_connection' }
    ]
  },
  {
    id: 'q15',
    text: "What makes you feel remembered and important?",
    answers: [
      { id: 'q15a1', text: "A compliment or affirmation that hits just right.", code: 'loving_words' },
      { id: 'q15a2', text: "A gift or gesture that shows they were thinking of me.", code: 'thoughtful_gestures' },
      { id: 'q15a3', text: "Time blocked off just for me.", code: 'intentional_time' },
      { id: 'q15a4', text: "An act that helps me or takes stress off my plate.", code: 'helpful_actions' },
      { id: 'q15a5', text: "A physical moment — from a kiss on the forehead to hand-holding.", code: 'physical_connection' }
    ]
  },
  {
    id: 'q16',
    text: "What's your favorite kind of love moment?",
    answers: [
      { id: 'q16a1', text: "A text that says 'just thinking of you.'", code: 'loving_words' },
      { id: 'q16a2', text: "A surprise coffee, note, or little gift.", code: 'thoughtful_gestures' },
      { id: 'q16a3', text: "Laughing together in the middle of doing nothing.", code: 'intentional_time' },
      { id: 'q16a4', text: "When they step in to help before I ask.", code: 'helpful_actions' },
      { id: 'q16a5', text: "A slow hug that lasts longer than usual.", code: 'physical_connection' }
    ]
  },
  {
    id: 'q17',
    text: "How do you feel best understood?",
    answers: [
      { id: 'q17a1', text: "When they reflect back what I've said with care.", code: 'loving_words' },
      { id: 'q17a2', text: "When they do something that shows they've been paying attention.", code: 'thoughtful_gestures' },
      { id: 'q17a3', text: "When they make time to listen with their full focus.", code: 'intentional_time' },
      { id: 'q17a4', text: "When they act on my needs without me having to ask twice.", code: 'helpful_actions' },
      { id: 'q17a5', text: "When they stay close and make me feel safe in their presence.", code: 'physical_connection' }
    ]
  },
  {
    id: 'q18',
    text: "Which one would mean the most after a long day?",
    answers: [
      { id: 'q18a1', text: '"You did so much today. I\'m proud of you."', code: 'loving_words' },
      { id: 'q18a2', text: "A favorite snack or item placed on your pillow.", code: 'thoughtful_gestures' },
      { id: 'q18a3', text: "An evening just the two of you with no phones.", code: 'intentional_time' },
      { id: 'q18a4', text: "Coming home to a cleaned space or task done.", code: 'helpful_actions' },
      { id: 'q18a5', text: "A massage or time cuddling on the couch.", code: 'physical_connection' }
    ]
  },
  {
    id: 'q19',
    text: "When you're in a good mood, how do you most naturally express love?",
    answers: [
      { id: 'q19a1', text: "I say something sweet or affirming.", code: 'loving_words' },
      { id: 'q19a2', text: "I bring or make something thoughtful.", code: 'thoughtful_gestures' },
      { id: 'q19a3', text: "I ask to do something together.", code: 'intentional_time' },
      { id: 'q19a4', text: "I take care of something for them.", code: 'helpful_actions' },
      { id: 'q19a5', text: "I give extra physical affection.", code: 'physical_connection' }
    ]
  },
  {
    id: 'q20',
    text: "What would hurt the most in a relationship?",
    answers: [
      { id: 'q20a1', text: "Being spoken to harshly or with criticism.", code: 'loving_words' },
      { id: 'q20a2', text: "Never being surprised or thought about in the little ways.", code: 'thoughtful_gestures' },
      { id: 'q20a3', text: "Feeling like we're roommates, not emotionally connected.", code: 'intentional_time' },
      { id: 'q20a4', text: "Feeling like I carry all the responsibility alone.", code: 'helpful_actions' },
      { id: 'q20a5', text: "Feeling touch-starved or physically distant.", code: 'physical_connection' }
    ]
  },
  {
    id: 'q21',
    text: "What do you long for most in quiet moments?",
    answers: [
      { id: 'q21a1', text: "A kind word or appreciation.", code: 'loving_words' },
      { id: 'q21a2', text: "A thoughtful item that makes me feel seen.", code: 'thoughtful_gestures' },
      { id: 'q21a3', text: "Shared silence with full presence.", code: 'intentional_time' },
      { id: 'q21a4', text: "Help without asking.", code: 'helpful_actions' },
      { id: 'q21a5', text: "A long hug or their hand on mine.", code: 'physical_connection' }
    ]
  },
  {
    id: 'q22',
    text: "What do you miss most when apart from your partner?",
    answers: [
      { id: 'q22a1', text: "Hearing them say sweet or supportive things.", code: 'loving_words' },
      { id: 'q22a2', text: "Small surprise notes or gifts.", code: 'thoughtful_gestures' },
      { id: 'q22a3', text: "Talking and being fully present with each other.", code: 'intentional_time' },
      { id: 'q22a4', text: "Having their help with the day-to-day.", code: 'helpful_actions' },
      { id: 'q22a5', text: "Physical affection and intimacy.", code: 'physical_connection' }
    ]
  },
  {
    id: 'q23',
    text: "What would make an ordinary day feel extraordinary?",
    answers: [
      { id: 'q23a1', text: "A genuine compliment or loving check-in.", code: 'loving_words' },
      { id: 'q23a2', text: "An unexpected gesture or treat.", code: 'thoughtful_gestures' },
      { id: 'q23a3', text: "A meaningful conversation or shared moment.", code: 'intentional_time' },
      { id: 'q23a4', text: "A task done without being asked.", code: 'helpful_actions' },
      { id: 'q23a5', text: "Unexpected affection or a slow kiss.", code: 'physical_connection' }
    ]
  },
  {
    id: 'q24',
    text: "How do you prefer to reconnect after a busy week?",
    answers: [
      { id: 'q24a1', text: "Honest, loving conversation.", code: 'loving_words' },
      { id: 'q24a2', text: "A small thoughtful surprise to show I was missed.", code: 'thoughtful_gestures' },
      { id: 'q24a3', text: "Focused quality time together.", code: 'intentional_time' },
      { id: 'q24a4', text: "Acts of service that help ease my stress.", code: 'helpful_actions' },
      { id: 'q24a5', text: "Lots of cuddling, holding, and touch.", code: 'physical_connection' }
    ]
  },
  {
    id: 'q25',
    text: "What love moment feels most like \"home\" to you?",
    answers: [
      { id: 'q25a1', text: "A voice that makes me feel safe and seen.", code: 'loving_words' },
      { id: 'q25a2', text: "A thoughtful little reminder that I matter.", code: 'thoughtful_gestures' },
      { id: 'q25a3', text: "Time spent doing nothing together but feeling fully connected.", code: 'intentional_time' },
      { id: 'q25a4', text: "Someone showing up to lighten my load.", code: 'helpful_actions' },
      { id: 'q25a5', text: "A long embrace that says everything without words.", code: 'physical_connection' }
    ]
  }
];

// Love code descriptions
export const loveCodeDescriptions: LoveCodeDescriptions = {
  loving_words: {
    title: "Loving Words",
    emotionalCore: "You feel most connected when emotions are named and expressed verbally. Words matter deeply to you.",
    howYouFeelLoved: "You feel most loved when your partner speaks affirmation, appreciation, and loving sentiments out loud—from daily check-ins to deep conversations.",
    oftenMisread: "You might be misread as needy or validation-seeking when you're truly seeking emotional transparency and clear communication.",
    growthTips: "Remember that not everyone processes emotions verbally. Your partner might show love in other ways that don't involve the words you crave.",
    shortSummary: "Words of affirmation and verbal expressions of love resonate most deeply with you. You connect through conversation and feel most secure when feelings are named out loud.",
    color: "#E5DEFF" // Soft purple
  },
  thoughtful_gestures: {
    title: "Thoughtful Gestures",
    emotionalCore: "You notice the small things and feel most loved when your partner goes out of their way to surprise or delight you.",
    howYouFeelLoved: "Unexpected notes, small gifts, or thoughtful gestures that show they've been thinking of you make you feel cherished and remembered.",
    oftenMisread: "You might be seen as materialistic when you're truly looking for the thoughtfulness behind the gesture rather than the thing itself.",
    growthTips: "Be direct about what you need rather than hoping your partner will intuitively know. Not everyone naturally thinks in terms of symbolic gestures.",
    shortSummary: "You feel most loved through small, thoughtful gestures and surprises that show you're on your partner's mind. These little acts of consideration speak volumes to you.",
    color: "#FFDEE2" // Soft pink
  },
  intentional_time: {
    title: "Intentional Time",
    emotionalCore: "You value presence over all else and feel most connected when someone gives you their undivided attention.",
    howYouFeelLoved: "Quality time with genuine presence, eye contact, and focused attention makes you feel truly valued and connected.",
    oftenMisread: "You might be seen as demanding or high-maintenance when you're really seeking depth of connection rather than quantity of time.",
    growthTips: "Be understanding that sometimes divided attention is necessary. Help your partner understand the difference between being physically present and truly present.",
    shortSummary: "You connect through quality time and undivided attention. When someone puts away distractions to fully focus on being with you, you feel deeply loved and secure.",
    color: "#D3E4FD" // Soft blue
  },
  helpful_actions: {
    title: "Helpful Actions",
    emotionalCore: "You feel most loved when someone does something tangible to make your life better or easier.",
    howYouFeelLoved: "Acts of service and practical support—especially when done without being asked—make you feel most cared for and understood.",
    oftenMisread: "You might be seen as demanding or critical when you're really seeking partnership and shared responsibility.",
    growthTips: "Try to appreciate other forms of love expression, even when they don't solve a practical problem. Be direct about what would help most.",
    shortSummary: "You feel most loved through helpful actions and practical support. When someone steps in to lighten your load or solve a problem, you feel deeply cared for.",
    color: "#F1F0FB" // Soft gray
  },
  physical_connection: {
    title: "Physical Connection",
    emotionalCore: "You process emotions through touch and physical proximity, finding security in physical connection.",
    howYouFeelLoved: "Physical affection—from hand-holding to long hugs to intimate connection—helps you feel most secure and valued.",
    oftenMisread: "You might be seen as clingy or solely focused on intimacy when you're truly seeking emotional connection through physical means.",
    growthTips: "Respect that not everyone processes emotions through touch. Communicate when you need physical connection rather than just reaching out.",
    shortSummary: "Touch is your primary language of love. Physical closeness—from casual affection to deeper intimacy—helps you feel connected, secure, and valued.",
    color: "#FDE1D3" // Soft peach
  }
};
