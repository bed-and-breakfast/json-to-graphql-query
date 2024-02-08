"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var __1 = require("../");
describe('jsonToGraphQLQuery() - aliases', function () {
    it('supports multiple aliases for one type', function () {
        var query = {
            query: {
                lorem: {
                    __aliasFor: 'Posts',
                    __args: {
                        arg1: 20,
                    },
                    id: true
                },
                larem: {
                    __aliasFor: 'Posts',
                    __args: {
                        arg2: 10,
                    },
                    id: true
                }
            }
        };
        (0, chai_1.expect)((0, __1.jsonToGraphQLQuery)(query)).to.equal('query { lorem: Posts (arg1: 20) { id } larem: Posts (arg2: 10) { id } }');
    });
});
//# sourceMappingURL=aliases.tests.js.map