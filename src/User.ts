
// What custom claims should be present in an ID token
// See: https://firebase.google.com/docs/auth/admin/custom-claims
export type CustomClaimNames = keyof CustomClaims;
export interface CustomClaims {
  admin: boolean;
}

// Based on: https://firebase.google.com/docs/reference/admin/node/admin.auth.UserRecord
export interface User {
  displayName: string;
  email: string;
  photoURL: string;
  uid: string;
  custom_claims: CustomClaims;
}
