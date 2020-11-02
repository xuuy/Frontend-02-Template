const assert = require('assert').strict;

import { parseHTML } from '../src/parser.js'

describe("parser html", function () {
    it('empty child', function() {
        let tree = parseHTML('<div></div>')
        assert.equal(tree.children[0].tagName, "div");
        assert.equal(tree.children[0].children.length, 0);
    });

    it('has attribute', function() {
        let tree = parseHTML('<div class="1"></div>')
        assert.equal(tree.children.length, 1);
        assert.equal(tree.children[0].children.length, 0);
    });

    it('self close tag', function() {
        let tree = parseHTML('<div />')
        assert.equal(tree.children[0].children.length, 0);
    });

    it('<div id class></div>', function() {
        let tree = parseHTML('<div id class></div>')
        assert.equal(tree.children.length, 1);
        assert.equal(tree.children[0].children.length, 0);
    });

    it('<div id="op" class></div>', function() {
        let tree = parseHTML('<div id="op" class></div>')
        assert.equal(tree.children.length, 1);
    });

    it('input unquote <div class=class></div>', function() {
        let tree = parseHTML('<div class=class></div>')
        assert.equal(tree.children[0].attributes[2].value, 'class');
    });

    it('input self close unquote <div class=class />', function() {
        let tree = parseHTML('<div class=class />')
        assert.equal(tree.children.length, 1);
        assert.equal(tree.children[0].attributes[2].value, 'class');
    });

    it('input single quote <div id=\'id\'/>', function() {
        let tree = parseHTML('<div id=\'id\'/>')
        assert.equal(tree.children[0].attributes[2].value, 'id');
    });

    it('input double quote <div id="id"/>', function() {
        let tree = parseHTML('<div id="id"/>')
        assert.equal(tree.children[0].attributes[2].value, 'id');
    });

    it('input self close tag', function() {
        let tree = parseHTML('<img />')
        assert.equal(tree.children.length, 1);
    });

    it('input <custom-tag />', function() {
        let tree = parseHTML('<custom-tag />')
        assert.equal(tree.children[0].tagName, 'custom-tag');
    });

    it('input 555555555', function() {
        let tree = parseHTML('555555555')
        assert.equal(tree.children.length, 1);
        assert.equal(tree.children[0].type, "text");
    });

})

