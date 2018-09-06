const getAllStories = (req, res, next) => {
  let { auth_id } = req.params;

  const db = req.app.get("db");
  db.get_stories([auth_id])
    .then(post => res.status(200).send(post))
    .catch(e => res.status(500).send("somethingiswrong"));
};

const createStory = (req, res, next) => {
  let { auth_id, title, img_url } = req.body;

  const db = req.app.get("db");

  db.create_story([auth_id, title, img_url])
    .then(response => {
      res.status(200).send(response);
    })
    .catch(err => res.status(500).send(err));
};

const deleteStory = (req, res, next) => {
  let { story_id } = req.params;

  const db = req.app.get("db");

  db.delete_story(story_id)
    .then(response => {
      res.status(200).send("response");
    })
    .catch(err => res.status(500).send(err));
};

module.exports = { getAllStories, createStory, deleteStory };
