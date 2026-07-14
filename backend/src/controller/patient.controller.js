const patientService = require("../services/patient.service");
const errorMiddleware = require('../middleware/error.middleware');
class PatientController {
    async getAllPatients(req,res){
        try{
            const patients = await patientService.getAllPatients();
            res.json(patients);
        }catch(error){
            next(errorMiddleware);
        }
    }

    async getPatientById(req,res){
        const { id} = req.params;
        try{
            const patient = await patientService.getPatientById(id);
            res.json(patient);
        } catch(error){
            next(errorMiddleware);
        }
    }

    async createPatient(req, res, next){
        const patientData = req.body;
        try{
            const newPatient = await patientService.createPatient(patientData);
            res.status(201).json(newPatient);
        } catch(error){
            next(error);
        }
    }

    async updatePatient(req, res){
        const { id} = req.params;
        const patientData = req.body;
        try{
            const updatedPatient = await patientService.updatePatient(id, patientData);
            res.json(updatedPatient);
        } catch(error){
            next(errorMiddleware);
        }
    }

    async deletePatient(req, res){
        const {id} = req.params;
        try{
            const deletedPatient = await patientService.deletePatient(id);
            res.json(deletedPatient);
        } catch(error){
            next(errorMiddleware);
        }
    }

}

module.exports = new PatientController();