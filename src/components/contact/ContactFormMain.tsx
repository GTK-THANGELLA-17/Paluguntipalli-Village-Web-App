
import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import ContactInfo from "./ContactInfo";

const ContactFormMain = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    category: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message || !formData.category) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const subject = `${formData.category} - Contact from ${formData.name}`;
      const body = `Name: ${formData.name}%0D%0AEmail: ${formData.email}%0D%0APhone: ${formData.phone || 'Not provided'}%0D%0ACategory: ${formData.category}%0D%0A%0D%0AMessage:%0D%0A${formData.message}`;
      
      const mailtoLink = `mailto:imgtk17@gmail.com?subject=${encodeURIComponent(subject)}&body=${body}`;
      window.location.href = mailtoLink;

      toast({
        title: "Email Client Opened",
        description: "Your default email client should open with the message ready to send.",
      });

      // Reset form after a delay
      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          phone: '',
          category: '',
          message: ''
        });
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
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
      <motion.div 
        className="bg-white dark:bg-[#2a2a2a] rounded-2xl shadow-xl p-6 sm:p-8 border border-heritage/20"
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h3 className="text-2xl font-bold mb-6 text-[#000000] dark:text-white">Send us a Message</h3>
        
        <form onSubmit={handleSubmit} className="space-y-6">
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
          
          <div>
            <Input
              type="tel"
              placeholder="Your Phone Number"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              className="border-heritage/30 focus:border-heritage dark:border-white/30 dark:focus:border-white"
            />
          </div>
          
          <div>
            <Select onValueChange={(value) => handleInputChange('category', value)} required>
  <SelectTrigger className="border-heritage/30 focus:border-heritage dark:border-white/30 dark:focus:border-white">
    <SelectValue placeholder="Select Category *" />
  </SelectTrigger>
  <SelectContent className="bg-white dark:bg-[#2a2a2a] border border-heritage/30 dark:border-white/30 shadow-lg rounded-md">
    <SelectItem value="general">General Inquiry</SelectItem>
    <SelectItem value="event">Event Information</SelectItem>
    <SelectItem value="feedback">Feedback</SelectItem>
    <SelectItem value="support">Technical Support</SelectItem>
    <SelectItem value="business">Business Partnership</SelectItem>
    <SelectItem value="media">Media & Press</SelectItem>
  </SelectContent>
</Select>

          </div>
          
          <div>
            <Textarea
              placeholder="Your Message *"
              value={formData.message}
              onChange={(e) => handleInputChange('message', e.target.value)}
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
                Send Message
              </>
            )}
          </Button>
        </form>
      </motion.div>

      <ContactInfo />
    </div>
  );
};

export default ContactFormMain;
