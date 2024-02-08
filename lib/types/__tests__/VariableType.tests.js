"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var __1 = require("../../");
describe('VariableType()', function () {
    it('converts query variables', function () {
        var query = {
            query: {
                __variables: {
                    someString: 'String!',
                    varWithDefault: 'String = "default_value"'
                },
                Posts: {
                    __args: {
                        arg1: 20,
                        arg2: new __1.VariableType('someString')
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
        (0, chai_1.expect)((0, __1.jsonToGraphQLQuery)(query, { pretty: true })).to.equal("query ($someString: String!, $varWithDefault: String = \"default_value\") {\n    Posts (\n        arg1: 20,\n        arg2: $someString\n    ) {\n        id\n        title\n        comments (offensiveOnly: true) {\n            id\n            comment\n            user\n        }\n    }\n}");
    });
    it('Returns variable name prefixed with a dollar sign with JSON.stringify', function () {
        var args = {
            arg2: new __1.VariableType('someString')
        };
        (0, chai_1.expect)(JSON.stringify(args)).to.equal('{"arg2":"$someString"}');
    });
});
//# sourceMappingURL=VariableType.tests.js.map