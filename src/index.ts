import express, { Request, Response, NextFunction} from 'express';
import appRoutes from "./routes/app.routes";

const app = express();

app.use('/api', appRoutes);

const PORT = 3000;

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
