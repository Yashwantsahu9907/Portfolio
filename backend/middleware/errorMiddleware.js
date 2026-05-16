// Error middleware;- Handle error, invalid request route handle, manage backend crashes 

const errorHandler = (err, req, res, next) => {

    // if status code is still 200 then change it to 500
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);

    res.json({
        //error message
        message: err.message,

        // show stack only in development mode
        stack: process.env.NODE_ENV === 'production' ? null: err.stack,
    });
};


// Route not found middleware   handle invalid route
const notFound = (req, res, next) => {
    const error = new Error(
        'Not Found - ${req.originalUrl}'  //req.originalUrl gives the original request url
    );

    res.ststus(400);

    next(error);   // send the error to the next middleware for handling error


};

export { errorHandler, notFound, };