"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var __1 = require("../");
describe('jsonToGraphQLQuery() - mutations', function () {
    it('simple mutation', function () {
        var mutation = {
            mutation: {
                delete_post: {
                    __args: { id: 1234 },
                    id: true,
                }
            }
        };
        (0, chai_1.expect)((0, __1.jsonToGraphQLQuery)(mutation, { pretty: true })).to.equal("mutation {\n    delete_post (id: 1234) {\n        id\n    }\n}");
    });
    it('correctly converts mutations with no specified return fields', function () {
        var query = {
            mutation: {
                create_post: {
                    __args: {
                        title: 'My Awesome Post',
                        body: 'This post is awesome!'
                    }
                }
            }
        };
        (0, chai_1.expect)((0, __1.jsonToGraphQLQuery)(query, { pretty: true })).to.equal("mutation {\n    create_post (\n        title: \"My Awesome Post\",\n        body: \"This post is awesome!\"\n    )\n}");
    });
});
//# sourceMappingURL=mutations.tests.js.map