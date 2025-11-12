import { MessageCircle, X } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";

const WhatsAppWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const phoneNumber = "94XXXXXXXXX"; // Replace with actual WhatsApp number
  const message = "Hi! I'm interested in learning more about your chemistry classes.";

  const handleWhatsAppClick = () => {
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  return (
    <>
      {/* Floating Button */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4">
        {isOpen && (
          <div className="bg-background border border-border rounded-lg shadow-lg p-4 w-72 animate-in slide-in-from-bottom-2">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-[#25D366] flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">Chat with us</h3>
                  <p className="text-xs text-muted-foreground">We reply instantly</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6"
                onClick={() => setIsOpen(false)}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-sm text-muted-foreground mb-3">
              Have questions about our chemistry classes? Chat with us on WhatsApp!
            </p>
            <Button
              onClick={handleWhatsAppClick}
              className="w-full bg-[#25D366] hover:bg-[#20BD5C] text-white"
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              Start Chat
            </Button>
          </div>
        )}

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20BD5C] shadow-lg flex items-center justify-center transition-transform hover:scale-110 animate-bounce"
          aria-label="Open WhatsApp chat"
        >
          <MessageCircle className="w-6 h-6 text-white" />
        </button>
      </div>
    </>
  );
};

export default WhatsAppWidget;
