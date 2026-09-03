export interface Theater {
  id: number;
  name: string;
  city: string;
  location: string;
  phone: string;
  email: string;
  isActive: boolean;
}

export interface CreateTheaterRequest {
  name: string;
  city: string;
  location: string;
  phone: string;
  email: string;
}

export interface UpdateTheaterRequest {
  name?: string;
  city?: string;
  location?: string;
  phone?: string;
  email?: string;
}

export interface UpdateCancellationPolicyRequest {
  refundableUptoDays: number;
  refundPercentage: number;
}
