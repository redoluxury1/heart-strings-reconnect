
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface JournalEntryDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  setTitle: (title: string) => void;
  content: string;
  setContent: (content: string) => void;
  tags: string[];
  setTags: React.Dispatch<React.SetStateAction<string[]>>;
  onSave: () => void;
  dialogTitle: string;
  submitLabel: string;
  allTags: string[];
  toggleTag: (tag: string, currentTags: string[], setTagsFn: React.Dispatch<React.SetStateAction<string[]>>) => void;
}

const JournalEntryDialog = ({
  isOpen,
  onOpenChange,
  title,
  setTitle,
  content,
  setContent,
  tags,
  setTags,
  onSave,
  dialogTitle,
  submitLabel,
  allTags,
  toggleTag
}: JournalEntryDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{dialogTitle}</DialogTitle>
          {dialogTitle === "Create New Journal Entry" && (
            <DialogDescription>
              Write freely. This space is only for you.
            </DialogDescription>
          )}
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div>
            <Input
              placeholder="Entry Title (optional)"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <Textarea
              placeholder="What's on your mind today?"
              className="min-h-[200px]"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
          <div>
            <p className="text-sm mb-2">Tags (optional)</p>
            <div className="flex flex-wrap gap-2">
              {allTags.map(tag => (
                <Badge 
                  key={tag}
                  variant={tags.includes(tag) ? "default" : "outline"} 
                  className={`cursor-pointer ${
                    tags.includes(tag) 
                      ? "bg-lavender-blue hover:bg-lavender-blue/80" 
                      : "hover:bg-lavender-blue/10"
                  }`}
                  onClick={() => toggleTag(tag, tags, setTags)}
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="ghost" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button 
            onClick={onSave}
            disabled={!content.trim()}
            className="bg-lavender-blue hover:bg-lavender-blue/90 text-white"
          >
            {submitLabel}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default JournalEntryDialog;
