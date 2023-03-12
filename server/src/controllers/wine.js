const router = require("express").Router();

const { isAuth, isOwner } = require("../middlewares/guards");
const preload = require("../middlewares/preload");
const api = require("../services/wine");
const errorMapper = require("../util/errorMapper");

router.get("/", async (req, res) => {
  const name = req.query.name || "";
  const startIndex = +req.query.startIndex || 0;
  const limit = +req.query.limit || Number.MAX_SAFE_INTEGER;

  try {
    [result, totalPages] = await api.getAll(name, startIndex, limit);
    res.json({ result, totalPages });
  } catch (err) {
    res.status(400).json({ message: "Bad request" });
  }
});

router.get("/my", async (req, res) => {
  try {
    res.json(await api.getMy(req.query.userId));
  } catch (err) {
    res.status(400).json({ message: "Bad request" });
  }
});

router.get("/my/likes", async (req, res) => {
  try {
    res.json(await api.findLikedWines(req.query.userId));
  } catch (err) {
    res.status(400).json({ message: "Bad request" });
  }
});

router.post("/", isAuth(), async (req, res) => {
  const item = {
    name: req.body.name,
    type: req.body.type,
    origin: req.body.origin,
    price: req.body.price,
    image: req.body.image,
    description: req.body.description,
    _ownerId: req.user._id,
  };

  try {
    const result = await api.create(item);
    res.json(result);
  } catch (err) {
    console.error(err);
    const message = errorMapper(err);
    res.status(400).json({ message });
  }
});

router.get("/like/:id", preload(api), isAuth(), async (req, res) => {
  const id = req.params.id;
  const userId = req.user._id;

  try {
    const result = await api.like(id, userId);
    res.json(result);
  } catch (err) {
    console.error(err);
    const message = errorMapper(err);
    res.status(404).json({ message });
  }
});

router.get("/unlike/:id", preload(api), isAuth(), async (req, res) => {
  const id = req.params.id;
  const userId = req.user._id;

  try {
    const result = await api.unlike(id, userId);
    res.json(result);
  } catch (err) {
    console.error(err);
    const message = errorMapper(err);
    res.status(404).json({ message });
  }
});

router.get("/:id", preload(api), (req, res) => {
  res.json(res.locals.item);
});

router.put("/:id", preload(api), isOwner(), async (req, res) => {
  try {
    const result = await api.updateById(res.locals.item, req.body);
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "Request error" });
  }
});

router.delete("/:id", preload(api), isAuth(), isOwner(), async (req, res) => {
  const id = req.params.id;

  try {
    const result = await api.deleteById(id);
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(404).json({ message: `Item ${id} not found` });
  }
});

module.exports = router;
