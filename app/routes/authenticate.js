module.exports = function(express, pool, jwt, secret) {

  let authRouter = express.Router();

  authRouter.post('/', async function(req, res) {

    try {

      let connection = await pool.getConnection();
      let rows = await connection.query('SELECT * FROM users WHERE email = ?', req.body.email);
      connection.release();

      if (rows.length === 0) {

        return res.json({status : `User with e-mail ${req.body.email} doesn't exist`});

      }

      let compare = false;

      if (rows[0].salt) {

        let hash = require('crypto')
          .pbkdf2Sync(req.body.password, rows[0].salt, 10000, 64, 'sha512');
        compare = hash.toString('hex') === rows[0].password;

      }

      if (compare) {

        const token = jwt.sign({
          id : rows[0].id,
          email : rows[0].email,
          password : rows[0].password,
          username : rows[0].username,
          admin : rows[0].admin,
          salt : rows[0].salt
        }, secret, {
          expiresIn: 3600
        });

        res.json({status:'OK', token:token, user:rows[0]});

      } else if (rows.length > 0) {

        res.json({status : 'Wrong password'});

      }

    } catch (e) {

      console.error(e);
      return res.json({status : 'Database error while getting users'});

    }

  });

  return authRouter;

}
