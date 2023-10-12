const User = require("../db").User;
const KpiName = require("../db").KpiName;
const jwt = require('jsonwebtoken');
require('dotenv').config({ path: '.env.local', override: true });

async function getUserNotVerified(req, res) {
  try {
    const users = await User.findAll({ where: { is_verified: false } });
    console.log(users);
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function UserVerified(req, res) {
  try {
    const updatedUser = await User.update(
      { is_verified: true },
      { where: { id: req.params.id } }
    );

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function getAllUser(req, res) {
  try {
    const users = await User.findAll({ where: { role: "user", is_verified: true } });
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}



async function getTokenUserbyId(req, res) {
  const tokenid = req.params.tokenid
  try {
    const user = await User.findOne({ where: { id: tokenid } });
    
    return user.api_token;
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function updateToken(req, res) {

  const token = req.cookies["token"];
    if (!token) {
        return res.status(401).json({ error: 'Authentification requise !' });
    }
  const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
  req.userId = decodedToken.userId; 


  try {
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
    req.userId = decodedToken.userId; 
    const tokenUser = await getTokenUserbyId(req,res);
    const userId = req.params.userId;
    const website = req.params.website
    
    const updatedUser = await User.update(
      { api_token: tokenUser , website: website},
      { where: { id: userId } }
    );

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function getDelete(){
  const iduser = req.params.id;

  const user = User.findOne({where: {id : iduser}})

  //const tag = KpiName.findAll({where:{}})


  User.destroy({
      where: {
          id: iduser,
          
      }
  }).then(() => {
      res.status(200).json({
          message: "user supprimé avec succès"
      });
  }).catch((err) => {
      res.status(500).json({
          err
      });
  });
  }



module.exports = { getUserNotVerified, UserVerified, getAllUser,updateToken ,getTokenUserbyId,getDelete,};