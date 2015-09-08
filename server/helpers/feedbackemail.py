from framework.config import Config
from framework.email.emailmessage import EmailMessage
from framework.email.emailsender import EmailSender

class FeedbackEmail(EmailMessage):
    """FeedbackEmail is used for sending feedback emails.
    """

    def __init__(self, from_address, to_address, test_session, test):
        """Initalize a new FeedbackEmail with an address to send the Email to
        """
        config = Config()
        self.from_address = from_address
        self.to_address = to_address
        self.subject = "Feedback for " + test.title.encode("ascii", 'ignore').decode('ascii')
        self.body = config["template_lookup"]("feedback_email.html").render(test_session = test_session, test = test, absolute_url = config["absolute_url"])

    def send(self):
        """Send the FeedbackEmail.
        """
        email_sender = EmailSender()
        email_sender.send(self)   
        