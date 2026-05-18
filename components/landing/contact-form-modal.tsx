"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface ContactFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ContactFormModal({ isOpen, onClose }: ContactFormModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setTimeout(() => {
        onClose();
        setSubmitted(false);
        setFormData({ name: "", email: "", phone: "", company: "", message: "" });
      }, 2000);
    }, 1000);
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-40 transition-opacity duration-300"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
        <div
          className="bg-background border border-foreground/10 w-full max-w-md animate-in fade-in scale-95 duration-200"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-8 py-6 border-b border-foreground/10">
            <h2 className="text-2xl font-display">Let's Connect</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-foreground/10 transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="px-8 py-8">
            {submitted ? (
              <div className="text-center py-12">
                <div className="w-12 h-12 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-6 h-6 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-display mb-2">Thank you!</h3>
                <p className="text-muted-foreground">
                  We'll be in touch soon with more details about your project.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    required
                    className="w-full px-4 py-3 bg-background border border-foreground/10 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground/30 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    required
                    className="w-full px-4 py-3 bg-background border border-foreground/10 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground/30 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+216 XX XXX XXX"
                    className="w-full px-4 py-3 bg-background border border-foreground/10 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground/30 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Company</label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="Your company name"
                    className="w-full px-4 py-3 bg-background border border-foreground/10 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground/30 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your project..."
                    rows={4}
                    className="w-full px-4 py-3 bg-background border border-foreground/10 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground/30 transition-colors resize-none"
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={onClose}
                    className="flex-1 rounded-full border-foreground/20 hover:bg-foreground/5"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 bg-foreground hover:bg-foreground/90 text-background rounded-full"
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
