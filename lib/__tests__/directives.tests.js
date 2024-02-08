"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var __1 = require("../");
describe('jsonToGraphQLQuery() - directives', function () {
    it('converts a simple query with args and directives with no arguments', function () {
        var query = {
            query: {
                Posts: {
                    __args: {
                        where: {
                            id: 10,
                        },
                        orderBy: 'flibble'
                    },
                    __directives: {
                        client: true
                    },
                    id: true,
                    title: true,
                    post_date: true
                }
            }
        };
        (0, chai_1.expect)((0, __1.jsonToGraphQLQuery)(query, { pretty: true })).to.equal("query {\n    Posts (\n        where: { id: 10 },\n        orderBy: \"flibble\"\n    ) @client {\n        id\n        title\n        post_date\n    }\n}");
    });
    it('converts a complex query with directives with no arguments', function () {
        var query = {
            query: {
                diet: {
                    __directives: {
                        client: true
                    },
                    id: 'diet',
                    options: {
                        mood: {
                            category: 'Diet',
                            id: 'mood',
                            selected: true,
                        },
                        weight: {
                            category: 'Diet',
                            icon: 'fa fa-question-circle',
                            id: 'weight',
                            selected: false,
                            text: 'Weight'
                        },
                    },
                    title: 'Diet'
                },
                someOtherAbritraryKey: {
                    __directives: {
                        client: true
                    },
                    arb1: 'arbitrary value',
                    arb2: 'some other arbitrary value'
                }
            }
        };
        var expected = 'query { diet @client { id options { ' +
            'mood { category id selected } weight { category icon id text } } ' +
            'title } someOtherAbritraryKey @client { arb1 arb2 } }';
        (0, chai_1.expect)((0, __1.jsonToGraphQLQuery)(query)).to.equal(expected);
    });
    it('converts a simple query with args and multiple directives', function () {
        var query = {
            query: {
                Posts: {
                    __args: {
                        where: {
                            id: 10,
                        },
                        orderBy: 'flibble',
                    },
                    __directives: {
                        client: true,
                        withArgs: {
                            id: [1, 2, 3],
                        },
                    },
                    id: true,
                    title: true,
                    post_date: true,
                },
            },
        };
        (0, chai_1.expect)((0, __1.jsonToGraphQLQuery)(query, { pretty: true })).to.equal("query {\n    Posts (\n        where: { id: 10 },\n        orderBy: \"flibble\"\n    ) @client @withArgs(id: [\n        1,\n        2,\n        3\n    ]) {\n        id\n        title\n        post_date\n    }\n}");
    });
    it('converts a simple query with args and multiple directives but a directive has an empty object', function () {
        var query = {
            query: {
                Posts: {
                    __args: {
                        where: {
                            id: 10,
                        },
                        orderBy: 'flibble',
                    },
                    __directives: {
                        client: true,
                        withArgs: {},
                    },
                    id: true,
                    title: true,
                    post_date: true,
                },
            },
        };
        (0, chai_1.expect)((0, __1.jsonToGraphQLQuery)(query, { pretty: true })).to.equal("query {\n    Posts (\n        where: { id: 10 },\n        orderBy: \"flibble\"\n    ) @client @withArgs {\n        id\n        title\n        post_date\n    }\n}");
    });
    it('converts a complex query with multiple directives', function () {
        var query = {
            query: {
                diet: {
                    __directives: {
                        client: true,
                    },
                    id: 'diet',
                    options: {
                        mood: {
                            category: 'Diet',
                            id: 'mood',
                            selected: true,
                        },
                        weight: {
                            category: 'Diet',
                            icon: 'fa fa-question-circle',
                            id: 'weight',
                            selected: false,
                            text: 'Weight',
                        },
                    },
                    title: 'Diet',
                },
                someOtherAbritraryKey: {
                    __directives: {
                        client: true,
                        withArgs: {
                            id: [1, 2, 3],
                        },
                    },
                    arb1: 'arbitrary value',
                    arb2: 'some other arbitrary value',
                },
            },
        };
        var expected = 'query { diet @client { id options { ' +
            'mood { category id selected } weight { category icon id text } } ' +
            'title } someOtherAbritraryKey @client @withArgs(id: [1, 2, 3]) { arb1 arb2 } }';
        (0, chai_1.expect)((0, __1.jsonToGraphQLQuery)(query)).to.equal(expected);
    });
});
//# sourceMappingURL=directives.tests.js.map