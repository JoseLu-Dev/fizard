import ora from 'ora'
import { Service } from 'typedi';

@Service()
export class LoaderSpinner {

    private readonly spinner = ora()

    start(text: string, color: Color) {
        this.spinner.color = color
        this.spinner.start(text)
    }

    update(text: string, color: Color) {
        this.spinner.color = color
        this.spinner.text = text
    }

    stop() {
        this.spinner.stop()
    }

}

export enum Color {
    BLACK = 'black',
    RED = 'red',
    GREEN = 'green',
    YELLOW = 'yellow',
    BLUE = 'blue',
    MAGENTA = 'magenta',
    CYAN = 'cyan',
    WHITE = 'white',
    GRAY = 'gray'
}