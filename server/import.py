import json
from datetime import datetime

import config
from framework import Config

from models.service.question import Question

config = Config()

def importer(file):
    json_file = open(file)
    data = json_file.read()
    questions = json.loads(data)
    for question_dict in questions:
        question = translate_question(question_dict)
        if question and False:
            database_session = config["database_session_maker"]()
            database_session.add(question.to_db())
            database_session.commit()
        if not question:
            print(question_dict)


def translate_question(question_dict):
    question = Question()
    question.owners = [1]
    question.created = datetime.now()
    question.last_saved = datetime.now()
    question.feedback["wrong"] = translate_content(question_dict["feedback"]["WRONG"])
    question.feedback["right"] = translate_content(question_dict["feedback"]["RIGHT"])
    question.metadata = question_dict["metadata"]
    if question_dict.get("type","").upper() == "CHOICE":
        question.type = "choice"
        question.content["question_before"] = translate_content(question_dict["question_text"])
        question.content["choices"] = [translate_content(option) for option in question_dict["options"]]
        question.answers = question_dict["right_answers"]
    elif question_dict.get("type", "").upper() == "MULTICHOICE":
        question.type = "multiplechoice"
        question.content["question_before"] = translate_content(question_dict["question_text"])
        question.content["choices"] = [translate_content(option) for option in question_dict["options"]]
        question.answers = question_dict["right_answers"]
    elif question_dict.get("type", "").upper() == "OPEN":
        question.type = "open"
        question.content["question_before"] = translate_content(question_dict["question_text"] + question_dict["before_text"])
        question.content["question_after"] = translate_content(question_dict["after_text"])
        question.answers = [answer["text"] for answer in question_dict["right_answers"]]
    else:
        print("Cannot translate question of type: " + question_dict.get("type","").upper())
        return None

    return question



def translate_content(content):
    content = content.replace('src="/upload/', 'src="/image/')
    return content

if __name__ == "__main__":
    importer("questions.json")