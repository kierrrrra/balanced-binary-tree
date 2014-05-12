/**
 * Binary tree node class
 */
var Node = function (value, left, right) {
    this.value = value;
    this.left = left || null;
    this.right = right || null;
}



/**
 * Binary Search Tree Class - initializes with null (empty) parent node
 * @method createFromArray(array)
 * @method bfsTraversal(fn)
 */
var BST = function () {
    this.rootNode = null;
    this.nodeCount = 0;

    /**
     * Create a binary search tree from sorted array
     * @param arr - sorted array
     */
    this.createFromArray = function (arr) {
        if (typeof arr !== 'undefined' && arr.length > 0) {
            var createBST = function (input) {
                if (input.length < 1) {
                    return null;
                }
                var middle = Math.floor(input.length / 2);

                var node = new Node(input[middle]);
                node.left = createBST(input.slice(0, middle));
                node.right = createBST(input.slice(middle + 1, input.length));

                return node;
            };

            this.rootNode = createBST(arr);
            this.nodeCount = arr.length;
        }

        return this.rootNode;
    };

    /**
     * Breadth First search on a binary tree
     * @param fn - Function to execute on every node
     * @returns {Array} - Sequence of nodes during breadth-first search
     */
    this.bfsTraversal = function (fn) {
        var index = 0,
            queue = [this.rootNode],
            nodeSequence = [];

        var bfsTraversal = function () {
            if (!queue.length) {
                return;
            }
            var node = queue.shift();

            fn(node, index);
            nodeSequence.push(node)

            if (node) queue.push(node.left);
            if (node) queue.push(node.right);

            index ++;
            bfsTraversal();
        };
        bfsTraversal();

        return nodeSequence;
    };
};