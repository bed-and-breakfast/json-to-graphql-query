"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var __1 = require("../");
describe('jsonToGraphQLQuery() - arguments', function () {
    it('converts a query with simple arguments', function () {
        var query = {
            query: {
                Posts: {
                    __args: {
                        orderBy: 'post_date',
                        userId: 12
                    },
                    id: true,
                    title: true,
                    post_date: true
                }
            }
        };
        (0, chai_1.expect)((0, __1.jsonToGraphQLQuery)(query, { pretty: true })).to.equal("query {\n    Posts (\n        orderBy: \"post_date\",\n        userId: 12\n    ) {\n        id\n        title\n        post_date\n    }\n}");
    });
    it('converts a query with JSON arguments', function () {
        var query = {
            query: {
                Posts: {
                    __args: {
                        where: {
                            published: true,
                            rating: { _gt: 3 }
                        },
                        orderBy: 'post_date'
                    },
                    id: true,
                    title: true,
                    post_date: true
                }
            }
        };
        (0, chai_1.expect)((0, __1.jsonToGraphQLQuery)(query, { pretty: true })).to.equal("query {\n    Posts (\n        where: {\n            published: true,\n            rating: { _gt: 3 }\n        },\n        orderBy: \"post_date\"\n    ) {\n        id\n        title\n        post_date\n    }\n}");
    });
    it('converts a query with JSON arguments containing arrays of objects', function () {
        var query = {
            query: {
                Posts: {
                    __args: {
                        or: [
                            { published: true },
                            { rating: [{ _gt: 3 }] }
                        ],
                        orderBy: 'post_date'
                    },
                    id: true,
                    title: true,
                    post_date: true
                }
            }
        };
        (0, chai_1.expect)((0, __1.jsonToGraphQLQuery)(query, { pretty: true })).to.equal("query {\n    Posts (\n        or: [\n            { published: true },\n            { rating: [ { _gt: 3 } ] }\n        ],\n        orderBy: \"post_date\"\n    ) {\n        id\n        title\n        post_date\n    }\n}");
    });
    it('converts a query with null arguments and nested nulls', function () {
        var query = {
            query: {
                Posts: {
                    __args: {
                        where: {
                            id: null,
                        },
                        orderBy: null
                    },
                    id: true,
                    title: true,
                    post_date: true
                }
            }
        };
        (0, chai_1.expect)((0, __1.jsonToGraphQLQuery)(query, { pretty: true })).to.equal("query {\n    Posts (\n        where: { id: null },\n        orderBy: null\n    ) {\n        id\n        title\n        post_date\n    }\n}");
    });
    it('converts a query with nested objects and arguments', function () {
        var query = {
            query: {
                Posts: {
                    __args: {
                        arg1: 20,
                        arg2: 'flibble'
                    },
                    id: true,
                    title: true,
                    comments: {
                        __args: {
                            offensiveOnly: true
                        },
                        id: true,
                        comment: true,
                        user: true
                    }
                }
            }
        };
        (0, chai_1.expect)((0, __1.jsonToGraphQLQuery)(query, { pretty: true })).to.equal("query {\n    Posts (\n        arg1: 20,\n        arg2: \"flibble\"\n    ) {\n        id\n        title\n        comments (offensiveOnly: true) {\n            id\n            comment\n            user\n        }\n    }\n}");
    });
    it('works with pretty mode turned off', function () {
        var query = {
            query: {
                Posts: {
                    __args: {
                        arg1: 20,
                        arg2: 'flibble'
                    },
                    id: true,
                    title: true
                }
            }
        };
        (0, chai_1.expect)((0, __1.jsonToGraphQLQuery)(query)).to.equal('query { Posts (arg1: 20, arg2: "flibble") { id title } }');
    });
    it('Empty args object should not generate parentheses', function () {
        var query = {
            query: {
                Posts: {
                    __args: {},
                    id: true,
                    title: true
                }
            }
        };
        (0, chai_1.expect)((0, __1.jsonToGraphQLQuery)(query)).to.equal('query { Posts { id title } }');
    });
});
//# sourceMappingURL=arguments.tests.js.map