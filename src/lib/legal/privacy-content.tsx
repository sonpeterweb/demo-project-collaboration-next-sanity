import {
  LegalCallout,
  type LegalSection,
} from "@/components/marketing/legal-page";

export function getPrivacySections(siteTitle: string): LegalSection[] {
  return [
    {
      id: "overview",
      title: "Overview",
      content: (
        <>
          <p>
            {siteTitle} (&quot;{siteTitle}&quot;, &quot;we&quot;,
            &quot;us&quot;, or &quot;our&quot;) provides a cloud-based demo
            marketing platform built with Next.js and Sanity. This Privacy
            Policy explains what personal data we collect, why we collect it,
            how we use and share it, and the choices you have.
          </p>
          <p>
            This policy applies to visitors of our marketing website, account
            holders, workspace members, and anyone who interacts with our
            support channels. It does not apply to third-party services you
            connect to {siteTitle} (such as GitHub or Slack), which are governed
            by their own privacy policies.
          </p>
          <LegalCallout title="Summary">
            <p>
              We collect data to run the product, keep accounts secure, and
              improve the service. We do not sell personal information. You can
              access, export, or delete your data by contacting us.
            </p>
          </LegalCallout>
        </>
      ),
    },
    {
      id: "information-we-collect",
      title: "Information we collect",
      content: (
        <>
          <p>
            The information we collect depends on how you use {siteTitle}. We
            group it into the categories below.
          </p>
          <h3>Information you provide directly</h3>
          <ul>
            <li>
              <strong>Account details</strong> — name, email address, profile
              photo, job title, and authentication credentials when you sign up
              via email or OAuth providers (e.g., GitHub).
            </li>
            <li>
              <strong>Workspace content</strong> — projects, tasks, comments,
              files, and messages you create or upload within your
              organization&apos;s workspace.
            </li>
            <li>
              <strong>Billing information</strong> — payment method and billing
              address processed by our payment provider; we do not store full
              card numbers on our servers.
            </li>
            <li>
              <strong>Support and contact submissions</strong> — information you
              include when contacting sales, support, or submitting our contact
              form.
            </li>
          </ul>
          <h3>Information collected automatically</h3>
          <ul>
            <li>
              <strong>Usage data</strong> — features used, pages viewed, click
              patterns, session duration, and interaction events within the
              product.
            </li>
            <li>
              <strong>Device and log data</strong> — IP address, browser type,
              operating system, device identifiers, and timestamps for security
              and diagnostics.
            </li>
            <li>
              <strong>Cookies and similar technologies</strong> — see the
              Cookies section below for details.
            </li>
          </ul>
          <h3>Information from third parties</h3>
          <p>
            If you connect integrations (e.g., GitHub, Slack), we receive
            limited profile and activity data authorized by you through OAuth.
            We only request scopes necessary to provide the integration feature.
          </p>
        </>
      ),
    },
    {
      id: "how-we-use-information",
      title: "How we use your information",
      content: (
        <>
          <p>We use personal information for the following purposes:</p>
          <ol>
            <li>
              <strong>Provide the Service</strong> — create and manage accounts,
              authenticate users, sync workspace data, and deliver core product
              functionality.
            </li>
            <li>
              <strong>Communicate with you</strong> — send transactional emails
              (invites, password resets, billing receipts), product
              announcements, and respond to support requests.
            </li>
            <li>
              <strong>Improve and develop</strong> — analyze aggregated usage to
              fix bugs, optimize performance, and prioritize new features.
            </li>
            <li>
              <strong>Security and fraud prevention</strong> — detect abuse,
              investigate incidents, and protect the integrity of the platform.
            </li>
            <li>
              <strong>Legal compliance</strong> — satisfy legal obligations,
              respond to lawful requests, and enforce our Terms of Service.
            </li>
          </ol>
          <p>
            We process data based on contractual necessity (to provide the
            Service), legitimate interests (security and product improvement),
            consent (where required, such as marketing emails), and legal
            obligations.
          </p>
        </>
      ),
    },
    {
      id: "sharing",
      title: "How we share information",
      content: (
        <>
          <p>
            We do not sell, rent, or trade your personal information. We share
            data only in the limited circumstances described below.
          </p>
          <ul>
            <li>
              <strong>Service providers</strong> — trusted vendors who assist
              with hosting (Vercel), content management (Sanity), email
              delivery, analytics, and payment processing. These providers are
              bound by data processing agreements and may only use data to
              perform services on our behalf.
            </li>
            <li>
              <strong>Within your organization</strong> — workspace admins and
              members can access content according to role-based permissions you
              configure.
            </li>
            <li>
              <strong>Business transfers</strong> — if {siteTitle} is involved
              in a merger, acquisition, or asset sale, your information may be
              transferred as part of that transaction with notice to affected
              users.
            </li>
            <li>
              <strong>Legal requirements</strong> — when required by law,
              subpoena, or to protect the rights, property, or safety of{" "}
              {siteTitle}, our users, or the public.
            </li>
          </ul>
        </>
      ),
    },
    {
      id: "retention",
      title: "Data retention",
      content: (
        <>
          <p>
            We retain personal information for as long as your account is active
            or as needed to provide the Service. Specific retention periods
            include:
          </p>
          <ul>
            <li>
              <strong>Active accounts</strong> — data is retained for the life
              of the subscription or free account.
            </li>
            <li>
              <strong>Deleted accounts</strong> — workspace content is purged
              within 30 days of confirmed deletion; backups may persist for up
              to 90 days before being overwritten.
            </li>
            <li>
              <strong>Audit logs</strong> — security and access logs are
              retained for 12 months on Pro plans and 24 months on Enterprise
              plans.
            </li>
            <li>
              <strong>Billing records</strong> — retained for 7 years to comply
              with tax and accounting regulations.
            </li>
          </ul>
          <p>
            You may request earlier deletion by contacting{" "}
            <a href="mailto:privacy@flowspace.dev">privacy@flowspace.dev</a>.
            Some data may be retained where required by law.
          </p>
        </>
      ),
    },
    {
      id: "security",
      title: "Security",
      content: (
        <>
          <p>
            We implement administrative, technical, and physical safeguards
            designed to protect your information, including:
          </p>
          <ul>
            <li>TLS encryption for data in transit</li>
            <li>Encryption at rest for databases and file storage</li>
            <li>
              Role-based access controls and SSO support on eligible plans
            </li>
            <li>Regular vulnerability assessments and penetration testing</li>
            <li>Employee access limited on a need-to-know basis</li>
          </ul>
          <p>
            No method of transmission or storage is completely secure. If you
            believe your account has been compromised, contact us immediately at{" "}
            <a href="mailto:security@flowspace.dev">security@flowspace.dev</a>.
          </p>
        </>
      ),
    },
    {
      id: "your-rights",
      title: "Your privacy rights",
      content: (
        <>
          <p>
            Depending on your location, you may have the following rights
            regarding your personal data:
          </p>
          <ul>
            <li>
              <strong>Access</strong> — request a copy of the personal data we
              hold about you.
            </li>
            <li>
              <strong>Correction</strong> — update inaccurate or incomplete
              information in your account settings or by contacting us.
            </li>
            <li>
              <strong>Deletion</strong> — request deletion of your account and
              associated data, subject to legal retention requirements.
            </li>
            <li>
              <strong>Portability</strong> — export your workspace data in a
              machine-readable format.
            </li>
            <li>
              <strong>Objection and restriction</strong> — object to certain
              processing or request restricted use of your data.
            </li>
          </ul>
          <p>
            For users in the European Economic Area and UK, you also have the
            right to lodge a complaint with your local data protection
            authority. California residents may have additional rights under the
            CCPA/CPRA, including the right to know and the right to opt out of
            certain data sharing (note: we do not sell personal information).
          </p>
        </>
      ),
    },
    {
      id: "cookies",
      title: "Cookies & tracking",
      content: (
        <>
          <p>
            We use cookies and similar technologies to operate the Service and
            understand how our marketing site is used.
          </p>
          <ul>
            <li>
              <strong>Essential cookies</strong> — required for authentication,
              session management, and security. These cannot be disabled while
              using the product.
            </li>
            <li>
              <strong>Analytics cookies</strong> — help us measure traffic and
              usage patterns on our marketing pages. You may opt out via your
              browser settings.
            </li>
            <li>
              <strong>Preference cookies</strong> — remember settings such as
              theme (light/dark mode) and language.
            </li>
          </ul>
          <p>
            Most browsers allow you to control cookies through settings.
            Disabling essential cookies may prevent you from signing in or using
            core features.
          </p>
        </>
      ),
    },
    {
      id: "international",
      title: "International transfers",
      content: (
        <>
          <p>
            {siteTitle} is operated from the United States. If you access the
            Service from outside the US, your information may be transferred to,
            stored, and processed in the US and other countries where our
            service providers operate.
          </p>
          <p>
            Where required, we use Standard Contractual Clauses (SCCs) or
            equivalent mechanisms to ensure adequate protection for
            international data transfers from the EEA, UK, and Switzerland.
          </p>
        </>
      ),
    },
    {
      id: "children",
      title: "Children's privacy",
      content: (
        <p>
          {siteTitle} is not directed to children under 16. We do not knowingly
          collect personal information from children. If you believe a child has
          provided us with personal data, please contact us and we will take
          steps to delete such information.
        </p>
      ),
    },
    {
      id: "changes",
      title: "Changes to this policy",
      content: (
        <>
          <p>
            We may update this Privacy Policy periodically to reflect changes in
            our practices, technology, or legal requirements. When we make
            material changes, we will:
          </p>
          <ul>
            <li>
              Update the &quot;Last updated&quot; date at the top of this page
            </li>
            <li>
              Notify account holders via email or in-app notification at least
              14 days before changes take effect
            </li>
            <li>
              For significant changes affecting how we use personal data,
              request renewed consent where required by law
            </li>
          </ul>
          <p>
            Continued use of the Service after the effective date constitutes
            acceptance of the updated policy.
          </p>
        </>
      ),
    },
  ];
}
