function Stack() {
    var elements = [];
 
    this.push = push;
    this.pop = pop;
    this.getTopElement = getTopElement;
    this.hasElements = hasElements;
    this.removeAll = removeAll;
    this.size = size;
    this.get = get;
    
    function get(indice){
        return elements[indice];
    }
    function push(element) {
        elements.push(element);
    }
 
    function pop() {
        return elements.pop();
    }
 
    function getTopElement() {
        return elements[elements.length - 1];
    }
 
    function hasElements() {
        return elements.length > 0;
    }
 
    function removeAll() {
        elements = [];
    }
 
    function size() {
        return elements.length;
    }
}
 
module.exports = Stack;