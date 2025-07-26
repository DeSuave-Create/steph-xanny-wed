import { useLocation, Navigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import botanicalDecoration from "@/assets/botanical-decoration.png";

interface ConfirmationData {
  guestName: string;
  guestCount: string;
  foodChoices: string[];
}

const Confirmation = () => {
  const location = useLocation();
  const confirmationData = location.state as ConfirmationData;

  // Redirect to home if no confirmation data
  if (!confirmationData) {
    return <Navigate to="/" replace />;
  }

  const { guestName, guestCount, foodChoices } = confirmationData;

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
              Thank You!
            </h1>
            <div className="font-serif text-lg text-wedding-brown mb-6">
              We've received your RSVP
            </div>
            
            <div className="font-serif text-wedding-brown mb-8">
              We're so excited to celebrate with you on our special day! 
              Your presence will make our wedding even more magical.
            </div>
          </div>

          {/* Confirmation Details */}
          <Card className="p-8 shadow-lg bg-card/80 backdrop-blur-sm border-wedding-peach">
            <div className="text-center mb-6">
              <h2 className="font-script text-3xl text-wedding-brown mb-2">RSVP Confirmation</h2>
              <p className="font-serif text-wedding-brown text-sm">
                Here are the details we received:
              </p>
            </div>

            <div className="space-y-6">
              {/* Guest Name */}
              <div className="text-center p-4 border border-wedding-peach rounded-lg bg-card/50">
                <div className="font-sans text-wedding-brown text-sm uppercase tracking-wide mb-1">
                  Guest Name
                </div>
                <div className="font-script text-2xl text-wedding-brown">
                  {guestName}
                </div>
              </div>

              {/* Number of People */}
              <div className="text-center p-4 border border-wedding-peach rounded-lg bg-card/50">
                <div className="font-sans text-wedding-brown text-sm uppercase tracking-wide mb-1">
                  Party Size
                </div>
                <div className="font-script text-2xl text-wedding-brown">
                  {guestCount} {parseInt(guestCount) === 1 ? 'Guest' : 'Guests'}
                </div>
              </div>

              {/* Food Choices */}
              {foodChoices.length > 0 && (
                <div className="p-4 border border-wedding-peach rounded-lg bg-card/50">
                  <div className="text-center font-sans text-wedding-brown text-sm uppercase tracking-wide mb-4">
                    Food Selections
                  </div>
                  <div className="space-y-2">
                    {foodChoices.map((choice, index) => (
                      <div key={index} className="text-center">
                        <div className="font-sans text-wedding-brown text-xs uppercase tracking-wide">
                          Guest {index + 1}
                        </div>
                        <div className="font-serif text-wedding-brown">
                          {choice}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Wedding Details Reminder */}
              <div className="text-center mt-8 p-4 border border-wedding-coral rounded-lg bg-wedding-cream/30">
                <div className="font-script text-lg text-wedding-brown mb-2">Save the Date</div>
                <div className="border-t border-b border-wedding-coral py-2 flex items-center justify-center gap-4 mb-2">
                  <div className="text-wedding-coral font-sans uppercase tracking-wide text-sm">
                    OCTOBER
                  </div>
                  <div className="font-script text-3xl text-wedding-coral">
                    17
                  </div>
                  <div className="text-wedding-coral font-sans text-sm">
                    2025
                  </div>
                </div>
                <div className="font-sans text-xs text-wedding-brown uppercase tracking-wide mb-1">
                  HIMALAYAN SHERPA KITCHEN
                </div>
                <div className="font-sans text-xs text-wedding-brown mb-1">
                  1148 MAIN ST, ST HELENA, CA 94574
                </div>
                <div className="font-sans text-sm text-wedding-brown">
                  1:00 PM
                </div>
              </div>

              {/* Loving Message */}
              <div className="text-center mt-8 p-6 bg-wedding-peach/20 rounded-lg">
                <div className="font-script text-xl text-wedding-brown mb-4">
                  With Love & Gratitude
                </div>
                <div className="font-serif text-wedding-brown italic mb-4">
                  "Love is not just looking at each other, it's looking in the same direction together."
                </div>
                <div className="font-serif text-wedding-brown">
                  Thank you for being part of our journey and for celebrating this beautiful milestone with us. 
                  Your love and support mean the world to us, and we can't wait to share this joyous day with you!
                </div>
                <div className="font-script text-lg text-wedding-brown mt-4">
                  Stephanie & Xandrix
                </div>
              </div>

              {/* Back to Home Button */}
              <div className="text-center pt-6">
                <Button
                  onClick={() => window.location.href = '/'}
                  className="bg-wedding-coral hover:bg-wedding-peach text-wedding-brown font-sans px-8 py-3 rounded-lg transition-colors"
                >
                  Back to Home
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Confirmation;