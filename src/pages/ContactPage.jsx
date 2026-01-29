import React, { useState } from 'react';
import { Facebook, Instagram, Youtube, Phone, MapPin } from 'lucide-react';
import emailjs from '@emailjs/browser';
import toast from 'react-hot-toast';
import { saveContactSubmission } from '../services/contactService';

export default function ContactPage() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        countryCode: '',
        phone: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const offices = [
        { country: 'USA', phone: '561 747-4466 x111' },
        { country: 'Indonesia', phone: '+62 (0) 2154356600' },
        { country: 'Taiwan', phone: '+886 922 570 628' },
        { country: 'Australia', phone: '(02)9415 0100' },
        { country: 'New Zealand', phone: '+64 (9) 2604009' },
        { country: 'Sri Lanka', phone: '94771075589' }
    ];

    const socialLinks = [
        {
            name: 'Facebook',
            url: 'http://facebook.com/transtelindonesia97/',
            icon: Facebook
        },
        {
            name: 'Instagram',
            url: 'https://www.instagram.com/transtelindonesia/',
            icon: Instagram
        },
        {
            name: 'WhatsApp',
            url: 'https://api.whatsapp.com/send?phone=628119181222',
            icon: Phone
        },
        {
            name: 'YouTube',
            url: 'https://www.youtube.com/@pabxtranstelkomunikasitds6739',
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
                                            WhatsApp: (081) 1918 1222<br>
                                            Phone: +62 (0) 2154356600<br>
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
                countryCode: formData.countryCode,
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
                    country_code: formData.countryCode,
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
                countryCode: '',
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
        <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
            {/* Hero Section */}
            <div className="text-center mb-16">
                <h1 className="text-6xl font-semibold text-gray-900 mb-5 tracking-tight leading-tight">
                    Contact our team
                </h1>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-light">
                    Got any questions about the product or scaling on our platform? We're here to help.
                    Chat to our friendly team 24/7 and get onboard in less than 5 minutes.
                </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
                {/* Left Column - Contact Form */}
                <div>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-900 mb-2.5">First name</label>
                                <input
                                    type="text"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    disabled={isSubmitting}
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                    placeholder="First name"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-900 mb-2.5">Last name</label>
                                <input
                                    type="text"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    disabled={isSubmitting}
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                    placeholder="Last name"
                                    required
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-900 mb-2.5">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                disabled={isSubmitting}
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                placeholder="you@company.com"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-900 mb-2.5">Phone number</label>
                            <div className="flex gap-3">
                                <select
                                    name="countryCode"
                                    value={formData.countryCode}
                                    onChange={handleChange}
                                    disabled={isSubmitting}
                                    className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <option value="">Code</option>
                                    <option value="US">US</option>
                                    <option value="ID">ID</option>
                                    <option value="TW">TW</option>
                                    <option value="AU">AU</option>
                                    <option value="NZ">NZ</option>
                                    <option value="LK">LK</option>
                                    <option value="Others">Others</option>
                                </select>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    disabled={isSubmitting}
                                    className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                    placeholder="+1 (555) 000-0000"
                                    required
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-900 mb-2.5">Message</label>
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                disabled={isSubmitting}
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white outline-none h-36 resize-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                placeholder="Leave us a message..."
                                required
                            ></textarea>
                        </div>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-gray-900 text-white font-medium py-3.5 rounded-xl hover:bg-gray-800 transition-all shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-gray-900"
                        >
                            {isSubmitting ? 'Sending...' : 'Send message'}
                        </button>
                    </form>
                </div>

                {/* Right Column - Contact Info */}
                <div className="space-y-10">
                    {/* Office Contacts */}
                    <div>
                        <h2 className="text-2xl font-semibold text-gray-900 mb-6 tracking-tight">Office Contacts</h2>
                        <div className="grid grid-cols-2 gap-3">
                            {offices.map((office) => (
                                <div key={office.country} className="flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors">
                                    <div className="w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                                        <MapPin className="w-4 h-4 text-gray-600" />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-gray-900 mb-0.5 text-sm">{office.country}</p>
                                        <a
                                            href={`tel:${office.phone.replace(/\s/g, '')}`}
                                            className="text-gray-600 hover:text-blue-600 transition text-xs"
                                        >
                                            Tel. {office.phone}
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Social Media */}
                    <div>
                        <h2 className="text-2xl font-semibold text-gray-900 mb-6 tracking-tight">Connect with us</h2>
                        <div className="grid grid-cols-2 gap-3">
                            {socialLinks.map((social) => {
                                const Icon = social.icon;
                                return (
                                    <a
                                        key={social.name}
                                        href={social.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center justify-center gap-2 px-5 py-3.5 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all border border-gray-100"
                                        title={social.name}
                                    >
                                        <Icon className="w-5 h-5 text-gray-700" />
                                        <span className="text-sm font-medium text-gray-700">{social.name}</span>
                                    </a>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
