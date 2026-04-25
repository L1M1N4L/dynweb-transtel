import React, { useState } from 'react';
import { Instagram, Youtube, MapPin } from 'lucide-react';
import emailjs from '@emailjs/browser';
import toast from 'react-hot-toast';
import { saveContactSubmission } from '../services/contactService';
import SEO from '../components/common/SEO';

export default function ContactPage() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const offices = [
        { country: 'USA — Jupiter, FL', phone: '+1 (561) 747-4466' },
        { country: 'Taiwan', phone: '+886 922 570 628' },
        { country: 'Australia', phone: '(02)9415 0100' },
        { country: 'New Zealand', phone: '+64 (9) 2604009' },
        { country: 'Sri Lanka', phone: '+94771075589' }
    ];

    const socialLinks = [
        {
            name: 'Instagram',
            url: 'https://www.instagram.com/TranstelGlobal',
            icon: Instagram
        },
        {
            name: 'YouTube',
            url: 'https://www.youtube.com/@TranstelGlobal',
            icon: Youtube
        }
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const createEmailHTML = (data) => {
        const fullName = `${data.firstName} ${data.lastName}`;
        return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Contact Form Submission</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f7;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f7; padding: 40px 20px;">
        <tr>
            <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                    <!-- Header -->
                    <tr>
                        <td style="background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%); padding: 40px 40px 30px; text-align: center;">
                            <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 600; letter-spacing: -0.5px;">New Contact Form Submission</h1>
                            <p style="margin: 10px 0 0; color: #e0e7ff; font-size: 14px;">Transtel Communications</p>
                        </td>
                    </tr>
                    
                    <!-- Content -->
                    <tr>
                        <td style="padding: 40px;">
                            <p style="margin: 0 0 30px; color: #374151; font-size: 16px; line-height: 1.6;">
                                You have received a new message through your website contact form.
                            </p>
                            
                            <!-- Contact Details Card -->
                            <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f9fafb; border-radius: 8px; margin-bottom: 24px;">
                                <tr>
                                    <td style="padding: 24px;">
                                        <h2 style="margin: 0 0 20px; color: #111827; font-size: 18px; font-weight: 600;">Contact Details</h2>
                                        
                                        <table width="100%" cellpadding="8" cellspacing="0">
                                            <tr>
                                                <td width="100" style="color: #6b7280; font-size: 14px; font-weight: 500;">Name:</td>
                                                <td style="color: #111827; font-size: 14px; font-weight: 600;">${fullName}</td>
                                            </tr>
                                            <tr>
                                                <td style="color: #6b7280; font-size: 14px; font-weight: 500;">Email:</td>
                                                <td style="color: #2563eb; font-size: 14px; font-weight: 600;">
                                                    <a href="mailto:${data.email}" style="color: #2563eb; text-decoration: none;">${data.email}</a>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="color: #6b7280; font-size: 14px; font-weight: 500;">Phone:</td>
                                                <td style="color: #111827; font-size: 14px; font-weight: 600;">${data.countryCode} ${data.phone}</td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                            
                            <!-- Message Card -->
                            <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f9fafb; border-radius: 8px; margin-bottom: 24px;">
                                <tr>
                                    <td style="padding: 24px;">
                                        <h2 style="margin: 0 0 16px; color: #111827; font-size: 18px; font-weight: 600;">Message</h2>
                                        <p style="margin: 0; color: #374151; font-size: 14px; line-height: 1.8; white-space: pre-wrap;">${data.message}</p>
                                    </td>
                                </tr>
                            </table>
                            
                            <!-- Action Button -->
                            <table width="100%" cellpadding="0" cellspacing="0">
                                <tr>
                                    <td align="center" style="padding: 20px 0;">
                                        <a href="mailto:${data.email}" style="display: inline-block; background-color: #2563eb; color: #ffffff; text-decoration: none; padding: 14px 32px; border-radius: 8px; font-size: 14px; font-weight: 600; box-shadow: 0 2px 4px rgba(37, 99, 235, 0.2);">
                                            Reply to Customer
                                        </a>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                        <td style="background-color: #f9fafb; padding: 30px 40px; border-top: 1px solid #e5e7eb;">
                            <table width="100%" cellpadding="0" cellspacing="0">
                                <tr>
                                    <td style="text-align: center; padding-bottom: 20px;">
                                        <p style="margin: 0 0 16px; color: #6b7280; font-size: 14px; font-weight: 600;">Transtel Communications</p>
                                        <p style="margin: 0; color: #9ca3af; font-size: 12px; line-height: 1.6;">
                                            Phone: +1 (561) 747-4466<br>
                                            1562 Park Ln S, Jupiter, FL 33458, United States<br>
                                            Web: <a href="https://transtelcommunications.co/" style="color: #2563eb; text-decoration: none;">transtelcommunications.co</a>
                                        </p>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="text-align: center; padding-top: 20px; border-top: 1px solid #e5e7eb;">
                                        <p style="margin: 0; color: #9ca3af; font-size: 11px;">
                                            This message was sent from the Transtel Communications website contact form.
                                        </p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
        `;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validation
        if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone || !formData.message) {
            toast.error('Please fill in all fields');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            toast.error('Please enter a valid email address');
            return;
        }

        setIsSubmitting(true);
        const loadingToast = toast.loading('Sending your message...');

        try {
            const fullName = `${formData.firstName} ${formData.lastName}`;

            // Save to Firebase
            await saveContactSubmission({
                firstName: formData.firstName,
                lastName: formData.lastName,
                fullName: fullName,
                email: formData.email,
                phone: formData.phone,
                message: formData.message
            });

            // Send auto-reply to customer
            await emailjs.send(
                import.meta.env.VITE_EMAILJS_SERVICE_ID,
                import.meta.env.VITE_EMAILJS_CUSTOMER_TEMPLATE_ID,
                {
                    from_name: fullName,
                    from_email: formData.email,
                    from_phone: formData.phone,
                    message: formData.message,
                    reply_to: formData.email
                },
                import.meta.env.VITE_EMAILJS_PUBLIC_KEY
            );

            toast.success('Message sent successfully!', {
                id: loadingToast,
                duration: 4000
            });

            // Reset form
            setFormData({
                firstName: '',
                lastName: '',
                email: '',
                phone: '',
                message: ''
            });

        } catch (error) {
            console.error('Error sending message:', error);
            toast.error('Failed to send message. Please try again.', {
                id: loadingToast
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="bg-[#f5f5f7] min-h-screen">
            <SEO
                title="Contact Us"
                description="Get in touch with Transtel Communications. Reach our global offices in the USA, Taiwan, Australia, New Zealand, and Sri Lanka. Email us at info@transtelcommunications.co."
                url="/contact"
                keywords="contact Transtel Communications, PABX support, enterprise communication enquiry, Transtel offices"
            />

            {/* Hero */}
            <section className="text-center pt-40 pb-20 px-6">
                <p className="text-xs font-semibold text-[#86868b] tracking-widest uppercase mb-4">Contact</p>
                <h1 className="text-5xl md:text-7xl font-semibold tracking-tight text-[#1d1d1f] mb-6">
                    We'd love to<br />
                    <span className="text-[#86868b]">hear from you.</span>
                </h1>
                <p className="text-xl text-[#86868b] max-w-2xl mx-auto leading-relaxed">
                    Whether you're exploring a deployment or need technical guidance, our team is ready to help.
                </p>
            </section>

            {/* Main Content */}
            <section className="bg-white border-t border-b border-[#e5e5e5]">
                <div className="max-w-6xl mx-auto px-6 py-24 grid lg:grid-cols-2 gap-24">

                    {/* Form */}
                    <div>
                        <h2 className="text-xs font-bold tracking-widest text-[#1d1d1f] uppercase mb-10">Send a Message</h2>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-semibold text-[#86868b] uppercase tracking-wider mb-2">First name</label>
                                    <input
                                        type="text"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        disabled={isSubmitting}
                                        className="w-full px-4 py-3 bg-[#f5f5f7] border border-[#d2d2d7] rounded-xl text-[#1d1d1f] placeholder-[#86868b] focus:outline-none focus:border-[#1d1d1f] transition-colors disabled:opacity-50"
                                        placeholder="First"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-[#86868b] uppercase tracking-wider mb-2">Last name</label>
                                    <input
                                        type="text"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        disabled={isSubmitting}
                                        className="w-full px-4 py-3 bg-[#f5f5f7] border border-[#d2d2d7] rounded-xl text-[#1d1d1f] placeholder-[#86868b] focus:outline-none focus:border-[#1d1d1f] transition-colors disabled:opacity-50"
                                        placeholder="Last"
                                        required
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-[#86868b] uppercase tracking-wider mb-2">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    disabled={isSubmitting}
                                    className="w-full px-4 py-3 bg-[#f5f5f7] border border-[#d2d2d7] rounded-xl text-[#1d1d1f] placeholder-[#86868b] focus:outline-none focus:border-[#1d1d1f] transition-colors disabled:opacity-50"
                                    placeholder="you@company.com"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-[#86868b] uppercase tracking-wider mb-2">Phone number</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    disabled={isSubmitting}
                                    className="w-full px-4 py-3 bg-[#f5f5f7] border border-[#d2d2d7] rounded-xl text-[#1d1d1f] placeholder-[#86868b] focus:outline-none focus:border-[#1d1d1f] transition-colors disabled:opacity-50"
                                    placeholder="+1 (555) 000-0000"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-[#86868b] uppercase tracking-wider mb-2">Message</label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    disabled={isSubmitting}
                                    className="w-full px-4 py-3 bg-[#f5f5f7] border border-[#d2d2d7] rounded-xl text-[#1d1d1f] placeholder-[#86868b] focus:outline-none focus:border-[#1d1d1f] transition-colors h-36 resize-none disabled:opacity-50"
                                    placeholder="Tell us about your project..."
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-[#1d1d1f] text-white font-semibold py-4 rounded-full hover:bg-[#333] transition-colors disabled:opacity-50 disabled:cursor-not-allowed tracking-tight"
                            >
                                {isSubmitting ? 'Sending…' : 'Send Message'}
                            </button>
                        </form>
                    </div>

                    {/* Right Info */}
                    <div className="space-y-16">

                        {/* Global Offices */}
                        <div>
                            <h2 className="text-xs font-bold tracking-widest text-[#1d1d1f] uppercase mb-8">Global Offices</h2>
                            <ul className="divide-y divide-[#e5e5e5]">
                                {offices.map((office) => (
                                    <li key={office.country} className="flex items-center justify-between py-4">
                                        <div className="flex items-center gap-3">
                                            <MapPin className="w-4 h-4 text-[#86868b] flex-shrink-0" />
                                            <span className="text-[#1d1d1f] font-medium text-sm">{office.country}</span>
                                        </div>
                                        <a
                                            href={`tel:${office.phone.replace(/\s/g, '')}`}
                                            className="text-[#86868b] hover:text-[#0066cc] transition-colors text-sm font-medium"
                                        >
                                            {office.phone}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Email */}
                        <div>
                            <h2 className="text-xs font-bold tracking-widest text-[#1d1d1f] uppercase mb-4">Email</h2>
                            <a
                                href="mailto:info@transtelcommunications.co"
                                className="text-[#0066cc] hover:underline text-base font-medium"
                            >
                                info@transtelcommunications.co
                            </a>
                        </div>

                        {/* Social */}
                        <div>
                            <h2 className="text-xs font-bold tracking-widest text-[#1d1d1f] uppercase mb-6">Follow Us</h2>
                            <div className="flex gap-4">
                                {socialLinks.map((social) => {
                                    const Icon = social.icon;
                                    return (
                                        <a
                                            key={social.name}
                                            href={social.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2 px-5 py-2.5 border border-[#d2d2d7] rounded-full text-sm font-medium text-[#1d1d1f] hover:bg-[#1d1d1f] hover:text-white hover:border-[#1d1d1f] transition-all"
                                        >
                                            <Icon className="w-4 h-4" />
                                            {social.name}
                                        </a>
                                    );
                                })}
                            </div>
                        </div>

                    </div>
                </div>
            </section>

        </div>
    );
}
