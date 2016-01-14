import json
import uuid
from controllers.basecontroller import BaseController
from framework.httpexceptions import HttpBadRequestException
from framework.httpexceptions import HttpUnauthorizedException


class ImageController(BaseController):
    """The ImageController receives image uploads
    """

    allowed_image_types = {
        "image/jpeg":    ".jpg",
        "image/gif":     ".gif",
        "image/png":     ".png"
    }

    def __init__(self):
        super().__init__()

    def handleUpload(self, state):
        """Handle a upload of an image
        """
        (request, response, session) = state.unfold()

        if not session.get("user"):
            raise HttpUnauthorizedException

        if request.body.done != 0:
            raise HttpBadRequestException()

        upload_image = request.body["file"].file
        upload_image_type = request.body["file"].type

        if not upload_image:
            raise HttpBadRequestException()

        if upload_image_type in self.allowed_image_types.keys():
            filename = str(uuid.uuid4()) + self.allowed_image_types[upload_image_type]
        else:
            raise HttpBadRequestException()

        image_file = open(self._config["upload_folder"] + filename, "wb")
        image_file.write(upload_image.read())
        image_file.close()

        #url = self._config["absolute_url"] + "image/" + filename
        url = "/image/" + filename

        response.setJsonBody(url)

        return state


    def bindRoutes(self, router):
        router.addMapping(r"^/image/upload$", self.handleUpload, ['POST'])
