import { getNodeEntry, getParentNode, TEditor, TNode, TNodeEntry, Value } from "@udecode/plate-core";
import { Location } from "slate";

const VALID_CONDITIONAL_NODES = [
    "li",
    "ul",
    "p"
];

function isValidConditionalNode(node: TNode): boolean {
    return node && !!VALID_CONDITIONAL_NODES.find(validNodeType => node.type === validNodeType);
}

export function getValidConditionalNodeEntry<V extends Value>(editor: TEditor<V>): TNodeEntry<any> | undefined {
    if (!editor.selection) return;

    let location: Location = editor.selection;
    let validNode: TNodeEntry<any> | undefined = getNodeEntry(editor, location);


    while (validNode = getParentNode(editor, location)) {
        if (!isValidConditionalNode(validNode[0])) {
            location = validNode[1];
            continue;
        }
        
        break;
    }

    if (validNode) {
        return validNode;
    }
}