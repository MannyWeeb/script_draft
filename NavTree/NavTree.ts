export class NavTree {
    name: String;
    path: String;
    icon: String;
    active: Boolean;
    children: Array<NavTree>
    constructor(name: String, path?: String, icon?: String) {
        this.name = name;
        this.path = path || name ? name.toLowerCase().replace(/\s/g, "-") : "404";
        this.icon = icon || "";
        this.active = false;
        this.children = [];
    }

    addBranches(children: Array<NavTree>, path: String) {
        let parentPath = `${path ? path : `${this.path}/`}`;
        this.children = children.map((e) => {
            if (e.children.length > 0) e.addBranches(e.children, parentPath);
            e.path = parentPath + e.path;
            return e;
        });
        return this;
    }

    addLeafs(...items: Array<String>) {
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