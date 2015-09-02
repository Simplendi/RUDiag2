from models.service.question import Question


class Reviewer():

    def __init__(self):
        self.test = None

    def set_test(self, test):
        self.test = test

    def _get_questions(self):
        questions = []
        for question_dict in [content["data"] for content in self.test.content if content["type"] == 'question']:
            question = Question.from_dict(question_dict)
            questions.append(question)

        return questions


    def _get_answer_for_question(self, test_session, question_index):
        if len(test_session.answers) >= question_index+1:
            return test_session.answers[question_index]
        else:
            return None


    def review_answers(self, test_session):
        questions = self._get_questions()
        for (question_index, question) in  enumerate(questions):
            answer = self._get_answer_for_question(test_session, question_index)
            if(question.is_right_answer(answer)):
                test_session.question_feedback.append({"answer": answer, "right": True, "feedback":self.test.question_feedback[question_index]["right"]})
            else:
                test_session.question_feedback.append({"answer": answer, "right": False, "feedback":self.test.question_feedback[question_index]["wrong"]})
        return test_session

    def review_total(self, test_session):
        num_answers_right = self._count_answers_right(test_session)
        test_session.total_feedback = self._get_total_feedback(num_answers_right)
        return test_session

    def _get_total_feedback(self, num_answers_right):
        for general_feedback in self.test.total_feedback:
            if general_feedback["min"] <= num_answers_right and general_feedback["max"] >= num_answers_right:
                return general_feedback["feedback"]


    def _count_answers_right(self, test_session):
        right_answers = 0
        for question_feedback in test_session.question_feedback:
            if question_feedback["right"]:
                right_answers+=1

        return right_answers


    def review(self, test_session):
        test_session = self.review_answers(test_session)
        test_session = self.review_total(test_session)

        return test_session
