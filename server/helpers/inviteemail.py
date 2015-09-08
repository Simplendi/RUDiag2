from framework.config import Config
from framework.email.emailmessage import EmailMessage
from framework.email.emailsender import EmailSender

class InviteEmail(EmailMessage):
    """InviteEmail is used for sending invite emails.
    """

    def __init__(self, from_address, to_address, test_session, test):
        """Initalize a new InviteEmail with an address to send the Email to, an invite code and the test to send the invite for.
        """
        config = Config()
        self.from_address = from_address
        self.to_address = to_address
        self.subject = "Invite for " + test.title
        self.body = config["template_lookup"]("invite_email.html").render(test_session = test_session, test = test, absolute_url = config["absolute_url"])

    def send(self):
        """Send the InviteEmail.
        """
        email_sender = EmailSender()
        email_sender.send(self)   
        