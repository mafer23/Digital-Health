const patientRepository = require("../repository/patient.repository");
const patientValidator = require("../validators/patient.validator");

class PatientService {
  async getAllPatients() {
    try {
      const patients = await patientRepository.getAllReporistory();
      if (!patients || patients.length === 0) {
        throw new Error("No se encontraron los pacientes");
      }
      return patients;
    } catch (error) {
      console.error("Error al obtener datos del paciente", error.message);
      throw error;
    }
  }

  async getPatientsById(id) {
    try {
      const patients = await patientRepository.getPatientById(id);
      if (!patients) {
        throw new Error("Paciente no encontrado");
      }
      return patients;
    } catch (error) {
      console.error("Error al obtener datos del paciente", error.message);
      throw error;
    }
  }

  async createPatient(patientData) {
    patientValidator.validatePatientData(patientData);
    try {
      const patients = await patientRepository.createPatient(patientData);
      if (!patients) {
        throw new Error("Paciente no encontrado");
      }
      return patients;
    } catch (error) {
      console.error("Error al obtener datos del paciente", error.message);
      throw error;
    }
  }

   async updatePatient(id,patientData) {

    try {
      const updatePatients = await patientRepository.updatePatient(id, patientData);
      if (!updatePatients) {
        throw new Error("Paciente no encontrado");
      }
      return updatePatients;
    } catch (error) {
      console.error("Error al obtener datos del paciente", error.message);
      throw error;
    }
  }

  async deletePatient(id){
    try {
        const deletedPatient = await patientRepository.deletePatient(id);
        if (!deletedPatient) {
            throw new Error("Error al eliminar paciente");
        }
        return deletedPatient;
    } catch (error) {
      console.error("Error al obtener datos del paciente", error.message);
      throw error;
    }
  }



}

module.exports = new PatientService();