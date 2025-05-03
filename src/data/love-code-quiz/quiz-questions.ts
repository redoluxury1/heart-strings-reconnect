
import { LoveCodeQuestion } from '../../types/love-code-quiz';

// Quiz questions data - 25-question format
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
  }
];
