class APIResponse{
    constructor (statusCode , data , message ="SUCCESS"){
        this.stausCode = statusCode ;
        this.data = data ;
        this.message = message ;
        this.success = statusCode<400;
    }
}
export {APIResponse}