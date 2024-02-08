"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var __1 = require("../");
describe('jsonToGraphQLQuery() - fragments', function () {
    it('supports inline fragments', function () {
        var query = {
            query: {
                Posts: {
                    __on: {
                        __typeName: 'ConfigurablePost',
                        id: true
                    }
                }
            }
        };
        (0, chai_1.expect)((0, __1.jsonToGraphQLQuery)(query)).to.equal('query { Posts { ... on ConfigurablePost { id } } }');
    });
    it('supports inline fragments with subfields on same level', function () {
        var query = {
            query: {
                Posts: {
                    title: true,
                    __on: {
                        __typeName: 'ConfigurablePost',
                        id: true
                    }
                }
            }
        };
        (0, chai_1.expect)((0, __1.jsonToGraphQLQuery)(query)).to.equal('query { Posts { title ... on ConfigurablePost { id } } }');
    });
    it('supports multiple inline fragments', function () {
        var query = {
            query: {
                Posts: {
                    __on: [
                        {
                            __typeName: 'ConfigurablePost',
                            id: true
                        },
                        {
                            __typeName: 'UnconfigurablePost',
                            name: true
                        }
                    ]
                }
            }
        };
        (0, chai_1.expect)((0, __1.jsonToGraphQLQuery)(query)).to.equal('query { Posts { ... on ConfigurablePost { id } ... on UnconfigurablePost { name } } }');
    });
    it('supports full inline fragments', function () {
        var query = {
            query: {
                Posts: {
                    __all_on: [
                        'ConfigurablePost',
                        'PageInfo'
                    ]
                }
            }
        };
        (0, chai_1.expect)((0, __1.jsonToGraphQLQuery)(query)).to.equal('query { Posts { ...ConfigurablePost ...PageInfo } }');
    });
});
//# sourceMappingURL=fragments.tests.js.map