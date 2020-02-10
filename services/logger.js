class LoggerService{    
    console = console
    log   = args =>  !process.env.PRODUCTION && this.console.log(args)
    error = args =>  !process.env.PRODUCTION && this.console.error(args)
    info  = args =>  !process.env.PRODUCTION && this.console.info(args)
    warn  = args =>  !process.env.PRODUCTION && this.console.warn(args)
}

export default new LoggerService();