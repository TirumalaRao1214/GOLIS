import React, { useState } from 'react';
import type { LeadData } from '../../chatbot/conversation';

interface LeadFormProps {
  initialBusinessType?: string;
  initialRequirements?: string;
  onSubmit: (lead: LeadData) => void;
}

export const LeadForm: React.FC<LeadFormProps> = ({
  initialBusinessType = '',
  initialRequirements = '',
  onSubmit,
}) => {
  const [formData, setFormData] = useState<LeadData>({
    name: '',
    businessName: '',
    phone: '',
    email: '',
    businessType: initialBusinessType || 'Restaurant / Cafe',
    requirements: initialRequirements || '',
    budget: '₹14,999 (Business Plan)',
    additionalNotes: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const err: Record<string, string> = {};
    if (!formData.name.trim()) err.name = 'Name is required';
    if (!formData.businessName.trim()) err.businessName = 'Business name is required';
    if (!formData.phone.trim()) {
      err.phone = 'Phone number is required';
    } else if (!/^[0-9+\-\s()]{7,15}$/.test(formData.phone.trim())) {
      err.phone = 'Please enter a valid phone number';
    }
    if (formData.email && !/^\S+@\S+\.\S+$/.test(formData.email.trim())) {
      err.email = 'Please enter a valid email';
    }
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };

  return (
    <form className="chatbot-lead-form" onSubmit={handleSubmit}>
      <div className="chatbot-form-group">
        <label className="chatbot-form-label">Your Name *</label>
        <input
          type="text"
          className="chatbot-form-input"
          placeholder="e.g. Rahul Sharma"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        {errors.name && <span className="chatbot-form-error">{errors.name}</span>}
      </div>

      <div className="chatbot-form-group">
        <label className="chatbot-form-label">Business Name *</label>
        <input
          type="text"
          className="chatbot-form-input"
          placeholder="e.g. Royal Bakes & Cafe"
          value={formData.businessName}
          onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
        />
        {errors.businessName && <span className="chatbot-form-error">{errors.businessName}</span>}
      </div>

      <div className="chatbot-form-group">
        <label className="chatbot-form-label">Phone Number (WhatsApp) *</label>
        <input
          type="tel"
          className="chatbot-form-input"
          placeholder="e.g. +91 9876543210"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
        />
        {errors.phone && <span className="chatbot-form-error">{errors.phone}</span>}
      </div>

      <div className="chatbot-form-group">
        <label className="chatbot-form-label">Email (Optional)</label>
        <input
          type="email"
          className="chatbot-form-input"
          placeholder="e.g. contact@mybusiness.com"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        {errors.email && <span className="chatbot-form-error">{errors.email}</span>}
      </div>

      <div className="chatbot-form-group">
        <label className="chatbot-form-label">Business Type</label>
        <select
          className="chatbot-form-select"
          value={formData.businessType}
          onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
        >
          <option value="Restaurant / Cafe">Restaurant / Cafe</option>
          <option value="Salon & Spa">Salon & Spa / Beauty</option>
          <option value="Clothing & Fashion">Clothing / Boutique</option>
          <option value="Perfume & Fragrance">Perfume / Fragrance</option>
          <option value="Local Retail Store">Local Retail Store</option>
          <option value="Healthcare & Wellness">Healthcare & Wellness</option>
          <option value="Professional & Corporate">Professional & Corporate</option>
          <option value="Other">Other Business</option>
        </select>
      </div>

      <div className="chatbot-form-group">
        <label className="chatbot-form-label">Estimated Budget</label>
        <select
          className="chatbot-form-select"
          value={formData.budget}
          onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
        >
          <option value="₹7,999 (Starter Plan)">Starter Plan (₹7,999)</option>
          <option value="₹14,999 (Business Plan)">Business Plan (₹14,999)</option>
          <option value="₹24,999+ (Premium Plan)">Premium Plan (₹24,999+)</option>
          <option value="Custom Budget">Custom / Undecided</option>
        </select>
      </div>

      <div className="chatbot-form-group">
        <label className="chatbot-form-label">Requirements / What do you need?</label>
        <textarea
          className="chatbot-form-textarea"
          placeholder="e.g. 5-page website with catalog, WhatsApp ordering, Google Maps, and fast mobile speed"
          value={formData.requirements}
          onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
        />
      </div>

      <button type="submit" className="chatbot-form-submit">
        <span>Proceed to WhatsApp Confirmation</span>
        <span>→</span>
      </button>
    </form>
  );
};
