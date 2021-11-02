/**
 * @class NavTree
 * 
 * @classdesc Primitive template for creating (k)ary navigation trees for Vuetify.
 * 
 * @method addBranches() Appends an array of NavTree objects, routes are then recursively adjusted throughout the whole descendant tree.
 * @method addLeafs() Appends an array of NavTree objects, used for adding leaf objects (ie: NavTrees without children).
 */
export default class NavTree {
    constructor(name, path, icon) {
        this.name = name;
        this.path = path ? path : name ? name.toLowerCase().replace(/\s/g, "-") : "404";
        this.icon = icon || "";
        this.dynamicRouting = false;//If enabled, all 1st generation leaf nodes will use "type" as their appending path instead of their custom mutated path.
        this.dynamicRoutingPath = "type";
        this.active = false;
        this.accessible = true;
        this.actions = {};
        this.children = [];
    }

    /**
     * @description Append an array of NavTree into the current arborescence, recursively adjusts all descendant's route, relative to it's parent's path.
     * 
     * @param {Array[NavTree]} children The array of NavTree to append into the arborescence. 
     * @param {String} path Optional parentPath
     * @returns {NavTree} The modified NavTree.
     */
    addBranches(children, path) {
        let parentPath = `${path !== undefined ? path : `${this.path}`}`;
        this.children = children.map((e) => {
            if (e.children.length > 0) e.addBranches(e.children, parentPath);
            e.path = parentPath + "-" + e.path;
            return e;
        });
        return this;
    }

    /**
     * @description Constructs an array of NavTrees from a given set of Strings.
     * By default, A Leaf NavTree's properties are inferred from each string that was given.
     *
     * @param  {...String} items An array of strings to be used as leaf NavTrees.
     * @returns {NavTree} The modified NavTree.
     */
    addLeafs(...items) {
        let parentPath = this.path;
        this.children = this.children.concat(
            items.map((e) => {
                let temp = e.toLowerCase();
                return new NavTree(
                    temp.replace(/\b[a-z](?=[a-z]{2})/g, (c) => c.toUpperCase()),
                    `${parentPath}-${this.dynamicRouting ? "type" : temp.replace(/\s/g, "-")}`
                );
            })
        );
        return this;
    }

    /**
     * @description A modified type of addLeaf(). It is used solely for adding customized leafs( restricting access or allowing certain actions).
     * 
     * @param { Array<Object> } items An object holding named objects which contains props used for building customized leaf navs.
     * @returns {NavTree} The modified NavTree. 
     */
    addProppedLeafs(...items) {
        let parentPath = this.path;
        items.forEach((obj) => {
            console.log("Add Propped Leafs")
            console.log(obj);
        });
        return this;
    }

    setDynamicRouting(dynamicRouting) {
        this.dynamicRouting = dynamicRouting;
        return this;
    }
    setAccessible(accessible) {
        this.accessible = accessible;
        return this;
    }
    setActions(actions) {
        this.actions = actions;
        return this;
    }
    setDynamicRoutingPath(path) {
        this.dynamicRoutingPath = path;
        return this;
    }
}