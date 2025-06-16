
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SuggestionFormProps {
  onSuccess?: () => void;
}

const SuggestionForm = ({ onSuccess }: SuggestionFormProps) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    memberStatus: '',
    suggestionType: '',
    title: '',
    description: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.memberStatus || !formData.suggestionType || !formData.title || !formData.description) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const subject = `App Suggestion: ${formData.title} - ${formData.suggestionType}`;
      const mobileInfo = formData.mobile ? `%0D%0AMobile: ${formData.mobile}` : '';
      const body = `Application Suggestion Details:%0D%0A%0D%0AName: ${formData.name}%0D%0AEmail: ${formData.email}${mobileInfo}%0D%0AVillage Member Status: ${formData.memberStatus}%0D%0ASuggestion Type: ${formData.suggestionType}%0D%0ATitle: ${formData.title}%0D%0A%0D%0ADescription:%0D%0A${formData.description}%0D%0A%0D%0ASubmitted from: Paluguntipalli Village App`;
      
      const mailtoLink = `mailto:imgtk17@gmail.com?subject=${encodeURIComponent(subject)}&body=${body}`;
      window.location.href = mailtoLink;

      toast({
        title: "Email Client Opened",
        description: "Your suggestion is ready to send via email.",
      });

      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          mobile: '',
          memberStatus: '',
          suggestionType: '',
          title: '',
          description: ''
        });
        if (onSuccess) onSuccess();
      }, 1000);

    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Input
            type="text"
            placeholder="Your Name *"
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            className="border-heritage/30 focus:border-heritage dark:border-white/30 dark:focus:border-white"
            required
          />
        </div>
        
        <div>
          <Input
            type="email"
            placeholder="Your Email *"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            className="border-heritage/30 focus:border-heritage dark:border-white/30 dark:focus:border-white"
            required
          />
        </div>
      </div>

      <div>
        <Input
          type="tel"
          placeholder="Mobile Number (Optional)"
          value={formData.mobile}
          onChange={(e) => handleInputChange('mobile', e.target.value)}
          className="border-heritage/30 focus:border-heritage dark:border-white/30 dark:focus:border-white"
        />
      </div>

      <div>
        <Select onValueChange={(value) => handleInputChange('memberStatus', value)} required>
          <SelectTrigger className="border-heritage/30 focus:border-heritage dark:border-white/30 dark:focus:border-white">
            <SelectValue placeholder="Are you a Village Member? *" />
          </SelectTrigger>
          <SelectContent className="bg-white dark:bg-[#2a2a2a] border border-gray-200 dark:border-gray-700 z-[100] shadow-lg">
            <SelectItem value="village-member">Village Member</SelectItem>
            <SelectItem value="non-village-member">Non-Village Member</SelectItem>
            <SelectItem value="former-resident">Former Resident</SelectItem>
            <SelectItem value="visitor">Visitor</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div>
        <Select onValueChange={(value) => handleInputChange('suggestionType', value)} required>
          <SelectTrigger className="border-heritage/30 focus:border-heritage dark:border-white/30 dark:focus:border-white">
            <SelectValue placeholder="Suggestion Type *" />
          </SelectTrigger>
          <SelectContent className="bg-white dark:bg-[#2a2a2a] border border-gray-200 dark:border-gray-700 z-[100] shadow-lg">
            <SelectItem value="new-feature">New Feature Request</SelectItem>
            <SelectItem value="improvement">Existing Feature Improvement</SelectItem>
            <SelectItem value="ui-ux">User Interface/Experience</SelectItem>
            <SelectItem value="content">Content Addition</SelectItem>
            <SelectItem value="bug-report">Bug Report</SelectItem>
            <SelectItem value="performance">Performance Enhancement</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div>
        <Input
          type="text"
          placeholder="Suggestion Title *"
          value={formData.title}
          onChange={(e) => handleInputChange('title', e.target.value)}
          className="border-heritage/30 focus:border-heritage dark:border-white/30 dark:focus:border-white"
          required
        />
      </div>
      
      <div>
        <Textarea
          placeholder="Describe your suggestion in detail *"
          value={formData.description}
          onChange={(e) => handleInputChange('description', e.target.value)}
          className="border-heritage/30 focus:border-heritage dark:border-white/30 dark:focus:border-white min-h-[120px]"
          required
        />
      </div>
      
      <Button 
        type="submit" 
        disabled={isSubmitting}
        className="w-full bg-heritage hover:bg-heritage/90 text-white transition-all duration-300 transform hover:scale-105"
      >
        {isSubmitting ? (
          <div className="flex items-center">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
            Preparing Email...
          </div>
        ) : (
          <>
            <Send className="mr-2 h-4 w-4" />
            Submit Suggestion
          </>
        )}
      </Button>
    </form>
  );
};

export default SuggestionForm;
