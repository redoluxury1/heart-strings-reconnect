export interface ConflictStyle {
  id: string;
  label: string;
  description: string;
  partnerDescription: string;
  icon: string;
}

export interface StyleComboAdvice {
  userStyle: string;
  partnerStyle: string;
  insight: string;
  tryThis: string;
  examplePhrase: string;
  whyItWorks: string;
}

export interface RecoveryStyle {
  id: string;
  label: string;
  description: string;
  partnerDescription: string;
  icon: string;
}

export interface RecoveryComboAdvice {
  userStyle: string;
  partnerStyle: string;
  insight: string;
  tryThis: string;
  examplePhrase: string;
  whyItWorks: string;
}

export const conflictStyles: ConflictStyle[] = [
  { 
    id: 'escalate', 
    label: 'Escalate', 
    description: 'I get heated quickly and want to hash it out',
    partnerDescription: 'They get heated quickly and want to hash it out',
    icon: 'Flame' 
  },
  { 
    id: 'resolve', 
    label: 'Resolve Immediately', 
    description: 'I try to fix it right away before it gets worse',
    partnerDescription: 'They try to fix it right away before it gets worse',
    icon: 'Wrench' 
  },
  { 
    id: 'retreat', 
    label: 'Retreat', 
    description: 'I shut down or walk away to cool off',
    partnerDescription: 'They shut down or walk away to cool off',
    icon: 'DoorOpen' 
  },
  { 
    id: 'deflect', 
    label: 'Deflect', 
    description: 'I change the subject or use humor to ease tension',
    partnerDescription: 'They change the subject or use humor to ease tension',
    icon: 'Shuffle' 
  },
  { 
    id: 'freeze', 
    label: 'Freeze', 
    description: "I go quiet and don't know what to say",
    partnerDescription: "They go quiet and don't know what to say",
    icon: 'Snowflake' 
  }
];

export const recoveryStyles: RecoveryStyle[] = [
  {
    id: 'apologize-quickly',
    label: 'Apologize Quickly',
    description: 'I want to say sorry right away and move on',
    partnerDescription: 'They want to say sorry right away and move on',
    icon: 'Heart'
  },
  {
    id: 'need-time',
    label: 'Need Time Alone',
    description: 'I need space before I can reconnect',
    partnerDescription: 'They need space before they can reconnect',
    icon: 'Clock'
  },
  {
    id: 'act-normal',
    label: 'Act Like Nothing Happened',
    description: 'I prefer to move on without dwelling on it',
    partnerDescription: 'They prefer to move on without dwelling on it',
    icon: 'SkipForward'
  },
  {
    id: 'need-reassurance',
    label: 'Need Reassurance',
    description: "I need to hear that we're okay before I can relax",
    partnerDescription: "They need to hear that you're okay before they can relax",
    icon: 'HandHeart'
  },
  {
    id: 'process-together',
    label: 'Process Together',
    description: 'I want to talk through what happened before moving on',
    partnerDescription: 'They want to talk through what happened before moving on',
    icon: 'MessagesSquare'
  }
];

export const styleComboAdvice: StyleComboAdvice[] = [
  // Resolve + Retreat (highlighted example)
  {
    userStyle: 'resolve',
    partnerStyle: 'retreat',
    insight: 'You want to talk it out right away, but your partner needs space to process first.',
    tryThis: 'When things get heated, pause and offer a break instead of pushing for a solution. Let your partner know you want to resolve it, but you can wait.',
    examplePhrase: "I want to work this out, but I can tell we're both upset. Can we take a break and come back to this in an hour?",
    whyItWorks: 'People who retreat NEED that space to decompress. Pushing for immediate resolution makes them feel cornered and actually escalates things. Giving space shows respect for their process and builds trust.'
  },
  // Retreat + Resolve
  {
    userStyle: 'retreat',
    partnerStyle: 'resolve',
    insight: 'You need space to process, but your partner wants to fix things immediately.',
    tryThis: 'Ask for the space you need with a clear timeline, so your partner knows you\'re not avoiding the issue.',
    examplePhrase: "I need some time to think. Can we talk about this in an hour? I promise I'm not running away.",
    whyItWorks: 'Resolvers fear abandonment when you walk away. Giving them a specific time to reconnect reassures them that you\'re committed to working through it.'
  },
  // Escalate + Escalate
  {
    userStyle: 'escalate',
    partnerStyle: 'escalate',
    insight: 'When you both escalate, arguments can spiral quickly and become hurtful.',
    tryThis: 'Create a shared "pause word" you both agree to respect. When either person says it, you both take 15 minutes before continuing.',
    examplePhrase: "I think we need to use our pause word. Let's both cool down and try again.",
    whyItWorks: 'Two escalators need a circuit breaker. A pre-agreed pause word feels fair because it\'s mutual, and it stops the cycle before things are said that can\'t be unsaid.'
  },
  // Escalate + Retreat
  {
    userStyle: 'escalate',
    partnerStyle: 'retreat',
    insight: 'Your intensity may be pushing your partner further away. The more you pursue, the more they withdraw.',
    tryThis: 'When you feel yourself heating up, that\'s your cue to pause—not push harder. Tell your partner you need to step back.',
    examplePhrase: "I'm getting heated and I don't want to push you away. Let me cool down first.",
    whyItWorks: 'Retreaters withdraw because they feel overwhelmed. When you recognize your own escalation and voluntarily pause, it creates safety for them to eventually engage.'
  },
  // Retreat + Escalate
  {
    userStyle: 'retreat',
    partnerStyle: 'escalate',
    insight: 'Your partner\'s intensity feels overwhelming, making you want to shut down even more.',
    tryThis: 'Before retreating, briefly name what you\'re feeling so your partner doesn\'t think you\'re dismissing them.',
    examplePhrase: "I'm feeling overwhelmed right now. I'm not ignoring you—I just need a few minutes to think.",
    whyItWorks: 'Escalators interpret silence as rejection or dismissal. A quick explanation before you step away helps them understand it\'s about your process, not about them.'
  },
  // Freeze + Escalate
  {
    userStyle: 'freeze',
    partnerStyle: 'escalate',
    insight: 'Your partner\'s intensity shuts you down completely, and your silence may frustrate them more.',
    tryThis: 'Practice a simple phrase you can use when you freeze, so your partner knows what\'s happening.',
    examplePhrase: "I'm freezing up. I need you to slow down so I can think.",
    whyItWorks: 'Freezing is a stress response, not a choice. Having a pre-planned phrase gives you something to say even when your mind goes blank.'
  },
  // Escalate + Freeze
  {
    userStyle: 'escalate',
    partnerStyle: 'freeze',
    insight: 'Your intensity may be overwhelming your partner, causing them to shut down completely.',
    tryThis: 'Lower your voice and slow down. Ask gentle, open questions instead of making demands.',
    examplePhrase: "I can see you're shutting down. I'll slow down—can you tell me what you're feeling?",
    whyItWorks: 'Freezers need calm to unfreeze. Your gentleness creates safety and helps their nervous system settle so they can actually engage.'
  },
  // Resolve + Resolve
  {
    userStyle: 'resolve',
    partnerStyle: 'resolve',
    insight: 'You both want to fix things fast, which is great—but you might talk in circles without really listening.',
    tryThis: 'Take turns: one person shares while the other only listens. No rebuttals until they\'re fully done.',
    examplePhrase: "Let's try something—you share first and I'll just listen. Then we switch.",
    whyItWorks: 'Two resolvers can get caught in a fixing loop where neither feels heard. Structured turn-taking ensures both perspectives get airtime.'
  },
  // Retreat + Retreat
  {
    userStyle: 'retreat',
    partnerStyle: 'retreat',
    insight: 'You both withdraw, which means issues may never get addressed and resentment can build.',
    tryThis: 'Schedule a specific time to talk when you\'re both calm. Put it on the calendar so it actually happens.',
    examplePhrase: "I know we both need space. Can we set a time tomorrow to talk about this?",
    whyItWorks: 'Two retreaters need structure to reconnect. A scheduled time removes the pressure of "when" and ensures the conversation happens when you\'re both ready.'
  },
  // Deflect + Resolve
  {
    userStyle: 'deflect',
    partnerStyle: 'resolve',
    insight: 'Your humor or topic changes may frustrate your partner who really wants to work through the issue.',
    tryThis: 'Acknowledge their concern first before using humor. Let them know you hear them.',
    examplePhrase: "I hear you—this matters. I sometimes joke when I'm uncomfortable, but I'm taking this seriously.",
    whyItWorks: 'Resolvers need to feel heard. When you acknowledge their concern first, your lightness becomes a tension reliever instead of a dismissal.'
  },
  // Resolve + Deflect
  {
    userStyle: 'resolve',
    partnerStyle: 'deflect',
    insight: 'Your partner uses humor or distraction to cope, which can feel dismissive when you\'re trying to fix things.',
    tryThis: 'Recognize that deflection is their way of managing discomfort. Gently bring focus back to the issue.',
    examplePhrase: "I know this is uncomfortable, but this is important to me. Can we stay with it for a few minutes?",
    whyItWorks: 'Deflectors often don\'t realize they\'re doing it. A gentle redirect without accusation helps them re-engage without feeling attacked.'
  },
  // Freeze + Freeze
  {
    userStyle: 'freeze',
    partnerStyle: 'freeze',
    insight: 'You both go silent, which can leave conflicts unresolved and create distance.',
    tryThis: 'Try writing instead of talking. Text or write notes to each other about what you\'re feeling.',
    examplePhrase: "I don't know what to say out loud. Can I write you a note about how I feel?",
    whyItWorks: 'Writing bypasses the freeze response. It gives you time to form thoughts without the pressure of real-time conversation.'
  },
  // Freeze + Retreat
  {
    userStyle: 'freeze',
    partnerStyle: 'retreat',
    insight: 'You freeze up while your partner walks away, leaving things unaddressed.',
    tryThis: 'After you both have space, initiate reconnection with a low-pressure check-in.',
    examplePhrase: "I know we both needed space. I'm ready to talk when you are—no pressure.",
    whyItWorks: 'Both styles need space, but someone needs to initiate reconnection. A gentle, no-pressure opener makes it easier for both of you.'
  },
  // Retreat + Freeze
  {
    userStyle: 'retreat',
    partnerStyle: 'freeze',
    insight: 'You walk away while your partner shuts down, and neither of you reconnects easily.',
    tryThis: 'When you return from your space, start with connection before addressing the issue.',
    examplePhrase: "Hey, I'm back. Before we talk about what happened, are you okay?",
    whyItWorks: 'Freezers need to feel safe before they can engage. Leading with care rather than the issue helps them thaw.'
  },
  // Deflect + Deflect
  {
    userStyle: 'deflect',
    partnerStyle: 'deflect',
    insight: 'You both avoid the real issue with humor or distraction, so nothing gets resolved.',
    tryThis: 'Set a timer for 5 minutes of "real talk" where you both agree to be direct.',
    examplePhrase: "Okay, real talk for 5 minutes—no jokes. What's actually bothering you?",
    whyItWorks: 'Time-boxing serious conversation makes it feel manageable for deflectors. Knowing there\'s an end point makes vulnerability less scary.'
  },
  // Deflect + Escalate
  {
    userStyle: 'deflect',
    partnerStyle: 'escalate',
    insight: 'Your lightness may infuriate your partner when they\'re heated, making things worse.',
    tryThis: 'Match their seriousness first, then use your natural lightness to de-escalate once they feel heard.',
    examplePhrase: "You're right, this is serious. I hear you. [Then later:] Can we find a way to laugh about this someday?",
    whyItWorks: 'Escalators need validation before they can calm down. Meeting them where they are first, then shifting the energy, works better than leading with humor.'
  },
  // Escalate + Deflect
  {
    userStyle: 'escalate',
    partnerStyle: 'deflect',
    insight: 'Your intensity makes your partner uncomfortable, so they use humor to cope.',
    tryThis: 'Lower your intensity first. Your partner will be more direct when they feel safe.',
    examplePhrase: "I'm sorry I'm coming on strong. I'll dial it back—can we talk about this calmly?",
    whyItWorks: 'Deflectors use humor as a shield against intensity. When you soften, they no longer need the shield and can engage more directly.'
  },
  // Deflect + Retreat
  {
    userStyle: 'deflect',
    partnerStyle: 'retreat',
    insight: 'Your jokes may feel dismissive to your partner, causing them to withdraw more.',
    tryThis: 'Show that you take things seriously before your partner feels the need to retreat.',
    examplePhrase: "I know I joke a lot, but I really want to understand what you're feeling. Don't walk away?",
    whyItWorks: 'Retreaters leave when they feel unheard. Showing sincerity early can prevent the withdrawal before it starts.'
  },
  // Retreat + Deflect
  {
    userStyle: 'retreat',
    partnerStyle: 'deflect',
    insight: 'You withdraw while your partner jokes it off, so nothing gets addressed.',
    tryThis: 'Before retreating, ask your partner to be serious for a moment.',
    examplePhrase: "I need to step away, but can you be real with me for a second first?",
    whyItWorks: 'Calling for a moment of sincerity before you retreat gives your partner a chance to drop the shield and connect with you.'
  },
  // Deflect + Freeze
  {
    userStyle: 'deflect',
    partnerStyle: 'freeze',
    insight: 'Your humor may overwhelm your partner who\'s already struggling to respond.',
    tryThis: 'Give your partner space to think without filling the silence with jokes.',
    examplePhrase: "I'll give you some quiet to think. Take your time—I'm here when you're ready.",
    whyItWorks: 'Freezers need silence to unfreeze. Constant chatter, even friendly humor, keeps them stuck. Quiet patience helps them find their words.'
  },
  // Freeze + Deflect
  {
    userStyle: 'freeze',
    partnerStyle: 'deflect',
    insight: 'You go silent while your partner jokes around, making you feel unheard.',
    tryThis: 'Write down what you want to say so you have it ready when you unfreeze.',
    examplePhrase: "I wrote down what I'm feeling because I freeze up. Can I read it to you?",
    whyItWorks: 'Having words prepared means you don\'t have to think on the spot. It gives you a voice even when your freeze response kicks in.'
  },
  // Resolve + Freeze
  {
    userStyle: 'resolve',
    partnerStyle: 'freeze',
    insight: 'Your drive to fix things may overwhelm your partner who needs time to process.',
    tryThis: 'Ask questions slowly and give lots of space between them. Don\'t fill silences.',
    examplePhrase: "I want to understand. Take your time—there's no rush to answer.",
    whyItWorks: 'Freezers need processing time. Rapid-fire problem-solving overwhelms them. Patience and silence give them room to thaw and respond.'
  },
  // Freeze + Resolve
  {
    userStyle: 'freeze',
    partnerStyle: 'resolve',
    insight: 'Your partner wants to fix things now, but you need time before you can engage.',
    tryThis: 'Let your partner know you need time and that you\'ll come back to the conversation.',
    examplePhrase: "I'm shutting down. Give me 20 minutes and I'll be able to talk. I promise.",
    whyItWorks: 'Resolvers worry that silence means avoidance. A clear timeline and promise to return reassures them while honoring your need for space.'
  },
  // Resolve + Escalate
  {
    userStyle: 'resolve',
    partnerStyle: 'escalate',
    insight: 'You want to problem-solve, but your partner is too heated to think clearly.',
    tryThis: 'Pause the fixing and acknowledge their feelings first. Solutions come after they feel heard.',
    examplePhrase: "I hear how frustrated you are. Let's just sit with that for a second before we solve anything.",
    whyItWorks: 'Escalators are flooded with emotion. Jumping to solutions feels dismissive. Validating their feelings first helps them calm enough to engage.'
  },
  // Escalate + Resolve
  {
    userStyle: 'escalate',
    partnerStyle: 'resolve',
    insight: 'You get heated while your partner tries to fix things, which can feel like they\'re not hearing you.',
    tryThis: 'Pause and let your partner know what you need before solutions.',
    examplePhrase: "I just need you to hear me for a minute before we start problem-solving.",
    whyItWorks: 'Resolvers default to fixing because they care. Telling them what you need first helps them support you the way you actually need.'
  }
];

export const recoveryComboAdvice: RecoveryComboAdvice[] = [
  // Apologize Quickly + Need Time
  {
    userStyle: 'apologize-quickly',
    partnerStyle: 'need-time',
    insight: 'Your quick apology comes from a good place, but your partner needs space to process before they can accept it.',
    tryThis: 'Apologize briefly, then give them space. Let them know you\'ll check in later.',
    examplePhrase: "I'm sorry. I know you need some time. I'll be here when you're ready.",
    whyItWorks: 'People who need time can feel pressured by repeated apologies. A single sincere apology followed by space shows respect for their process.'
  },
  // Need Time + Apologize Quickly
  {
    userStyle: 'need-time',
    partnerStyle: 'apologize-quickly',
    insight: 'Your partner wants to make things right immediately, but you need space first.',
    tryThis: 'Acknowledge their apology, then ask for the time you need with reassurance.',
    examplePhrase: "I hear your apology and I appreciate it. I just need a little time before we're fully okay.",
    whyItWorks: 'Quick apologizers worry their apology wasn\'t accepted. Acknowledging it while asking for space prevents them from over-apologizing.'
  },
  // Act Normal + Process Together
  {
    userStyle: 'act-normal',
    partnerStyle: 'process-together',
    insight: 'You\'re ready to move on, but your partner feels like there\'s unfinished business.',
    tryThis: 'Give them a brief conversation before returning to normal. It doesn\'t have to be long.',
    examplePhrase: "I know you want to talk about it. Can we do a quick 5-minute check-in, then move on?",
    whyItWorks: 'Processors need closure. A short, focused conversation satisfies their need to process without dragging things out.'
  },
  // Process Together + Act Normal
  {
    userStyle: 'process-together',
    partnerStyle: 'act-normal',
    insight: 'You want to talk through what happened, but your partner just wants to move forward.',
    tryThis: 'Ask for a brief conversation and be specific about what you need to say.',
    examplePhrase: "Can we talk for just 5 minutes? I have one thing I need to share, then we can move on.",
    whyItWorks: 'People who act normal may feel drained by long discussions. Being specific about what you need makes it feel manageable.'
  },
  // Need Reassurance + Need Time
  {
    userStyle: 'need-reassurance',
    partnerStyle: 'need-time',
    insight: 'You need to know you\'re okay, but your partner needs space before they can give that.',
    tryThis: 'Ask for a small reassurance before giving them space, then wait patiently.',
    examplePhrase: "Can you just tell me we're okay before you take your time? That's all I need.",
    whyItWorks: 'A quick reassurance costs little but means everything to someone who needs it. It makes giving space much easier.'
  },
  // Need Time + Need Reassurance
  {
    userStyle: 'need-time',
    partnerStyle: 'need-reassurance',
    insight: 'Your partner needs to know you\'re okay before they can relax, but you need space first.',
    tryThis: 'Offer a brief reassurance before taking your space so they don\'t worry.',
    examplePhrase: "We're okay. I just need some time to myself, but we're okay. I promise.",
    whyItWorks: 'People who need reassurance can spiral with uncertainty. A quick confirmation before you step away prevents anxiety.'
  },
  // Apologize Quickly + Apologize Quickly
  {
    userStyle: 'apologize-quickly',
    partnerStyle: 'apologize-quickly',
    insight: 'You both rush to apologize, which is sweet—but make sure you\'re actually addressing the issue.',
    tryThis: 'After the apologies, check in about what actually needs to change.',
    examplePhrase: "I'm glad we both said sorry. But what can we do differently next time?",
    whyItWorks: 'Quick apologies can become a band-aid. Taking a moment to discuss prevents the same issue from recurring.'
  },
  // Need Time + Need Time
  {
    userStyle: 'need-time',
    partnerStyle: 'need-time',
    insight: 'You both need space, which is fine—but make sure you actually come back together.',
    tryThis: 'Set a specific time to reconnect so the issue doesn\'t get buried.',
    examplePhrase: "Let's both take some time. Can we check in at 7pm?",
    whyItWorks: 'Two people who need time can accidentally avoid each other indefinitely. A scheduled reconnection ensures resolution happens.'
  },
  // Act Normal + Act Normal
  {
    userStyle: 'act-normal',
    partnerStyle: 'act-normal',
    insight: 'You both prefer to move on quickly, but unaddressed issues can build up over time.',
    tryThis: 'Occasionally check in about past conflicts to make sure nothing is lingering.',
    examplePhrase: "Hey, that thing from last week—are we really okay about that?",
    whyItWorks: 'Acting normal works short-term, but periodic check-ins prevent resentment from building up silently.'
  },
  // Need Reassurance + Need Reassurance
  {
    userStyle: 'need-reassurance',
    partnerStyle: 'need-reassurance',
    insight: 'You both need to know you\'re okay, which can feel clingy but is actually sweet.',
    tryThis: 'Take turns giving reassurance. Say it first, then ask for it.',
    examplePhrase: "We're okay. I love you. Are we okay?",
    whyItWorks: 'Mutual reassurance-seekers can get stuck waiting for the other to go first. Leading with reassurance invites it in return.'
  },
  // Process Together + Process Together
  {
    userStyle: 'process-together',
    partnerStyle: 'process-together',
    insight: 'You both want to talk it through, which is healthy—but set a limit so you don\'t over-process.',
    tryThis: 'Set a timer for your discussion, then agree to move on after.',
    examplePhrase: "Let's talk this out for 15 minutes, then close the chapter. Deal?",
    whyItWorks: 'Two processors can rehash endlessly. A time limit ensures you get closure without exhausting each other.'
  },
  // Apologize Quickly + Act Normal
  {
    userStyle: 'apologize-quickly',
    partnerStyle: 'act-normal',
    insight: 'You want to say sorry, but your partner has already moved on.',
    tryThis: 'Keep your apology brief and don\'t demand a big response. They may just nod and move on.',
    examplePhrase: "Hey, I'm sorry about earlier. That's all—we're good.",
    whyItWorks: 'People who act normal don\'t need a big apology moment. A quick acknowledgment satisfies your need without dragging them back.'
  },
  // Act Normal + Apologize Quickly
  {
    userStyle: 'act-normal',
    partnerStyle: 'apologize-quickly',
    insight: 'Your partner wants to apologize, but you\'ve already moved on mentally.',
    tryThis: 'Accept their apology graciously even if you\'ve forgotten about it.',
    examplePhrase: "Thanks for saying that. We're good—I already forgot about it.",
    whyItWorks: 'Quick apologizers need their apology received. Accepting it warmly closes the loop for them even if you didn\'t need it.'
  },
  // Need Reassurance + Apologize Quickly
  {
    userStyle: 'need-reassurance',
    partnerStyle: 'apologize-quickly',
    insight: 'Your partner apologizes fast, but you need more than sorry—you need to know you\'re okay.',
    tryThis: 'Accept the apology and ask for the specific reassurance you need.',
    examplePhrase: "I appreciate the apology. Can you also just tell me we're okay?",
    whyItWorks: 'Apologies and reassurance are different things. Asking directly gets you what you actually need.'
  },
  // Apologize Quickly + Need Reassurance
  {
    userStyle: 'apologize-quickly',
    partnerStyle: 'need-reassurance',
    insight: 'Your apology is great, but your partner needs more—they need to know you\'re still okay.',
    tryThis: 'Pair your apology with explicit reassurance about the relationship.',
    examplePhrase: "I'm sorry. And just so you know—we're okay. I still love you.",
    whyItWorks: 'For reassurance-seekers, "sorry" alone can feel incomplete. Adding "we\'re okay" gives them what they really need.'
  },
  // Process Together + Need Reassurance
  {
    userStyle: 'process-together',
    partnerStyle: 'need-reassurance',
    insight: 'You want to discuss what happened, but your partner needs to know you\'re okay first.',
    tryThis: 'Lead with reassurance before diving into the discussion.',
    examplePhrase: "We're okay—I love you. Now, can we talk about what happened?",
    whyItWorks: 'Reassurance-seekers can\'t process until they feel safe. Leading with love opens them up to the conversation.'
  },
  // Need Reassurance + Process Together
  {
    userStyle: 'need-reassurance',
    partnerStyle: 'process-together',
    insight: 'Your partner wants to talk it through, but you need to know you\'re okay first.',
    tryThis: 'Ask for reassurance before engaging in the discussion.',
    examplePhrase: "Before we talk about it—are we okay? I need to know that first.",
    whyItWorks: 'You can\'t engage in productive conversation while anxious. Getting reassurance first clears your mind.'
  },
  // Act Normal + Need Time
  {
    userStyle: 'act-normal',
    partnerStyle: 'need-time',
    insight: 'You\'re ready to move on, but your partner still needs space to process.',
    tryThis: 'Give them the time they need without expecting them to "just be normal" with you.',
    examplePhrase: "Take your time. I\'m here when you\'re ready—no rush.",
    whyItWorks: 'Your readiness to move on can feel dismissive. Honoring their timeline shows you care about their process.'
  },
  // Need Time + Act Normal
  {
    userStyle: 'need-time',
    partnerStyle: 'act-normal',
    insight: 'You need space, but your partner is already acting like nothing happened.',
    tryThis: 'Let them know you need time even if they\'re fine. You don\'t have to match their pace.',
    examplePhrase: "I know you\'re ready to move on, but I still need a bit of time. I\'ll catch up.",
    whyItWorks: 'Different recovery speeds are normal. Communicating your needs prevents feeling rushed or left behind.'
  },
  // Process Together + Act Normal
  {
    userStyle: 'process-together',
    partnerStyle: 'act-normal',
    insight: 'You want to talk it through, but your partner would rather just move on.',
    tryThis: 'Ask for a brief check-in and respect their preference for brevity.',
    examplePhrase: "Can we do a quick 5-minute debrief? Then I promise we can move on.",
    whyItWorks: 'Keeping it short respects their style while honoring your need for closure. Win-win.'
  },
  // Act Normal + Process Together
  {
    userStyle: 'act-normal',
    partnerStyle: 'process-together',
    insight: 'Your partner wants to discuss everything, but you\'d rather move forward.',
    tryThis: 'Participate in a brief conversation to give them closure, then move on together.',
    examplePhrase: "I\'m ready to move on, but I know you need to talk. Let\'s do a quick check-in.",
    whyItWorks: 'Meeting them halfway shows you care. A short conversation is a small investment for their peace of mind.'
  },
  // Process Together + Need Time
  {
    userStyle: 'process-together',
    partnerStyle: 'need-time',
    insight: 'You want to talk, but your partner needs space before they can engage.',
    tryThis: 'Wait until they\'re ready, then have your discussion. Don\'t push.',
    examplePhrase: "When you\'re ready to talk, I\'d like to process this together. No rush.",
    whyItWorks: 'Pushing someone who needs time will backfire. Patience now leads to a better conversation later.'
  },
  // Need Time + Process Together
  {
    userStyle: 'need-time',
    partnerStyle: 'process-together',
    insight: 'Your partner wants to talk immediately, but you need space first.',
    tryThis: 'Ask for time with a promise to discuss it later.',
    examplePhrase: "I need some time first, but I promise we\'ll talk about this tonight.",
    whyItWorks: 'Processors feel abandoned when you withdraw. A promise to return gives them something to hold onto.'
  },
  // Apologize Quickly + Process Together
  {
    userStyle: 'apologize-quickly',
    partnerStyle: 'process-together',
    insight: 'You want to apologize and move on, but your partner needs to talk it through.',
    tryThis: 'Apologize, then stay present for the conversation they need.',
    examplePhrase: "I\'m sorry. And I\'m here to talk about it if you need to.",
    whyItWorks: 'Your apology opens the door; staying for the conversation shows you mean it.'
  },
  // Process Together + Apologize Quickly
  {
    userStyle: 'process-together',
    partnerStyle: 'apologize-quickly',
    insight: 'Your partner apologizes fast, but you still need to discuss what happened.',
    tryThis: 'Accept the apology, then ask if you can still talk about it briefly.',
    examplePhrase: "Thank you for apologizing. Can we still talk about what happened? It would help me.",
    whyItWorks: 'Quick apologizers think sorry closes the book. Gently reopening it gets you the closure you need.'
  }
];

export const getAdviceForStyles = (userStyle: string, partnerStyle: string): StyleComboAdvice | undefined => {
  return styleComboAdvice.find(
    advice => advice.userStyle === userStyle && advice.partnerStyle === partnerStyle
  );
};

export const getStyleById = (id: string): ConflictStyle | undefined => {
  return conflictStyles.find(style => style.id === id);
};

export const getRecoveryAdvice = (userStyle: string, partnerStyle: string): RecoveryComboAdvice | undefined => {
  return recoveryComboAdvice.find(
    advice => advice.userStyle === userStyle && advice.partnerStyle === partnerStyle
  );
};

export const getRecoveryStyleById = (id: string): RecoveryStyle | undefined => {
  return recoveryStyles.find(style => style.id === id);
};
