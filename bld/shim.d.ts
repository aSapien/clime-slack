import { CLI } from 'clime';
import { SlackCommandContext } from './slack';
export declare class SlackShim {
    cli: CLI;
    token: string | undefined;
    constructor(cli: CLI, token?: string | undefined);
    execute(context: SlackCommandContext): Promise<object>;
}
