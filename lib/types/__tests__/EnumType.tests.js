"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var __1 = require("../../");
describe('EnumType()', function () {
    it('converts a query with enum arguments', function () {
        var query = {
            query: {
                Posts: {
                    __args: {
                        status: new __1.EnumType('PUBLISHED')
                    },
                    id: true,
                    title: true,
                    post_date: true
                }
            }
        };
        (0, chai_1.expect)((0, __1.jsonToGraphQLQuery)(query, { pretty: true })).to.equal("query {\n    Posts (status: PUBLISHED) {\n        id\n        title\n        post_date\n    }\n}");
    });
});
//# sourceMappingURL=EnumType.tests.js.map