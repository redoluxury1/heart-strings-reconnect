
import React from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/use-toast';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

interface HeroQuoteFormProps {
  onSubmitSuccess: () => void;
}

interface FormValues {
  quote: string;
  name: string;
  email: string;
}

const HeroQuoteForm = ({ onSubmitSuccess }: HeroQuoteFormProps) => {
  const form = useForm<FormValues>({
    defaultValues: {
      quote: 'Finally, an app ',
      name: '',
      email: ''
    }
  });

  const onSubmit = (data: FormValues) => {
    // Here you would typically send this data to your backend
    console.log('Submitted quote:', data);
    
    // Show success message
    toast({
      title: "Quote submitted successfully!",
      description: "We'll review your quote and it may be featured on our homepage.",
      variant: "success"
    });
    
    onSubmitSuccess();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="quote"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your Quote</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Finally, an app that..." 
                  className="min-h-[100px]" 
                  {...field} 
                />
              </FormControl>
              <FormDescription>
                Start your quote with "Finally, an app..." and make it relationship themed.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Your Name</FormLabel>
                <FormControl>
                  <Input placeholder="Jane Smith" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="your@email.com" {...field} />
                </FormControl>
                <FormDescription>
                  We'll let you know if your quote is selected.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <div className="flex justify-end">
          <Button type="submit">Submit Quote</Button>
        </div>
      </form>
    </Form>
  );
};

export default HeroQuoteForm;
