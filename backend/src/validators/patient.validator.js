class patientValidator {
  static validatePatientData(patientData) {
    const requiredFields = [
      "nombre",
      "document",
      "fechanacimiento",
      "telefono",
      "eps",
      "prioridad",
      "estado",
      "tipo_documento",
      "eps_codigo",
      "genero",
    ];

    for(const field of requiredFields){
        if (!patientData[field]) {
            const error = new Error(`El campo ${field} es obligatorio`)
            error.status = 400;
            throw error;
        }
    }
  }
}

module.exports = patientValidator