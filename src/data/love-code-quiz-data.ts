
import { LoveCodeQuestion, LoveCodeDescriptions, SayInsteadPhrase, PhraseCategory } from '../types/love-code-quiz';

// Quiz questions data - new 25-question format
export const quizQuestions: LoveCodeQuestion[] = [
  {
    id: 'q1',
    text: "When I've had a rough day, the thing that makes me feel better is…",
    answers: [
      { id: 'q1a1', text: "A long hug, even if no words are said", code: 'touch' },
      { id: 'q1a2', text: "Someone doing something helpful for me without asking", code: 'uplift' },
      { id: 'q1a3', text: "A calm moment together with no distractions", code: 'together' },
      { id: 'q1a4', text: "A surprise gesture that shows they were thinking about me", code: 'support' },
      { id: 'q1a5', text: "A sincere \"You're doing great — I see how hard you're trying\"", code: 'affirm' }
    ]
  },
  {
    id: 'q2',
    text: "If I'm feeling disconnected in my relationship, I start to wish for…",
    answers: [
      { id: 'q2a1', text: "More physical closeness or affection", code: 'touch' },
      { id: 'q2a2', text: "Thoughtful compliments or reassuring words", code: 'affirm' },
      { id: 'q2a3', text: "A shared project or something we're working on together", code: 'uplift' },
      { id: 'q2a4', text: "Quality time without phones, stress, or multitasking", code: 'together' },
      { id: 'q2a5', text: "Sweet, unexpected things that show they care", code: 'support' }
    ]
  },
  {
    id: 'q3',
    text: "On my birthday, what makes me feel most loved is…",
    answers: [
      { id: 'q3a1', text: "A handwritten note or heartfelt words", code: 'affirm' },
      { id: 'q3a2', text: "Spending the whole day together, even doing nothing special", code: 'together' },
      { id: 'q3a3', text: "A small, meaningful surprise gift", code: 'support' },
      { id: 'q3a4', text: "When they take care of things so I don't have to lift a finger", code: 'uplift' },
      { id: 'q3a5', text: "Physical closeness — like cuddles, kisses, or back rubs", code: 'touch' }
    ]
  },
  {
    id: 'q4',
    text: "When I'm upset, what helps me calm down most?",
    answers: [
      { id: 'q4a1', text: "A warm embrace or just sitting close", code: 'touch' },
      { id: 'q4a2', text: "Being told my feelings make sense", code: 'affirm' },
      { id: 'q4a3', text: "Someone quietly stepping in to help with whatever's overwhelming me", code: 'uplift' },
      { id: 'q4a4', text: "Doing something together, even if it's low-key", code: 'together' },
      { id: 'q4a5', text: "A little gesture — like tea made just the way I like it", code: 'support' }
    ]
  },
  {
    id: 'q5',
    text: "I feel closest to someone when they…",
    answers: [
      { id: 'q5a1', text: "Go out of their way to do things that make my life easier", code: 'uplift' },
      { id: 'q5a2', text: "Take time just for me, no multitasking or distractions", code: 'together' },
      { id: 'q5a3', text: "Are physically affectionate and initiate closeness", code: 'touch' },
      { id: 'q5a4', text: "Give heartfelt compliments or say something kind out of nowhere", code: 'affirm' },
      { id: 'q5a5', text: "Notice and remember the little things that matter to me", code: 'support' }
    ]
  },
  {
    id: 'q6',
    text: "I'd rather my partner…",
    answers: [
      { id: 'q6a1', text: "Make dinner when I'm exhausted", code: 'uplift' },
      { id: 'q6a2', text: "Leave me a note reminding me they believe in me", code: 'affirm' },
      { id: 'q6a3', text: "Sit on the couch with me while we unwind", code: 'together' },
      { id: 'q6a4', text: "Reach over and hold my hand without saying anything", code: 'touch' },
      { id: 'q6a5', text: "Bring home my favorite snack without being asked", code: 'support' }
    ]
  },
  {
    id: 'q7',
    text: "I feel safest in my relationship when…",
    answers: [
      { id: 'q7a1', text: "My partner is physically near me", code: 'touch' },
      { id: 'q7a2', text: "I'm told I'm loved, appreciated, and not a burden", code: 'affirm' },
      { id: 'q7a3', text: "We spend intentional time together, just the two of us", code: 'together' },
      { id: 'q7a4', text: "They jump in to help before I even have to ask", code: 'uplift' },
      { id: 'q7a5', text: "They do small, thoughtful things that show they know me", code: 'support' }
    ]
  },
  {
    id: 'q8',
    text: "When thinking about a dream date night…",
    answers: [
      { id: 'q8a1', text: "A cozy night on the couch, just holding each other", code: 'touch' },
      { id: 'q8a2', text: "An activity where we laugh and connect without stress", code: 'together' },
      { id: 'q8a3', text: "Something they planned ahead as a surprise", code: 'support' },
      { id: 'q8a4', text: "A conversation where they really listen and say what I need to hear", code: 'affirm' },
      { id: 'q8a5', text: "Coming home to find the chores already done and candles lit", code: 'uplift' }
    ]
  },
  {
    id: 'q9',
    text: "When I look back on moments I've felt loved, I remember…",
    answers: [
      { id: 'q9a1', text: "The words they said that stuck with me", code: 'affirm' },
      { id: 'q9a2', text: "When they were fully present with me, no distractions", code: 'together' },
      { id: 'q9a3', text: "The times they helped or took the pressure off me", code: 'uplift' },
      { id: 'q9a4', text: "When they touched me like they really meant it", code: 'touch' },
      { id: 'q9a5', text: "The little surprises that showed they \"just knew\"", code: 'support' }
    ]
  },
  {
    id: 'q10',
    text: "If I'm feeling insecure, the best thing my partner could do is…",
    answers: [
      { id: 'q10a1', text: "Hold me close or pull me in for a kiss", code: 'touch' },
      { id: 'q10a2', text: "Tell me what they admire about me", code: 'affirm' },
      { id: 'q10a3', text: "Spend the whole afternoon doing something together", code: 'together' },
      { id: 'q10a4', text: "Do something that shows they've got my back", code: 'uplift' },
      { id: 'q10a5', text: "Show up with something sweet they remembered I love", code: 'support' }
    ]
  },
  {
    id: 'q11',
    text: "I'm most likely to feel hurt in a relationship when…",
    answers: [
      { id: 'q11a1', text: "They stop saying kind or encouraging things to me", code: 'affirm' },
      { id: 'q11a2', text: "We don't spend enough one-on-one time together", code: 'together' },
      { id: 'q11a3', text: "They stop being physically affectionate", code: 'touch' },
      { id: 'q11a4', text: "I feel like I'm doing everything by myself", code: 'uplift' },
      { id: 'q11a5', text: "They stop putting thought into the little things that matter to me", code: 'support' }
    ]
  },
  {
    id: 'q12',
    text: "The smallest gesture that means the most to me is…",
    answers: [
      { id: 'q12a1', text: "Hearing \"I'm proud of you\" when I didn't expect it", code: 'affirm' },
      { id: 'q12a2', text: "Getting a coffee or snack they know I love", code: 'support' },
      { id: 'q12a3', text: "A spontaneous hug or hand on my back", code: 'touch' },
      { id: 'q12a4', text: "Spending real, intentional time together", code: 'together' },
      { id: 'q12a5', text: "Taking care of something stressful for me without asking", code: 'uplift' }
    ]
  },
  {
    id: 'q13',
    text: "I usually express love to others by…",
    answers: [
      { id: 'q13a1', text: "Doing things to make their life easier", code: 'uplift' },
      { id: 'q13a2', text: "Leaving notes or sending thoughtful texts", code: 'affirm' },
      { id: 'q13a3', text: "Wanting to be physically close and affectionate", code: 'touch' },
      { id: 'q13a4', text: "Making plans and spending focused time together", code: 'together' },
      { id: 'q13a5', text: "Picking out gifts or gestures that are deeply personal", code: 'support' }
    ]
  },
  {
    id: 'q14',
    text: "In an argument, I feel more at peace when…",
    answers: [
      { id: 'q14a1', text: "They validate my feelings with words", code: 'affirm' },
      { id: 'q14a2', text: "They reach out to hold my hand or touch me gently", code: 'touch' },
      { id: 'q14a3', text: "They take action to make things right, not just say things", code: 'uplift' },
      { id: 'q14a4', text: "We take time to reconnect without rushing", code: 'together' },
      { id: 'q14a5', text: "They follow up with something meaningful after it's over", code: 'support' }
    ]
  },
  {
    id: 'q15',
    text: "My favorite type of \"I love you\" is…",
    answers: [
      { id: 'q15a1', text: "Spoken out loud, clearly and sincerely", code: 'affirm' },
      { id: 'q15a2', text: "A cozy night in with no distractions", code: 'together' },
      { id: 'q15a3', text: "A small gift or thoughtful act they planned just for me", code: 'support' },
      { id: 'q15a4', text: "Stepping in to help without being asked", code: 'uplift' },
      { id: 'q15a5', text: "A kiss on the forehead or long hug", code: 'touch' }
    ]
  },
  {
    id: 'q16',
    text: "When I feel emotionally overwhelmed, I wish they would…",
    answers: [
      { id: 'q16a1', text: "Sit quietly with me so I'm not alone", code: 'together' },
      { id: 'q16a2', text: "Help take something off my plate", code: 'uplift' },
      { id: 'q16a3', text: "Say something that reminds me they care", code: 'affirm' },
      { id: 'q16a4', text: "Touch my arm, hold me, or pull me close", code: 'touch' },
      { id: 'q16a5', text: "Show up with something small that lifts my mood", code: 'support' }
    ]
  },
  {
    id: 'q17',
    text: "I feel most appreciated when…",
    answers: [
      { id: 'q17a1', text: "I'm told how much I'm valued", code: 'affirm' },
      { id: 'q17a2', text: "They recognize what I've done by taking a task off my list", code: 'uplift' },
      { id: 'q17a3', text: "We carve out uninterrupted time together", code: 'together' },
      { id: 'q17a4', text: "They do something small but meaningful, just because", code: 'support' },
      { id: 'q17a5', text: "We're physically affectionate throughout the day", code: 'touch' }
    ]
  },
  {
    id: 'q18',
    text: "If I'm struggling with self-doubt, I want them to…",
    answers: [
      { id: 'q18a1', text: "Say exactly what they believe in about me", code: 'affirm' },
      { id: 'q18a2', text: "Stay close and hold me", code: 'touch' },
      { id: 'q18a3', text: "Remind me I'm not alone by spending time with me", code: 'together' },
      { id: 'q18a4', text: "Quietly take care of something that's weighing on me", code: 'uplift' },
      { id: 'q18a5', text: "Show they're thinking of me with something thoughtful", code: 'support' }
    ]
  },
  {
    id: 'q19',
    text: "The best kind of \"check-in\" from my partner would be…",
    answers: [
      { id: 'q19a1', text: "\"I'm thinking about you. How's your day?\"", code: 'affirm' },
      { id: 'q19a2', text: "Coming by with something I need", code: 'support' },
      { id: 'q19a3', text: "\"Wanna hang out tonight, just us?\"", code: 'together' },
      { id: 'q19a4', text: "\"I took care of this for you\"", code: 'uplift' },
      { id: 'q19a5', text: "A kiss or touch without needing to say much", code: 'touch' }
    ]
  },
  {
    id: 'q20',
    text: "I feel most distant from my partner when…",
    answers: [
      { id: 'q20a1', text: "They stop doing little things that help me", code: 'uplift' },
      { id: 'q20a2', text: "We don't physically connect for a while", code: 'touch' },
      { id: 'q20a3', text: "We're around each other but not with each other", code: 'together' },
      { id: 'q20a4', text: "They forget to say loving or affirming things", code: 'affirm' },
      { id: 'q20a5', text: "There's no thoughtfulness in the everyday stuff", code: 'support' }
    ]
  },
  {
    id: 'q21',
    text: "If they forgot our anniversary but made it up later, I'd prefer…",
    answers: [
      { id: 'q21a1', text: "A thoughtful, meaningful letter", code: 'affirm' },
      { id: 'q21a2', text: "A quiet evening doing something meaningful together", code: 'together' },
      { id: 'q21a3', text: "A simple, unexpected act of care", code: 'support' },
      { id: 'q21a4', text: "Taking over all the tasks that day to give me a break", code: 'uplift' },
      { id: 'q21a5', text: "A day full of cuddles and affection", code: 'touch' }
    ]
  },
  {
    id: 'q22',
    text: "In everyday life, I feel loved when…",
    answers: [
      { id: 'q22a1', text: "I'm touched often and with intention", code: 'touch' },
      { id: 'q22a2', text: "I'm included in time that feels special", code: 'together' },
      { id: 'q22a3', text: "Someone says something that sticks with me", code: 'affirm' },
      { id: 'q22a4', text: "My needs are met without me saying a word", code: 'uplift' },
      { id: 'q22a5', text: "They go out of their way to make something feel personal", code: 'support' }
    ]
  },
  {
    id: 'q23',
    text: "If we've been busy or disconnected, I'd most want…",
    answers: [
      { id: 'q23a1', text: "A night alone together to talk and reset", code: 'together' },
      { id: 'q23a2', text: "Words of reassurance that we're still good", code: 'affirm' },
      { id: 'q23a3', text: "Something thoughtful that feels like \"I see you\"", code: 'support' },
      { id: 'q23a4', text: "A gesture that lightens my stress", code: 'uplift' },
      { id: 'q23a5', text: "Physical touch to reconnect, even in silence", code: 'touch' }
    ]
  },
  {
    id: 'q24',
    text: "If my partner was on a long trip, I'd miss…",
    answers: [
      { id: 'q24a1', text: "Their physical presence", code: 'touch' },
      { id: 'q24a2', text: "The way they'd help me with everyday stuff", code: 'uplift' },
      { id: 'q24a3', text: "Talking with them and hearing kind words", code: 'affirm' },
      { id: 'q24a4', text: "Having quality time to unwind together", code: 'together' },
      { id: 'q24a5', text: "The way they'd do the little things only they think of", code: 'support' }
    ]
  },
  {
    id: 'q25',
    text: "When I say \"I love you,\" I'm often really saying…",
    answers: [
      { id: 'q25a1', text: "\"I'm here for you — let me help.\"", code: 'uplift' },
      { id: 'q25a2', text: "\"You matter to me more than anything.\"", code: 'together' },
      { id: 'q25a3', text: "\"You're incredible and I believe in you.\"", code: 'affirm' },
      { id: 'q25a4', text: "\"I want to be near you, physically and emotionally.\"", code: 'touch' },
      { id: 'q25a5', text: "\"I've been thinking about you — here's something just for you.\"", code: 'support' }
    ]
  }
];

// Love code descriptions
export const loveCodeDescriptions: LoveCodeDescriptions = {
  affirm: {
    title: "Affirming Words",
    emotionalCore: "You feel most connected when emotions are named and expressed verbally. Words matter deeply to you.",
    howYouFeelLoved: "You feel most loved when your partner speaks affirmation, appreciation, and loving sentiments out loud—from daily check-ins to deep conversations.",
    oftenMisread: "You might be misread as needy or validation-seeking when you're truly seeking emotional transparency and clear communication.",
    growthTips: "Remember that not everyone processes emotions verbally. Your partner might show love in other ways that don't involve the words you crave.",
    shortSummary: "Words of affirmation and verbal expressions of love resonate most deeply with you. You connect through conversation and feel most secure when feelings are named out loud.",
    color: "#E5DEFF", // Soft purple
    detailedDescription: {
      emotionalCore: "At your core, words don't just inform — they anchor you emotionally. You're someone who experiences connection through clarity, articulation, and tone. When love is spoken with sincerity, you don't just hear it — you feel it. Words are how you orient yourself in a relationship: they help you feel valued, secure, and known.\n\nYour nervous system responds to tone. A gentle \"I see you,\" or a vulnerable \"I'm sorry,\" lands deeper than actions alone. Even brief affirmations — a soft \"I missed you\" or \"I'm so lucky to have you\" — carry weight far beyond their syllables. This is because language is your access point to emotional safety. Without it, you may feel disoriented, even if everything else seems \"fine\" on the surface.\n\nFor you, language holds memories. You remember the sweet things people say long after the moment has passed. Harsh words, silence, or emotionally flat conversations can feel like deep ruptures — not because you're dramatic, but because you value emotional honesty. Words don't just matter. They mean everything.",
      howYouFeelLoved: "You feel loved when someone speaks to you with warmth, presence, and intention. When your partner notices the little things you're doing and tells you — not just thinks it — it fills a reservoir inside you that actions alone can't reach. A compliment about your heart. A message during the day saying, \"I'm proud of you.\" A soft tone when things feel tense. These aren't just niceties to you — they're connection threads.\n\nEven more than that, it's the consistency of language that counts. You don't just want one perfect speech — you want the small, steady reminders that love is here, alive, and seen. Affirming Words people thrive when conversations are reflective, affirming, and emotionally curious. You want to feel spoken to from the heart — not from obligation. You're most alive when you hear, \"Here's how I feel about you, and I want you to know.\"\n\nWhen a partner can verbalize appreciation, repair, or affection clearly and vulnerably — especially during hard moments — that's when you feel most safe, most connected, and most secure in the relationship.",
      oftenMisread: "Because you value words so deeply, others might misinterpret your needs as \"needy,\" \"sensitive,\" or even \"insecure.\" But it's not about needing constant reassurance — it's about knowing that love is still alive between the lines. When someone goes silent during conflict, or avoids verbal connection altogether, it can trigger feelings of abandonment or doubt for you — not because you're irrational, but because words are your signal of emotional presence.\n\nPeople who don't share this Love Code may think their actions speak louder than words — and while you appreciate action, it doesn't reach the same emotional depth for you. In relationships, this can lead to a painful mismatch: one partner feels they're showing love by doing, while you may be wondering why they aren't saying anything.\n\nEven worse, words used carelessly — sharp tone, sarcasm, passive-aggressive remarks — hit deeper than they realize. For someone with your Love Code, tone is intimacy. It matters how things are said. The absence of tenderness in language can feel like distance, even if everything else is functioning. This is often misunderstood — and it can make you feel like your emotional needs are \"too much.\" They're not.",
      relationalGrowthTips: "Own your Love Code without apology — but learn to communicate your needs clearly, not expect your partner to just \"know.\" Phrases like, \"I connect most through words, and I'd love to hear what you're feeling,\" can open the door gently. You can model this by speaking affection first — giving the kind of love you long to receive. Often, people learn how to speak love because of you.\n\nIn conflict, your tendency may be to chase clarity through conversation — wanting to fix things through words. This is a gift — but it can become overwhelming for partners who process differently. Practice patience. Ask, \"When would be a good time to talk about this?\" or \"Can we come back to this in a way that feels good for both of us?\" You don't have to silence yourself — you just have to pace the conversation with love.\n\nAlso reflect: when do you go quiet? Do you shut down when you're hurt or disappointed with the way something was said? Sometimes the best thing you can do is let someone know — \"Words matter to me, and this felt like a disconnection.\" This Love Code doesn't make you fragile. It makes you attuned. Speak love clearly — and teach others how to speak it back."
    },
    secondaryDescription: "While this may not be your primary Love Code, affirming words still matter to you more than most people realize. When someone tells you what they appreciate about you — out loud — it leaves a lasting emotional imprint. You respond to sincere compliments, encouragement, and check-ins that remind you you're cared for. In tough moments, even a simple \"I'm here\" or \"You're doing great\" can soften your heart and help you reconnect faster. Words aren't everything — but they still carry weight."
  },
  support: {
    title: "Thoughtful Support",
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
  together: {
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
  uplift: {
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
  touch: {
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
