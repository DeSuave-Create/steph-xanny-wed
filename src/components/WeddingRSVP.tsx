import { useState } from "react";
import { useNavigate } from "react-router-dom";
import emailjs from '@emailjs/browser';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import botanicalDecoration from "@/assets/botanical-decoration.png";

// EmailJS Configuration - Replace with your actual values from EmailJS dashboard
const EMAILJS_SERVICE_ID = "service_95z83bv";
const EMAILJS_TEMPLATE_ID = "template_3kpupln";  
const EMAILJS_PUBLIC_KEY = "qToLCzLcwNa16dxgj";

const WeddingRSVP = () => {
  const [formData, setFormData] = useState({
    guestName: "",
    email: "",
    attendance: "",
    guestCount: "",
    foodChoices: [] as string[]
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Prepare email template parameters
      const foodChoicesText = formData.attendance === "yes" && formData.foodChoices.length > 0 
        ? formData.foodChoices.map((choice, index) => `Guest ${index + 1}: ${choice}`).join('\n')
        : "N/A";
      
      const templateParams = {
        guest_name: formData.guestName,
        guest_email: formData.email,
        attendance: formData.attendance,
        guest_count: formData.attendance === "yes" ? formData.guestCount : "N/A",
        food_choices: foodChoicesText,
        submission_date: new Date().toLocaleDateString(),
        submission_time: new Date().toLocaleTimeString()
      };

      // Send email using EmailJS
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY
      );

      toast({
        title: "RSVP Submitted Successfully! 🎉",
        description: "Thank you for responding to Stephanie & Xandrix's wedding invitation. We've received your RSVP!",
      });

      // Navigate to confirmation page with form data
      navigate('/confirmation', {
        state: {
          guestName: formData.guestName,
          guestCount: formData.guestCount,
          foodChoices: formData.foodChoices
        }
      });

      // Reset form
      setFormData({
        guestName: "",
        email: "",
        attendance: "",
        guestCount: "",
        foodChoices: []
      });

    } catch (error) {
      console.error("Error sending RSVP:", error);
      toast({
        title: "Oops! Something went wrong",
        description: "Please try again or contact us directly. We'd love to hear from you!",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateField = (field: string, value: string) => {
    setFormData(prev => {
      const newData = { ...prev, [field]: value };
      
      // If guest count changes, adjust food choices array
      if (field === "guestCount") {
        const newGuestCount = parseInt(value) || 0;
        const currentChoices = [...prev.foodChoices];
        
        // Trim array if guest count decreased
        if (newGuestCount < currentChoices.length) {
          newData.foodChoices = currentChoices.slice(0, newGuestCount);
        } else {
          newData.foodChoices = currentChoices;
        }
      }
      
      return newData;
    });
  };

  const updateFoodChoice = (guestIndex: number, choice: string) => {
    setFormData(prev => {
      const newChoices = [...prev.foodChoices];
      newChoices[guestIndex] = choice;
      return { ...prev, foodChoices: newChoices };
    });
  };

  const guestCount = parseInt(formData.guestCount) || 0;

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Botanical Background Decorations */}
      <div className="absolute top-0 left-0 w-64 h-64 opacity-30">
        <img src={botanicalDecoration} alt="" className="w-full h-full object-contain" />
      </div>
      <div className="absolute bottom-0 right-0 w-64 h-64 opacity-30 rotate-180">
        <img src={botanicalDecoration} alt="" className="w-full h-full object-contain" />
      </div>
      

      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="font-script text-6xl md:text-7xl text-wedding-brown mb-2">
              Stephanie
            </h1>
            <div className="font-serif text-lg text-wedding-brown uppercase tracking-[0.3em] mb-2">
              AND
            </div>
            <h1 className="font-script text-6xl md:text-7xl text-wedding-brown mb-6">
              Xandrix
            </h1>
            
            <div className="font-serif italic text-wedding-brown mb-4">
              with full hearts,
            </div>
            <div className="font-serif text-wedding-brown mb-8">
              joyfully invite you to RSVP to celebrate our wedding
            </div>
            
            {/* Wedding Details */}
            <div className="space-y-2 mb-8">
              <div className="border-t border-b border-wedding-coral py-4 flex items-center justify-center gap-8">
                <div className="text-wedding-coral font-sans uppercase tracking-wide text-sm">
                  OCTOBER
                </div>
                <div className="font-script text-4xl text-wedding-coral">
                  17
                </div>
                <div className="text-wedding-coral font-sans text-sm">
                  2025
                </div>
              </div>
            </div>
            
            <div className="font-serif text-wedding-brown text-sm mb-2">
              Dress Code: No white or bright colors
            </div>
            
          </div>

          {/* RSVP Form */}
          <Card className="p-8 shadow-lg bg-card/80 backdrop-blur-sm border-wedding-peach">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="text-center mb-6">
                <h2 className="font-script text-3xl text-wedding-brown mb-2">RSVP</h2>
                <p className="font-serif text-wedding-brown text-sm">
                  Please respond by September 17th, 2025
                </p>
              </div>

              {/* Guest Name */}
              <div className="space-y-2">
                <Label htmlFor="guestName" className="font-sans text-wedding-brown">
                  Your Name *
                </Label>
                <Input
                  id="guestName"
                  value={formData.guestName}
                  onChange={(e) => updateField("guestName", e.target.value)}
                  className="border-wedding-peach focus:ring-wedding-coral"
                  required
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="font-sans text-wedding-brown">
                  Email Address *
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => updateField("email", e.target.value)}
                  className="border-wedding-peach focus:ring-wedding-coral"
                  required
                />
              </div>

              {/* Attendance */}
              <div className="space-y-3">
                <Label className="font-sans text-wedding-brown">Will you be attending? *</Label>
                <RadioGroup
                  value={formData.attendance}
                  onValueChange={(value) => updateField("attendance", value)}
                  className="flex flex-col gap-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="yes" />
                    <Label htmlFor="yes" className="font-sans text-wedding-brown">
                      Yes, I'll be there with bells on!
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="no" />
                    <Label htmlFor="no" className="font-sans text-wedding-brown">
                      Sorry, I can't make it
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {formData.attendance === "yes" && (
                <>
                  {/* How Many Guests */}
                  <div className="space-y-2">
                    <Label htmlFor="guestCount" className="font-sans text-wedding-brown">
                      How many guests? *
                    </Label>
                    <Input
                      id="guestCount"
                      type="number"
                      min="1"
                      max="10"
                      value={formData.guestCount}
                      onChange={(e) => updateField("guestCount", e.target.value)}
                      className="border-wedding-peach focus:ring-wedding-coral"
                      placeholder="Number of guests"
                      required
                    />
                  </div>

                  {/* Food Choices for Multiple Guests */}
                  <div className="space-y-4">
                    <div className="text-center mb-4">
                      <div className="font-script text-lg text-wedding-brown mb-2">Reception</div>
                      <div className="font-sans text-xs text-wedding-brown uppercase tracking-wide mb-1">
                        HIMALAYAN SHERPA KITCHEN
                      </div>
                      <div className="font-sans text-xs text-wedding-brown mb-1">
                        1148 MAIN ST, ST HELENA, CA 94574
                      </div>
                      <div className="font-sans text-sm text-wedding-brown mb-4">
                        Oct 17, 2025 at 1:00 PM
                      </div>
                    </div>
                    
                    <Label className="font-sans text-wedding-brown">Food Choices (one per guest) *</Label>
                    
                    {Array.from({ length: guestCount }, (_, index) => (
                      <div key={index} className="space-y-2 p-4 border border-wedding-peach rounded-lg bg-card/50">
                        <Label className="font-sans text-wedding-brown text-sm">
                          Guest {index + 1} Food Choice
                        </Label>
                        <Select 
                          onValueChange={(value) => updateFoodChoice(index, value)}
                          value={formData.foodChoices[index] || ""}
                        >
                          <SelectTrigger className="border-wedding-peach focus:ring-wedding-coral">
                            <SelectValue placeholder="Please pick 1 from the entree & sides" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Chicken Tandoori with Basmati Rice">Chicken Tandoori with Basmati Rice</SelectItem>
                            <SelectItem value="Salmon Tandoori with Basmati Rice">Salmon Tandoori with Basmati Rice</SelectItem>
                            <SelectItem value="Chicken Tika Masala with Basmati Rice">Chicken Tika Masala with Basmati Rice</SelectItem>
                            <SelectItem value="Salmon Tika Masala with Basmati Rice">Salmon Tika Masala with Basmati Rice</SelectItem>
                            <SelectItem value="Veggie Tandoori with Basmati Rice">Veggie Tandoori with Basmati Rice</SelectItem>
                            <SelectItem value="Veggie Curry with Basmati Rice">Veggie Curry with Basmati Rice</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    ))}
                  </div>

                  <div className="text-center mt-4">
                    <div className="font-sans text-xs text-wedding-brown uppercase tracking-wide mb-1">
                      APPETIZER
                    </div>
                    <div className="font-sans text-sm text-wedding-brown mb-4">
                      Chicken and Veggie Momo<br />
                      Garlic Basil Naan
                    </div>
                    
                    <div className="font-sans text-xs text-wedding-brown uppercase tracking-wide mb-1">
                      DRINK
                    </div>
                    <div className="font-sans text-sm text-wedding-brown">
                      Mango Lassi
                    </div>
                  </div>
                </>
              )}
              {/* Submit Button */}
              <div className="text-center pt-4">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-wedding-coral hover:bg-wedding-peach text-wedding-brown font-sans px-8 py-3 rounded-lg transition-colors disabled:opacity-50"
                >
                  {isSubmitting ? "Sending RSVP..." : "Submit RSVP"}
                </Button>
              </div>
            </form>
          </Card>

        </div>
      </div>
    </div>
  );
};

export default WeddingRSVP;