const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint

// get all products
router.get('/', async (req, res) => {
  // find all products
  // be sure to include its associated Category and Tag data
  try {
    const userData = await Product.findAll({
      include: [{model: Category}, {model: Tag}],
    });
    res.status(200).json(userData);
  } catch (error) {
    res.status(500).json(error);
  }
});

// get one product
router.get('/:id', async (req, res) => {
  // find a single product by its `id`
  // be sure to include its associated Category and Tag data
  try {
    const userData = await Product.findByPk(req.params.id, {
      include: [{model: Category}, {model: Tag}],
    })
    if (userData !== null || undefined) {
      res.status(200).json(userData)} else {
        res.status(404).json({message: "ID does not exist!"})
      }
  } catch (error) {
    res.status(500).json(error);
  }
});

// create new product
router.post('/', async (req, res) => {
  /* req.body should look like this...
    {
      product_name: "Basketball",
      price: 200.00,
      stock: 3,
      tagIds: [1, 2, 3, 4]
    }
  */
  try {
    const newProduct = await Product.create(
    {
      product_name: req.body.product_name,
      price: req.body.price,
      stock: req.body.stock,
      tags: req.body.tags,
    });
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json(error);
  }
});

// update product
router.put('/:id', async (req, res) => {
  // update product data
  try {
    const updatedPosition = await Product.update(
    {
      product_name: req.body.product_name,
      price: req.body.price,
      stock: req.body.stock,
      tagIds: req.body.tagIds,
    },
    {
      where: {
        id: req.params.id,
      },
    });
    if (updatedPosition[0] !== 0) {
      res.status(200).json(updatedPosition)} else {
        res.status(404).json({message: "ID does not exist!"})
      };
  } catch (error) {
    res.status(400).json(error);
  }
});

router.delete('/:id', async (req, res) => {
  // delete one product by its `id` value
  try {
    const deleteProduct = await Product.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (deleteProduct !== 0) {
      res.status(200).json(deleteProduct)} else {
        res.status(404).json({message: "ID does not exist!"})
      };
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = router;
