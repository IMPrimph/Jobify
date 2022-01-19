import Job from "../models/Job.js"
import { StatusCodes } from "http-status-codes"
import { BadRequestError, UnAuthenticatedError } from '../errors/index.js'

const createJob = async (req, res) => {
    const { position, company } = req.body

    if (!position || !company) {
        throw new BadRequestError('Please provide all values')
    }

    req.body.createdBy = req.user.userId

    const job = await Job.create(req.body)
    res.status(StatusCodes.CREATED).json({ job })
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