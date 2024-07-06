const mongoose = require('mongoose');

// Replace <username>, <password>, and <your-cluster-url> with your actual MongoDB Atlas credentials and cluster URL
const uri = 'mongodb+srv://amartyapaul760:tdxA6IKtMoDrLw22@cluster1.mupkyvk.mongodb.net/test?retryWrites=true&w=majority';

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB Atlas!'))
  .catch(err => console.error('Error connecting to MongoDB Atlas:', err));

const studentSchema = new mongoose.Schema({
  handle: { type: String, required: true },
  name: { type: String, required: true },
  rating: { type: Number, required: true },
  maxRating: { type: Number, required: true },
  problemsSolved: { type: Number, required: true },
  submissionCount: { type: Number, required: true },
  mostSolvedProblems: { type: [String], required: true },
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
