////1448. Count Good Nodes in Binary Tree

//Given a binary tree root, a node X in the tree is named good if in the path from root to X there are no nodes with a value greater than X.

//Return the number of good nodes in the binary tree.
////Input: root = [3, 1, 4, 3, null, 1, 5]
////Output: 4
////Explanation: Nodes in blue are good.
////Root Node(3) is always a good node.
////    Node 4 -> (3, 4) is the maximum value in the path starting from the root.
////        Node 5 -> (3, 4, 5) is the maximum value in the path
////Node 3 -> (3, 1, 3) is the maximum value in the path.

var goodNodes = function (root) {
    let goodNodes = 1
    function isGood(node, largestVal) {
        if (!node) return
        if (node.val >= largestVal) {
            goodNodes += 1
            isGood(node.left, node.val)
            isGood(node.right, node.val)
        }
        else {
            isGood(node.left, largestVal)
            isGood(node.right, largestVal)
        }
    }
    isGood(root.left, root.val)
    isGood(root.right, root.val)
    return goodNodes
};