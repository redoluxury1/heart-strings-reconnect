
import React, { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, Clock, User } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

interface ActivityProgress {
  activityId: string;
  activityName: string;
  userProgress: number;
  partnerProgress: number;
  isCompleted: boolean;
  lastActivity: string;
}

const SharedActivityProgress: React.FC = () => {
  const [activities, setActivities] = useState<ActivityProgress[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user, relationship } = useAuth();
  
  useEffect(() => {
    if (!relationship?.id || relationship.status !== 'connected') {
      setIsLoading(false);
      return;
    }
    
    // Mock data for now - in a real implementation, this would fetch from the database
    const mockActivities: ActivityProgress[] = [
      {
        activityId: 'personality-quiz',
        activityName: 'Personality Quiz',
        userProgress: 100,
        partnerProgress: 75,
        isCompleted: false,
        lastActivity: '2 hours ago'
      },
      {
        activityId: 'lets-talk-about-us',
        activityName: "Let's Talk About Us",
        userProgress: 60,
        partnerProgress: 60,
        isCompleted: false,
        lastActivity: '1 day ago'
      },
      {
        activityId: 'would-you-rather',
        activityName: 'Would You Rather',
        userProgress: 100,
        partnerProgress: 100,
        isCompleted: true,
        lastActivity: '3 days ago'
      }
    ];
    
    setActivities(mockActivities);
    setIsLoading(false);
  }, [relationship]);
  
  if (isLoading) {
    return (
      <Card className="p-6">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded mb-4"></div>
          <div className="space-y-3">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-12 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </Card>
    );
  }
  
  if (relationship?.status !== 'connected') {
    return (
      <Card className="p-6 text-center">
        <div className="text-gray-500">
          <User className="h-8 w-8 mx-auto mb-2" />
          <p>Connect with your partner to see shared progress</p>
        </div>
      </Card>
    );
  }
  
  return (
    <Card className="p-6">
      <div className="space-y-4">
        <h3 className="font-medium text-midnight-indigo">Shared Activity Progress</h3>
        
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.activityId} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {activity.isCompleted ? (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  ) : (
                    <Clock className="h-4 w-4 text-gray-400" />
                  )}
                  <span className="font-medium text-sm">{activity.activityName}</span>
                </div>
                <span className="text-xs text-gray-500">{activity.lastActivity}</span>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span>You</span>
                    <span>{activity.userProgress}%</span>
                  </div>
                  <Progress value={activity.userProgress} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span>Partner</span>
                    <span>{activity.partnerProgress}%</span>
                  </div>
                  <Progress value={activity.partnerProgress} className="h-2" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default SharedActivityProgress;
