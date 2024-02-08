"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var __1 = require("../");
describe('jsonToGraphQLQuery() - name', function () {
    it('supports Named Queries', function () {
        var query = {
            query: {
                __name: 'NewName',
                lorem: {
                    __aliasFor: 'Posts',
                    __args: {
                        arg1: 20,
                    },
                    id: true,
                },
                larem: {
                    __aliasFor: 'Posts',
                    __args: {
                        arg2: 10,
                    },
                    id: true,
                },
            },
        };
        (0, chai_1.expect)((0, __1.jsonToGraphQLQuery)(query)).to.equal('query NewName { lorem: Posts (arg1: 20) { id } larem: Posts (arg2: 10) { id } }');
    });
    it('supports Named Mutations', function () {
        var query = {
            mutation: {
                __name: 'NewName',
                one: {
                    __aliasFor: 'Posts',
                    __args: {
                        arg1: 20,
                    },
                    id: true,
                },
                two: {
                    __aliasFor: 'Posts',
                    __args: {
                        arg2: 10,
                    },
                    id: true,
                },
            },
        };
        (0, chai_1.expect)((0, __1.jsonToGraphQLQuery)(query)).to.equal('mutation NewName { one: Posts (arg1: 20) { id } two: Posts (arg2: 10) { id } }');
    });
});
describe('jsonToGraphQLQuery() - combinations', function () {
    it('correctly converts query with name/ empty variables', function () {
        var query = {
            query: {
                __name: 'NewName',
                __variables: {},
                Posts: {
                    __args: {
                        arg1: 20,
                        arg2: new __1.VariableType('variable1'),
                    },
                    id: true,
                    title: true,
                },
            },
        };
        (0, chai_1.expect)((0, __1.jsonToGraphQLQuery)(query, { pretty: true })).to.equal("query NewName {\n    Posts (\n        arg1: 20,\n        arg2: $variable1\n    ) {\n        id\n        title\n    }\n}");
    });
    it('correctly converts query with name/variables', function () {
        var query = {
            query: {
                __name: 'NewName',
                __variables: {
                    variable1: 'String!',
                    variableWithDefault: 'String = "default_value"',
                },
                Posts: {
                    __args: {
                        arg1: 20,
                        arg2: new __1.VariableType('variable1'),
                    },
                    id: true,
                    title: true,
                },
            },
        };
        (0, chai_1.expect)((0, __1.jsonToGraphQLQuery)(query, { pretty: true })).to.equal("query NewName ($variable1: String!, $variableWithDefault: String = \"default_value\") {\n    Posts (\n        arg1: 20,\n        arg2: $variable1\n    ) {\n        id\n        title\n    }\n}");
    });
    it('correctly converts query with variables/name/alias/args/variable/fragments', function () {
        var query = {
            query: {
                __name: 'NewName',
                __variables: {
                    someString: 'String!',
                    varWithDefault: 'String = "default_value"',
                },
                one: {
                    __aliasFor: 'Posts',
                    __args: {
                        arg1: 20,
                        arg2: new __1.VariableType('someString'),
                        status: new __1.EnumType('PUBLISHED'),
                    },
                    name: false,
                    id: true,
                    title: true,
                    comments: {
                        __args: {
                            offensiveOnly: true,
                        },
                        id: true,
                        comment: true,
                        user: true,
                    },
                },
                Post: {
                    __args: {
                        arg1: 20,
                        arg2: new __1.VariableType('someString'),
                    },
                    __on: {
                        __typeName: 'ConfigurablePost',
                        id: true,
                    },
                    name: false,
                    title: true,
                    comments: {
                        __args: {
                            offensiveOnly: true,
                        },
                        id: true,
                        comment: true,
                        user: true,
                    },
                },
                Posts: {
                    __args: {
                        arg1: 20,
                        arg2: new __1.VariableType('someString'),
                    },
                    name: false,
                    id: true,
                    title: true,
                    comments: {
                        __args: {
                            offensiveOnly: true,
                        },
                        id: true,
                        comment: true,
                        user: true,
                    },
                },
            },
        };
        (0, chai_1.expect)((0, __1.jsonToGraphQLQuery)(query, { pretty: true })).to.equal("query NewName ($someString: String!, $varWithDefault: String = \"default_value\") {\n    one: Posts (\n        arg1: 20,\n        arg2: $someString,\n        status: PUBLISHED\n    ) {\n        id\n        title\n        comments (offensiveOnly: true) {\n            id\n            comment\n            user\n        }\n    }\n    Post (\n        arg1: 20,\n        arg2: $someString\n    ) {\n        title\n        comments (offensiveOnly: true) {\n            id\n            comment\n            user\n        }\n        ... on ConfigurablePost {\n            id\n        }\n    }\n    Posts (\n        arg1: 20,\n        arg2: $someString\n    ) {\n        id\n        title\n        comments (offensiveOnly: true) {\n            id\n            comment\n            user\n        }\n    }\n}");
    });
});
//# sourceMappingURL=name.tests.js.map