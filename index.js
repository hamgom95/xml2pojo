// Parse XML to POJO as Array with assigned properties

// use xmldom if using node, not needed in browser
const DOMParser = require('xmldom').DOMParser;

function parseNode(xmlNode, result) {

    if (xmlNode.nodeName == "#text") {
        const v = xmlNode.nodeValue;
        if (v.trim()) {
           result['#text'] = v;
        }
        return;
    }
    if (xmlNode.nodeName === undefined) return;
    
    const jsonNode = Object.assign([], {"#tag": xmlNode.nodeName});
    result.push(jsonNode);

    if (xmlNode.attributes) {
        for(const attr of Array.from(xmlNode.attributes)) {
            if (attr.nodeName) jsonNode[attr.nodeName] = attr.nodeValue;
        }
    }
    if (xmlNode.childNodes) {
        for(const child of Array.from(xmlNode.childNodes)) {
            parseNode(child, jsonNode);
        }
    }
}

function parse(xml) {
    const dom = (new DOMParser()).parseFromString(xml, "text/xml");

    const result = [];
    for (const child of Array.from(dom.childNodes)) {
        parseNode(child, result);
    }

    return result;
}

module.exports = {parse};
