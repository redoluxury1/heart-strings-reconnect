import { ReflectionInsight, ReflectionPackBatch } from "@/types/reflection-insights";

// First batch of reflection insights
export const reflectionPackBatch1: ReflectionInsight[] = [
  {
    "triggers": ["shut down", "walked away", "needed space", "left", "withdrew", "ignored", "talk to me", "alone"],
    "category": "space_vs_connection",
    "insight": "It sounds like one of you needed space, and the other needed connection.",
    "reflection": "When partners have mismatched needs in conflict, it can feel like abandonment on one side and overwhelm on the other. One person may be trying to protect their emotions, while the other is reaching out for comfort or clarity. Neither is wrong—what matters is learning how to name and time these needs together.",
    "recommendation": "Try choosing a shared pause word or phrase you can use in the future. It signals a need for space without fear of disconnection. Then revisit this conversation when you're both calmer—with care, not urgency."
  },
  {
    "triggers": ["do everything", "carry the load", "no help", "never helps", "always on me", "resentment"],
    "category": "resentment_and_imbalance",
    "insight": "There may be a feeling of imbalance or invisible effort in this relationship.",
    "reflection": "When resentment builds, it often means someone's effort or emotional labor is going unseen. You might be doing more than your partner realizes—not because they don't care, but because it hasn't been named clearly. And unspoken effort can quietly become anger.",
    "recommendation": "Work together this week to choose one small task or routine to rebalance. Then come back here and write a Love Note that acknowledges how you showed up for each other differently this time."
  },
  {
    "triggers": ["controlling", "forced", "can't choose", "decided for me", "manipulated", "never ask", "always decide"],
    "category": "control_vs_autonomy",
    "insight": "It sounds like one of you is craving more autonomy in decision-making.",
    "reflection": "Feeling controlled in a relationship can create emotional shutdown or rebellion. On the flip side, taking charge without checking in can stem from a desire to help or move quickly. The goal isn't to eliminate leadership—it's to build consent and collaboration into your choices.",
    "recommendation": "Choose one area of daily life this week—like meals, weekend plans, or family routines—and practice shared decision-making. Check in first. Let the other person weigh in, even if it seems small."
  },
  {
    "triggers": ["you always", "never listen", "blamed me", "wrong again", "you made me", "attacked", "accused"],
    "category": "blame_and_defensiveness",
    "insight": "There may be a pattern of blame that's leading to defensiveness instead of understanding.",
    "reflection": "Blame can feel like a shortcut to clarity, but it usually creates distance. It puts one person in the position of being wrong instead of heard. Defensive reactions then become armor—protecting, but not connecting.",
    "recommendation": "Try revisiting one point from this conflict using an 'I felt… when…' sentence. Instead of pointing out what your partner did wrong, try sharing how it landed for you emotionally."
  },
  {
    "triggers": ["unheard", "talked over", "dismissed", "cut me off", "didn't listen", "not heard", "ignored"],
    "category": "feeling_unheard",
    "insight": "It sounds like someone didn't feel fully heard in this moment.",
    "reflection": "Feeling unheard is one of the deepest emotional pain points in conflict. It's not always about volume or timing—it's about emotional recognition. Validation doesn't mean agreeing—it means pausing long enough to say, 'I get that this mattered to you.'",
    "recommendation": "Set a timer for just 3 minutes and take turns talking without interrupting. Let each person say what was hard, what they needed, and what they wish had gone differently. Then trade roles. Listening fully is a powerful act of repair."
  }
];

// Second batch of reflection insights
export const reflectionPackBatch2: ReflectionInsight[] = [
  {
    "triggers": ["unsafe", "scared", "intense", "yelling", "raised voice", "too much", "anxious", "emotionally unsafe"],
    "category": "emotional_safety",
    "insight": "It sounds like emotional safety may have been missing in this moment.",
    "reflection": "Feeling emotionally or physically unsafe can shut someone down instantly, even if the topic matters deeply. It's hard to stay open when your nervous system feels under threat. Creating safety in conflict isn't about being perfect—it's about showing your partner that your love can stay calm, even when your voice shakes.",
    "recommendation": "Set some shared boundaries now—like no raised voices, and taking breaks when things feel heated. Try the Time Out tool under 'Mid-Fight' to create a calm-down plan together."
  },
  {
    "triggers": ["left me", "abandoned", "walked away", "disconnected", "left alone", "you always leave", "never stay"],
    "category": "abandonment_fear",
    "insight": "One of you may be carrying fears of abandonment or emotional disconnection.",
    "reflection": "When leaving a conversation—even briefly—triggers deep fear, it's rarely about just that moment. It often ties back to emotional wounds: being left, being silenced, not being considered. That fear can come out as clinginess, anger, or panic. Naming the need for security is the first step.",
    "recommendation": "Instead of just walking away when things escalate, try saying: 'I need space, but I'll come back in 20 minutes.' It helps your partner feel grounded—even during distance."
  },
  {
    "triggers": ["dramatic", "overreacting", "you're too sensitive", "not a big deal", "I was just joking"],
    "category": "emotional_invalidation",
    "insight": "Someone may have felt emotionally invalidated during this conflict.",
    "reflection": "When someone is told their feelings are an overreaction, it teaches them to suppress their emotional truth. That doesn't lead to peace—it leads to resentment and internal confusion. Validating someone doesn't mean agreeing—it means saying, 'I can see that this affected you.'",
    "recommendation": "Try revisiting one statement with a new phrase: 'I didn't realize that hit you that way—thank you for telling me.' Validation is one of the most powerful tools in connection."
  },
  {
    "triggers": ["cheated", "lied", "betrayed", "trust", "I don't believe you", "you said one thing", "broke my trust"],
    "category": "trust_repair",
    "insight": "This conflict may be connected to a deeper rupture in trust.",
    "reflection": "When trust has been broken—whether recently or in the past—it colors every disagreement. Even small tensions feel like proof of a bigger pattern. Healing doesn't happen by ignoring it. It happens by creating new evidence, moment by moment, that safety is being rebuilt.",
    "recommendation": "Instead of jumping into 'fix it' mode, try saying: 'I want to earn your trust back, and I'm open to hearing what that looks like for you.' Then truly listen."
  },
  {
    "triggers": ["we want different things", "we're not on the same page", "don't understand each other", "misaligned", "confused", "pulled in different directions"],
    "category": "conflicting_needs",
    "insight": "You may both be trying to meet different emotional needs in the same moment.",
    "reflection": "Sometimes, two people can love each other deeply—and still want opposite things at the same time. That's not failure. It's human. The key is staying curious, not competitive: What does your partner need right now? What do you need? Is there any overlap?",
    "recommendation": "Try using the 'Let's Talk This Out' prompt library to name what you each need without interruption. Don't look for the perfect compromise yet—just get clear on what's true for both of you."
  }
];

// Third batch of reflection insights (from user input)
export const reflectionPackBatch3: ReflectionInsight[] = [
  {
    "triggers": [
      "don't want sex",
      "never in the mood",
      "different needs",
      "avoid intimacy",
      "shut down physically"
    ],
    "category": "intimacy_mismatch",
    "insight": "It sounds like you may have mismatched needs around intimacy or physical connection.",
    "reflection": "Intimacy isn't just about sex—it's about safety, attunement, and how we express closeness. When one partner feels rejected and the other feels pressured, both can become defensive. Often, this disconnect isn't about desire—it's about deeper emotional needs not being met.",
    "recommendation": "Have a conversation outside the bedroom about what intimacy means to each of you. You might be speaking different languages without realizing it. Try the 'Love Codes' quiz if you haven't already."
  },
  {
    "triggers": [
      "I do everything",
      "mental load",
      "always on me",
      "burned out",
      "overwhelmed",
      "no help with the kids"
    ],
    "category": "emotional_labor",
    "insight": "There may be a pattern of emotional or invisible labor falling unevenly on one of you.",
    "reflection": "When one partner becomes the emotional or logistical manager of the household or relationship, it leads to burnout. The issue isn't just doing tasks—it's feeling alone in the responsibility. Recognition and rebalancing are the first steps toward repair.",
    "recommendation": "Start the week by asking each other: 'What can I take off your plate this week?' Then follow through—and check in again on Sunday."
  },
  {
    "triggers": [
      "parenting",
      "kids",
      "discipline",
      "you undermine me",
      "in front of the kids",
      "not aligned as parents"
    ],
    "category": "parenting_tension",
    "insight": "This conflict may be about more than parenting—it's about teamwork and trust.",
    "reflection": "Parenting often becomes a mirror for how aligned or misaligned we feel. When one partner feels undermined or unsupported, it creates a divide that's deeper than logistics. The goal isn't always perfect agreement—it's showing your kids what respectful disagreement looks like.",
    "recommendation": "Set aside 20 minutes this week to talk about how each of you was raised. What do you want to repeat? What do you want to rewrite? That conversation is more powerful than any discipline plan."
  },
  {
    "triggers": [
      "shut down",
      "I froze",
      "nothing to say",
      "blank",
      "numb",
      "closed off"
    ],
    "category": "emotional_shutdown",
    "insight": "One of you may be experiencing emotional shutdown in the face of conflict.",
    "reflection": "Shutting down is often misunderstood as avoidance—but it's usually self-protection. When someone shuts down, their body is saying 'I can't handle more stimulation right now.' That's not weakness. It's wiring. Learn to notice the signs earlier, and slow the moment down.",
    "recommendation": "Create a 'slow signal' between you—like a gesture, phrase, or pause word—so that when one of you starts to freeze, you can both take a breath before continuing."
  },
  {
    "triggers": [
      "I'm scared to say",
      "don't want to get hurt",
      "too vulnerable",
      "afraid you'll leave",
      "if I open up"
    ],
    "category": "fear_of_vulnerability",
    "insight": "There may be fear around emotional vulnerability at the root of this conflict.",
    "reflection": "Sometimes conflict isn't about what was said—it's about what wasn't. When we fear being vulnerable, we say half-truths or lash out to protect ourselves. But real connection requires risk. You can't build intimacy and armor at the same time.",
    "recommendation": "Try finishing the sentence: 'If I were being totally honest, I would say…'—even if you write it down first. You don't have to share it right away. You just have to practice saying it."
  }
];

// Fourth batch of reflection insights
export const reflectionPackBatch4: ReflectionInsight[] = [
  {
    "triggers": [
      "you don't care",
      "I'm not a priority",
      "last on your list",
      "forgot about me",
      "not important to you"
    ],
    "category": "feeling_deprioritized",
    "insight": "One of you may be feeling like you're no longer a priority.",
    "reflection": "Feeling deprioritized in a relationship often doesn't come from grand betrayals—it comes from small moments of absence. When gestures of connection fade, it can leave someone feeling unseen, even if love is still present. This isn't about blame—it's about recalibrating attention.",
    "recommendation": "Each of you choose one simple ritual this week—a daily check-in, a shared meal, a hug in the morning. Small consistency builds trust faster than big gestures."
  },
  {
    "triggers": [
      "always defensive",
      "can't talk to you",
      "you twist everything",
      "I'm walking on eggshells"
    ],
    "category": "communication_breakdown",
    "insight": "There may be a pattern of defensiveness that makes open communication feel unsafe.",
    "reflection": "When one or both partners are constantly bracing for criticism, real dialogue shuts down. Conversations become performances or battles. The goal is to make room for truth without triggering protection mode.",
    "recommendation": "Try using 'I' language next time conflict arises: 'I felt... when...' instead of 'You never...'. This small shift reduces defensiveness and increases connection."
  },
  {
    "triggers": [
      "you don't get it",
      "I'm alone in this",
      "why do I always have to explain",
      "nobody understands me"
    ],
    "category": "emotional_isolation",
    "insight": "Someone may be carrying the weight of emotional isolation.",
    "reflection": "Emotional isolation in a relationship often feels worse than being physically alone. It's not just about needing attention—it's about needing resonance. That sense of 'you see me in this.' Without it, we start to question whether our experiences are valid.",
    "recommendation": "Take five minutes tonight to ask your partner: 'What felt hard for you this week that I might've missed?' Then reflect it back in your own words—just to show you heard."
  },
  {
    "triggers": [
      "bring this up again",
      "you never let it go",
      "still mad about that",
      "can't move on",
      "old fight"
    ],
    "category": "unresolved_wounds",
    "insight": "This conflict may be touching an older wound that never fully healed.",
    "reflection": "When an old wound is reactivated, it often gets mislabeled as overreacting. But repeated conflict is often repeated pain. Until something is resolved, your body and brain treat it like it just happened. That's not immaturity—it's memory.",
    "recommendation": "If this issue has come up more than once, try journaling individually about what part still hurts. Then swap journals and read silently—no defense, just understanding."
  },
  {
    "triggers": [
      "don't touch me",
      "not in the mood",
      "stop trying",
      "cold",
      "you always want something"
    ],
    "category": "disconnected_intimacy",
    "insight": "There may be a growing disconnect around emotional or physical closeness.",
    "reflection": "When physical affection becomes a source of tension, it often means emotional safety is out of sync. One partner may seek touch as connection; the other may avoid it to protect themselves. It's rarely about rejection—it's about emotional mismatch.",
    "recommendation": "Spend 10 minutes together in silence—just sitting near each other. No fixing, no expectation. Sometimes rebuilding safety begins in stillness, not words."
  }
];

// Fifth batch of reflection insights
export const reflectionPackBatch5: ReflectionInsight[] = [
  {
    "triggers": [
      "you embarrassed me",
      "not in front of them",
      "don't talk about me like that",
      "you made me look stupid"
    ],
    "category": "public_disrespect",
    "insight": "This conflict may have been fueled by feeling disrespected or criticized in front of others.",
    "reflection": "Being criticized publicly by a partner hits differently—it can feel like betrayal. Even small jokes or throwaway comments can trigger shame or humiliation, especially if they echo deeper insecurities. Dignity matters in conflict, especially when others are watching.",
    "recommendation": "Make a shared agreement to only address conflict in private. If something slips in public, use a short phrase like 'Let's pause this for later'—then return to it calmly once alone."
  },
  {
    "triggers": [
      "you don't show up",
      "I can't count on you",
      "you forgot",
      "you flaked again",
      "didn't follow through"
    ],
    "category": "reliability_and_follow_through",
    "insight": "One of you may be struggling to feel consistently supported or prioritized.",
    "reflection": "Trust isn't just about honesty—it's about follow-through. When promises or plans fall apart repeatedly, it sends a message that someone—or something else—comes first. The goal isn't perfection. It's consistency with care.",
    "recommendation": "Choose one recurring commitment—big or small—that you'll protect this week. Whether it's bedtime, dinner, or a check-in call—let your actions show what matters."
  },
  {
    "triggers": [
      "you never apologize",
      "you don't take ownership",
      "always my fault",
      "blame me for everything"
    ],
    "category": "accountability_and_repair",
    "insight": "Someone may be craving true accountability, not just closure.",
    "reflection": "Accountability isn't about blame—it's about naming impact. When hurt isn't acknowledged, it festers. Even a simple, sincere apology can shift the entire tone of a relationship. But it has to be real. Not rushed. Not transactional. Real.",
    "recommendation": "Try using this phrase: 'I can see how that landed for you, and I'm sorry it hurt.' You don't have to be the villain to acknowledge their pain."
  },
  {
    "triggers": [
      "you're always on your phone",
      "never present",
      "you don't even look at me",
      "checked out",
      "you're somewhere else"
    ],
    "category": "presence_and_attention",
    "insight": "This conflict may be about a lack of emotional presence—not just screen time.",
    "reflection": "When we feel ignored or emotionally abandoned, we often reach for irritation to cover up hurt. The real issue might not be about phones or distractions—it's about wanting to feel important, chosen, prioritized. That's a human need.",
    "recommendation": "Try setting aside 20 uninterrupted minutes each evening this week—phones away, eyes on each other. Not to solve problems, just to reconnect."
  },
  {
    "triggers": [
      "you never change",
      "always the same fight",
      "why bother",
      "it doesn't matter what I say"
    ],
    "category": "conflict_fatigue",
    "insight": "This may be a sign of conflict fatigue—where the same unresolved pattern keeps looping.",
    "reflection": "When a fight happens again and again, it becomes less about the content and more about the hopelessness. Conflict fatigue is when you feel like nothing you say will make a difference. But real change starts with interrupting the cycle—not perfectly, just intentionally.",
    "recommendation": "Before your next disagreement, agree on one phrase you can both use to pause the spiral. Maybe it's 'Let's try that again.' Sometimes stopping the loop is the first breakthrough."
  }
];

// Sixth batch of reflection insights
export const reflectionPackBatch6: ReflectionInsight[] = [
  {
    "triggers": [
      "you compared me",
      "just like your ex",
      "why aren't you more like",
      "never enough"
    ],
    "category": "comparison_and_insecurity",
    "insight": "There may be feelings of comparison or not being enough fueling this tension.",
    "reflection": "Being compared—whether to an ex, a parent, or someone imaginary—can erode confidence in a relationship. It makes love feel conditional. When we feel like we're being measured, we stop feeling safe to show up as ourselves.",
    "recommendation": "If comparison has shown up lately, start a new ritual: share one thing you love about who your partner is—not who you wish they'd be."
  },
  {
    "triggers": [
      "you always shut me down",
      "nothing I say matters",
      "dismissive",
      "brush it off",
      "you minimize everything"
    ],
    "category": "dismissal_and_misattunement",
    "insight": "It sounds like one of you may be feeling emotionally dismissed.",
    "reflection": "Minimizing or brushing off a partner's concern doesn't make the issue go away—it makes it go inward. When we feel dismissed, we stop sharing. That silence can feel like safety at first, but it slowly erodes trust.",
    "recommendation": "Try reflecting one sentence back the next time your partner brings something up—even if you disagree. 'What I hear you saying is…' goes a long way in building safety."
  },
  {
    "triggers": [
      "too much pressure",
      "expectations",
      "I can't live up",
      "never good enough",
      "perfection"
    ],
    "category": "performance_pressure",
    "insight": "Someone may be feeling like they're being evaluated—not accepted.",
    "reflection": "Relationships thrive in a space where we're allowed to be whole and flawed. If one partner feels like they're constantly performing or being measured, emotional closeness starts to feel like a test. That's not love—it's stress.",
    "recommendation": "Pause this week to ask each other: 'Do you feel like I expect too much from you?' and actually listen. Sometimes love softens just by naming the pressure."
  },
  {
    "triggers": [
      "you don't support me",
      "I feel alone in this",
      "you don't back me up",
      "I'm on my own"
    ],
    "category": "lack_of_support",
    "insight": "This moment may have highlighted a deeper need for support and solidarity.",
    "reflection": "Support isn't just about logistics—it's about emotional presence. Feeling like your partner isn't in your corner—especially when life gets hard—can lead to a loneliness that words can't fix. The cure? Showing up. Repeatedly. Quietly. Faithfully.",
    "recommendation": "Ask: 'What's one thing I could do this week that would help you feel supported?' Then do it—without making it about earning points."
  },
  {
    "triggers": [
      "you used this against me",
      "threw it in my face",
      "weaponized",
      "you said you forgave me but",
      "you brought it back up"
    ],
    "category": "weaponized_vulnerability",
    "insight": "It sounds like someone's past vulnerability may have been used as a weapon in this conflict.",
    "reflection": "When we open up and share something hard—and later hear it thrown back at us—it teaches our nervous system not to trust again. Weaponized vulnerability is a silent killer of intimacy. Repair starts with accountability and renewed care for emotional safety.",
    "recommendation": "If something was shared in the past and reused during conflict, acknowledge it. A good phrase: 'I was wrong to use that against you. That wasn't fair.' Then ask: 'What would help you feel safer going forward?'"
  }
];

// Combine all reflection packs into a single collection
export const reflectionPacks: ReflectionPackBatch = {
  1: reflectionPackBatch1,
  2: reflectionPackBatch2,
  3: reflectionPackBatch3,
  4: reflectionPackBatch4,
  5: reflectionPackBatch5,
  6: reflectionPackBatch6
};
