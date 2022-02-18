import React from 'react';
import express from 'express';
import ReactDOMServer from 'react-dom/server';
import { App } from '../App';
import { indexTemplate } from './indexTemplate'
import { StaticRouter} from "react-router";
const PORT = process.env.PORT || 3000;
const app = express();

app.use('/static', express.static('./dist/client'))
app.get('*', (req, res) => {
  const context = {};
  res.send(
    indexTemplate(ReactDOMServer.renderToString(
      <StaticRouter location={req.url} context={context}>
       {App()}
      </StaticRouter> 
      )),)
})

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`)
})
