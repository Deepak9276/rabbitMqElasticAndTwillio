exports.successResponse = function (res, msg, data){
    var response ={
        status: true,
        message: msg,
        data: data
    }
    return res.status(200).json(response);

}

exports.errorResponse = function (res, msg){
    var response ={
        status: false,
        message: msg,
    }
    return res.status(500).json(response);
}

exports.validationErrorResponse = function (res, msg,data){
    var response ={
        status: false,
        message: msg,
        data: data
    }
    return res.status(400).json(response);
}