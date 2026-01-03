import React from 'react';
import { Lightbulb, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';
import ToolCard from './ToolCard';

export type ToolType = 'try-next-time' | 'flip-the-script';

interface PostConflictToolHubProps {
  onSelectTool: (tool: ToolType) => void;
}

const PostConflictToolHub: React.FC<PostConflictToolHubProps> = ({ onSelectTool }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-8"
    >
      <div className="text-center">
        <h2 className="font-cormorant text-3xl font-semibold text-foreground mb-3">
          How would you like to grow from this?
        </h2>
        <p className="text-muted-foreground max-w-md mx-auto">
          Choose a path that feels right for you today. Both will help you move forward.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <ToolCard
          title="What I Could Try Next Time"
          description="Get personalized tips for handling similar situations better in the future. Based on what triggered you and how you reacted."
          icon={Lightbulb}
          onClick={() => onSelectTool('try-next-time')}
          accentColor="hsl(var(--primary))"
        />
        <ToolCard
          title="Flip the Script"
          description="See the conflict through your partner's eyes. Build empathy by exploring their perspective, then get conversation starters to reconnect."
          icon={RefreshCw}
          onClick={() => onSelectTool('flip-the-script')}
          accentColor="hsl(var(--accent))"
        />
      </div>
    </motion.div>
  );
};

export default PostConflictToolHub;
