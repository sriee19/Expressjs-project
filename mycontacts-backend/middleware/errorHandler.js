const errorHandler = (err,req,res,next) => {
    const statuscode = res.statuscode ? res.statuscode : 500;
   switch (statuscode) {
    case 400:
        res.json({
            title: "Validation Failed",
             message: err.message,
             stackTrace: err.stack,
        })
        break;
        case 404:
            res.json({
                title: "Not Found",
                 message: err.message,
                 stackTrace: err.stack,
            })
            break;
    default:
        break;
   }
   
};

module.exports = errorHandler;