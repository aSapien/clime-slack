"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const clime_1 = require("clime");
class SlackUser {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }
    toString() {
        return `<@${this.id}|${this.name}>`;
    }
    static cast(text) {
        let groups = text.match(/^<@([^|]+)\|([^>]+)>$/);
        if (!groups) {
            throw new clime_1.ExpectedError(`"${text}" is not a valid escaped slack user`);
        }
        return new SlackUser(groups[1], groups[2]);
    }
}
exports.SlackUser = SlackUser;
class SlackChannel {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }
    toString() {
        return `<#${this.id}|${this.name}>`;
    }
    static cast(text) {
        let groups = text.match(/^<#([^|]+)\|([^>]+)>$/);
        if (!groups) {
            throw new clime_1.ExpectedError(`"${text}" is not a valid escaped slack channel`);
        }
        return new SlackChannel(groups[1], groups[2]);
    }
}
exports.SlackChannel = SlackChannel;
// tslint:disable:variable-name
class SlackCommandContext extends clime_1.Context {
    constructor(options, contextExtension) {
        super(options);
        Object.assign(this, contextExtension);
        this.user = new SlackUser(this.user_id, this.user_name);
        this.channel = new SlackChannel(this.channel_id, this.channel_name);
    }
}
exports.SlackCommandContext = SlackCommandContext;
function isSlackCommandResponse(object) {
    return (object &&
        typeof object === 'object' &&
        (typeof object.text === 'string' || Array.isArray(object.attachments)));
}
exports.isSlackCommandResponse = isSlackCommandResponse;
//# sourceMappingURL=slack.js.map