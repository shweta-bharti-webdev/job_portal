// middleware to allow only normal users
function isUser(req,res,next){
    if(req.user.role !== "user")
    {
        return res.status(403).json({
            message: "access denied. user only",
            success: false,
        });
    }
    next();
}
// middleware to allow only recruiter
function isRecruiter(req,res,next){
    if(req.user.role !== "recruiter")
    {
        return res.status(403).json({
            message: "access denied. recruiter only",
            success: false,
        });
    }
    next();
}

function isAdmin(req,res,next){
    if(req.user.role !== "admin"){
        return res.status(403).json({
            message: "acess denied. admin only",
            success: false,
        });
    }
    next();
}

module.exports = { isUser,isRecruiter, isAdmin};