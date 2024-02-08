"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jsonToGraphQLQuery = exports.configFields = void 0;
var EnumType_1 = require("./types/EnumType");
var VariableType_1 = require("./types/VariableType");
exports.configFields = [
    '__args', '__alias', '__aliasFor', '__variables', '__directives', '__on', '__all_on', '__typeName', '__name'
];
function stringify(obj_from_json, options, level) {
    if (level === void 0) { level = 0; }
    if (obj_from_json instanceof EnumType_1.EnumType) {
        return obj_from_json.value;
    }
    else if (obj_from_json instanceof VariableType_1.VariableType) {
        return "$".concat(obj_from_json.value);
    }
    else if (typeof obj_from_json !== 'object' || obj_from_json === null) {
        return JSON.stringify(obj_from_json);
    }
    else if (Array.isArray(obj_from_json)) {
        if (options.pretty) {
            var indentLevel = level - 1 >= 0 ? level - 1 : 0;
            return obj_from_json.length > 1
                ? "[\n".concat(obj_from_json.map(function (item) { return getIndent(level) + stringify(item, options, level); }).join(',\n'), "\n").concat(getIndent(indentLevel), "]")
                : "[ ".concat(obj_from_json.map(function (item) { return stringify(item, options, level); }).join(', '), " ]");
        }
        return "[".concat(obj_from_json.map(function (item) { return stringify(item, options, level); }).join(', '), "]");
    }
    var props = Object
        .keys(obj_from_json)
        .map(function (key) {
        var stringifiedKey = "".concat(key, ": ").concat(stringify(obj_from_json[key], options, level + 1));
        if (options.pretty) {
            return (Object.keys(obj_from_json).length > 1 ? getIndent(level) : '') + stringifiedKey;
        }
        return stringifiedKey;
    })
        .join(options.pretty ? ',\n' : ', ');
    if (options.pretty) {
        var indentLevel = level - 1 >= 0 ? level - 1 : 0;
        return Object
            .keys(obj_from_json).length > 1 ? "{\n".concat(props, "\n").concat(getIndent(indentLevel), "}") : "{ ".concat(props, " }");
    }
    return "{".concat(props, "}");
}
function buildArgs(argsObj, options, level) {
    if (level === void 0) { level = 0; }
    var args = [];
    for (var argName in argsObj) {
        if (options.pretty) {
            var indent = Object.keys(argsObj).length > 1 ? getIndent(level + 1) : '';
            args.push("".concat(indent).concat(argName, ": ").concat(stringify(argsObj[argName], options, level + 2)));
        }
        else {
            args.push("".concat(argName, ": ").concat(stringify(argsObj[argName], options, level)));
        }
    }
    return args.join(options.pretty ? ',\n' : ', ');
}
function buildVariables(varsObj) {
    var args = [];
    for (var varName in varsObj) {
        args.push("$".concat(varName, ": ").concat(varsObj[varName]));
    }
    return args.join(', ');
}
function buildDirectives(dirsObj, options, level) {
    if (level === void 0) { level = 0; }
    var directiveName = Object.keys(dirsObj)[0];
    var directiveValue = dirsObj[directiveName];
    if (typeof directiveValue === 'boolean' || (typeof directiveValue === 'object' && Object.keys(directiveValue).length === 0)) {
        return directiveName;
    }
    else if (typeof directiveValue === 'object') {
        var args = [];
        for (var argName in directiveValue) {
            var argVal = stringify(directiveValue[argName], options, level).replace(/"/g, '');
            args.push("".concat(argName, ": ").concat(argVal));
        }
        return "".concat(directiveName, "(").concat(args.join(', '), ")");
    }
    else {
        throw new Error("Unsupported type for directive: ".concat(typeof directiveValue, ". Types allowed: object, boolean.\n") +
            "Offending object: ".concat(JSON.stringify(dirsObj)));
    }
}
function getIndent(level) {
    return Array((level * 4) + 1).join(' ');
}
function filterNonConfigFields(fieldName, ignoreFields) {
    return exports.configFields.indexOf(fieldName) == -1 && ignoreFields.indexOf(fieldName) == -1;
}
function convertQuery(node, level, output, options) {
    Object.keys(node)
        .filter(function (key) { return filterNonConfigFields(key, options.ignoreFields); })
        .forEach(function (key) {
        var value = node[key];
        if (typeof value === 'object') {
            if (Array.isArray(value)) {
                value = value.find(function (item) { return item && typeof item === 'object'; });
                if (!value) {
                    output.push(["".concat(key), level]);
                    return;
                }
            }
            if (value && Object.keys(value).filter(function (k) { return value[k] !== false || options.includeFalsyKeys; }).length === 0) {
                return;
            }
            var fieldCount = Object.keys(value)
                .filter(function (keyCount) { return filterNonConfigFields(keyCount, options.ignoreFields); }).length;
            var subFields = fieldCount > 0;
            var argsExist = typeof value.__args === 'object' && Object.keys(value.__args).length > 0;
            var directivesExist = typeof value.__directives === 'object';
            var fullFragmentsExist = value.__all_on instanceof Array;
            var partialFragmentsExist = typeof value.__on === 'object';
            var token = "".concat(key);
            if (typeof value.__name === 'string') {
                token = "".concat(token, " ").concat(value.__name);
            }
            if (typeof value.__aliasFor === 'string') {
                token = "".concat(token, ": ").concat(value.__aliasFor);
            }
            if (typeof value.__variables === 'object' && Object.keys(value.__variables).length > 0) {
                token = "".concat(token, " (").concat(buildVariables(value.__variables), ")");
            }
            else if (argsExist || directivesExist) {
                var argsStr = '';
                var dirsStr = '';
                if (directivesExist) {
                    dirsStr = Object.entries(value.__directives)
                        .map(function (item) {
                        var _a;
                        return "@".concat(buildDirectives((_a = {}, _a[item[0]] = item[1], _a), options, level + 1));
                    })
                        .join(' ');
                }
                if (argsExist) {
                    if (options.pretty && Object.keys(value.__args).length > 1) {
                        argsStr = "(\n".concat(buildArgs(value.__args, options, level), "\n").concat(getIndent(level), ")");
                    }
                    else {
                        argsStr = "(".concat(buildArgs(value.__args, options), ")");
                    }
                }
                var spacer = directivesExist && argsExist ? ' ' : '';
                token = "".concat(token, " ").concat(argsStr).concat(spacer).concat(dirsStr);
            }
            output.push([token + (subFields || partialFragmentsExist || fullFragmentsExist ? ' {' : ''), level]);
            convertQuery(value, level + 1, output, options);
            if (fullFragmentsExist) {
                value.__all_on.forEach(function (fullFragment) {
                    output.push(["...".concat(fullFragment), level + 1]);
                });
            }
            if (partialFragmentsExist) {
                var inlineFragments = value.__on instanceof Array ? value.__on : [value.__on];
                inlineFragments.forEach(function (inlineFragment) {
                    var name = inlineFragment.__typeName;
                    output.push(["... on ".concat(name, " {"), level + 1]);
                    convertQuery(inlineFragment, level + 2, output, options);
                    output.push(['}', level + 1]);
                });
            }
            if (subFields || partialFragmentsExist || fullFragmentsExist) {
                output.push(['}', level]);
            }
        }
        else if (options.includeFalsyKeys === true || value) {
            output.push(["".concat(key), level]);
        }
    });
}
function jsonToGraphQLQuery(query, options) {
    if (options === void 0) { options = {}; }
    if (!query || typeof query != 'object') {
        throw new Error('query object not specified');
    }
    if (Object.keys(query).length == 0) {
        throw new Error('query object has no data');
    }
    if (!(options.ignoreFields instanceof Array)) {
        options.ignoreFields = [];
    }
    var queryLines = [];
    convertQuery(query, 0, queryLines, options);
    var output = '';
    queryLines.forEach(function (_a) {
        var line = _a[0], level = _a[1];
        if (options.pretty) {
            if (output) {
                output += '\n';
            }
            output += getIndent(level) + line;
        }
        else {
            if (output) {
                output += ' ';
            }
            output += line;
        }
    });
    return output;
}
exports.jsonToGraphQLQuery = jsonToGraphQLQuery;
//# sourceMappingURL=jsonToGraphQLQuery.js.map