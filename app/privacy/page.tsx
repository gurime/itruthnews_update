import { Shield, Eye, Lock, Database, Cookie, Mail, FileText } from "lucide-react";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Privacy() {
const sections = [
{
icon: <Database className="w-8 h-8" />,
title: "Information We Collect",
content: [
{
subtitle: "Information You Provide",
text: "When you create an account, subscribe to our newsletter, or contact us, we collect the information you provide, such as your email address and account or contact details. This site does not currently process purchases or collect payment card information."
},
{
subtitle: "Automatically Collected Information",
text: "Our hosting and authentication providers may process technical information needed to deliver and secure the website and account features."
},
{
subtitle: "Cookies and Tracking Technologies",
text: "We use essential cookies to keep you signed in and maintain your account session. We do not currently configure analytics, advertising, or cross-site tracking cookies."
}
]
},
{
icon: <Eye className="w-8 h-8" />,
title: "How We Use Your Information",
content: [
{
subtitle: "To Provide Our Services",
text: "We use your information to provide the website and account features, send newsletters you request, and respond to support inquiries."
},
{
subtitle: "To Improve Our Services",
text: "We use feedback and operational information to maintain the website and improve its features. We do not currently configure analytics tools to track how readers use the site."
},
{
subtitle: "To Communicate With You",
text: "We may send you service announcements, administrative messages, and marketing communications about our products and services. You can opt out of marketing emails at any time."
},
{
subtitle: "For Legal and Safety Purposes",
text: "We may use your information to comply with legal obligations, enforce our terms of service, protect our rights and property, and ensure the safety of our users."
}
]
},
{
icon: <Lock className="w-8 h-8" />,
title: "How We Share Your Information",
content: [
{
subtitle: "Service Providers",
text: "We rely on service providers for website hosting, account authentication, and newsletter delivery. Payment processing and analytics services are not currently configured on this site."
},
{
subtitle: "Business Transfers",
text: "If we are involved in a merger, acquisition, or sale of assets, your information may be transferred as part of that transaction. We will notify you of any such change and any choices you may have."
},
{
subtitle: "Legal Requirements",
text: "We may disclose your information if required by law, court order, or government request, or if we believe disclosure is necessary to protect our rights, your safety, or the safety of others."
},
{
subtitle: "With Your Consent",
text: "We may share your information with third parties when you have given us explicit consent to do so."
}
]
},
{
icon: <Cookie className="w-8 h-8" />,
title: "Cookies & Tracking",
content: [
{
subtitle: "What Are Cookies",
text: "Cookies are small text files that a website stores in your browser. Our authentication provider uses essential session cookies so account features can recognize that you are signed in."
},
{
subtitle: "Types of Cookies We Use",
text: "We currently use essential authentication and session cookies only. We do not configure performance, advertising, or cross-site tracking cookies."
},
{
subtitle: "Managing Cookies",
text: "You can remove or block cookies in your browser settings. If you block essential session cookies, you may not be able to stay signed in or use some account features."
},
{
subtitle: "Third-Party Cookies",
text: "Our authentication provider processes the session cookies needed for sign-in. We do not currently configure third-party advertising or analytics cookies on this site."
}
]
},
{
icon: <Shield className="w-8 h-8" />,
title: "Your Rights & Choices",
content: [
{
subtitle: "Access and Correction",
text: "You have the right to access, update, or correct your personal information. You can do this through your account settings or by contacting us."
},
{
subtitle: "Deletion",
text: "You may request deletion of your personal information, subject to certain legal exceptions. Note that we may need to retain some information for legal or business purposes."
},
{
subtitle: "Opt-Out of Marketing",
text: "You can request removal from our newsletter or marketing lists by contacting us through the Contact page."
},
{
subtitle: "Do Not Track",
text: "Some browsers include a 'Do Not Track' feature. Currently, there is no industry standard for how to respond to these signals, and we do not respond to Do Not Track signals at this time."
},
{
subtitle: "California Privacy Rights",
text: "California residents have additional rights under the California Consumer Privacy Act (CCPA), including the right to know what information we collect, the right to delete information, and the right to opt out of the sale of personal information."
},
{
subtitle: "European Privacy Rights",
text: "If you are in the European Economic Area, you have rights under the General Data Protection Regulation (GDPR), including the right to access, rectification, erasure, restriction of processing, data portability, and objection."
}
]
},
{
icon: <Lock className="w-8 h-8" />,
title: "Data Security",
content: [
{
subtitle: "Security Measures",
text: "We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. This includes encryption, secure servers, and access controls."
},
{
subtitle: "Payment Security",
text: "Online payment processing is not currently available on this site. Do not submit payment card information through the website."
},
{
subtitle: "Data Breach Notification",
text: "In the event of a data breach that affects your personal information, we will notify you and relevant authorities as required by applicable law."
}
]
},
{
icon: <FileText className="w-8 h-8" />,
title: "Data Retention",
content: [
{
subtitle: "How Long We Keep Your Information",
text: "We retain your personal information for as long as necessary to provide our services, comply with legal obligations, resolve disputes, and enforce our agreements. When we no longer need your information, we will securely delete or anonymize it."
},
{
subtitle: "Account Information",
text: "If you close your account, we will delete or anonymize your personal information within 90 days, except where we need to retain it for legal or business purposes."
}
]
},
{
icon: <Mail className="w-8 h-8" />,
title: "Children's Privacy",
content: [
{
subtitle: "Age Restrictions",
text: "Our services are not intended for children under 13 years of age (or 16 in the European Economic Area). We do not knowingly collect personal information from children under these ages. If you believe we have collected information from a child, please contact us immediately."
}
]
}
];

return (
<>
<Navbar/>

<div className="min-h-screen bg-gray-50">
{/* Header */}
<div className="dark:bg-blue-900 text-white">
<div className="container mx-auto px-4 py-16 md:py-20">
<div className="max-w-4xl mx-auto text-center">
<Shield className="w-16 h-16 mx-auto mb-6" />
<h1 className="text-4xl md:text-5xl font-bold mb-6">
Privacy Policy
</h1>
<p className="text-xl md:text-2xl text-blue-100 mb-4">
Your privacy is important to us
</p>
<p className="text-sm text-blue-200">
Last Updated: October 3, 2026
</p>
</div>
</div>
</div>

{/* Introduction */}
<div className="bg-white py-12 border-b">
<div className="container mx-auto px-4">
<div className="max-w-4xl mx-auto">
<div className="prose prose-lg max-w-none">
<p className="text-xl text-gray-700 leading-relaxed mb-6">
At iTruth News, we are committed to protecting your privacy and being transparent about 
how we collect, use, and share your information. This Privacy Policy explains our practices 
regarding the personal information we collect through our website, newsletters,
and other services.
</p>
<p className="text-xl text-gray-700 leading-relaxed">
By using our services, you agree to the collection and use of information in accordance 
with this policy. If you do not agree with our policies and practices, please do not use 
our services.
</p>
</div>
</div>
</div>
</div>

{/* Privacy Sections */}
<div className="py-16">
<div className="container mx-auto px-4">
<div className="max-w-5xl mx-auto">
<div className="space-y-12">
{sections.map((section, index) => (
<div
id={section.title === "Cookies & Tracking" ? "cookies" : undefined}
key={index}
className="bg-white rounded-lg shadow-md p-8"
>
<div className="flex items-start mb-6">
<div className="text-blue-900 mr-4 mt-1">
{section.icon}
</div>
<div className="flex-1">
<h2 className="text-2xl font-bold text-gray-900 mb-4">
{section.title}
</h2>
</div>
</div>
<div className="space-y-6 ml-12">
{section.content.map((item, idx) => (
<div key={idx}>
<h3 className="text-lg font-semibold text-gray-900 mb-2">
{item.subtitle}
</h3>
<p className="text-gray-700 leading-relaxed">
{item.text}
</p>
</div>
))}
</div>
</div>
))}
</div>
</div>
</div>
</div>

{/* International Transfers */}
<div className="bg-gray-100 py-12">
<div className="container mx-auto px-4">
<div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8">
<h2 className="text-2xl font-bold text-gray-900 mb-4">
International Data Transfers
</h2>
<p className="text-gray-700 mb-4">
Your information may be transferred to and processed in countries other than your own. 
These countries may have data protection laws that are different from the laws of your country.
</p>
<p className="text-gray-700">
When we transfer information internationally, we take steps to ensure it receives adequate 
protection, including through the use of standard contractual clauses or other approved 
transfer mechanisms.
</p>
</div>
</div>
</div>

{/* Changes to Privacy Policy */}
<div className="bg-white py-12">
<div className="container mx-auto px-4">
<div className="max-w-4xl mx-auto bg-blue-50 border-l-4 border-blue-600 p-6 rounded-r-lg">
<h2 className="text-2xl font-bold text-gray-900 mb-4">
Changes to This Privacy Policy
</h2>
<p className="text-gray-700 mb-4">
We may update this Privacy Policy from time to time to reflect changes in our practices, 
technology, legal requirements, or other factors. We will notify you of any material changes 
by posting the updated policy on our website and updating the "Last Updated" date.
</p>
<p className="text-gray-700">
We encourage you to review this Privacy Policy periodically to stay informed about how we 
protect your information.
</p>
</div>
</div>
</div>

{/* Contact Section */}
<div className="bg-linear-to-br from-blue-900 to-blue-800 text-white py-16">
<div className="container mx-auto px-4">
<div className="max-w-3xl mx-auto text-center">
<Mail className="w-16 h-16 mx-auto mb-6" />
<h2 className="text-3xl font-bold mb-4">
Questions About Privacy?
</h2>
<p className="text-xl text-blue-100 mb-8">
If you have questions or concerns about this Privacy Policy or our privacy practices
</p>
<div className="bg-blue-800 rounded-lg p-6 mb-8">
<h3 className="font-bold text-lg mb-3">Contact Our Privacy Team</h3>
<div className="space-y-2">
<p className="text-blue-100">
Email: <a href="mailto:privacy@itruthnews.com" className="text-white hover:text-blue-200 font-semibold">privacy@itruthnews.com</a>
</p>
<p className="text-blue-100">
Mail: iTruth News Privacy Team<br />
123 Press Avenue<br />
New York, NY 10001
</p>
</div>
</div>
<div className="flex flex-wrap justify-center gap-4">
<Link 
href="/contact" 
className="px-8 py-3 bg-white text-blue-900 rounded-full font-bold hover:bg-blue-50 transition-colors">
Contact Form
</Link>
<Link 
href="/faq" 
className="px-8 py-3 bg-blue-700 text-white rounded-full font-bold hover:bg-blue-600 transition-colors border-2 border-blue-500">
Privacy FAQs
</Link>
</div>
</div>
</div>
</div>

<div className="bg-gray-100 py-8"></div>

</div>
<Footer/>
</>
);
}