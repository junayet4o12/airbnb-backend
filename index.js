const app = require("./app");
const connectDb = require("./db");

require("dotenv").config();

const port =  8000

app.listen(port, async () => {
    
    await connectDb();
    console.log(`Server run successfully at http://localhost:${port}`);
});
