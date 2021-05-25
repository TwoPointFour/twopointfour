import { useHistory } from "react-router";
import Button from "../UI/Button";
import Card from "../UI/Card/Card";
import Modal from "../UI/Modal";
import styles from "./Privacy.module.css";

const Privacy = () => {
  const history = useHistory();

  function onModalClose() {
    history.goBack();
  }
  return (
    <Modal>
      <Card color="white">
        <div className={styles.privacy}>
          <h2>Privacy Policy</h2>
          <p>
            All changes to this Privacy Policy are effective when they are posted on this page. When
            we change the policy in a material manner, we will let you know via email and/or a
            prominent notice on our web site prior to the change becoming effective and update the
            ‘effective date’ at the top of this page. This document sets forth our Privacy Policy
            and advises you about the information we collect, how we collect it, how we secure and
            protect it, and what choices you have about how that information is used.
          </p>
          <p>
            In summary, the personal fitness/health related information we collect helps us to
            provide the best possible workout suggestions for the individual user on our site. Given
            the nature of the personal data we work with, we pledge to protect your privacy and keep
            your personal information secure and confidential. The personal information you share
            with TwoPointFour is kept strictly confidential and fully secure unless you, the user,
            specifically request otherwise.
          </p>
          <h3>1. Privacy Officer</h3>
          <p>
            In summary, the personal fitness/health related information we collect helps us to
            provide the best possible workout suggestions for the individual user on our site. Given
            the nature of the personal data we work with, we pledge to protect your privacy and keep
            your personal information secure and confidential. The personal information you share
            with TwoPointFour is kept strictly confidential and fully secure unless you, the user,
            specifically request otherwise.
          </p>
          <h3>2. Information We Collect</h3>
          <p>
            We collect information from you in the following manner: A. Non-Personally Identifying
            Information about visitors to our Sites and Applications B. Personally Identifying
            Information C. Information you supply when you create an account with user name and
            password D. Responses to questions you answer in the App
          </p>
          <h3>3. How We Protect Your Information</h3>
          <p>
            TwoPointFour keeps all your personal information confidential in our secure system. No
            other user can view or change your information without your Username and Password.
            TwoPointFour puts you, the user, in control of your personal information. You can edit,
            update or delete information that you have provided by sending an email to
            twopointfourapp@gmail.com. TwoPointFour controls all personal data gathered via our
            Sites. All data is secured in a top-tier secure hosting facility.
          </p>
          <p>
            Only authorized TwoPointFour employees (with special system access controls and
            passwords) are permitted or able to access your personal information. All TwoPointFour
            employees must abide by our code of conduct, security and privacy policies and those who
            violate this policy are subject to disciplinary action, up to and including termination.
          </p>
          <p>
            No method of transmission over the Internet, or method of electronic storage, is 100%
            secure. Therefore, we cannot guarantee the absolute security of your information. If a
            breach of your personal information occurs, we will provide notifications as per
            regulatory requirements. In that event, TwoPointFour would no longer have the ability to
            protect your information. By using our Site and Applications you acknowledge that there
            is risk that the information you share with us may be compromised, despite our efforts
            to protect it.
          </p>
          <h3>4. How to Request, Update or Delete Your Information</h3>
          <p>
            By default, personally identifying information is maintained in our system for three
            years from your last interaction with our Sites and Applications or our services.
          </p>
          <p>
            You may Delete your account via the Delete Profile link provided on your user dashboard.
            You may alternatively Delete your account at any time by sending an email to
            twopointfourapp@gmail.com with the subject “Delete My Account”. The latter option will
            remove your personally identifying information from our database.
          </p>
          <p>
            Existing users can log into their account to review, correct, update or delete
            inaccuracies to the information in their user account (including updating email address
            and changing password). If you are unsure of how to update any of your previously
            provided information, write to twopointfourapp@gmail.com for assistance.
          </p>
          <h3>6. Disclosure to Third Parties</h3>
          <p>
            TwoPointFour may provide your personal information to third parties in order to assist
            us with generating the optimal workout for you. This provision of data is always
            subsequent to your own decision to connect and share your personal information with a
            third party involved.
          </p>
          <p>
            TwoPointFour may also enclose personal information in a message sent to you through
            email or regular mail at your request. These messages — which may take the form of a
            general update or a specific response to your questions — will be sent to the email
            address or physical location you specify.
          </p>
          <p>
            Except as provided in this section, TwoPointFour will not disclose to unrelated persons
            or entities any personal information that you provide to us. Please note that you are
            responsible for taking all reasonable steps to ensure that no unauthorized person shall
            have access to your username and password. It is your sole responsibility to: (1)
            control the dissemination and use of usernames and passwords; (2) authorize, monitor,
            and control access to and use of your usernames and passwords; and (3) promptly inform
            TwoPointFour of any need to deactivate a username or password. You grant TwoPointFour
            the right to receive, transmit, monitor, retrieve, store, and use your personal
            information, including information that may be privileged and confidential under
            applicable state and federal laws, in connection with the operation of or maintenance of
            your account. TwoPointFour cannot and does not assume any responsibility or liability
            related to the accuracy or inaccuracy of the information you provide to us. TwoPointFour
            also cannot and does not assume any responsibility or liability related to your or third
            parties' use or misuse of information transmitted or received using TwoPointFour.
          </p>
          <p>
            Except as set forth in this Privacy Policy, we will not disclose to unrelated persons or
            entities any information you provide to TwoPointFour that could be used to identify or
            contact you ("personal information"), without your explicit permission. Any personal
            information provided to persons or entities affiliated with TwoPointFour will be treated
            in accordance with the terms of this Privacy Policy, unless you are otherwise notified.
          </p>
          <p>
            In the following limited circumstances we will consider, and may release personal
            information to third parties: (1) as required by law, such as to comply with a subpoena,
            or similar legal process, (2) when we believe in good faith that disclosure is necessary
            to protect our rights, protect your safety or the safety of others, investigate fraud,
            or respond to a government request, or (3) if TwoPointFour is involved in a merger,
            acquisition, or sale of all or a portion of its assets, you will be notified via email
            and/or a prominent notice on our Web site of any change in ownership or uses of your
            personal information, as well as any choices you may have regarding your personal
            information.
          </p>
          <h3>7. Privacy of Children</h3>
          <p>
            TwoPointFour does not collect, maintain, store, or disclose personal information about
            children under the age of 13.
          </p>
          <h3>8. Your Consent</h3>
          <p>
            By creating a username and password (registering) and filling out a Profile, you grant
            TwoPointFour the right to receive, transmit, monitor, retrieve, store and use your
            personal information, including information that may be privileged and confidential
            under applicable state and federal laws, in connection with the operation or maintenance
            of these features.
          </p>

          <p>
            TwoPointFour cannot and does not assume any responsibility or liability related to the
            accuracy or inaccuracy of the information you provide to us. TwoPointFour also cannot
            and does not assume any responsibility or liability related to your use or misuse of
            information transmitted or received on the site.
          </p>

          <p>
            TwoPointFour has the right to suspend or eliminate your right to use this site and to
            remove any information that you have placed on our site. TwoPointFour may also change
            this Privacy Policy at any time by posting revisions on our website. Your use of the
            site constitutes acceptance of the provisions of this Privacy Policy and your continued
            use of the site after such changes are posted constitutes acceptance of each revised
            Privacy Policy. If you do not agree to the terms of this Privacy Policy or any revised
            policy, please exit this site immediately.
          </p>

          <p>
            If TwoPointFour decides to materially change how we use personal information or your
            personal health information, we will notify you by posting a notice on the website,
            homepage or by sending you an email if you consented to receive email communications
            from us prior to the changes taking effect.
          </p>
          <h3>9. GDPR</h3>
          <p>
            This Privacy Policy complies with the General Data Protection Regulation (GDPR) as set
            forth by the European Union regarding the collection, use, and retention of personal
            data from European Union member countries. TwoPointFour is a Data Controller as defined
            in the GDPR and is responsible for ensuring that appropriate GDPR-compliant agreements
            are in place with all Data Processors that we engage. TwoPointFour has certified that it
            adheres to the requirements of notice, choice, onward transfer, security, data
            integrity, access and enforcement.
          </p>

          <p>
            If you have any questions about this privacy policy or wish to register an inquiry or
            complaint, please contact us via email at twopointfourapp@gmail.com.
          </p>
          <Button onClickHandler={onModalClose} color="yellow-fill" length="large">
            Close
          </Button>
        </div>
      </Card>
    </Modal>
  );
};

export default Privacy;
