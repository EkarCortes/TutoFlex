import axios from 'axios';
import axiosInstance from '../api/axiosConfig';

type LoginUser = {
  id?: number;
  nombre?: string;
  apellido?: string;
  email?: string;
  rol_id?: number;
  [key: string]: unknown;
};

const getFirstString = (...values: unknown[]): string | null => {
  for (const value of values) {
    if (typeof value === 'string' && value.trim().length > 0) {
      return value;
    }
  }
  return null;
};

const getFirstObject = (...values: unknown[]): Record<string, unknown> | null => {
  for (const value of values) {
    if (value && typeof value === 'object' && !Array.isArray(value)) {
      return value as Record<string, unknown>;
    }
  }
  return null;
};

const normalizeLoginResponse = (payload: unknown): LoginResponse => {
  const raw = (payload ?? {}) as Record<string, any>;
  const token = getFirstString(
    raw.token,
    raw.accessToken,
    raw.data?.token,
    raw.data?.accessToken
  );
  const user = getFirstObject(raw.data?.user, raw.user, raw.data) as LoginUser | null;

  if (!token) {
    throw new Error('La respuesta de login no incluye token');
  }
  if (!user) {
    throw new Error('La respuesta de login no incluye datos de usuario');
  }

  return {
    success: raw.success !== false,
    message: typeof raw.message === 'string' ? raw.message : 'Login exitoso',
    data: user,
    token,
  };
};

// Response type for login
export interface LoginResponse {
  success: boolean;
  message: string;
  data: LoginUser;
  token: string;
}

export const login = async (email: string, password: string): Promise<LoginResponse> => {
  try {
    const response = await axiosInstance.post('/login', {
      email,
      password
    });
    return normalizeLoginResponse(response.data);
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || 'Error al iniciar sesión');
    }
    throw new Error('Error de conexión al servidor');
  }
};

export const verifyEmailExists = async (email: string): Promise<boolean> => {
  try {
    const response = await axiosInstance.post('/users/verifyExistingEmail', {
      email: email.trim(),
    });

    const body = response.data as {
      disponible?: boolean;
      data?: { disponible?: boolean };
    };

    const available =
      typeof body.disponible === 'boolean'
        ? body.disponible
        : typeof body.data?.disponible === 'boolean'
          ? body.data.disponible
          : undefined;

    // API returns `disponible=true` when email is not registered yet.
    if (typeof available === 'boolean') {
      return !available;
    }

    return false;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data?.message || 'Error al verificar el email');
    }
    throw new Error('Error de conexión al servidor');
  }
};
