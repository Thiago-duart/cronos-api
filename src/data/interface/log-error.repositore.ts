export interface ILogErrorRepositore {
    log(stack: string): Promise<void>
}