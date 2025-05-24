
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useInterface } from '@/hooks/useInterfaceContext';
import { useToast } from '@/hooks/use-toast';

const DeveloperTestingPanel = () => {
  const { partnerStatus, setPartnerStatus, isEmotional, setInterfaceStyle } = useInterface();
  const { toast } = useToast();
  const [simulatedPartnerData, setSimulatedPartnerData] = useState({
    name: 'Test Partner',
    isOnline: false,
    hasUnreadNotes: false,
    codeWord: 'butterfly'
  });

  const simulatePartnerInvite = () => {
    localStorage.setItem('bridge-partner-invited', 'true');
    localStorage.setItem('bridge-test-partner-data', JSON.stringify({
      ...simulatedPartnerData,
      status: 'invited'
    }));
    
    toast({
      title: "Partner invite simulated",
      description: "Partner status updated to show pending invitation"
    });
  };

  const simulatePartnerConnection = () => {
    setPartnerStatus('couple');
    localStorage.setItem('bridge-partner-status', 'couple');
    localStorage.setItem('bridge-test-partner-data', JSON.stringify({
      ...simulatedPartnerData,
      status: 'connected',
      isOnline: true
    }));
    
    toast({
      title: "Partner connected!",
      description: "You can now test couple features"
    });
  };

  const simulatePartnerDisconnection = () => {
    setPartnerStatus('solo');
    localStorage.setItem('bridge-partner-status', 'solo');
    localStorage.removeItem('bridge-test-partner-data');
    localStorage.removeItem('bridge-partner-invited');
    
    toast({
      title: "Partner disconnected",
      description: "Switched back to solo mode"
    });
  };

  const simulateLoveNote = () => {
    const newNote = {
      id: Date.now().toString(),
      message: "Just wanted to say I love you! This is a test note.",
      sender: simulatedPartnerData.name,
      timestamp: new Date().toISOString(),
      read: false
    };
    
    const existingNotes = JSON.parse(localStorage.getItem('bridge-test-love-notes') || '[]');
    localStorage.setItem('bridge-test-love-notes', JSON.stringify([newNote, ...existingNotes]));
    
    setSimulatedPartnerData(prev => ({ ...prev, hasUnreadNotes: true }));
    
    toast({
      title: "New love note!",
      description: `${simulatedPartnerData.name} sent you a message`
    });
  };

  const simulateCodeWordTrigger = () => {
    toast({
      title: `Code word "${simulatedPartnerData.codeWord}" activated`,
      description: "Your partner is requesting a pause in the conversation",
      variant: "default"
    });
  };

  const toggleInterfaceStyle = () => {
    const newStyle = isEmotional ? 'solution-focused' : 'emotionally-reflective';
    setInterfaceStyle(newStyle);
    
    toast({
      title: "Interface style changed",
      description: `Switched to ${newStyle.replace('-', ' ')} mode`
    });
  };

  const resetAllTestData = () => {
    localStorage.removeItem('bridge-partner-status');
    localStorage.removeItem('bridge-partner-invited');
    localStorage.removeItem('bridge-test-partner-data');
    localStorage.removeItem('bridge-test-love-notes');
    localStorage.removeItem('bridge-interface-style');
    
    setPartnerStatus('solo');
    setSimulatedPartnerData({
      name: 'Test Partner',
      isOnline: false,
      hasUnreadNotes: false,
      codeWord: 'butterfly'
    });
    
    toast({
      title: "Test data reset",
      description: "All testing data has been cleared"
    });
  };

  return (
    <Card className="w-full max-w-2xl mx-auto mt-8 border-2 border-orange-200 bg-orange-50">
      <CardHeader>
        <CardTitle className="text-orange-800">🔧 Developer Testing Panel</CardTitle>
        <p className="text-sm text-orange-600">
          This panel helps you test partner functionality and interface syncing
        </p>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Current Status */}
        <div className="space-y-2">
          <h3 className="font-semibold text-orange-800">Current Status:</h3>
          <div className="flex gap-2 flex-wrap">
            <Badge variant={partnerStatus === 'couple' ? 'default' : 'secondary'}>
              {partnerStatus === 'couple' ? 'Couple Mode' : 'Solo Mode'}
            </Badge>
            <Badge variant={isEmotional ? 'default' : 'secondary'}>
              {isEmotional ? 'Emotional Style' : 'Solution-Focused Style'}
            </Badge>
            {simulatedPartnerData.isOnline && (
              <Badge variant="outline" className="text-green-600 border-green-600">
                Partner Online
              </Badge>
            )}
            {simulatedPartnerData.hasUnreadNotes && (
              <Badge variant="destructive">
                Unread Notes
              </Badge>
            )}
          </div>
        </div>

        {/* Partner Simulation */}
        <div className="space-y-3">
          <h3 className="font-semibold text-orange-800">Partner Simulation:</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <Button 
              onClick={simulatePartnerInvite}
              variant="outline"
              className="border-blue-300 text-blue-700"
            >
              Simulate Partner Invite
            </Button>
            <Button 
              onClick={simulatePartnerConnection}
              variant="outline"
              className="border-green-300 text-green-700"
            >
              Connect Test Partner
            </Button>
            <Button 
              onClick={simulateLoveNote}
              variant="outline"
              className="border-pink-300 text-pink-700"
              disabled={partnerStatus !== 'couple'}
            >
              Send Test Love Note
            </Button>
            <Button 
              onClick={simulateCodeWordTrigger}
              variant="outline"
              className="border-purple-300 text-purple-700"
              disabled={partnerStatus !== 'couple'}
            >
              Trigger Code Word
            </Button>
          </div>
        </div>

        {/* Interface Testing */}
        <div className="space-y-3">
          <h3 className="font-semibold text-orange-800">Interface Testing:</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <Button 
              onClick={toggleInterfaceStyle}
              variant="outline"
              className="border-indigo-300 text-indigo-700"
            >
              Toggle Interface Style
            </Button>
            <Button 
              onClick={simulatePartnerDisconnection}
              variant="outline"
              className="border-red-300 text-red-700"
            >
              Disconnect Partner
            </Button>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-3">
          <h3 className="font-semibold text-orange-800">Quick Actions:</h3>
          <div className="flex gap-2">
            <Button 
              onClick={resetAllTestData}
              variant="destructive"
              size="sm"
            >
              Reset All Test Data
            </Button>
          </div>
        </div>

        {/* Test Instructions */}
        <div className="bg-orange-100 p-4 rounded-lg">
          <h4 className="font-semibold text-orange-800 mb-2">Testing Instructions:</h4>
          <ul className="text-sm text-orange-700 space-y-1">
            <li>1. Use "Connect Test Partner" to enable couple features</li>
            <li>2. Test love note notifications and navigation</li>
            <li>3. Try the code word system in couple mode</li>
            <li>4. Switch interface styles to see visual changes</li>
            <li>5. Test onboarding flow with different partner statuses</li>
            <li>6. Check that localStorage persistence works across page refreshes</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default DeveloperTestingPanel;
