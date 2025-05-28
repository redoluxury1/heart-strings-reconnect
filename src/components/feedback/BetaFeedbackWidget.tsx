
import React, { useState } from 'react';
import { MessageSquare, Star, X, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { submitBetaFeedback } from '@/services/analytics';

const BetaFeedbackWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [feedbackType, setFeedbackType] = useState<string>('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [rating, setRating] = useState<number>(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Please sign in",
        description: "You need to be signed in to submit feedback.",
        variant: "destructive"
      });
      return;
    }

    if (!feedbackType || !content.trim()) {
      toast({
        title: "Missing information",
        description: "Please select a feedback type and provide details.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    const success = await submitBetaFeedback(user.id, {
      feedbackType: feedbackType as any,
      title: title.trim() || undefined,
      content: content.trim(),
      rating: feedbackType === 'rating' ? rating : undefined
    });

    if (success) {
      toast({
        title: "Thank you!",
        description: "Your feedback has been submitted successfully."
      });
      
      // Reset form
      setFeedbackType('');
      setTitle('');
      setContent('');
      setRating(0);
      setIsOpen(false);
    } else {
      toast({
        title: "Error",
        description: "Failed to submit feedback. Please try again.",
        variant: "destructive"
      });
    }
    
    setIsSubmitting(false);
  };

  const renderRatingStars = () => {
    return (
      <div className="flex gap-1 mb-4">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => setRating(star)}
            className={`p-1 rounded ${rating >= star ? 'text-yellow-400' : 'text-gray-300'}`}
          >
            <Star className="h-6 w-6 fill-current" />
          </button>
        ))}
      </div>
    );
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-[#D3876A] hover:bg-[#D3876A]/90 text-white p-3 rounded-full shadow-lg transition-all duration-200 z-50"
        aria-label="Open feedback widget"
      >
        <MessageSquare className="h-6 w-6" />
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 bg-white rounded-lg shadow-xl border border-gray-200 w-80 z-50">
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-900">Beta Feedback</h3>
          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Select value={feedbackType} onValueChange={setFeedbackType}>
            <SelectTrigger>
              <SelectValue placeholder="Select feedback type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="bug">🐛 Bug Report</SelectItem>
              <SelectItem value="feature_request">💡 Feature Request</SelectItem>
              <SelectItem value="general">💭 General Feedback</SelectItem>
              <SelectItem value="rating">⭐ Rate the App</SelectItem>
            </SelectContent>
          </Select>

          {feedbackType !== 'rating' && (
            <Input
              placeholder="Title (optional)"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          )}

          {feedbackType === 'rating' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                How would you rate your experience?
              </label>
              {renderRatingStars()}
            </div>
          )}

          <Textarea
            placeholder={
              feedbackType === 'bug' 
                ? "Describe the bug you encountered..."
                : feedbackType === 'feature_request'
                ? "What feature would you like to see?"
                : feedbackType === 'rating'
                ? "Tell us more about your experience..."
                : "Share your thoughts..."
            }
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="min-h-[100px]"
            required
          />

          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting || !feedbackType || !content.trim()}
              className="flex-1 bg-[#D3876A] hover:bg-[#D3876A]/90"
            >
              {isSubmitting ? (
                "Sending..."
              ) : (
                <>
                  <Send className="h-4 w-4 mr-2" />
                  Send
                </>
              )}
            </Button>
          </div>
        </form>

        <p className="text-xs text-gray-500 mt-3">
          Help us improve Bridge for Couples by sharing your feedback!
        </p>
      </div>
    </div>
  );
};

export default BetaFeedbackWidget;
