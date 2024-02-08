"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var __1 = require("../");
describe('jsonToGraphQLQuery() - falsy keys', function () {
    it('does not include fields which value is false', function () {
        var query = {
            query: {
                Posts: {
                    __args: {
                        a: false
                    },
                    id: true,
                    name: false
                },
                Lorem: {
                    id: true
                },
                Ipsum: false
            }
        };
        (0, chai_1.expect)((0, __1.jsonToGraphQLQuery)(query)).to.equal('query { Posts (a: false) { id } Lorem { id } }');
    });
    it('includes fields with falsy values if includeFalsyKeys is true', function () {
        var query = {
            query: {
                Posts: {
                    __args: {
                        a: false
                    },
                    id: '',
                    name: ''
                },
                Lorem: {
                    id: ''
                },
                Ipsum: false
            }
        };
        (0, chai_1.expect)((0, __1.jsonToGraphQLQuery)(query, { includeFalsyKeys: true })).to.equal('query { Posts (a: false) { id name } Lorem { id } Ipsum }');
    });
    it('does not include object with only false keys', function () {
        var query = {
            query: {
                Posts: {
                    id: true,
                    name: false
                },
                Lorem: {
                    id: false
                },
                Ipsum: true
            }
        };
        (0, chai_1.expect)((0, __1.jsonToGraphQLQuery)(query)).to.equal('query { Posts { id } Ipsum }');
    });
    it('does include object with only false keys if includeFalsyKeys is true', function () {
        var query = {
            query: {
                Posts: {
                    id: true,
                    name: false
                },
                Lorem: {
                    id: false
                },
                Ipsum: true
            }
        };
        (0, chai_1.expect)((0, __1.jsonToGraphQLQuery)(query, { includeFalsyKeys: true })).to.equal('query { Posts { id name } Lorem { id } Ipsum }');
    });
});
//# sourceMappingURL=falsykeys.tests.js.map