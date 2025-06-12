
import React from 'react';
import ContentContainer from '../common/ContentContainer';
import Card from '../common/Card';
import { MessageCircle, BookOpen, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const ConflictStages = () => {
  const stages = [
    {
      title: "During Conflict",
      description: "Tools to help deescalate tension, communicate effectively, and even connect with an expert when needed.",
      icon: <MessageCircle className="h-6 w-6" />,
      link: "/during-conflict",
      color: "from-rose-100 to-rose-50"
    },
    {
      title: "Post Conflict",
      description: "Guided reflection to process what happened and understand underlying needs and emotions.",
      icon: <BookOpen className="h-6 w-6" />,
      link: "/post-conflict",
      color: "from-blue-100 to-blue-50"
    },
    {
      title: "Reconnect",
      description: "Exercises to rebuild emotional intimacy and strengthen your connection after conflict.",
      icon: <Heart className="h-6 w-6" />,
      link: "/reconnect",
      color: "from-green-100 to-green-50"
    }
  ];

  return (
    <section className="py-16">
      <ContentContainer>
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <img 
              src="/lovable-uploads/4c43c832-fd35-4f81-8d27-f1fbfa7d6250.png" 
              alt="Bridge For Couples Icon" 
              className="h-16 w-auto" 
            />
          </div>
          <h2 className="text-3xl font-bold text-slate-800 mb-4">
            Support at Every Stage
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Bridge For Couples provides tailored guidance for wherever you are in the conflict resolution process.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-1 gap-8 max-w-lg mx-auto">
          {stages.map((stage, index) => (
            <div key={index} className="flex flex-col h-full">
              <Card className={`flex-1 flex flex-col bg-gradient-to-br ${stage.color}`}>
                <div className="mb-4">
                  <div className="inline-flex items-center justify-center p-3 bg-white rounded-full shadow-sm">
                    {stage.icon}
                  </div>
                </div>
                
                <h3 className="text-2xl md:text-3xl font-semibold mb-3 text-[#221F26]">{stage.title}</h3>
                <p className="text-[#403E43] mb-6 flex-1">{stage.description}</p>
                
                <Link to={stage.link}>
                  <Button variant="outline" className="w-full border-slate-200 hover:border-slate-300">
                    Explore Tools
                  </Button>
                </Link>
              </Card>
            </div>
          ))}
        </div>
      </ContentContainer>
    </section>
  );
};

export default ConflictStages;
