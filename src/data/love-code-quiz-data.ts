
import { LoveCodeQuestion, LoveCodeDescriptions, SayInsteadPhrase, PhraseCategory } from '../types/love-code-quiz';

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
    color: "#E5DEFF", // Soft purple
    detailedDescription: {
      emotionalCore: "At your core, words don't just inform — they anchor you emotionally. You're someone who experiences connection through clarity, articulation, and tone. When love is spoken with sincerity, you don't just hear it — you feel it. Words are how you orient yourself in a relationship: they help you feel valued, secure, and known.\n\nYour nervous system responds to tone. A gentle \"I see you,\" or a vulnerable \"I'm sorry,\" lands deeper than actions alone. Even brief affirmations — a soft \"I missed you\" or \"I'm so lucky to have you\" — carry weight far beyond their syllables. This is because language is your access point to emotional safety. Without it, you may feel disoriented, even if everything else seems \"fine\" on the surface.\n\nFor you, language holds memories. You remember the sweet things people say long after the moment has passed. Harsh words, silence, or emotionally flat conversations can feel like deep ruptures — not because you're dramatic, but because you value emotional honesty. Words don't just matter. They mean everything.",
      howYouFeelLoved: "You feel loved when someone speaks to you with warmth, presence, and intention. When your partner notices the little things you're doing and tells you — not just thinks it — it fills a reservoir inside you that actions alone can't reach. A compliment about your heart. A message during the day saying, \"I'm proud of you.\" A soft tone when things feel tense. These aren't just niceties to you — they're connection threads.\n\nEven more than that, it's the consistency of language that counts. You don't just want one perfect speech — you want the small, steady reminders that love is here, alive, and seen. Loving Words people thrive when conversations are reflective, affirming, and emotionally curious. You want to feel spoken to from the heart — not from obligation. You're most alive when you hear, \"Here's how I feel about you, and I want you to know.\"\n\nWhen a partner can verbalize appreciation, repair, or affection clearly and vulnerably — especially during hard moments — that's when you feel most safe, most connected, and most secure in the relationship.",
      oftenMisread: "Because you value words so deeply, others might misinterpret your needs as \"needy,\" \"sensitive,\" or even \"insecure.\" But it's not about needing constant reassurance — it's about knowing that love is still alive between the lines. When someone goes silent during conflict, or avoids verbal connection altogether, it can trigger feelings of abandonment or doubt for you — not because you're irrational, but because words are your signal of emotional presence.\n\nPeople who don't share this Love Code may think their actions speak louder than words — and while you appreciate action, it doesn't reach the same emotional depth for you. In relationships, this can lead to a painful mismatch: one partner feels they're showing love by doing, while you may be wondering why they aren't saying anything.\n\nEven worse, words used carelessly — sharp tone, sarcasm, passive-aggressive remarks — hit deeper than they realize. For someone with your Love Code, tone is intimacy. It matters how things are said. The absence of tenderness in language can feel like distance, even if everything else is functioning. This is often misunderstood — and it can make you feel like your emotional needs are \"too much.\" They're not.",
      relationalGrowthTips: "Own your Love Code without apology — but learn to communicate your needs clearly, not expect your partner to just \"know.\" Phrases like, \"I connect most through words, and I'd love to hear what you're feeling,\" can open the door gently. You can model this by speaking affection first — giving the kind of love you long to receive. Often, people learn how to speak love because of you.\n\nIn conflict, your tendency may be to chase clarity through conversation — wanting to fix things through words. This is a gift — but it can become overwhelming for partners who process differently. Practice patience. Ask, \"When would be a good time to talk about this?\" or \"Can we come back to this in a way that feels good for both of us?\" You don't have to silence yourself — you just have to pace the conversation with love.\n\nAlso reflect: when do you go quiet? Do you shut down when you're hurt or disappointed with the way something was said? Sometimes the best thing you can do is let someone know — \"Words matter to me, and this felt like a disconnection.\" This Love Code doesn't make you fragile. It makes you attuned. Speak love clearly — and teach others how to speak it back."
    },
    secondaryDescription: "While this may not be your primary Love Code, affirming words still matter to you more than most people realize. When someone tells you what they appreciate about you — out loud — it leaves a lasting emotional imprint. You respond to sincere compliments, encouragement, and check-ins that remind you you're cared for. In tough moments, even a simple \"I'm here\" or \"You're doing great\" can soften your heart and help you reconnect faster. Words aren't everything — but they still carry weight."
  },
  thoughtful_gestures: {
    title: "Thoughtful Gestures",
    emotionalCore: "You notice the small things and feel most loved when your partner goes out of their way to surprise or delight you.",
    howYouFeelLoved: "Unexpected notes, small gifts, or thoughtful gestures that show they've been thinking of you make you feel cherished and remembered.",
    oftenMisread: "You might be seen as materialistic when you're truly looking for the thoughtfulness behind the gesture rather than the thing itself.",
    growthTips: "Be direct about what you need rather than hoping your partner will intuitively know. Not everyone naturally thinks in terms of symbolic gestures.",
    shortSummary: "You feel most loved through small, thoughtful gestures and surprises that show you're on your partner's mind. These little acts of consideration speak volumes to you.",
    color: "#FFDEE2", // Soft pink
    detailedDescription: {
      emotionalCore: "You experience love through evidence of attention. For you, it's not just about what someone says or how much time they give — it's about what they notice, and how they turn that noticing into small, intentional acts. The deeper belief beneath this Love Code is: \"If you really know me, you'll remember the little things.\"\n\nYou feel emotionally secure when your partner tunes into you enough to reflect your inner world back to you through tangible moments. That could be a favorite snack left on the counter, a thoughtful note in your bag, or a small gift that says, \"I was listening.\" These moments don't have to be extravagant — they just need to feel personal.\n\nYour nervous system responds to gestures as confirmation that you are seen and remembered — not just when things are romantic or serious, but in the day-to-day rhythm of life. When a partner expresses love in a way that feels designed just for you, it tells your body and brain: I matter to you, even when I'm not asking for anything.",
      howYouFeelLoved: "You feel most loved when your partner takes the time to do something they didn't have to do — something that required thought. Whether it's a spontaneous coffee delivery, your favorite playlist playing in the car, or a \"just because\" note left for you to find, these moments hit different. You crave surprise, not in the dramatic sense, but in the meaningful sense — like they saw something and thought of you.\n\nYou're especially sensitive to being remembered. When someone pays attention to what you've said (even weeks ago) and circles back with an action that reflects it, you feel deeply connected. These gestures say: \"I've been holding a part of you in my mind, even when you weren't around.\" That creates emotional intimacy in a way words or time alone can't quite replicate.\n\nYou don't need material things — you need thoughtfulness. The gesture is the symbol of the care. For you, love is in the symbolism: the energy they spent, the noticing they did, the moment they created. And when that effort is genuine, it stays with you for a long time.",
      oftenMisread: "People may mistake your Love Code as being \"gift-focused\" or materialistic — but that completely misses the point. You don't need expensive things. You need meaningful things. The deeper need here is not for objects, but for significance. You long to feel uniquely known — and when someone gives you something generic, or clearly didn't put thought behind it, it can actually feel worse than nothing at all.\n\nIn relationships, this Love Code is often misread because it's not always verbal. You might not say directly, \"I wish you brought me something,\" but your disappointment may come through when things feel repetitive, transactional, or generic. Without thoughtful gestures, your relationship may begin to feel flat, even if your partner is saying \"I love you\" or spending time with you. That's because love — to you — is in the effort and creativity.\n\nConflict can be especially difficult when your Love Code is misunderstood. A partner might say, \"I told you I love you,\" or \"I'm here, aren't I?\" But if they've stopped putting in thoughtful energy, it can feel like they've emotionally checked out — even if they're technically present. And that dissonance can lead to withdrawal, disappointment, or even resentment.",
      relationalGrowthTips: "It's okay to own that small, thoughtful effort means a lot to you — but your partner may not instinctively know how to do it. Express what makes you feel remembered and cared for in real terms: \"When you surprise me with something small, it makes me feel so seen.\" Or, \"When I feel like you're paying attention to what I like, it means the world.\"\n\nYou can also help build this rhythm by modeling it. When you do thoughtful things, notice how it affects your partner. Point it out with warmth, not expectation. The goal isn't to create pressure — it's to cultivate mutual intentionality. Let your partner know that love, to you, is shown in the details. This is how you build trust, not just emotional intensity.\n\nAlso reflect on this: when do you pull back your thoughtful energy? Is it when you feel hurt, or when your gestures go unnoticed? If so, that's important to acknowledge. You may be tempted to stop giving altogether — but it might be more healing to say: \"I need to feel that the little things matter to you too.\" You are not high-maintenance. You are detail-attuned. The right relationship will make space for that — and learn to love you in the little things."
    },
    secondaryDescription: "You're someone who notices the little things — and when someone surprises you with a small, intentional gesture, it speaks directly to your heart. This might not be your dominant way of receiving love, but when someone remembers something specific to you or goes out of their way to make a small moment special, it makes you feel deeply seen. You don't need big gifts — just effort and attention. Thoughtfulness in action is still meaningful to you."
  },
  intentional_time: {
    title: "Intentional Time",
    emotionalCore: "You value presence over all else and feel most connected when someone gives you their undivided attention.",
    howYouFeelLoved: "Quality time with genuine presence, eye contact, and focused attention makes you feel truly valued and connected.",
    oftenMisread: "You might be seen as demanding or high-maintenance when you're really seeking depth of connection rather than quantity of time.",
    growthTips: "Be understanding that sometimes divided attention is necessary. Help your partner understand the difference between being physically present and truly present.",
    shortSummary: "You connect through quality time and undivided attention. When someone puts away distractions to fully focus on being with you, you feel deeply loved and secure.",
    color: "#D3E4FD", // Soft blue
    detailedDescription: {
      emotionalCore: "At the core of this Love Code is a deep belief: \"If I matter to you, you'll want to be with me — fully.\" You don't just need time together — you need intentional time. You're someone who values presence over proximity, attention over routine. You thrive in connection when your partner is fully with you, not just physically near, but mentally and emotionally available.\n\nTo you, time is not measured by clocks — it's measured by quality. A quiet 10-minute moment of real connection can mean more to you than hours of distracted multitasking. Your emotional world opens up when you sense someone is giving you the gift of their focus. When someone chooses to be with you without a phone in their hand, without checking notifications, without trying to \"fit you in,\" you feel safe, seen, and prioritized.\n\nYou likely notice when presence is fractured — when your partner seems checked out, even if they're in the same room. This doesn't make you needy. It makes you attuned. You sense when someone's energy isn't truly with you, and that lack of presence can feel like emotional abandonment. For you, connection lives in the now — not the \"later when things settle down.\"",
      howYouFeelLoved: "You feel most loved when someone chooses to spend intentional time with you. That could mean undistracted conversation, running errands together with music on, sharing a walk after a long day, or simply sitting next to each other with no agenda. It's not about what you do — it's about how much of them they bring into the moment with you.\n\nOne of your deepest joys is when someone clears space in their day just for you. When they say, \"Let's turn this into our time,\" or \"You have my full attention,\" your entire system relaxes. You feel emotionally safe when you're offered time without pressure — when someone just wants to be near you, not because they have to, but because they want to.\n\nIn relationships, this shows up in the way you value rituals and routines — maybe it's date nights, or morning coffee together, or even staying up to talk when everyone else is asleep. These windows of time build emotional intimacy for you. They signal: \"You are worth slowing down for.\" And when your partner does that consistently, it builds a strong foundation of connection that carries you through even the hardest seasons.",
      oftenMisread: "People who don't share this Love Code may assume you're asking for too much. They might say, \"We're always together,\" without realizing that presence isn't the same as availability. You don't want to monopolize time — you want to share it in a way that feels real, where both people are actually showing up. When that doesn't happen, you may feel distant or resentful, even if you're technically \"around each other.\"\n\nThis Love Code is also easily dismissed in fast-paced or overstimulated relationships. Partners may mistake your need for connection as \"clingy,\" or feel like they're failing because they can't carve out huge chunks of time. But what you're craving isn't hours — it's intentionality. And when your need for focused time is unmet, you may withdraw, feel unimportant, or even start questioning the health of the relationship altogether.\n\nIn conflict, this can become especially tricky. If a partner stonewalls, avoids reconnection, or brushes things off quickly, it can feel emotionally unsafe. You likely need space to talk things through, to understand and be understood. And when that time isn't given, or is given half-heartedly, it can feel like the emotional door is closed — and that disconnection runs deep for someone wired like you.",
      relationalGrowthTips: "Be honest about your need for time without apologizing for it. You're not asking for extravagance — you're asking for presence. Use language that is warm but clear, like: \"I feel closest when we have time that's just for us,\" or \"It means a lot to me when we slow down and connect, even if it's just for a few minutes.\"\n\nYou can also be proactive about suggesting rhythms of connection that make space for your Love Code. Instead of waiting for time to magically appear, help co-create it: \"Could we block 20 minutes a few nights this week just to check in?\" or \"Can this drive be our no-phones moment?\" You're not demanding attention — you're inviting intimacy.\n\nAlso reflect on how you handle unmet time needs. Do you get quiet, distant, or bitter when connection fades? If so, that's your sign to speak gently before the disconnect grows. You deserve a partner who chooses you on purpose — and in return, you offer the gift of deep, attuned attention that makes any relationship feel like home."
    },
    secondaryDescription: "Even if it's not your #1 Love Code, uninterrupted quality time still plays a big role in how you connect. You feel especially close to someone when they slow down and give you their full attention — whether that's during a deep conversation, a shared activity, or just doing nothing together. You may not need a ton of time, but the quality of it matters. Being present still carries a quiet power in your emotional world."
  },
  helpful_actions: {
    title: "Helpful Actions",
    emotionalCore: "You feel most loved when someone does something tangible to make your life better or easier.",
    howYouFeelLoved: "Acts of service and practical support—especially when done without being asked—make you feel most cared for and understood.",
    oftenMisread: "You might be seen as demanding or critical when you're really seeking partnership and shared responsibility.",
    growthTips: "Try to appreciate other forms of love expression, even when they don't solve a practical problem. Be direct about what would help most.",
    shortSummary: "You feel most loved through helpful actions and practical support. When someone steps in to lighten your load or solve a problem, you feel deeply cared for.",
    color: "#F1F0FB", // Soft gray
    detailedDescription: {
      emotionalCore: "At the heart of your Love Code is this quiet truth: when someone loves me, they'll show up. You feel most emotionally safe when love is expressed *through effort.* Helpful Actions aren't about chores — they're about *support.* You notice when your partner steps in to lighten your load, to make your life easier, or to handle something they didn't have to. Those moments say: *\"I've got you.\"*\n\nYou may have grown up equating love with responsibility — and over time, you've learned to associate care with action. You don't just want to be told that you're important — you want to *see it lived out.* Love, for you, feels most real when your partner notices your needs and responds to them without being asked. It gives you a sense of safety, partnership, and emotional grounding.\n\nWhen someone follows through, takes initiative, or removes something from your mental load, your nervous system exhales. You don't need huge romantic gestures. You need *reliable ones.* You thrive in environments where consistency matters more than theatrics — where \"I'm here\" is proven in the little ways, over and over.",
      howYouFeelLoved: "You feel most loved when your partner sees the invisible weight you carry — and helps you carry it. Whether it's washing dishes without being asked, running errands when you're tired, or jumping in with the kids so you can catch a breath — these are the moments that say, *\"You're not alone.\"*\n\nYou may not always know how to ask for help — but you deeply notice when it's offered freely. One of the most tender things your partner can do for you is *notice what's hard for you* — and then act on it. Even small, everyday efforts (like bringing you water, remembering what needs fixing, or anticipating what you need before you speak it) land deeply in your emotional world.\n\nTo you, support is intimacy. You feel closest when someone isn't just watching you do it all, but stepping in beside you — not for credit, not for performance, but because they genuinely want to carry life *with* you. That's when you feel most loved.",
      oftenMisread: "This Love Code is often misunderstood — people may think you don't need affection, or that you're too focused on logistics. But this couldn't be further from the truth. You don't need less emotion — you need *emotion lived out.* You're someone who pays attention to whether love is backed by action. And when it's not, you can start to feel emotionally disconnected, even if the words are still being said.\n\nPartners who express love verbally or physically may think they're doing everything right, but if they consistently fail to *show up in the day-to-day,* you may feel unseen or unappreciated. You might not say anything right away — but over time, resentment can build. It's not that you're transactional — it's that effort matters to you. And when it's missing, something fundamental starts to feel off.\n\nYou may also struggle to feel connected to people who overpromise and under-deliver. You value reliability more than charm. And when others misread this as being \"too practical\" or \"emotionally cold,\" it can be painful — because inside, you're deeply loving. You just believe love should *show up and follow through.*",
      relationalGrowthTips: "It's okay to ask for what you need — clearly, calmly, and without guilt. You're not asking for perfection — you're asking for partnership. Try saying things like: \"When you help me without me asking, it makes me feel incredibly supported,\" or \"One of the ways I feel most loved is when you take something off my plate.\"\n\nAlso remember to name your needs *before* you hit burnout. Because you're so capable, others may assume you don't need help. But you do — and you deserve it. The more you can express, \"I want to feel like we're in this together,\" the more room your partner has to meet you in meaningful ways.\n\nLastly, reflect on how you give love. You likely show it by doing — fixing, helping, managing. That's beautiful — but it's okay to also receive. Let your partner know: *\"Support is love to me.\"* Because for someone like you, love isn't a feeling alone. It's *what we do when we care.*"
    },
    secondaryDescription: "You may not always realize it, but you light up when someone steps in to help you, especially when they do it without being asked. You appreciate actions that show care — when someone lightens your load, follows through, or anticipates your needs. Even if this isn't your top Love Code, it still builds emotional safety for you. Support speaks volumes, and when it's consistent, it deepens your trust."
  },
  physical_connection: {
    title: "Physical Connection",
    emotionalCore: "You process emotions through touch and physical proximity, finding security in physical connection.",
    howYouFeelLoved: "Physical affection—from hand-holding to long hugs to intimate connection—helps you feel most secure and valued.",
    oftenMisread: "You might be seen as clingy or solely focused on intimacy when you're truly seeking emotional connection through physical means.",
    growthTips: "Respect that not everyone processes emotions through touch. Communicate when you need physical connection rather than just reaching out.",
    shortSummary: "Touch is your primary language of love. Physical closeness—from casual affection to deeper intimacy—helps you feel connected, secure, and valued.",
    color: "#FDE1D3", // Soft peach
    detailedDescription: {
      emotionalCore: "For you, physical connection is emotional connection. It's not just about intimacy — it's about presence. Your body holds memory, and the safest, most comforting thing in the world is to *feel* someone's love, not just hear or see it. When your partner is physically close — whether through hugs, kisses, hand-holding, or cuddling — it creates an emotional grounding that can't be replaced by words or acts alone.\n\nTouch is your love language because it helps regulate your nervous system. A warm embrace during conflict, a hand on your back in a moment of overwhelm, or laying together in silence — these are the moments that whisper, *\"You're safe. I'm here.\"* Without that closeness, even the best intentions can feel distant. You're someone who connects emotionally through physical nearness.\n\nThis Love Code isn't about constant affection or sexuality — it's about *reassurance in presence.* When your partner draws near instead of pulling away, it signals to your entire being that love is still alive, still reachable, still present in the moment.",
      howYouFeelLoved: "You feel most loved when affection is freely given — not just in romantic settings, but in everyday life. A hug in the kitchen. A spontaneous back rub. Sitting close on the couch instead of across the room. These gestures remind you that love is active, safe, and alive between you.\n\nIn moments of joy, physical touch amplifies celebration. In moments of conflict, it softens tension. For you, physical closeness isn't an afterthought — it's how you know someone is emotionally attuned to you. Even brief, gentle touch — like brushing fingers while walking — signals that your partner is connected to *you*, not just the conversation or the moment.\n\nYou're most alive in relationships that honor your need for contact. And when that need is met, your heart becomes more open, your communication deepens, and your overall sense of intimacy becomes stronger and more secure.",
      oftenMisread: "This Love Code is often misunderstood — people may assume it's only about physical attraction or sexual desire. But for you, physical connection is about *emotional safety.* When your partner avoids affection, pulls away during stress, or stops initiating touch altogether, it can make you feel unloved or even rejected — even if they're trying to show love in other ways.\n\nPartners who don't naturally give physical affection might not realize how deeply their distance is felt. They may say, *\"I'm just not a touchy person,\"* or *\"You know I love you,\"* without realizing how much you're *aching* for closeness. This can create a painful emotional mismatch — where one person thinks everything's fine, and the other feels emotionally abandoned.\n\nIn conflict, this can show up as physical withdrawal. If your partner shuts down or moves away when things get hard, it may hit you harder than they realize. You don't need touch to solve the problem — but you do need it to feel like the connection is still alive. A partner's presence, physically and emotionally, is what helps you stay anchored through hard moments.",
      relationalGrowthTips: "Be open about how much physical closeness means to you — not just in romantic settings, but in everyday emotional wellbeing. Let your partner know: *\"Touch helps me feel safe and connected.\"* Normalize affection as part of your relational rhythm, not something reserved for special occasions or intimacy alone.\n\nYou can also model this in ways that are gentle and non-demanding — like reaching for their hand when you're walking, or giving a warm touch during conversations. When you make physical affection safe, light, and consistent, it becomes something they begin to associate with emotional closeness too.\n\nFinally, reflect on how you handle emotional distance. If you feel rejected, do you retreat completely or try to overcompensate through touch? Learning to name the need — *\"I miss feeling close to you\"* — can help bridge the gap more clearly. Your desire for connection through touch is *not too much.* It's a beautiful way you offer love — and long to receive it in return."
    },
    secondaryDescription: "Physical closeness, even if not your top need, still plays a key role in how you feel bonded. A warm hug, holding hands, or cuddling during downtime helps regulate your nervous system and bring emotional comfort. You might not crave constant affection, but when it's missing, you feel it. Affection adds depth to your connection, especially in quiet or emotionally tender moments."
  }
};

// Original phrase to alternative phrases data
export const sayInsteadPhrases: SayInsteadPhrase[] = [
  {
    id: 1,
    original: "You never listen to me.",
    categories: ["Dismissed", "Communication", "Defensive"],
    alternatives: [
      "It feels like I'm not being heard. Can we try again?",
      "I need to know you're actually hearing what I'm saying, not just waiting to reply.",
      "Can you repeat back what you heard? I want to make sure I'm being clear."
    ],
    whyItWorks: "Shifts from accusation to clarity and mutual understanding."
  },
  {
    id: 2,
    original: "You always make everything about you.",
    categories: ["Self-centeredness", "Resentment", "Frustration"],
    alternatives: [
      "Sometimes I feel like my side of things gets lost in the conversation.",
      "I want to feel seen too—not just like I'm reacting to your version of things.",
      "Can we make space for both of us in this?"
    ],
    whyItWorks: "Centers emotional impact without assigning motive or blame."
  },
  // ... add more phrases as needed
];
