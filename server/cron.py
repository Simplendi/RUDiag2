import config
config=config

from helpers.reviewjob import ReviewJob


if __name__ == "__main__":
    review_job = ReviewJob()
    review_job.run()