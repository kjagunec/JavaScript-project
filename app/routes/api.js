module.exports = function(express, pool, jwt, secret) {

  const apiRouter = express.Router();

  const dataTypes = [
    'users',
    'posts',
    'products',
    'categories'
  ];


  //get
  dataTypes.forEach(dataType => {

    apiRouter.get(`/${dataType}`, async function(req, res) {

      await get(res, dataType);

    });

  });

  apiRouter.post('/users' ,async function(req, res) {

    let salt = require('crypto').randomBytes(128).toString('base64');
    let hash = require('crypto').pbkdf2Sync(req.body.password, salt, 10000, 64, 'sha512');

    const user = {
      email : req.body.email,
      password : hash.toString('hex'),
      username : req.body.username,
      admin : req.body.admin,
      salt : salt
    };

    try {

      let connection = await pool.getConnection();
      let query = await connection.query('INSERT INTO users SET ?', user);
      connection.release();
      res.json({status:'OK', insertId:query.insertId});

    } catch (e) {

      console.error(e);
      return res.json({status : `Database error while adding user`});

    }

  })


  //token
  apiRouter.use(function (req, res, next) {

    const token = req.body.token || req.params.token || req.headers['x-access-token'] || req.query.token;

    if (token) {

      jwt.verify(token, secret, function (err, decoded) {

        if (err) {
          return res.json({status : 'Wrong token'});
        } else {
          req.decoded = decoded;
          next();
        }
      })

    } else {
      return res.json({status:'No token'});
    }

  });


  //users
  apiRouter.put('/users', async function(req, res) {

    let password = req.body.password;
    let user;

    if (password === "") {

      user = {
        id : req.body.id,
        email : req.body.email,
        username : req.body.username,
        admin : req.body.admin,
        salt : req.body.salt
      };

    } else {

      user = {
        id : req.body.id,
        email : req.body.email,
        password : require('crypto')
          .pbkdf2Sync(password, req.body.salt, 10000, 64, 'sha512')
          .toString('hex'),
        username : req.body.username,
        admin : req.body.admin,
        salt : req.body.salt
      };

    }

    await put(res, 'users', user);

  });

  apiRouter.route('/users/:id').get(async function(req, res) {

    await getWithId(res, 'users', req.params.id);

  }).delete(async function(req, res) {

    await remove(res, 'users', req.params.id);

  });


  //posts
  apiRouter.route('/posts').post(async function(req, res) {

    const news = {
      title : req.body.title,
      text : req.body.text,
      picture : req.body.picture,
      idUsers : req.body.idUsers
    };

    await post(res, 'posts', news);

  }).put(async function(req, res) {

    const news = {
      id : req.body.id,
      title : req.body.title,
      text : req.body.text,
      picture : req.body.picture,
      idUsers : req.body.idUsers
    };

    await put(res, 'posts', news);

  });

  apiRouter.route('/posts/:id').get(async function(req, res) {

    await getWithId(res, 'posts', req.params.id);

  }).delete(async function(req, res) {

    await remove(res, 'posts', req.params.id);

  });


  //categories
  apiRouter.route('/categories').post(async function(req, res) {

    const category = {
      name : req.body.name
    };

    await post(res, 'categories', category);

  }).put(async function(req, res) {

    const category = {
      id : req.body.id,
      name : req.body.name
    };

    await put(res, 'categories', category);

  });

  apiRouter.route('/categories/:id').get(async function(req, res) {

    await getWithId(res, 'categories', req.params.id);

  }).delete(async function(req, res) {

    await remove(res, 'categories', req.params.id);

  });


  //products
  apiRouter.route('/products').post(async function(req, res) {

    const product = {
      name : req.body.name,
      picture : req.body.picture,
      idCategories : req.body.idCategories
    };

    await post(res, 'products', product);

  }).put(async function(req, res) {

    const product = {
      id : req.body.id,
      name : req.body.name,
      picture : req.body.picture,
      idCategories : req.body.idCategories
    };

    await put(res, 'products', product);

  });

  apiRouter.route('/products/:id').get(async function(req, res) {

    await getWithId(res, 'products', req.params.id);

  }).delete(async function(req, res) {

    await remove(res, 'products', req.params.id);

  });


  apiRouter.get('/me', function (req, res) {

    res.json({status:'OK', user:req.decoded});

  });

  async function get(res, tableName) {

    try {

      let connection = await pool.getConnection();
      let rows = await connection.query(`SELECT * FROM ${tableName}`);
      connection.release();
      res.json({status:'OK', rows:rows});

    } catch (e) {

      console.error(e);
      return res.json({status : `Database error while getting ${tableName}`});

    }

  }

  async function post(res, tableName, data) {

    try {

      let connection = await pool.getConnection();
      let query = await connection.query(`INSERT INTO ${tableName} SET ?`, data);
      connection.release();
      res.json({status:'OK', insertId:query.insertId});

    } catch (e) {

      console.error(e);
      return res.json({status : `Database error while adding ${tableName}`});

    }

  }

  async function put(res, tableName, data) {

    try {

      let connection = await pool.getConnection();
      let query = await connection.query(`UPDATE ${tableName} SET ? WHERE id = ?`, [data, data.id]);
      connection.release();
      res.json({status:'OK', changedRows:query.changedRows});

    } catch (e) {

      console.error(e);
      return res.json({status : `Database error while updating ${tableName}`});

    }

  }

  async function getWithId(res, tableName, id) {

    try {

      let connection = await pool.getConnection();
      let rows = await connection.query(`SELECT * FROM ${tableName} WHERE id = ?`, id);
      connection.release();
      res.json({status:'OK', row:rows[0]});

    } catch (e) {

      console.error(e);
      return res.json({status : `Database error while getting ${tableName} with id ${id}`});

    }

  }

  async function remove(res, tableName, id) {

    try {

      let connection = await pool.getConnection();
      let query = await connection.query(`DELETE FROM ${tableName} WHERE id = ?`, id);
      connection.release();
      res.json({status:'OK', affectedRows:query.affectedRows});

    } catch (e) {

      console.error(e);
      return res.json({status : `Database error while deleting ${tableName} with id ${id}`});

    }

  }

  return apiRouter;

}
