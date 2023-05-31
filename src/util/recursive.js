import { v4 as uuidv4 } from "uuid"

export const addNode = (_key, currentTree, _name, _attributes = { "department": "Production" }) => {
    if (currentTree.children && currentTree.children.length && currentTree.children.length > 0) {
        if (_key === currentTree['key']) {
            const newKey = `${_key}-${currentTree.children.length+1}`;
            console.log(newKey);
            return {
                key: currentTree['key'],
                name: currentTree['name'],
                attributes: currentTree['attributes'],
                children: [...currentTree.children, { key: newKey, name: _name, attributes: _attributes }].map((node) => addNode(_key, node, _name, _attributes))
            }
        } else {
            return {
                key: currentTree['key'],
                name: currentTree['name'],
                attributes: currentTree['attributes'],
                children: currentTree.children.map((node) => addNode(_key, node, _name, _attributes))
            }
        }
    } else {
        if (_key === currentTree['key']) {
            const newKey = `${_key}-1`;
            console.log(newKey)
            return {
                key: currentTree['key'],
                name: currentTree['name'],
                attributes: currentTree['attributes'],
                children: [{ key: newKey, name: _name, attributes: _attributes }]
            }
        } else {
            return {
                key: currentTree['key'],
                attributes: currentTree['attributes'],
                name: currentTree['name'],
            }
        }
    }
}
export const getFirstTree = (_key, currentTree) => {
    if (_key.indexOf(currentTree['key']) == 0) {
        console.log(_key,currentTree['key'], currentTree);
        if (_key === currentTree['key']) {
            console.log(currentTree);
            return currentTree;
        } else {
           return currentTree.children.filter((node) => getFirstTree(_key, node)).map((node) => getFirstTree(_key, node))
        }
    }else {
        return false
    }
}
export const getTree = (_key, currentTree) => {
    if (_key.indexOf(currentTree['key']) == 0) {
        if (_key === currentTree['key']) {
            return {
                key: currentTree['key'],
                name: currentTree['name'],
                attributes: currentTree['attributes']
            }
        } else {
            return {
                key: currentTree['key'],
                name: currentTree['name'],
                attributes: currentTree['attributes'],
                children: currentTree.children.filter((node) => getTree(_key, node)).map((node) => getTree(_key, node))
            }
        }
    } else {
        return false
    }
}

  
