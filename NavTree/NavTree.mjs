/**
 * @class NavTree
 * 
 * @classdesc Primitive template for creating (k)ary navigation trees for Vuetify.
 * 
 * @method add_branches() Appends an array of NavTree objects, routes are then recursively adjusted throughout the whole descendant tree.
 * @method add_leafs() Appends an array of NavTree objects, used for adding leaf objects (ie: NavTrees without children).
 */
export class NavTree {
    constructor(name, path, icon) {
        this.name = name;
        this.path = path || name ? name.toLowerCase().replace(/\s/g, "-") : "404";
        this.icon = icon || "";
        this.active = false;
        this.children = [];
    }

    /**
     * @description Append an array of NavTree into the current arborescence, recursively adjusts all descendant's route, relative to it's parent's path.
     * 
     * @param {Array[NavTree]} children The array of NavTree to append into the arborescence. 
     * @param {String} path Optional parentPath.
     * @returns {NavTree} The modified NavTree.
     */
    add_branches(children, path) {
        let parentPath = `${path !== undefined ? path : `${this.path}/`}`;
        this.children = children.map((e) => {
            if (e.children.length > 0) e.add_branches(e.children, parentPath);
            e.path = parentPath + e.path;
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
    add_leafs(...items) {
        let parentPath = this.path;
        this.children = this.children.concat(
            items.map((e) => {
                let temp = e.toLowerCase();
                return new NavTree(
                    temp.replace(/\b[a-z](?=[a-z]{2})/g, (c) => c.toUpperCase()),
                    `${parentPath}/${temp.replace(/\s/g, "-")}`
                );
            })
        );
        return this;
    }
}