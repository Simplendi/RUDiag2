import config
from helpers.feedbackjob import FeedbackJob

config=config

from helpers.reviewjob import ReviewJob
from helpers.timerjob import TimerJob
from helpers.invitejob import InviteJob

if __name__ == "__main__":
    timer_job = TimerJob()
    timer_job.run()
    invite_job = InviteJob()
    invite_job.run()
    review_job = ReviewJob()
    review_job.run()
    feedback_job = FeedbackJob()
    feedback_job.run()