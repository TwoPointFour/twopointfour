import { useHistory } from "react-router";
import Button from "../UI/Button";
import Card from "../UI/Card";
import Modal from "../UI/Modal";
import styles from "./Terms.module.css";

const Terms = () => {
  const history = useHistory();

  function onModalClose() {
    history.goBack();
  }
  return (
    <Modal>
      <Card color="white">
        <div className={styles.terms}>
          <h2>Terms and conditions</h2>

          <h3>1. Introduction</h3>

          <p>
            The following terms and conditions constitute an agreement between you and TwoPointFour
            the operator of twopointfour.app (the &ldquo;Site&rdquo;). This agreement governs your
            use of the Site, both as an unregistered visitor and as a registered user. BY USING THE
            SITE, AND/OR BY REGISTERING WITH US, YOU SIGNIFY THAT YOU AGREE TO THESE TERMS OF USE,
            including that you consent to the information practices disclosed in our Privacy Policy,
            which is incorporated herein by reference. Please note that we offer the Site &ldquo;AS
            IS&rdquo; and without warranties. All information we collect on the Site is subject to
            our Privacy Policy. By using the Site, you consent to all actions taken by us with
            respect to your information in compliance with the Privacy Policy.
          </p>

          <p>
            This Site is offered and available to users who are 18 years of age or older. By using
            this Site, you represent and warrant that you are of legal age to form a binding
            contract with TwoPointFour and meet all of the foregoing eligibility requirements. If
            you do not meet all of these requirements, you must not access or use the Site.
          </p>

          <h3>2. We Do Not Provide Health Advice</h3>

          <p>
            The information provided by TwoPointFour is for educational purposes only and not
            intended to be a substitute for professional medical advice, health advice, fitness
            advice, diagnosis, or treatment. You are advised to seek professional diagnosis and
            treatment for any medical condition. Do not disregard, avoid or delay obtaining medical
            advice from a healthcare professional because of something that you may have read on the
            Site.
          </p>

          <p>
            Your use of information provided on the Site is at your own risk. Nothing stated or
            posted on the Site or available through any of the provided services are intended to be,
            and must not be taken to be, the Practice Of Medicine or the Provision of Medical Care.
            You are strongly advised to discuss information obtained from this website with your
            trainer and healthcare provider before undertaking any of the workouts suggested on our
            site.
          </p>

          <h3>3. Waiver of Responsibility Safety of Suggested Workouts</h3>

          <p>
            TwoPointFour utilises an automated approach in suggesting workouts for you. While we aim
            to provide the best workouts with safety in consideration, we cannot guarantee that the
            workouts you find on TwoPointFour will be safe for you. We understand that you may have
            a large portion of medical history that is unknown to us. Therefore, we require all our
            users to be checked by a medical doctor to be deemed safe to undertake our suggested
            workouts.
          </p>

          <h3>4. Licence To Use Website</h3>

          <p>
            Unless otherwise stated, we or our licensors own the intellectual property rights in the
            website and material on the website. Subject to the license below, all these
            intellectual property rights are reserved. You may view, download for caching purposes
            only, and print pages from the website for your own personal use, subject to the
            restrictions set out below and elsewhere in these terms of use. You must not: A.
            Republish material from this website (including republication on another website); B.
            Sell, rent or sub-license material from the website; C. Show any material from the
            website in public; D. Reproduce, duplicate, copy or otherwise exploit material on our
            website for a commercial purpose; E. Edit or otherwise modify any material on the
            website; or F. Redistribute material from this website (except for content specifically
            and expressly made available for redistribution).
          </p>

          <h3>5. Acceptable Use</h3>

          <p>
            You must not use our website in any way that causes, or may cause, damage to the website
            or impairment of the availability or accessibility of the website; or in any way which
            is unlawful, illegal, fraudulent or harmful, or in connection with any unlawful,
            illegal, fraudulent or harmful purpose or activity.
          </p>

          <p>
            You must not conduct any systematic or automated data collection activities (including
            without limitation scraping, data mining, data extraction and data harvesting) on or in
            relation to our website without our express written consent. You must not use our
            website for any purposes related to marketing without our express written consent.
          </p>

          <h3>6. Restricted Access</h3>

          <p>
            Access to certain areas of our website is restricted. We reserve the right to restrict
            access to other areas of our website, or indeed our whole website, at our discretion. We
            may disable your user ID and password in our sole discretion without notice or
            explanation.
          </p>

          <h3>7. Limited Warranties</h3>

          <p>
            To the maximum extent permitted by applicable law we exclude all representations,
            warranties and conditions relating to this website, whether express or implied, and the
            use of this website (including, without limitation, any warranties implied by law of
            satisfactory quality, fitness for purpose and/or the use of reasonable care and skill).
          </p>

          <p>
            WE PROVIDE THE SITE AND THE SERVICES &ldquo;AS IS&rdquo;, &ldquo;WITH ALL FAULTS&rdquo;
            AND &ldquo;AS AVAILABLE.&rdquo; WE MAKE NO EXPRESS OR IMPLIED WARRANTIES OR GUARANTEES
            ABOUT THE SERVICES. TO THE MAXIMUM EXTENT PERMITTED BY LAW, WE HEREBY DISCLAIM ALL SUCH
            WARRANTIES, INCLUDING ALL STATUTORY WARRANTIES, WITH RESPECT TO THE SERVICES AND THE
            SITE, INCLUDING WITHOUT LIMITATION ANY WARRANTIES THAT THE SERVICES ARE MERCHANTABLE, OF
            SATISFACTORY QUALITY, ACCURATE, FIT FOR A PARTICULAR PURPOSE OR NEED, OR NON-INFRINGING.
            WE DO NOT GUARANTEE THAT THE RESULTS THAT MAY BE OBTAINED FROM THE USE OF THE SERVICES
            WILL BE EFFECTIVE, RELIABLE OR ACCURATE OR WILL MEET YOUR REQUIREMENTS.
          </p>

          <h3>8. Limitations of Liability</h3>

          <p>
            Our liability to you in relation to the use of our website or under or in connection
            with these terms of use, whether in contract, tort (including negligence) or otherwise,
            will be limited as follows: A. To the extent that the website and the information and
            services on the website are provided free-of-charge, we will not be liable for any loss
            or damage of any nature; B. We will not be liable for any consequential, indirect or
            special loss or damage; C. We will not be liable for any loss of profit, income,
            revenue, anticipated savings, contracts, business, goodwill, reputation, data, or
            information; D. We will not be liable for any loss or damage arising out of any event or
            events beyond our reasonable control; E. Our maximum liability in relation to any event
            or series of related events will be limited to $200.
          </p>

          <p>
            You accept that we have an interest in limiting the personal liability of our officers
            and employees. Having regard to that interest, you accept that we are a limited
            liability entity and agree that you will not bring any claim personally against
            individual officers or employees in respect of any losses you suffer in connection with
            the website or these terms of use. This will not, of course, limit or exclude the
            liability of the company itself for the acts and omissions of our officers and
            employees.
          </p>

          <p>
            YOUR SOLE AND EXCLUSIVE REMEDY FOR ANY DISPUTE WITH US IS THE CANCELLATION OF YOUR
            REGISTRATION.
          </p>

          <h3>9. Indemnity</h3>

          <p>
            You hereby indemnify us, our licensors and service providers, and ours and their
            respective officers, directors, employees, contractors, agents, licensors, suppliers,
            successors and assigns (&ldquo;Indemnified Parties&rdquo;) and undertake to keep the
            Indemnified Parties indemnified against any losses, damages, costs, liabilities and
            expenses (including without limitation legal expenses and any amounts paid by the
            Indemnified Parties to a third party in settlement of a claim or dispute on the advice
            of the Indemnified Parties&rsquo; legal advisers) incurred or suffered by the
            Indemnified Parties arising out of any breach by you of any provision of these terms of
            use or your use of the Site, or arising out of any claim or judgment that you have
            breached any provision of these terms of use.
          </p>

          <h3>10. Breaches of these Terms of Use</h3>

          <p>
            Without prejudice to our other rights under these terms of use, if you breach these
            terms of use in any way, or if we reasonably suspect that you have breached these terms
            of use in any way, we may: A. Send you one or more formal warnings; B. Temporarily
            suspend your access to the website; C. Permanently prohibit you from accessing the
            website; D. Block computers using your IP address from accessing the website; E. Contact
            your internet services provider and request that they block your access to the website;
            F. Bring court proceedings against you for breach of contract or otherwise; G. Suspend
            and/or delete your account with the website; and/or
          </p>

          <p>
            Where we suspend or prohibit or block your access to our website or a part of our
            website, you must not take any action to circumvent such suspension or prohibition or
            blocking (including without limitation creating and/or using a different account).
          </p>

          <h3>11. Third Party Websites</h3>

          <p>
            Our Site includes hyperlinks to other websites owned and operated by third parties.
            These links are not recommendations. We have no control over the contents of third party
            websites, and we accept no responsibility for them or for any loss or damage that may
            arise from your use of them.
          </p>

          <p>
            You may link to our homepage, provided you do so in a way that is fair and legal and
            does not damage our reputation or take advantage of it, but you must not establish a
            link in such a way as to suggest any form of association, approval or endorsement on our
            part without our express written consent.
          </p>

          <h3>12. Trademarks</h3>

          <p>
            TwoPointFour, TwoPointFour.com and our logo are trademarks belonging to us. We give no
            permission for the use of these trademarks, and such use may constitute an infringement
            of our rights.
          </p>

          <p>
            The other registered and unregistered trademarks or service marks on our website are the
            property of their respective owners. Unless stated otherwise, we do not endorse and are
            not affiliated with any of the holders of any such rights and as such we cannot grant
            any license to exercise such rights.
          </p>

          <h3>13. Variation</h3>

          <p>
            We may revise these terms of use from time-to-time. Revised terms of use will apply to
            the use of our website from the date of the publication of the revised terms of use on
            our website. Please check this page regularly to ensure you are familiar with the
            current version. Your continued use of the Site implies acceptance of any revised terms
            of use.
          </p>

          <h3>14. Assignment</h3>

          <p>
            We may sub-contract, assign, delegate or otherwise transfer our rights, remedies and
            obligations under these terms of use without notifying you or obtaining your consent.
          </p>

          <p>
            You may not sub-contract, assign, delegate or otherwise transfer your rights, remedies
            and obligations under these terms of use, without our express written consent.
          </p>

          <h3>15. Severability and Waiver</h3>

          <p>
            If a provision of these terms of use is determined by any court or other competent
            authority to be unlawful and/or unenforceable, the other provisions will continue in
            effect. If any unlawful and/or unenforceable provision would be lawful or enforceable if
            part of it were deleted, that part will be deemed to be deleted, and the rest of the
            provision will continue in effect.
          </p>

          <p>
            No waiver of by us of any term set forth in these terms of use shall be deemed a further
            or continuing waiver of such term or a waiver of any other term, and any failure by us
            to assert a right or provision under these terms of use shall not constitute a waiver of
            such right or provision.
          </p>

          <h3>16. Exclusion of Third Party Rights</h3>

          <p>
            Except as otherwise set forth in these terms of use, these terms of use are for the
            benefit of you and us and are not intended to benefit any third party or be enforceable
            by any third party. The exercise of our and your rights in relation to these terms of
            use is not subject to the consent of any third party.
          </p>

          <h3>17. Entire Agreement</h3>

          <p>
            These terms of use, together with our privacy policy, cookie policy, and other policies
            mentioned in these terms of use, constitute the entire agreement between you and us in
            relation to your use of our website, and supersede all previous agreements,
            understandings, representations and warranties (both oral and written) in respect of
            your use of this website.
          </p>

          <h3>18. Law and Jurisdiction</h3>

          <p>
            All matters relating to the Site and these terms of use and any dispute or claim arising
            therefrom or related thereto (in each case, including non-contractual disputes or
            claims), shall be governed by and construed in accordance with the laws of Singapore.
          </p>

          <p>
            Any legal suit, action or proceeding arising out of, or related to, these terms of use
            or the Site shall be instituted exclusively in the courts of the Republic of Singapore
            (although we retain the right to bring any suit, action or proceeding against you for
            breach of these terms of use in your country of residence or any other relevant
            country). You waive any and all objections to the exercise of jurisdiction over you by
            such courts and to venue in such courts.
          </p>

          <h3>19. Arbitration</h3>

          <p>
            At our sole discretion, we may require you to submit any disputes arising from the use
            of these terms of use or the Site, including disputes arising from or concerning their
            interpretation, violation, invalidity, non-performance, or termination, to final and
            binding arbitration by the Singapore International Arbitration Centre.
          </p>

          <h3>20. Limitation on Time to File Claims</h3>

          <p>
            ANY CAUSE OF ACTION OR CLAIM YOU MAY HAVE ARISING OUT OF OR RELATING TO THESE TERMS OF
            USE OR THE WEBSITE MUST BE COMMENCED WITHIN ONE (1) YEAR AFTER THE CAUSE OF ACTION
            ACCRUES, OTHERWISE, SUCH CAUSE OF ACTION OR CLAIM IS PERMANENTLY BARRED.
          </p>

          <h3>21. Your Comments and Concerns</h3>

          <p>
            This website is operated by TwoPointFour. All notices of copyright infringement claims
            should be sent to twopointfourapp@gmail.com.
          </p>

          <p>
            All other feedback, comments, requests for technical support and other communications
            relating to the Site should be directed to twopointfourapp@gmail.com.
          </p>
          <Button onClickHandler={onModalClose} color="yellow-fill" length="large">
            Close
          </Button>
        </div>
      </Card>
    </Modal>
  );
};

export default Terms;
