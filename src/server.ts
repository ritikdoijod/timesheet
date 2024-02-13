import "dotenv/config";

import app from "./app.js";

const { PORT = 3000 } = process.env;

app.listen(PORT, () => {
  console.log(`URL: http://localhost:${PORT}`);
});
