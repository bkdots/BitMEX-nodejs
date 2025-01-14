"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SwaggerParser = exports.CONTAINER = void 0;
exports.CONTAINER = 'BITMEX';
const toEntries = (obj) => Object.keys(obj).map(key => [key, obj[key]]);
const titleCase = (w) => w.charAt(0).toUpperCase() + w.substr(1).toLowerCase();
const eTitleCase = (text) => text.replace(/\/(\w)/g, (a, w) => titleCase(w));
const normalizeDefinition = (text) => text.replace('#/definitions/', '').replace('x-any', 'any');
const enumMapper = (d) => `'${d.trim()}'`;
const commentSeperator = (text) => (text || '').split('\n').map(line => line.trim()).map(line => line ? ' * ' + line : ' *');
const descriptionEnumRegexps = [
    /Available options: \[(.+?)\]/,
    /Valid options: (.+?)\./,
    /Options: ((["'`])\w+\2(?:,\s*\2\w+\2)*)/
];
const cleanPathParameters = (path) => path.replace(/\{[^}]+\}/g, '').replace(/\/$/, '');
class SwaggerParser {
    constructor(data) {
        this.data = data;
        this.pathesMap = new Map();
        this.parametersMap = new Map();
        this.definitionsMap = new Map();
        this.definitionsDescMap = new Map();
        for (const [name, item] of toEntries(data.definitions)) {
            if (name === 'x-any')
                continue;
            // TODO: use item.required
            this.definitionsDescMap.set(name, item.description);
            const defs = [];
            this.definitionsMap.set(name, defs);
            for (const [prop, def] of toEntries(item.properties)) {
                let arg = 'any';
                switch (def.type) {
                    case 'string':
                        arg = def.enum ? def.enum.map(enumMapper).join(' | ') : 'string';
                        break;
                    case 'number':
                    case 'boolean':
                        arg = def.type;
                        break;
                    case 'array':
                        arg = `${def.items.$ref ? normalizeDefinition(def.items.$ref) : def.items.type}[]`;
                        break;
                    case 'object':
                        arg = 'any';
                        break;
                    default:
                        arg = def.$ref ? normalizeDefinition(def.$ref) : 'any';
                }
                let row = `${prop}: ${arg};`;
                const comments = [];
                if (def.format) {
                    comments.push(`format: ${def.format}`);
                }
                if (def.maxLength) {
                    comments.push(`maxLength: ${def.maxLength}`);
                }
                if (def.default) {
                    comments.push(`default: ${typeof def.default === 'object' ? JSON.stringify(def.default) : def.default}`);
                }
                if (comments.length) {
                    row += ' // ' + comments.join(', ');
                }
                // const arr = this.definitionsMap.get(name)!;
                defs.push(row);
                // this.definitionsMap.set(name, arr);
            }
        }
        for (const [path, methods] of toEntries(data.paths)) {
            for (let [method, def] of toEntries(methods)) {
                if (def.deprecated) {
                    continue;
                }
                // TODO: use def.Tags
                const authorized = typeof def.security === 'undefined';
                const [type, name] = def.operationId.split('.');
                const responseType = this.getResponseType(def.responses);
                const [arg, opts] = this.iterateParameters(def.parameters, path, method);
                const authorizedArg = authorized ? ', true' : '';
                method = method.toUpperCase();
                const desc = ((def.summary || '') + (def.description || '')).trim();
                const replacedPath = path.replace(/\{([^}]+)\}/g, '${path.$1}');
                const arr = this.pathesMap.get(type) || [];
                arr.push('');
                arr.push(`/**`);
                if (authorized) {
                    arr.push(' * @Authorized');
                }
                commentSeperator(desc).forEach(line => arr.push(line));
                arr.push(` */`);
                arr.push(`${name}: async (${arg}) => `);
                arr.push(`  this.request<${responseType}>('${method}', \`${replacedPath}\`, ${opts}${authorizedArg}),`);
                this.pathesMap.set(type, arr);
            }
        }
    }
    getResponseType(responses) {
        let responseType = 'any';
        for (const [status, res] of toEntries(responses)) {
            if (status !== '200') {
                continue;
            }
            switch (res.schema.type) {
                case 'array':
                    const normalized = normalizeDefinition(res.schema.$ref || '');
                    if (!normalized || normalized === 'any') {
                        responseType = 'any';
                    }
                    else {
                        responseType = exports.CONTAINER + '.' + normalized;
                    }
                    break;
                case 'object':
                    if (res.schema.properties) {
                        responseType = '{' + Object
                            .keys(res.schema.properties)
                            .map((key) => `${key}: ${res.schema.properties[key].type};`)
                            .join(' ') + '}';
                    }
                    break;
                case 'string':
                    responseType = 'string';
                    break;
                case 'boolean':
                case 'number':
                    responseType = res.schema.type;
                    break;
                default:
                    responseType = res.schema.$ref ? exports.CONTAINER + '.' + normalizeDefinition(res.schema.$ref) : responseType;
            }
        }
        return responseType;
    }
    iterateParameters(parameters, path, method) {
        let arg = '';
        let opts = '';
        let argRequried = false;
        let multipleArg = [];
        let finalArg = '';
        let finalOpts = '';
        const title = cleanPathParameters(eTitleCase(path));
        for (const p of parameters) {
            let key;
            if (p.in === 'formData') {
                key = `${title}${titleCase(method)}`;
                opts = 'form';
                arg = `${exports.CONTAINER}.${key}`;
            }
            else if (p.in === 'query') {
                key = `${title}Query`;
                opts = 'qs';
                arg = `${exports.CONTAINER}.${key}`;
            }
            else if (p.in === 'path') {
                key = `${title}${titleCase(method)}`;
                opts = 'path';
                arg = `${exports.CONTAINER}.${key}`;
            }
            else if (p.in === 'body') {
                key = `${title}${titleCase(method)}`;
                opts = 'body';
                arg = `${exports.CONTAINER}.${key}`;
            }
            else {
                throw new Error(`unknown parameter: ${p.in}`);
            }
            const comment = typeof p.default !== 'undefined' ? ` // DEFAULT: ${p.default}` : '';
            const required = (p.required && typeof p.default === 'undefined');
            argRequried = argRequried || required;
            const pArray = this.parametersMap.get(key) || [];
            let type = p.type;
            if (p.description) {
                for (const regex of descriptionEnumRegexps) {
                    const match = p.description.match(regex);
                    if (match) {
                        type = match[1].replace(/['`"]/g, '').split(',').map(enumMapper).join(' | ');
                        break;
                    }
                }
            }
            pArray.push('');
            if (p.description) {
                pArray.push(`/**`);
                commentSeperator(p.description).forEach(line => pArray.push(line));
                pArray.push(` */`);
            }
            pArray.push(`${p.name}${required ? '' : '?'}: ${type};${comment}`);
            this.parametersMap.set(key, pArray);
            if (p.in != 'formData' && p.in != 'query') {
                multipleArg.push(arg ? `${opts}: ${arg}${(argRequried ? '' : ' = {}')}` : '');
                if (opts == 'path') {
                    finalOpts += '';
                }
                else {
                    finalOpts += `${opts}`;
                }
            }
            else {
                finalArg = arg ? `${opts}: ${arg}${(argRequried ? '' : ' = {}')}` : '';
                if (opts == 'path') {
                    finalOpts = '';
                }
                else {
                    finalOpts = `${opts}`;
                }
            }
        }
        if (multipleArg.length > 0) {
            finalArg = multipleArg.join(", ");
        }
        return [finalArg, `{ ${finalOpts} }`];
    }
    createInterfaces() {
        const interfacesBody = [];
        for (const [type, rows] of this.definitionsMap.entries()) {
            const desc = this.definitionsDescMap.get(type);
            interfacesBody.push('');
            if (desc) {
                interfacesBody.push(`/**`);
                commentSeperator(desc).forEach(line => interfacesBody.push(line));
                interfacesBody.push(` */`);
            }
            interfacesBody.push(`export interface ${type} {`);
            rows.forEach(row => interfacesBody.push(row));
            interfacesBody.push('}');
        }
        for (const [type, lines] of this.parametersMap.entries()) {
            interfacesBody.push('');
            interfacesBody.push(`export interface ${type} {`);
            lines.forEach(line => interfacesBody.push(line));
            interfacesBody.push('}');
        }
        return interfacesBody.join('\n');
    }
    createClass() {
        const classBody = [];
        classBody.push(`readonly basePath = '${this.data.basePath}';`);
        for (const [type, lines] of this.pathesMap.entries()) {
            classBody.push('');
            classBody.push(`public ${type} = {`);
            lines.forEach(line => classBody.push(line));
            classBody.push('};');
        }
        return classBody.join('\n');
    }
}
exports.SwaggerParser = SwaggerParser;
