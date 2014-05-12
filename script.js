/*global d3*/

var generateArray = function (length) {
    var arr = [];

    for (var i = 0; i < length; i++ ) {
        arr.push(Math.round(Math.random()*100));
    }

    return arr;
}

window.onload = function () {
    var arr = [],
        sortedArray = [],
        bst = new BST();

    document.getElementById('create-tree').addEventListener("click", function () {
        arr = generateArray(document.getElementById('array-length').value || 1)

        sortedArray = mergesort(arr);

        document.getElementById('status').innerHTML = "Balanced Binary Search tree for an array <br/> of " + sortedArray.length + " random integers in [0-100]:";

        bst.createFromArray(sortedArray);

        try {
            renderBST(bst);
        } catch (e) {
            alert("D3 broke.");
        }

        console.log("Input: ", arr);
        console.log("Sorted: ", sortedArray);
        console.log("BST: ", bst);
    });
};



/**
 * Render binary search tree
 * @param bst - binary search tree to visualize
 */
function renderBST (bst) {
    if (d3.select('body').select('svg')) {
        console.log("Removing ", d3.select('body').select('svg'))
        d3.select('body').select('svg').remove();
    }
    var svg = d3.select('body').append('svg'),

        /** Radius of a node circle **/
        radius = 20,

        /** Vertical spacing **/
        spacing = 60,

        svgWidth = Math.pow(2, Math.ceil(Math.log(bst.nodeCount)/Math.log(2))) * radius * 1.5;

    svg.attr("width", svgWidth + spacing)
        .attr("height", Math.ceil(Math.log(bst.nodeCount)/Math.log(2)) * spacing + spacing);

    /**
     * Getting x-axis position of a node based on it's index
     * @param i - index of a node in breadth-first traversal
     * @returns {number}
     */
    var xPosition = function (i) {
        var level = Math.floor(Math.log(i+1)/Math.log(2)),
            nodesOnLevel = Math.pow(2, level),
            noInRow = (i - nodesOnLevel) + 1,
            rowSpacing = (svgWidth / nodesOnLevel);

        return (rowSpacing * noInRow) + rowSpacing / 2;
    }

    /**
     * Getting x-axis position of a node based on it's index
     * @param i - index of a node in breadth-first traversal
     * @returns {number}
     */
    var yPosition = function (i) {
        var level = Math.floor( Math.log(i + 1) / Math.log(2) );
        return (i === 0) ? radius / 2 : level * spacing + radius / 2;
    }

    /**
     * Render tree node by node in breadth-first order
     */
    bst.bfsTraversal(function (node, index) {
        var svgNode = svg.append("g"),
            x = xPosition(index),
            y = yPosition(index);

        if (node !== null) {
            /** Left-right connecting line **/
            if (node.left !== null) {
                svgNode.append("line")
                    .attr("class", "line")
                    .attr("x1", x + radius)
                    .attr("y1", y + radius)
                    .attr("x2", xPosition((index * 2) + 1) + radius)
                    .attr("y2", yPosition((index * 2) + 1) + radius / 2)
                    .attr("stroke", "#CCC");
            }

            /** Right-left connecting line **/
            if (node.right !== null) {
                svgNode.append("line")
                    .attr("class", "line")
                    .attr("x1", x + radius)
                    .attr("y1", y + radius)
                    .attr("x2", xPosition((index * 2) + 2) + radius)
                    .attr("y2", yPosition((index * 2) + 1) + radius / 2)
                    .attr("stroke", "#CCC");
            }

            /** Behold, node itself **/
            svgNode.append("circle")
                .attr("class", "node")
                .attr("r", 0)
                .attr("r", radius)
                .attr("cx", x + radius)
                .attr("cy", y + radius)
                .attr("stroke", "#444")
                .attr("fill", "#FFF");

            /** Text inside the node **/
            svgNode.append("foreignObject")
                .attr("x", x)
                .attr("y", y)
                .attr("width", radius * 2)
                .attr("height", radius * 2)
                .append("xhtml:div")
                .html(node.value)
                .attr("class", "node-text")

        }
    });
}