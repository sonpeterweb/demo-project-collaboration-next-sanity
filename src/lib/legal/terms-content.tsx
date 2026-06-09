import {
  LegalCallout,
  type LegalSection,
} from "@/components/marketing/legal-page";

export function getTermsSections(siteTitle: string): LegalSection[] {
  return [
    {
      id: "agreement",
      title: "Agreement to terms",
      content: (
        <>
          <p>
            These Terms of Service (&quot;Terms&quot;) constitute a legally
            binding agreement between you and {siteTitle} Inc. (&quot;
            {siteTitle}&quot;, &quot;we&quot;, &quot;us&quot;, or
            &quot;our&quot;) governing your access to and use of the {siteTitle}{" "}
            website, application programming interfaces, and collaboration
            platform (collectively, the &quot;Service&quot;).
          </p>
          <p>
            By creating an account, accessing, or using the Service, you
            acknowledge that you have read, understood, and agree to be bound by
            these Terms and our <a href="/privacy">Privacy Policy</a>. If you do
            not agree, you may not use the Service.
          </p>
          <LegalCallout title="Important">
            <p>
              If you are using the Service on behalf of a company or
              organization, you represent that you have authority to bind that
              entity to these Terms. In that case, &quot;you&quot; refers to the
              entity.
            </p>
          </LegalCallout>
        </>
      ),
    },
    {
      id: "eligibility",
      title: "Eligibility",
      content: (
        <>
          <p>To use the Service, you must:</p>
          <ul>
            <li>Be at least 16 years of age</li>
            <li>
              Have the legal capacity to enter into a binding contract in your
              jurisdiction
            </li>
            <li>
              Not be prohibited from using the Service under applicable laws,
              including export control and sanctions regulations
            </li>
            <li>
              Provide accurate registration information and keep it up to date
            </li>
          </ul>
          <p>
            We reserve the right to refuse service, terminate accounts, or
            cancel orders at our discretion, particularly where we suspect
            fraudulent, abusive, or unlawful activity.
          </p>
        </>
      ),
    },
    {
      id: "accounts",
      title: "Account registration & security",
      content: (
        <>
          <p>
            You are responsible for maintaining the confidentiality of your
            login credentials and for all activity that occurs under your
            account. You agree to:
          </p>
          <ul>
            <li>
              Use a strong, unique password and enable two-factor authentication
              when available
            </li>
            <li>
              Notify us immediately at{" "}
              <a href="mailto:security@flowspace.dev">security@flowspace.dev</a>{" "}
              if you suspect unauthorized access
            </li>
            <li>
              Not share account credentials or allow others to access your
              account except through authorized workspace invites
            </li>
            <li>Ensure that users you invite comply with these Terms</li>
          </ul>
          <p>
            Workspace administrators are responsible for configuring appropriate
            access permissions and managing member roles within their
            organization.
          </p>
        </>
      ),
    },
    {
      id: "acceptable-use",
      title: "Acceptable use",
      content: (
        <>
          <p>
            You may use the Service only for lawful purposes and in accordance
            with these Terms. You agree not to:
          </p>
          <ul>
            <li>
              Violate any applicable law, regulation, or third-party rights,
              including intellectual property and privacy rights
            </li>
            <li>
              Upload, transmit, or store malware, spam, phishing content, or
              material that is defamatory, obscene, or harassing
            </li>
            <li>
              Attempt to gain unauthorized access to the Service, other
              accounts, or connected systems through hacking, credential
              stuffing, or similar means
            </li>
            <li>
              Reverse engineer, decompile, or attempt to extract source code
              from the Service, except where permitted by applicable law
            </li>
            <li>
              Scrape, crawl, or use automated means to access the Service
              without our prior written consent
            </li>
            <li>
              Resell, sublicense, or white-label the Service without a separate
              enterprise agreement
            </li>
            <li>
              Interfere with or disrupt the integrity or performance of the
              Service or its infrastructure
            </li>
          </ul>
          <p>
            We may investigate violations and cooperate with law enforcement.
            Repeated or serious violations may result in immediate account
            suspension.
          </p>
        </>
      ),
    },
    {
      id: "your-content",
      title: "Your content & license",
      content: (
        <>
          <p>
            You retain all ownership rights to content you submit, upload, or
            create through the Service (&quot;Your Content&quot;). By using the
            Service, you grant {siteTitle} a worldwide, non-exclusive,
            royalty-free license to host, store, reproduce, display, and process
            Your Content solely as necessary to:
          </p>
          <ul>
            <li>Provide, maintain, and improve the Service</li>
            <li>Perform backups and ensure data availability</li>
            <li>Comply with legal obligations and enforce these Terms</li>
          </ul>
          <p>
            You represent and warrant that you have all necessary rights to Your
            Content and that its use through the Service does not infringe any
            third-party rights. You are solely responsible for Your Content and
            the consequences of sharing it within your workspace.
          </p>
          <LegalCallout title="Feedback">
            <p>
              If you submit ideas, suggestions, or feedback about the Service,
              we may use them without restriction or compensation to you.
            </p>
          </LegalCallout>
        </>
      ),
    },
    {
      id: "subscriptions",
      title: "Subscriptions, billing & refunds",
      content: (
        <>
          <p>
            Certain features require a paid subscription. Pricing, plan
            features, and billing cycles are described on our{" "}
            <a href="/pricing">Pricing page</a> and may change with notice.
          </p>
          <h3>Billing terms</h3>
          <ul>
            <li>
              Subscriptions renew automatically at the end of each billing
              period unless cancelled before the renewal date
            </li>
            <li>
              You authorize us to charge your payment method on file for
              recurring fees and applicable taxes
            </li>
            <li>
              Upgrades take effect immediately; downgrades take effect at the
              next billing cycle
            </li>
            <li>
              Failed payments may result in service suspension after a 7-day
              grace period
            </li>
          </ul>
          <h3>Refunds</h3>
          <p>
            Monthly subscriptions are non-refundable except where required by
            law. Annual subscriptions may be eligible for a pro-rata refund
            within 14 days of initial purchase if you contact{" "}
            <a href="mailto:billing@flowspace.dev">billing@flowspace.dev</a>.
            Free trials convert to paid plans unless cancelled before the trial
            ends.
          </p>
        </>
      ),
    },
    {
      id: "service-availability",
      title: "Service availability & modifications",
      content: (
        <>
          <p>
            We strive to maintain 99.9% uptime for paid plans but do not
            guarantee uninterrupted or error-free access. The Service may be
            temporarily unavailable due to maintenance, updates, or
            circumstances beyond our reasonable control.
          </p>
          <p>
            We may modify, suspend, or discontinue any part of the Service at
            any time. For material changes that negatively affect paid
            subscribers, we will provide at least 30 days&apos; notice when
            commercially reasonable. Beta features are provided &quot;as
            is&quot; and may be changed or removed without notice.
          </p>
        </>
      ),
    },
    {
      id: "intellectual-property",
      title: "Intellectual property",
      content: (
        <>
          <p>
            The Service, including its software, design, logos, documentation,
            and trademarks, is owned by {siteTitle} and protected by
            intellectual property laws. Except for the limited rights expressly
            granted in these Terms, no license or rights are transferred to you.
          </p>
          <p>
            You may not use {siteTitle} branding without our prior written
            consent. If you wish to reference {siteTitle} in marketing materials
            or case studies, contact{" "}
            <a href="mailto:partners@flowspace.dev">partners@flowspace.dev</a>.
          </p>
        </>
      ),
    },
    {
      id: "third-party",
      title: "Third-party services",
      content: (
        <p>
          The Service may integrate with or link to third-party products and
          services (e.g., GitHub, Slack, Stripe). Your use of third-party
          services is governed by their respective terms and privacy policies.{" "}
          {siteTitle} is not responsible for third-party services and does not
          endorse or assume liability for their content, policies, or practices.
        </p>
      ),
    },
    {
      id: "disclaimers",
      title: "Disclaimer of warranties",
      content: (
        <>
          <p>
            THE SERVICE IS PROVIDED &quot;AS IS&quot; AND &quot;AS
            AVAILABLE&quot; WITHOUT WARRANTIES OF ANY KIND, WHETHER EXPRESS,
            IMPLIED, OR STATUTORY, INCLUDING BUT NOT LIMITED TO IMPLIED
            WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE,
            TITLE, AND NON-INFRINGEMENT.
          </p>
          <p>
            We do not warrant that the Service will meet your requirements, be
            uninterrupted, secure, or free of errors, or that defects will be
            corrected. Some jurisdictions do not allow exclusion of implied
            warranties, so some of the above exclusions may not apply to you.
          </p>
        </>
      ),
    },
    {
      id: "liability",
      title: "Limitation of liability",
      content: (
        <>
          <p>
            TO THE MAXIMUM EXTENT PERMITTED BY LAW, {siteTitle.toUpperCase()}{" "}
            AND ITS OFFICERS, DIRECTORS, EMPLOYEES, AGENTS, AND AFFILIATES SHALL
            NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL,
            OR PUNITIVE DAMAGES, INCLUDING LOSS OF PROFITS, DATA, GOODWILL, OR
            BUSINESS OPPORTUNITIES, ARISING FROM YOUR USE OF THE SERVICE.
          </p>
          <p>
            OUR TOTAL AGGREGATE LIABILITY FOR ANY CLAIMS ARISING OUT OF OR
            RELATING TO THESE TERMS OR THE SERVICE SHALL NOT EXCEED THE GREATER
            OF (A) THE AMOUNTS YOU PAID US IN THE TWELVE (12) MONTHS PRECEDING
            THE CLAIM, OR (B) ONE HUNDRED US DOLLARS ($100).
          </p>
          <p>
            These limitations apply regardless of the theory of liability and
            even if we have been advised of the possibility of such damages.
          </p>
        </>
      ),
    },
    {
      id: "indemnification",
      title: "Indemnification",
      content: (
        <p>
          You agree to indemnify, defend, and hold harmless {siteTitle} and its
          affiliates from any claims, damages, losses, liabilities, and expenses
          (including reasonable attorneys&apos; fees) arising from Your Content,
          your use of the Service, your violation of these Terms, or your
          violation of any third-party rights.
        </p>
      ),
    },
    {
      id: "termination",
      title: "Termination",
      content: (
        <>
          <p>
            You may cancel your account at any time through account settings or
            by contacting support. We may suspend or terminate your access
            immediately if you breach these Terms, fail to pay fees, or if
            continued provision of the Service poses legal or security risks.
          </p>
          <p>Upon termination:</p>
          <ul>
            <li>Your right to access the Service ceases immediately</li>
            <li>
              We may delete Your Content after the retention period described in
              our Privacy Policy
            </li>
            <li>
              Provisions that by their nature should survive (including
              intellectual property, disclaimers, limitation of liability, and
              indemnification) remain in effect
            </li>
          </ul>
        </>
      ),
    },
    {
      id: "governing-law",
      title: "Governing law & disputes",
      content: (
        <>
          <p>
            These Terms are governed by the laws of the State of Delaware,
            United States, without regard to conflict of law principles. Any
            dispute arising from these Terms or the Service shall be resolved
            through binding arbitration in accordance with the American
            Arbitration Association rules, except that either party may seek
            injunctive relief in court for intellectual property violations.
          </p>
          <p>
            You waive any right to participate in a class action lawsuit or
            class-wide arbitration against {siteTitle}.
          </p>
        </>
      ),
    },
    {
      id: "changes",
      title: "Changes to these terms",
      content: (
        <>
          <p>
            We may revise these Terms from time to time. When we make material
            changes, we will notify account holders by email or in-app message
            at least 30 days before the changes take effect. The updated Terms
            will be posted on this page with a revised &quot;Last updated&quot;
            date.
          </p>
          <p>
            Your continued use of the Service after the effective date
            constitutes acceptance of the revised Terms. If you do not agree,
            you must stop using the Service and cancel your account before the
            changes take effect.
          </p>
        </>
      ),
    },
  ];
}
