const {constants} = require ("../constants")
const errorHandler = (err,req,res,next) => {
    const statuscode = res.statuscode ? res.statuscode : 500;
   switch (statuscode) {
    case constants.VALIDATION_ERROR:
        res.json({
            title: "Validation Failed",
             message: err.message,
             stackTrace: err.stack,
        })
        break;
        case constants.NOT_FOUND:
            res.json({
                title: "Not Found",
                 message: err.message,
                 stackTrace: err.stack,
            })
            break;
            case constants.UNAUTHORIZED:
                res.json({
                    title: "Un authorized",
                     message: err.message,
                     stackTrace: err.stack,
                })
                break;
            case constants.FORBIDDEN:
                res.json({
                    title: "Forbidden",
                     message: err.message,
                     stackTrace: err.stack,
                })
                break;
            case constants.SERVER_ERROR:
                res.json({
                    title: "server error",
                     message: err.message,
                     stackTrace: err.stack,
                })
                break;
    default:
        console.log("No error, All good!")
        break;
   }
   
};

module.exports = errorHandler;