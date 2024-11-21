const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/fileDatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const fileSchema = new mongoose.Schema({
  title: String,
  description: String,
  fileName: String,
  filePath: String,
  fileSize: Number,
  price: Number,
  uploadDate: { type: Date, default: Date.now },
});

const File = mongoose.model('File', fileSchema);

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const storage = multer.diskStorage({
  destination: './uploads',
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

app.post('/upload', upload.single('file'), async (req, res) => {
  try {
    const { title, description, price } = req.body;

    const newFile = new File({
      title,
      description,
      price: parseFloat(price),
      fileName: req.file.originalname,
      filePath: `/uploads/${req.file.filename}`,
      fileSize: req.file.size,
    });

    await newFile.save();
    res.status(201).json({ message: 'File uploaded successfully', file: newFile });
  } catch (error) {
    res.status(500).json({ message: 'Error uploading file', error });
  }
});

app.get('/files', async (req, res) => {
  try {
    const files = await File.find();
    res.status(200).json(files);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching files', error });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
