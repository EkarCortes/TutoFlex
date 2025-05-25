import axiosInstance from "../api/axiosConfig";

export interface Profile {
  telefono:       string;
  foto:           string;  
  descripcion:    string;
  nombre:         string;
  apellido:       string;
  universidad_id: number;
  sede_id:        number;
  recinto_id:     number;
  carrera_id:     number;
}

export interface UpdateProfileResponse {
  success: boolean;
  message: string;
  data?: any;
}

/**
 * Actualiza el perfil del profesor, incluyendo la foto.
 * Recibe un FormData con campos y, opcionalmente, un archivo bajo la clave "foto".
 */
export const updateProfile = async (
  formData: FormData
): Promise<UpdateProfileResponse> => {
  try {
    const resp = await axiosInstance.put<UpdateProfileResponse>(
      "/users/updateProfesor",
      formData,
      {
        headers: {
          // Deja que el navegador determine boundary correctamente
          "Content-Type": "multipart/form-data",
        },
        // Evita que Axios convierta el FormData a JSON
        transformRequest: (data) => data,
      }
    );
    return resp.data;
  } catch (error: any) {
    console.error("Error en updateProfesorProfileService:", error.response || error);
    return {
      success: false,
      message: error.response?.data?.message || "Error al actualizar el perfil",
    };
  }
};