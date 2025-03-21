import express from 'express';
import { errorHandler } from "./utils/errorHandler";
import purchaseRoutes from "./routes/purchaseRoutes";
import itemsRoutes from "./routes/itemsRoutes";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/items', itemsRoutes);
app.use('/purchase', purchaseRoutes);

app.use(errorHandler);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
