const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

app.use(bodyParser.json());

let jobs = [];

// Create a Job
app.post('/jobs', (req, res) => {
    const job = req.body;
    jobs.push(job);
    res.status(201).send('Job created successfully');
});

// Get all Jobs
app.get('/jobs', (req, res) => {
    res.status(200).json(jobs);
});

// Update a Job
app.put('/jobs/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const updatedJob = req.body;
    let jobFound = false;

    jobs = jobs.map(job => {
        if (job.id === id) {
            jobFound = true;
            return updatedJob;
        }
        return job;
    });

    if (jobFound) {
        res.status(200).send('Job updated successfully');
    } else {
        res.status(404).send('Job not found');
    }
});

// Delete a Job
app.delete('/jobs/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const initialLength = jobs.length;
    jobs = jobs.filter(job => job.id !== id);

    if (jobs.length < initialLength) {
        res.status(200).send('Job deleted successfully');
    } else {
        res.status(404).send('Job not found');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
