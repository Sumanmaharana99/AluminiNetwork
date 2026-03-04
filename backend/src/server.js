import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { ENV } from './config/env.js';
import { connectDB } from './config/db.js';

// Routes
import authRoutes       from './routes/authRoutes.js';
import userRoutes       from './routes/userRoutes.js';
import connectionRoutes from './routes/connectionRoutes.js';
import eventRoutes      from './routes/eventRoutes.js';
import messageRoutes    from './routes/messageRoutes.js';

// Socket
import { initSocket } from './socket/socketHandler.js';

const app = express();
const httpServer = createServer(app);

// ── Socket.IO ─────────────────────────────────────────────────
const io = new Server(httpServer, {
  cors: {
    origin: ENV.CLIENT_URL || 'http://localhost:5173',
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

app.set('io', io);
initSocket(io);

// ── Middlewares ───────────────────────────────────────────────
app.use(cors({
  origin: ENV.CLIENT_URL || 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ── REST Routes ───────────────────────────────────────────────
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome to AlumNetwork API' });
});

app.use('/api/auth',        authRoutes);
app.use('/api/users',       userRoutes);
app.use('/api/connections', connectionRoutes);
app.use('/api/events',      eventRoutes);
app.use('/api/messages',    messageRoutes);

// ── 404 ───────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found.' });
});

// ── Global Error Handler ──────────────────────────────────────
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal server error.',
  });
});

// ── Start ─────────────────────────────────────────────────────
const startServer = async () => {
  try {
    await connectDB();
    httpServer.listen(ENV.PORT, () => {
      console.log(` Server + Socket.IO running on port ${ENV.PORT}`);
    });
  } catch (err) {
    console.error('Error starting server:', err);
    process.exit(1);
  }
};

startServer();