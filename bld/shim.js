"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Util = require("util");
const clime_1 = require("clime");
const ShellWords = require("shellwords");
const stripAnsi = require("strip-ansi");
const through2 = require("through2");
const slack_1 = require("./slack");
class SlackShim {
    constructor(cli, token) {
        this.cli = cli;
        this.token = token;
    }
    async execute(context) {
        let { token, text } = context;
        if (this.token && token !== this.token) {
            return { error: 'Permission denied' };
        }
        text = text.replace(/[<>|]/g, '\\$&');
        let args = ShellWords.split(text);
        try {
            let result = await this.cli.execute([...args], context);
            if (clime_1.isPrintable(result)) {
                let printResult = new PrintResult();
                await result.print(printResult.through, printResult.through);
                return {
                    attachments: [
                        {
                            color: 'good',
                            text: code(printResult.plainText),
                            mrkdwn_in: ['text'],
                        },
                    ],
                };
            }
            else if (slack_1.isSlackCommandResponse(result)) {
                return result;
            }
            else {
                return {
                    attachments: [
                        {
                            color: 'good',
                            text: code(`${result}`),
                            mrkdwn_in: ['text'],
                        },
                    ],
                };
            }
        }
        catch (error) {
            if (clime_1.isPrintable(error)) {
                let printResult = new PrintResult();
                await error.print(printResult.through, printResult.through);
                return {
                    attachments: [
                        {
                            color: 'danger',
                            text: code(printResult.plainText),
                            mrkdwn_in: ['text'],
                        },
                    ],
                };
            }
            else if (error instanceof Error) {
                return {
                    attachments: [
                        {
                            color: 'danger',
                            text: code(error.stack || error.message),
                            mrkdwn_in: ['text'],
                        },
                    ],
                };
            }
            else {
                return {
                    attachments: [
                        {
                            color: 'danger',
                            text: code(Util.format(error)),
                            mrkdwn_in: ['text'],
                        },
                    ],
                };
            }
        }
    }
}
exports.SlackShim = SlackShim;
class PrintResult {
    constructor() {
        this.text = '';
        this.through = through2((chunk, _encoding, callback) => {
            this.text += chunk;
            callback();
        });
    }
    get plainText() {
        return stripAnsi(this.text);
    }
}
function code(text) {
    return `\`\`\`${text}\`\`\``;
}
//# sourceMappingURL=shim.js.map