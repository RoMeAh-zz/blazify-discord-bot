import chalk from "chalk"
import moment from "moment";
import * as util from "util";

export class Logger {
    async log (content: string, { color = 'grey', tag = 'Log' } = {}) {
        this.write(content, { color, tag });
    }

    async info (content: string, { color = 'green', tag = 'Info' } = {}) {
        this.write(content, { color, tag });
    }

    async warn (content: string, { color = 'yellow', tag = 'Warn' } = {}) {
        this.write(content, { color, tag });
    }

    async error (content: string, { color = 'red', tag = 'Error' } = {}) {
        this.write(content, { color, tag, error: true });
    }

    async stacktrace (content: string, { color = 'white', tag = 'Error' } = {}) {
        this.write(content, { color, tag, error: true });
    }

    async write(content: string, { color = 'grey', tag = 'Log', error = false } = {}) {
        let text;
        let type;
        const timestamp = chalk.cyan(`[${moment().format('MM-DD-YYYY HH:mm:ss')}]:`);
        const levelTag = chalk.bold(`[${tag}]:`);
        /*Element implicitly has an 'any' type because expression of type 'string' can't be used to index type 'Chalk & ChalkFunction & { supportsColor: false | ColorSupport; Level: Level; Color: Color; ForegroundColor: ForegroundColor; BackgroundColor: BackgroundColor; Modifiers: Modifiers; stderr: Chalk & { ...; }; }'.
  No index signature with a parameter of type 'string' was found on type 'Chalk & ChalkFunction & { supportsColor: false | ColorSupport; Level: Level; Color: Color; ForegroundColor: ForegroundColor; BackgroundColor: BackgroundColor; Modifiers: Modifiers; stderr: Chalk & { ...; }; }'.*/ 
        text = chalk[color](content)
        type = chalk[color](this.clean(content));
        const stream = error ? process.stderr : process.stdout;
        stream.write(`${timestamp} ${levelTag} ${text}: ${type}\n`);
    }

    async clean (item: string) {
        const cleaned = util.inspect(item, { depth: Infinity });
        return cleaned;
    }
}