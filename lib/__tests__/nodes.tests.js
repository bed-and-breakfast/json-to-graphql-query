"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var __1 = require("../");
describe('jsonToGraphQLQuery() - node conversion', function () {
    it('throws if no query object is specified', function () {
        (0, chai_1.expect)(function () {
            __1.jsonToGraphQLQuery();
        }).to.throw('query object not specified');
    });
    it('throws if query is not an object', function () {
        (0, chai_1.expect)(function () {
            (0, __1.jsonToGraphQLQuery)('not a query object');
        }).to.throw('query object not specified');
    });
    it('throws if object has no keys', function () {
        (0, chai_1.expect)(function () {
            (0, __1.jsonToGraphQLQuery)({});
        }).to.throw('query object has no data');
    });
    it('converts a simple query', function () {
        var query = {
            query: {
                Posts: {
                    id: true,
                    title: true,
                    post_date: true
                }
            }
        };
        (0, chai_1.expect)((0, __1.jsonToGraphQLQuery)(query, { pretty: true })).to.equal("query {\n    Posts {\n        id\n        title\n        post_date\n    }\n}");
    });
    it('converts a query with nested objects', function () {
        var query = {
            query: {
                Posts: {
                    id: true,
                    title: true,
                    comments: {
                        id: true,
                        comment: true,
                        user: true
                    }
                }
            }
        };
        (0, chai_1.expect)((0, __1.jsonToGraphQLQuery)(query, { pretty: true })).to.equal("query {\n    Posts {\n        id\n        title\n        comments {\n            id\n            comment\n            user\n        }\n    }\n}");
    });
    it('gets keys from an array instead of adding the index as a key', function () {
        var query = {
            query: {
                Posts: [{
                        id: true,
                        name: true,
                    }],
                Lorem: {
                    id: true
                },
                Ipsum: false,
            }
        };
        (0, chai_1.expect)((0, __1.jsonToGraphQLQuery)(query)).to.equal('query { Posts { id name } Lorem { id } }');
    });
    it('gets keys from an array instead of adding the index as a key and print pretty', function () {
        var query = {
            query: {
                Posts: [{
                        id: true,
                        name: true,
                    }],
                Lorem: {
                    id: true
                },
                Ipsum: false,
            }
        };
        (0, chai_1.expect)((0, __1.jsonToGraphQLQuery)(query, { pretty: true })).to.equal("query {\n    Posts {\n        id\n        name\n    }\n    Lorem {\n        id\n    }\n}");
    });
    it('handles empty arrays by adding the key but no values to the query', function () {
        var Posts = [];
        var query = {
            query: {
                Posts: Posts,
                Lorem: {
                    id: true
                },
                Ipsum: false,
            }
        };
        (0, chai_1.expect)((0, __1.jsonToGraphQLQuery)(query)).to.equal('query { Posts Lorem { id } }');
    });
    it('handles arrays of numbers by adding the key but no values to the query', function () {
        var query = {
            query: {
                Posts: [1, 2, 3],
                Lorem: {
                    id: true
                },
                Ipsum: false,
            }
        };
        (0, chai_1.expect)((0, __1.jsonToGraphQLQuery)(query)).to.equal('query { Posts Lorem { id } }');
    });
    it('handles arrays of strings by adding the key but no values to the query', function () {
        var query = {
            query: {
                Posts: ['test 1', 'test 2', 'test 3'],
                Lorem: {
                    id: true
                },
                Ipsum: false,
            }
        };
        (0, chai_1.expect)((0, __1.jsonToGraphQLQuery)(query)).to.equal('query { Posts Lorem { id } }');
    });
    it('handles arrays of mixed types by taking the first object of the array', function () {
        var query = {
            query: {
                Posts: [1, null, { id: true, name: true }],
                Lorem: {
                    id: true
                },
                Ipsum: false,
            }
        };
        (0, chai_1.expect)((0, __1.jsonToGraphQLQuery)(query)).to.equal('query { Posts { id name } Lorem { id } }');
    });
    it('handles arrays of string by adding the key but no values to the query', function () {
        var Posts = [null];
        var query = {
            query: {
                Posts: Posts,
                Lorem: {
                    id: true
                },
                Ipsum: false,
            }
        };
        (0, chai_1.expect)((0, __1.jsonToGraphQLQuery)(query)).to.equal('query { Posts Lorem { id } }');
    });
    it('handles arrays of string by adding the key but no values to the query and print pretty', function () {
        var Posts = [];
        var query = {
            query: {
                Posts: Posts,
                Lorem: {
                    id: true
                },
                Ipsum: false,
            }
        };
        (0, chai_1.expect)((0, __1.jsonToGraphQLQuery)(query, { pretty: true })).to.equal("query {\n    Posts\n    Lorem {\n        id\n    }\n}");
    });
});
//# sourceMappingURL=nodes.tests.js.map