from xml.parsers.expat import ParserCreate as XmlParserCreate, ExpatError as XmlParseError
from models.service.metadatatreenode import MetadataTreeNode


class MetadataTree():

    def __init__(self):
        self.tree = []


    def parseXml(self, xml_string):
        """Parse a XML into a tree.
        """
        parser = XmlParserCreate()

        # Create a stack that keeps a trace of the opened nodes into the tree so we can backtrack
        node_stack = []

        def parseStartElement(name, attrs):
            if name == "tree":
                return
            # Check for the right attributes
            if not attrs.get("value"):
                return
                #raise ParseException("Node without value present.")
            if not attrs.get("description"):
                return
                #raise ParseException("Node without description present.")

            # Create a new node
            node = MetadataTreeNode(attrs["value"], attrs["description"])

            # If the stack is not empty look for the parent of the node and make the new node it's child
            if len(node_stack):
                base_node = node_stack[-1]
                base_node.children.append(node)
            # If the stack is empty make a new root
            else:
                self.tree.append(node)

            # Add the new made node to the stack as it is now the current last opened node
            node_stack.append(node)

        def parseEndElement(name):
            if name == "tree":
                return
            # If the node is closed remove it from the stack
            node_stack.pop()

        # Bind Start and End handlers
        parser.StartElementHandler = parseStartElement
        parser.EndElementHandler = parseEndElement

        parser.Parse(xml_string, 1)

        return self

    def listPossible(self):
        possible = []
        for node in self.tree:
            possible += node.listPossible()

        return possible

