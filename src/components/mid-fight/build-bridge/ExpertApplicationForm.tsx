
import React, { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phone: z.string().min(10, {
    message: "Please enter a valid phone number.",
  }),
  profession: z.string({
    required_error: "Please select your profession.",
  }),
  credentials: z.string().min(5, {
    message: "Please describe your credentials.",
  }),
  experience: z.string().min(10, {
    message: "Please describe your experience.",
  }),
  availability: z.string({
    required_error: "Please select your availability.",
  }),
});

type FormValues = z.infer<typeof formSchema>;

interface ExpertApplicationFormProps {
  onClose: () => void;
}

const ExpertApplicationForm: React.FC<ExpertApplicationFormProps> = ({ onClose }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      profession: "",
      credentials: "",
      experience: "",
      availability: "",
    },
  });

  const onSubmit = (data: FormValues) => {
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success("Application submitted successfully! We'll be in touch soon.");
      console.log("Form data:", data);
      onClose();
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-cormorant font-semibold text-midnight-indigo">
          Apply to Become a Founding Expert
        </h2>
        <p className="text-midnight-indigo/70 mt-2">
          Join our network of experts helping couples build bridges through difficult conversations.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="Your name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input placeholder="your.email@example.com" type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input placeholder="(123) 456-7890" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="profession"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Professional Background</FormLabel>
                <Select 
                  onValueChange={field.onChange} 
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your profession" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="marriage_counselor">Marriage Counselor</SelectItem>
                    <SelectItem value="therapist">Therapist/Mental Health Professional</SelectItem>
                    <SelectItem value="pastor">Pastor/Religious Leader</SelectItem>
                    <SelectItem value="social_worker">Social Worker</SelectItem>
                    <SelectItem value="mediator">Professional Mediator</SelectItem>
                    <SelectItem value="other">Other (specify in credentials)</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="credentials"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Credentials & Certifications</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="List your relevant degrees, licenses, certifications, etc."
                    className="resize-none" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="experience"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Relevant Experience</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Describe your experience working with couples and conflict resolution."
                    className="resize-none" 
                    rows={3}
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="availability"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Availability</FormLabel>
                <Select 
                  onValueChange={field.onChange} 
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your availability" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="full_time">Full-time (40+ hours weekly)</SelectItem>
                    <SelectItem value="part_time">Part-time (10-20 hours weekly)</SelectItem>
                    <SelectItem value="evenings">Evenings & Weekends</SelectItem>
                    <SelectItem value="limited">Limited Availability (5-10 hours weekly)</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>
                  Approximate hours you can dedicate to helping couples each week
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end space-x-2 pt-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={onClose}
              className="border-midnight-indigo/30 text-midnight-indigo"
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="bg-[#C75F65] hover:bg-[#B54E54] text-white"
            >
              {isSubmitting ? "Submitting..." : "Submit Application"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ExpertApplicationForm;
