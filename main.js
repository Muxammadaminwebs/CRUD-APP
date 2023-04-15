
let http = require("http");
let fs = require("fs");
let images = fs.readFileSync(__dirname + "/data.json", "utf-8");
let parseimages = JSON.parse(images);
let server = http.createServer((req, res) => {
  // GET
  res.setHeader('Access-Control-Allow-Origin', '*')
  let pathName = req.url.split("/");
  let pathId = pathName[2];
  let path = pathName[1];
  if (req.method == "GET" && path == "images") {
    if (req.url == "/") {
      res.write(`
        <h1>Choose data<h1/>
        <ul>
   
       <li> <a href='/users'>Users</a></li>
       </ul>
       `);
      res.end();
    } else if (path == "images" && pathId) {
      let pathId = req.url.split("/")[2];
      let data = JSON.parse(images).filter((e, i) => {
        return e.id == pathId;
      });
      res.end(
        data.length ? JSON.stringify(data) : "404 not found "
      );
    } else if (path == "images") {
      res.end(images);
    } else {
      res.end("404 not found");
    }
  }
  //POST
  else if (req.method == "POST" && path == "images") {
    let datas = "";
    req.on("data", (chunk) => {
      datas += chunk;
    });

    req.on("end", () => {
      datas = JSON.parse(`[${datas}]`)[0];
      let { title, url, thumbnailUrl } = datas;
      if (title && url && thumbnailUrl) {
        let obj = {
          id: JSON.parse(images)[JSON.parse(images).length - 1].id + 1,
          ...datas,
        };
        console.log(obj);
        let dataBase = JSON.parse(fs.readFileSync("data.json", "utf-8"));
        fs.writeFileSync(
          "data.json",
          JSON.stringify([...dataBase, obj], null, 4)
        );
        res.end("200 ");
      } else {
        res.end("Bad request");
      }
    });
  }
  // PUT
  else if (req.method == "PUT" && path == "images" && pathId * 1) {
    let datas = "";
    req.on("data", (chunk) => {
      datas += chunk;
    });

    req.on("end", () => {
      datas = JSON.parse(`[${datas}]`)[0];
      let { title, url, thumbnailUrl } = datas;
      if (title || url || thumbnailUrl) {
        let is = false;
        parseimages = parseimages.map((e, i) => {
          if (pathId == e.id) {
            is = true;
            return {
              id: e.id,
              title: title ? title : e.title,
              url: url ? url : e.url,
              thumbnailUrl: thumbnailUrl ? thumbnailUrl : e.thumbnailUrl,
            };
          }
          return e;
        });
        if (is) {
          fs.writeFileSync("data.json", JSON.stringify(parseimages, null, 4));
          res.end("200");
        } else {
          res.end("Bunday rasm malumoti mavjud emas");
        }
      } else {
        res.end("Malumot kiriting");
      }
    });
  }
  //DELETE
  else if (req.method == "DELETE" && path == "images" && pathId) {
    let is = false;
    parseimages = parseimages.map((e) => {
      if (e.id == pathId) {
        is = true;
        return "";
      } else {
        return e;
      }
    });
    if (is) {
      fs.writeFileSync("data.json", JSON.stringify(parseimages, null, 4));
      res.end("200");
    } else {
      res.end("Bunday user mavjud emas");
    }
  } else {
    res.end("Bad request");
  }
});

server.listen(8880, () => {
  console.log('ishladi');
});
