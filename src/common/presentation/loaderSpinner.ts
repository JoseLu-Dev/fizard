import { createSpinner } from 'nanospinner'

class LoaderSpinner {

    private readonly spinner = createSpinner()

    start(text: string, color: Color) {
        this.spinner.start({
            text: text,
            color: color,
        })
    }

    update(text: string, color: Color) {
        this.spinner.update({
            text: text,
            color: color,
        })
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

export const loaderSpinner = new LoaderSpinner()