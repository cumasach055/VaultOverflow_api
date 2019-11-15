/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const bcrypt = require('bcrypt');

module.exports = {
  
  async login(req, res) {
    let user = await User.findOne({username: req.param('username')});
    if (!user) return res.notFound();
    let result = await bcrypt.compare(req.param('password'), user.password);
    if (!result) return res.unauthorized();
    req.session.userId = user.id;
    res.json(user);
  },

  async me(req, res) {
    let user = await User.findOne({id: req.session.userId});
    if (!user) return res.unauthorized();
    res.json(user);
  },

  logout(req, res) {
    req.session.userId = null;
    res.ok();
  }
  
};

