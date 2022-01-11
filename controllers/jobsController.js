
const createJob = async (req, res) => {
    res.send('create job')
}
const deleteJob = async (req, res) => {
    res.send('deleted job')
}
const getAllJobs = async (req, res) => {
    res.send('all job')
}
const updateJob = async (req, res) => {
    res.send('updated job')
}
const showStats = async (req, res) => {
    res.send('stats')
}


export { createJob, deleteJob, getAllJobs, updateJob, showStats }