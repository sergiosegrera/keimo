import { remark } from "remark";
import html from "remark-html";
import { APP_NAME, APP_CONTACT_EMAIL } from "@/lib/constants";

const EFFECTIVE_DATE = "17 June 2025";

async function getTermsContent() {
  const md = `
# Terms of Service

**Effective Date:** ${EFFECTIVE_DATE}

## 1. Acceptance of Terms
By using ${APP_NAME} ("the App"), you agree to these Terms of Service. If you don't agree, please don't use the App.

## 2. Service Description
${APP_NAME}

## 3. User Accounts and Conduct
- You must provide accurate information when creating an account
- You're responsible for maintaining the security of your account
- You may not use the App for illegal, harmful, or offensive purposes
- You may not attempt to reverse engineer or exploit the App

## 4. Generated Content
- You retain ownership of content you generate through the App
- You may use generated content for personal and commercial purposes
- We don't claim ownership of your generated content
- You're responsible for ensuring your use of generated content complies with applicable laws

## 5. Intellectual Property
- The App and its underlying technology remain our property
- You may not copy, modify, or distribute the App itself
- Our trademarks and branding materials are protected

## 6. Privacy
Your privacy is important to us. Please review our Privacy Policy for information about how we collect and use your data.

## 7. Disclaimers
- The App is provided "as is" without warranties
- We don't guarantee uninterrupted service or error-free operation
- Generated content may not always meet your expectations

## 8. Limitation of Liability
We're not liable for any indirect, incidental, or consequential damages arising from your use of the App.

## 9. Termination
We may suspend or terminate your account for violations of these terms. You may delete your account at any time.

## 10. Disputes and Contact
For any disputes, questions, or concerns regarding these terms or the App, please contact us at:

**${APP_CONTACT_EMAIL}**

## 11. Changes to Terms
We may update these terms occasionally. Continued use of the App after changes constitutes acceptance of the new terms.

## 12. Governing Law
These terms are governed by the laws of the United States.

---

*Last updated: ${EFFECTIVE_DATE}*
  `;

  const processedContent = await remark().use(html).process(md);

  return processedContent.toString();
}

export default async function Terms() {
  const htmlContent = await getTermsContent();

  return (
    <main
      className="prose prose-sm mx-auto"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: This is safe
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  );
}

export const metadata = {
  title: "Terms of Service",
  description: `Terms and conditions for using ${APP_NAME}`,
};
