
const Models = require('../models');

const addUser = async (req, res, next) => {
    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //   return next(
    //     new HttpError('Invalid inputs passed, please check your data.', 422)
    //   );
    // }
  
    const reqbody = req.body;

    try{
        const postData = await Models.Users.create({...reqbody})
        return res.status(201).json(postData)
    }catch(err){
        // console.log(err)
        return next(err);
    }
  };

  const getAllUser = async (req, res, next) => {
    try{
        const users = await Models.Users.findAll()
        return res.status(200).json(users)
    }catch(err){
        // console.log(err)
        return next(err);
    }
  };
  const deleteUser = async (req, res, next) => {
    try{
        const deletedUser = await Models.Users.destroy({
            where : {
                login_uuid : req.params.id
            }
        })
        return res.status(200).json(deletedUser)
    }catch(err){
        // console.log(err)
        return next(err);
    }
  };
  const deleteAllUser = async (req, res, next) => {
    try{
        const deletedUser = await Models.Users.destroy({
            where: {},
            truncate: true
        })
        return res.status(200).json(deletedUser)
    }catch(err){
        // console.log(err)
        return next(err);
    }
  };


  exports.addUser = addUser;
  exports.getAllUser = getAllUser;
  exports.deleteUser = deleteUser;
  exports.deleteAllUser = deleteAllUser;