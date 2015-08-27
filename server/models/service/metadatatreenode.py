class MetadataTreeNode():
    """The local Node class is used for building a tree.
    """

    @staticmethod
    def fromDict(data_dict):
        """Turn the Node into a dict.
        """
        base_node = MetadataTreeNode()
        base_node.value = data_dict["value"]
        base_node.description = data_dict["description"]

        for child_dict in data_dict["children"]:
            base_node.children.append(MetadataTreeNode.fromDict(child_dict))

        return base_node

    def __init__(self, value = None, description = None):
        """Initialize a Node.
        """
        if value:
            self.value = value
        else:
            self.value = ""

        if description:
            self.description = description
        else:
            self.description = ""

        self.children = []

    def listPossible(self):
        """List all values in this Node and it's children.
        """
        possible_list = [{"value":self.value, "description":self.description}]

        for child in self.children:
            possible_list = possible_list + child.listPossible()

        return possible_list

    def toDict(self):
        """Turn the Node in to a dict.
        """
        data_dict = {"value": self.value, "description": self.description, "children":[]}

        for child in self.children:
            data_dict["children"].append(child.toDict())

        return data_dict

    def toXml(self):
        """Turn the Node in to a xml string.
        """
        if self.children:
            xml = "<node value=\"" + self.value + "\" description=\"" + self.description + "\" >\n"

            for child in self.children:
                xml += child.toXml()
                xml += "\n"

            xml += "</node>\n"
        else:
            xml = "<node value=\"" + self.value + "\" description=\"" + self.description + "\" />"

        return xml

    def hasValueInTree(self, value):
        """Check if this node or his children (and so on) have the value value.
        """
        if self.value == value:
            return True

        for child in self.children:
            if child.hasValueInTree(value):
                return True

        return False

    def findNode(self, value):
        """Find a node that has value value.
        """
        if self.value == value:
            return self

        for child in self.children:
            node = child.findNode(value)
            if node:
                return node

        return None