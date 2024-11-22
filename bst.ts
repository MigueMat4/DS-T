class NodeTree {
    private data: number;
    private father: NodeTree | null;
    private leftChild: NodeTree | null;
    private rightChild: NodeTree | null;

    constructor(data: number) {
        this.data = data;
        this.father = null;
        this.leftChild = null;
        this.rightChild = null;
    }

    public getData(): number {
        return this.data;
    }

    public setFather(newFather: NodeTree | null): void {
        this.father = newFather;
    }

    public getFather(): NodeTree | null {
        return this.father;
    }

    public setLeftChild(newChild: NodeTree | null): void {
        this.leftChild = newChild;
    }

    public getLeftChild() {
        return this.leftChild;
    }

    public setRightChild(newChild: NodeTree | null): void {
        this.rightChild = newChild;
    }

    public getRightChild() {
        return this.rightChild;
    }
}

class BST {
    private root: NodeTree | null;

    constructor() {
        this.root = null;
    }

    public getRoot(): NodeTree | null {
        return this.root;
    }

    public insert(data: number): void {
        let newNode: NodeTree = new NodeTree(data);
        let parent: NodeTree | null = null;
        let current: NodeTree | null = this.root;
        while (current != null) {
            parent = current;
            if (newNode.getData() < current.getData()) {
                current = current.getLeftChild();
            } else {
                current = current.getRightChild();
            }
        }
        newNode.setFather(parent);
        if (parent == null) {
            this.root = newNode;
        } else if (newNode.getData() < parent.getData()) {
            parent.setLeftChild(newNode);
        } else {
            parent.setRightChild(newNode);
        }
    }
}

let myBinarySearchTree: BST = new BST();
myBinarySearchTree.insert(10);
myBinarySearchTree.insert(7);
myBinarySearchTree.insert(100);
myBinarySearchTree.insert(3);
myBinarySearchTree.insert(38);