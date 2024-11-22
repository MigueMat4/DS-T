class AVLNode {
    private data: number;
    private height: number;
    private leftChild: AVLNode | null;
    private rightChild: AVLNode | null;

    constructor(data: number) {
        this.data = data;
        this.height = 1;
        this.leftChild = null;
        this.rightChild = null;
    }

    public getData(): number {
        return this.data;
    }

    public getHeight(): number {
        return this.height;
    }

    public setHeight(newHeight: number): void {
        this.height = newHeight;
    }

    public getLeftChild(): AVLNode | null {
        return this.leftChild;
    }

    public setLeftChild(newChild: AVLNode | null): void {
        this.leftChild = newChild;
    }

    public getRightChild(): AVLNode | null {
        return this.rightChild;
    }

    public setRightChild(newChild: AVLNode | null): void {
        this.rightChild = newChild;
    }
}

class AVLTree {
    private root: AVLNode | null;

    constructor() {
        this.root = null;
    }

    public getRoot(): AVLNode | null {
        return this.root;
    }

    private getHeight(node: AVLNode | null): number {
        if (node !== null)
            return node.getHeight();
        else
            return 0;
    }

    private getBalanceFactor(node: AVLNode | null): number {
        if (node !== null)
            return this.getHeight(node.getLeftChild()) - this.getHeight(node.getRightChild());
        else
            return 0;
    }

    private rotateRight(y: AVLNode): AVLNode {
        const x = y.getLeftChild()!;
        const T = x.getRightChild();

        x.setRightChild(y);
        y.setLeftChild(T);
        y.setHeight(Math.max(this.getHeight(y.getLeftChild()), this.getHeight(y.getRightChild())) + 1);
        x.setHeight(Math.max(this.getHeight(x.getLeftChild()), this.getHeight(x.getRightChild())) + 1);

        return x;
    }

    private rotateLeft(x: AVLNode): AVLNode {
        const y = x.getRightChild()!;
        const T = y.getLeftChild();

        y.setLeftChild(x);
        x.setRightChild(T);
        x.setHeight(Math.max(this.getHeight(x.getLeftChild()), this.getHeight(x.getRightChild())) + 1);
        y.setHeight(Math.max(this.getHeight(y.getLeftChild()), this.getHeight(y.getRightChild())) + 1);

        return y;
    }

    private insertNode(node: AVLNode | null, data: number): AVLNode {
        if (!node)
            return new AVLNode(data);

        if (data < node.getData())
            node.setLeftChild(this.insertNode(node.getLeftChild(), data));
        else if (data > node.getData())
            node.setRightChild(this.insertNode(node.getRightChild(), data));
        else
            return node;

        node.setHeight(1 + Math.max(this.getHeight(node.getLeftChild()), this.getHeight(node.getRightChild())));
        const balance = this.getBalanceFactor(node);

        if (balance > 1 && data < node.getLeftChild()!.getData()) 
            return this.rotateRight(node);
        if (balance < -1 && data > node.getRightChild()!.getData())
            return this.rotateLeft(node);
        if (balance > 1 && data > node.getLeftChild()!.getData()) {
            node.setLeftChild(this.rotateLeft(node.getLeftChild()!));
            return this.rotateRight(node);
        }
        if (balance < -1 && data < node.getRightChild()!.getData()) {
            node.setRightChild(this.rotateRight(node.getRightChild()!));
            return this.rotateLeft(node);
        }

        return node;
    }

    public insert(data: number): void {
        this.root = this.insertNode(this.root, data);
    }
}

const myAVLTree = new AVLTree();
myAVLTree.insert(10);
myAVLTree.insert(20);
myAVLTree.insert(30);
myAVLTree.insert(50);
myAVLTree.insert(40);
myAVLTree.insert(25);