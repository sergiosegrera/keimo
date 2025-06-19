import { remark } from "remark";
import html from "remark-html";
import { APP_NAME, APP_CONTACT_EMAIL } from "@/lib/constants";

const EFFECTIVE_DATE = "17 June 2025";

async function getPrivacyContent() {
  const md = `
# Privacy Policy

**Effective Date:** ${EFFECTIVE_DATE}

## 1. Introduction
This Privacy Policy explains how ${APP_NAME} ("we," "our," or "us") collects, uses, and protects your information when you use our icon generation application ("the App"). We are committed to protecting your privacy and being transparent about our data practices.

## 2. Information We Collect

### Personal Information
- **Account Information:** Email address, username, and password (stored by Clerk, our authentication provider)
- **Profile Information:** Display name and profile picture (if provided)
- **Payment Information:** Billing details for credit purchases (stored and processed by Stripe, our payment processor)

**Data Minimization:** We only store the minimum information required for the App to function. Most personal information is securely stored by our trusted third-party providers (Clerk for authentication, Stripe for payments) rather than on our own servers.

### Usage Information
- **Generated Content:** Text prompts and generated content you create
- **App Usage:** Features used, time spent in app, and interaction patterns
- **Device Information:** Device type, operating system, app version, and unique device identifiers
- **Log Data:** IP address, access times, and error logs

### Automatically Collected Information
- **Analytics Data:** App performance, crash reports, and usage statistics
- **Cookies and Similar Technologies:** For authentication and app functionality

## 3. How We Use Your Information

We use your information to:
- **Provide Services:** Generate content, manage your account, and process payments
- **Improve the App:** Analyze usage patterns and optimize performance
- **Customer Support:** Respond to inquiries and provide technical assistance
- **Communications:** Send important updates about the App and your account
- **Security:** Protect against fraud, abuse, and unauthorized access
- **Legal Compliance:** Meet legal obligations and enforce our terms

## 4. Information Sharing

We do not sell your personal information. We may share information in these situations:

### Service Providers
- **Authentication Services:** Clerk securely stores and manages your account information
- **Payment Processing:** Stripe handles all payment information and transactions
- **AI Model Providers:** Your prompts may be processed by third-party AI services to generate content
- **Cloud Services:** App data may be stored and processed using cloud infrastructure
- **Analytics Services:** Usage data may be shared with analytics providers

### Legal Requirements
- **Legal Compliance:** When required by law, court order, or legal process
- **Safety and Security:** To protect the rights, property, or safety of users or others
- **Business Transfers:** In connection with mergers, acquisitions, or asset sales

## 5. Data Retention

- **Account Information:** Retained while your account is active
- **Generated Content:** Stored until you delete it or close your account
- **Usage Data:** Typically retained for 2 years for analytics purposes
- **Payment Records:** Retained as required by law and for tax purposes

## 6. Your Rights and Choices

### Account Management
- **Access:** View and update your account information
- **Deletion:** Delete your account and associated data
- **Content Control:** Delete generated content and prompts

### Communication Preferences
- **Email Settings:** Opt out of non-essential communications
- **Notifications:** Control app notifications through device settings

### Data Portability
- **Export:** Request a copy of your data in a portable format

## 7. Data Security

We implement appropriate security measures to protect your information:
- **Encryption:** Data is encrypted in transit and at rest
- **Access Controls:** Limited access to personal information on a need-to-know basis
- **Regular Security Reviews:** Ongoing assessment of security practices
- **Secure Infrastructure:** Industry-standard security protocols and monitoring

## 8. International Data Transfers

Your information may be processed in countries other than your own. We ensure appropriate safeguards are in place for international transfers, including:
- **Adequacy Decisions:** Transfers to countries with adequate data protection
- **Standard Contractual Clauses:** Legal frameworks for secure international transfers

## 9. Children's Privacy

The App is not intended for children under 13. We do not knowingly collect personal information from children under 13. If we discover we have collected such information, we will delete it promptly.

## 10. Third-Party Links and Services

The App may contain links to third-party websites or services. We are not responsible for the privacy practices of these third parties. Please review their privacy policies before providing any information.

## 11. Changes to This Privacy Policy

We may update this Privacy Policy from time to time. We will notify you of significant changes by:
- **In-App Notifications:** Prominent notices within the App
- **Email:** Notifications to your registered email address
- **Effective Date:** Updated date at the top of this policy

Continued use of the App after changes constitutes acceptance of the updated Privacy Policy.

## 12. Contact Information

For questions, concerns, or requests regarding this Privacy Policy or your personal information, please contact us at:

**Email:** ${APP_CONTACT_EMAIL}

**Response Time:** We aim to respond to privacy inquiries within 30 days.

## 13. Regional Compliance

### For EU/UK Users (GDPR)
- **Legal Basis:** We process your data based on legitimate interests, contract performance, and consent
- **Data Protection Rights:** Access, rectification, erasure, portability, restriction, and objection
- **Data Protection Officer:** Contact ${APP_CONTACT_EMAIL} for data protection matters

### For California Users (CCPA)
- **Right to Know:** Request information about collected personal information
- **Right to Delete:** Request deletion of personal information
- **Right to Opt-Out:** Opt out of the sale of personal information (we don't sell personal information)

### For Canadian Users (PIPEDA)
- **Consent:** We obtain meaningful consent for collection, use, and disclosure of personal information
- **Access Rights:** Request access to your personal information and how it's being used
- **Correction Rights:** Request correction of inaccurate personal information
- **Withdrawal of Consent:** Withdraw consent for non-essential processing (subject to legal and contractual restrictions)
- **Complaint Process:** File complaints with the Privacy Commissioner of Canada if privacy concerns are not resolved

---

*Last updated: ${EFFECTIVE_DATE}*`;

  const processedContent = await remark().use(html).process(md);

  return processedContent.toString();
}

export default async function PrivacyPolicy() {
  const htmlContent = await getPrivacyContent();

  return (
    <main
      className="prose prose-sm mx-auto"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: This is safe
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  );
}

export const metadata = {
  title: "Privacy Policy",
  description: `Privacy Policy for ${APP_NAME}`,
};
