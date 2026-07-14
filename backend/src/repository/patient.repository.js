const pool = require("../config/db");

class PatientRepository {
    async getAllReporistory() {
        try {
            const result = await pool.query("SELECT * FROM patients");
            return result.rows;
        } catch (error) {
            console.error("Error al obtener datos del paciente", error.message);
            throw error;
        }
    }

    async getPatientById(id) {
        try {
            const result = await pool.query("SELECT * FROM patients WHERE id =$1", [
                id,
            ]);
            return result.rowCount > 0 ? result.rows[0] : null;
        } catch (error) {
            console.error(
                "Error al obtener la información del paciente ",
                error.message,
            );
            throw error;
        }
    }

    async createPatient(patientData) {
        try {
            const {
                nombre,
                document,
                fechanacimiento,
                telefono,
                eps,
                prioridad,
                estado,
                tipo_documento,
                eps_codigo,
                genero,
            } = patientData;
            const result = await pool.query(
                'INSERT INTO patients (nombre, document, fechanacimiento, telefono, eps, prioridad, estado, tipo_documento, eps_codigo, genero) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9,$10) RETURNING *',
                [
                    nombre,
                    document,
                    fechanacimiento,
                    telefono,
                    eps,
                    prioridad,
                    estado,
                    tipo_documento,
                    eps_codigo,
                    genero,
                ],
            );
            return result.rowCount > 0 ? result.rows[0] : null;
        } catch (error) {
            console.error("Error al obtener informacion del paciente", error.message);
            throw error;
        }
    }

    async updatePatient(id, patientData) {
        try {
            const {
                nombre,
                document,
                fechanacimiento,
                telefono,
                eps,
                prioridad,
                estado,
                tipo_documento,
                eps_codigo,
                genero,
            } = patientData;

             const result = await pool.query(
                'UPDATE patients SET nombre=$1, document=$2, fechanacimiento=$3, telefono=$4, eps=$5, prioridad=$6, estado=$7, tipo_documento=$8, eps_codigo=$9, genero=$10 WHERE id=$11 RETURNING *',
                [
                    nombre,
                    document,
                    fechanacimiento,
                    telefono,
                    eps,
                    prioridad,
                    estado,
                    tipo_documento,
                    eps_codigo,
                    genero,
                    id
                ],
            );

             return result.rowCount > 0 ? result.rows[0] : null;

        } catch (error) {

              console.error("Error al obtener informacion del paciente", error.message);
            throw error;
        
         }
    }

    async deletePatient(id){
        try {
            
           const result = await pool.query('DELETE FROM patients WHERE id=$1 RETURNING *',[id])
            return result.rowCount > 0 ? result.rows[0] : null;

        } catch (error) {
            console.error("Error al obtener informacion del paciente", error.message);
            throw error;
        }
    }
}

module.exports = new PatientRepository();