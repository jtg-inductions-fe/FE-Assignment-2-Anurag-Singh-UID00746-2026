import { UserRole } from '@types';

/** User authentication input data model required for logging into an account. */
export interface LoginCredential {
    /** The registered user email address string. */
    email: string;

    /** The plain text account password entry string. */
    password: string;
}

/** Form dataset payload structure model used for registering a completely new system user. */
export interface SignupCredential {
    /** The legal first name and last name display text string of the applicant. */
    fullName: string;

    /** The target authentication user email address string container. */
    email: string;

    /** The freshly declared account registration password value string. */
    password: string;

    /** Secondary security checkpoint validation value verifying matching password inputs. */
    confirmPassword: string;

    /** Optional custom security operational authorization classification category mapping tier. */
    role?: UserRole;
}
