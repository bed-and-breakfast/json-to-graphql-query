"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var __1 = require("../");
describe('jsonToGraphQLQuery() - ignoreFields option', function () {
    it('ignores a field that exists in the initial object', function () {
        var query = {
            query: {
                Posts: {
                    thisShouldBeIgnored: {
                        test: 'a value'
                    },
                    id: true,
                    title: true,
                    post_date: true
                }
            }
        };
        (0, chai_1.expect)((0, __1.jsonToGraphQLQuery)(query, {
            pretty: true,
            ignoreFields: ['thisShouldBeIgnored']
        })).to.equal("query {\n    Posts {\n        id\n        title\n        post_date\n    }\n}");
    });
    it('we can ignore apollo __typename keys', function () {
        var query = {
            query: {
                Posts: {
                    __typename: 'Posts',
                    id: true,
                    title: true,
                    post_date: true,
                    subObject: {
                        __typename: 'subObject',
                        test: 'a value'
                    },
                }
            }
        };
        (0, chai_1.expect)((0, __1.jsonToGraphQLQuery)(query, {
            pretty: true,
            ignoreFields: ['__typename']
        })).to.equal("query {\n    Posts {\n        id\n        title\n        post_date\n        subObject {\n            test\n        }\n    }\n}");
    });
});
//# sourceMappingURL=ignorefields.tests.js.map