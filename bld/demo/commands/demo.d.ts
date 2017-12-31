import { Command } from 'clime';
import { SlackUser } from '../..';
export default class  extends Command {
    execute(user: SlackUser): string;
}
