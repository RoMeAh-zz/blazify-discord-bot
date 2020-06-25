//@ts-nocheck
import chalk, { bgBlueBright } from "chalk"
import moment from "moment";

export class Logger {
    async log (content: string, { color = 'grey', tag = 'Log' } = {}) {
        await this.write(content, {color, tag});
    }
    async info (content: string, { color = 'blueBright', tag = 'Info' } = {}) {
        await this.write(content, {color, tag});
    }
    async warn (content: string, { color = 'yellow', tag = 'Warn' } = {}) {
        await this.write(content, {color, tag});
    }
    async error (content: string, { color = 'red', tag = 'Error' } = {}) {
        await this.write(content, {color, tag, error: true});
    }
    async stacktrace (content: string, { color = 'white', tag = 'Error' } = {}) {
        await this.write(content, {color, tag, error: true});
    }
    async write(content: string, { color = 'grey', tag = 'Log', error = false } = {}) {
        let text;
        let type;
        const timestamp = chalk.white(`[${moment().format('MM-DD-YYYY HH:mm:ss')}]:`);
        const levelTag = chalk.bold.green(`[${tag}]:`); 
        text = chalk[color](content)
        const stream = error ? process.stderr : process.stdout;
        stream.write(chalk.bgBlack`${timestamp} ${levelTag} ${text}\n`);
    }
}