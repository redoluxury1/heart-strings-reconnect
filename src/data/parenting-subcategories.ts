
import { ReactNode } from 'react';
import { 
  Gavel, Moon, UserRound, Scale, AlertCircle, Users 
} from 'lucide-react';

export interface Prompt {
  text: string;
  type: 'open-ended' | 'yes-no';
}

export interface SubcategoryData {
  id: string;
  name: string;
  prompts: Prompt[];
  icon?: ReactNode;
  color?: string;
  bgColor?: string;
}

export const SUBCATEGORY_DATA: SubcategoryData[] = [
  {
    id: 'discipline-styles',
    name: 'Discipline Styles',
    prompts: [
      { text: 'How were you each raised when it came to discipline?', type: 'open-ended' },
      { text: "What's one parenting moment where you felt out of sync with me?", type: 'open-ended' },
      { text: 'What kind of tone do we want to set when correcting our kids?', type: 'open-ended' },
      { text: 'Do you feel like we agree on what discipline should look like?', type: 'yes-no' },
      { text: 'Do you trust me to handle tough moments calmly?', type: 'yes-no' },
    ],
    icon: <Gavel className="h-12 w-12" />,
    color: 'text-peachy-terracotta',
    bgColor: 'bg-peachy-terracotta/10'
  },
  {
    id: 'nighttime-duties',
    name: 'Nighttime Duties',
    prompts: [
      { text: 'How do you feel when one of us is up more often at night?', type: 'open-ended' },
      { text: "What's one way we could make nights feel more like teamwork?", type: 'open-ended' },
      { text: 'How does lack of sleep affect how we treat each other?', type: 'open-ended' },
      { text: 'Do you feel like nighttime duties are evenly shared?', type: 'yes-no' },
      { text: 'Do you think we give each other enough recovery time?', type: 'yes-no' },
    ],
    icon: <Moon className="h-12 w-12" />,
    color: 'text-lavender-blue',
    bgColor: 'bg-lavender-blue/10'
  },
  {
    id: 'feeling-unsupported',
    name: 'Feeling Unsupported',
    prompts: [
      { text: "What's one recent moment when you felt alone in parenting?", type: 'open-ended' },
      { text: "How do you usually want me to show up when you're struggling?", type: 'open-ended' },
      { text: "How do we repair when one of us feels unseen or overloaded?", type: 'open-ended' },
      { text: "Do you feel like I notice when you're overwhelmed?", type: 'yes-no' },
      { text: "Do you feel appreciated for what you do as a parent?", type: 'yes-no' },
    ],
    icon: <UserRound className="h-12 w-12" />,
    color: 'text-mauve-rose',
    bgColor: 'bg-mauve-rose/10'
  },
  {
    id: 'division-of-labor',
    name: 'Division of Labor',
    prompts: [
      { text: "What tasks feel the heaviest to you right now?", type: 'open-ended' },
      { text: "Are there responsibilities that feel unfair or uneven?", type: 'open-ended' },
      { text: "How can we make parenting feel more like a partnership?", type: 'open-ended' },
      { text: "Do you feel like we both understand what the other is carrying?", type: 'yes-no' },
      { text: "Do we regularly talk about what's working and what's not?", type: 'yes-no' },
    ],
    icon: <Scale className="h-12 w-12" />,
    color: 'text-sage',
    bgColor: 'bg-sage/10'
  },
  {
    id: 'overwhelm',
    name: 'Overwhelm',
    prompts: [
      { text: "What does parenting overload feel like in your body?", type: 'open-ended' },
      { text: "How do we tend to respond to each other when stress is high?", type: 'open-ended' },
      { text: "How can we tell when it's time to ask for help?", type: 'open-ended' },
      { text: "Do you feel like I notice when you're at your limit?", type: 'yes-no' },
      { text: "Do you think we give ourselves enough grace?", type: 'yes-no' },
    ],
    icon: <AlertCircle className="h-12 w-12" />,
    color: 'text-golden-mustard',
    bgColor: 'bg-golden-mustard/10'
  },
  {
    id: 'different-parenting-approaches',
    name: 'Different Parenting Approaches',
    prompts: [
      { text: "What do we want our kids to say about how we raised them?", type: 'open-ended' },
      { text: "Where do we most often clash in our parenting styles?", type: 'open-ended' },
      { text: "What are our biggest shared values as parents?", type: 'open-ended' },
      { text: "Do you feel like we respect each other's parenting instincts?", type: 'yes-no' },
      { text: "Do we check in often about how things are going?", type: 'yes-no' },
    ],
    icon: <Users className="h-12 w-12" />,
    color: 'text-midnight-indigo',
    bgColor: 'bg-midnight-indigo/10'
  }
];
