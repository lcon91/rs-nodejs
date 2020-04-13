const express = require("express");
const cors = require("cors");
const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;
  var repository = {
    id: uuid(),
    title: title,
    url: url,
    techs: techs,
    likes: 0
  };
  repositories.push(repository);
  return response.json(repository);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, url, techs } = request.body;
  repositories.filter( elem => {
    return elem.id === id
  }).map((elem) => {
    elem.title = title;
    elem.url   = url;
    elem.techs = techs;
    
    return response.json(elem);
  });

  response.status(400);
  return response.json('Not Found');
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;
  for(var i = 0; i < repositories.length; i++){
    if(repositories[i].id === id){
      repository = repositories[i];
      repositories.splice(i, 1);
      response.status(204);
      return response.json({
        message: 'Repositório removido com sucesso!',
        item: repository
      });
    }
  }

  response.status(400);
  return response.json('Not Found');
  
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;
  const { title, url, techs } = request.body;
  repositories.filter( elem => {
    return elem.id === id
  }).map((elem) => {
    elem.likes++;
    
    return response.json({likes: elem.likes});
  });

  response.status(400);
  return response.json('Not Found');
  
});

module.exports = app;
