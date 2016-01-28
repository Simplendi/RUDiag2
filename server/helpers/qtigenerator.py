from framework import Config


class QtiGenerator:

    def __init__(self):
        self._config = Config()
        self._template_lookup = self._config["template_lookup"]

    def generate(self, question):
        return self._template_lookup("qti_export.xml").render(question=question)